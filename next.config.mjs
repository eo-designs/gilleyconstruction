/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { dev }) => {
		// Avoid intermittent missing chunk/module errors in dev caused by stale filesystem cache.
		if (dev) {
			config.cache = false;
		}
		return config;
	},
	images: {
		remotePatterns: [
			// Cloudflare R2 public dev URL
			{ protocol: "https", hostname: "*.r2.dev" },
			// Cloudflare R2 S3 endpoint (rarely used directly, but allow it)
			{ protocol: "https", hostname: "*.r2.cloudflarestorage.com" },
			// Optional custom domain in front of R2
			...(process.env.NEXT_PUBLIC_R2_PUBLIC_HOSTNAME
				? [
						{
							protocol: "https",
							hostname: process.env.NEXT_PUBLIC_R2_PUBLIC_HOSTNAME,
						},
				  ]
				: []),
		],
	},
};

export default nextConfig;
