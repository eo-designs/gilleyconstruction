#!/usr/bin/env node
/**
 * Sync public/assets/gallery → Cloudflare R2.
 *
 * Strategy:
 *   1. Walk every file under public/assets/gallery (recursively).
 *   2. Compute SHA-256 of each file.
 *   3. Compare against .r2-upload-manifest.json (local cache of last upload).
 *      - If hash matches what's already uploaded → skip (no API call).
 *      - Otherwise → HeadObject as a sanity check; if the remote ETag matches
 *        the file's MD5, just refresh the manifest and skip the upload.
 *   4. PutObject for anything that's new or changed.
 *   5. Persist updated manifest.
 *
 * R2 keys mirror the local subpath under public/assets/gallery so:
 *   public/assets/gallery/local/foo.jpg → <bucket>/local/foo.jpg
 *
 * This lines up exactly with the URL builder in lib/media.ts.
 *
 * Usage:
 *   npm run r2:upload            # upload changed files
 *   npm run r2:upload -- --dry   # show what would happen
 *   npm run r2:upload -- --force # ignore manifest, re-upload everything
 */

import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const GALLERY_DIR = path.join(ROOT, "public", "assets", "gallery");
const MANIFEST_PATH = path.join(ROOT, ".r2-upload-manifest.json");

const ALLOWED_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
  ".mp4",
  ".mov",
  ".webm",
  ".m4v",
]);

const CONTENT_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
  ".m4v": "video/x-m4v",
};

const argv = new Set(process.argv.slice(2));
const DRY_RUN = argv.has("--dry") || argv.has("--dry-run");
const FORCE = argv.has("--force");

function requireEnv(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`✗ Missing required env var: ${name}`);
    console.error("  Add it to .env.local (see .env.example)");
    process.exit(1);
  }
  return v;
}

const R2_ACCOUNT_ID = requireEnv("R2_ACCOUNT_ID");
const R2_BUCKET = requireEnv("R2_BUCKET");
const R2_ACCESS_KEY_ID = requireEnv("R2_ACCESS_KEY_ID");
const R2_SECRET_ACCESS_KEY = requireEnv("R2_SECRET_ACCESS_KEY");
const R2_ENDPOINT =
  process.env.R2_ENDPOINT ||
  `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

const s3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

async function loadManifest() {
  try {
    const raw = await fs.readFile(MANIFEST_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function saveManifest(manifest) {
  if (DRY_RUN) return;
  const ordered = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b))
  );
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(ordered, null, 2) + "\n");
}

async function* walk(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === "ENOENT") return;
    throw err;
  }
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue; // skip .DS_Store etc.
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

async function hashFile(filePath, algo) {
  const hash = createHash(algo);
  const fh = await fs.open(filePath, "r");
  try {
    const stream = fh.createReadStream();
    for await (const chunk of stream) hash.update(chunk);
  } finally {
    await fh.close();
  }
  return hash.digest("hex");
}

async function remoteEtag(key) {
  try {
    const res = await s3.send(
      new HeadObjectCommand({ Bucket: R2_BUCKET, Key: key })
    );
    // ETag comes wrapped in quotes; for non-multipart uploads it's the MD5.
    return res.ETag?.replace(/^"|"$/g, "") || null;
  } catch (err) {
    if (err?.$metadata?.httpStatusCode === 404 || err?.name === "NotFound") {
      return null;
    }
    throw err;
  }
}

async function putObject(key, filePath, contentType) {
  if (DRY_RUN) return;
  const Body = await fs.readFile(filePath);
  await s3.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );
}

function fmtBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

async function main() {
  console.log(`▶ R2 sync${DRY_RUN ? " (dry run)" : ""}${FORCE ? " (force)" : ""}`);
  console.log(`  bucket   : ${R2_BUCKET}`);
  console.log(`  endpoint : ${R2_ENDPOINT}`);
  console.log(`  source   : ${path.relative(ROOT, GALLERY_DIR)}`);
  console.log("");

  const manifest = FORCE ? {} : await loadManifest();
  const nextManifest = { ...manifest };

  let total = 0;
  let uploaded = 0;
  let skipped = 0;
  let confirmed = 0;
  let errors = 0;
  let bytesUploaded = 0;

  for await (const filePath of walk(GALLERY_DIR)) {
    const ext = path.extname(filePath).toLowerCase();
    if (!ALLOWED_EXT.has(ext)) continue;

    total += 1;
    const key = path
      .relative(GALLERY_DIR, filePath)
      .split(path.sep)
      .join("/");
    const contentType = CONTENT_TYPES[ext] || "application/octet-stream";
    const stat = await fs.stat(filePath);

    try {
      const sha = await hashFile(filePath, "sha256");

      if (!FORCE && manifest[key] === sha) {
        skipped += 1;
        continue;
      }

      // Manifest doesn't know about it (or hash differs).
      // Cheap sanity check via HeadObject + MD5 ETag — saves a re-upload
      // if the bucket already has the same bytes (e.g. fresh clone).
      const md5 = await hashFile(filePath, "md5");
      const etag = await remoteEtag(key);
      if (etag && etag.toLowerCase() === md5.toLowerCase()) {
        nextManifest[key] = sha;
        confirmed += 1;
        console.log(`= ${key}  (already in R2, manifest refreshed)`);
        continue;
      }

      console.log(
        `${DRY_RUN ? "~" : "↑"} ${key}  ${fmtBytes(stat.size)}  ${contentType}`
      );
      await putObject(key, filePath, contentType);
      nextManifest[key] = sha;
      uploaded += 1;
      bytesUploaded += stat.size;
    } catch (err) {
      errors += 1;
      console.error(`✗ ${key}: ${err.message}`);
    }
  }

  await saveManifest(nextManifest);

  console.log("");
  console.log("── summary ──────────────────────────────");
  console.log(`  scanned    : ${total}`);
  console.log(`  uploaded   : ${uploaded}  (${fmtBytes(bytesUploaded)})`);
  console.log(`  confirmed  : ${confirmed}  (already on R2)`);
  console.log(`  skipped    : ${skipped}  (manifest hit)`);
  if (errors) console.log(`  errors     : ${errors}`);
  if (DRY_RUN) console.log("  (dry run — no objects written, manifest untouched)");
  process.exit(errors ? 1 : 0);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
