"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { localMedia } from "@/lib/media";

const HERO_VIDEO = localMedia("shortVideo_1.mov");
const HERO_POSTER = localMedia("commercial_1.jpeg");

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = async () => {
      try {
        await v.play();
        setCanPlay(true);
      } catch {
        setCanPlay(false);
      }
    };
    tryPlay();
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[640px] overflow-hidden flex items-center">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_POSTER}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Static image fallback if video can't play */}
      {!canPlay && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_POSTER})`,
          }}
        />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <div className="absolute inset-0 grid-overlay opacity-25" />
      <div className="absolute inset-0 bg-ember-glow opacity-60" />

      {/* Side rails */}
      <div className="hidden md:flex absolute left-6 top-0 bottom-0 flex-col justify-center gap-3 z-10">
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-ember/60 to-transparent animate-pulse-line" />
        <span className="text-[10px] font-bold tracking-[0.4em] text-ember uppercase rotate-180 [writing-mode:vertical-rl]">
          Est. 2014
        </span>
      </div>
      <div className="hidden md:flex absolute right-6 top-0 bottom-0 flex-col justify-center items-center gap-4 z-10">
        <span className="text-[10px] font-bold tracking-[0.4em] text-bone/60 uppercase [writing-mode:vertical-rl]">
          Norcal · Licensed · Bonded
        </span>
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-bone/40 to-transparent animate-pulse-line" />
      </div>

      <div className="container relative z-10 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-3 mb-6 bg-ember/15 border border-ember/40 px-4 py-2 rounded-tight backdrop-blur-sm">
            <span className="w-2 h-2 bg-ember rounded-full animate-pulse" />
            <span className="text-ember text-xs font-bold uppercase tracking-[0.3em]">
              Licensed CSLB #1111756 · Bonded · Insured
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-bone"
          >
            Built Right.
            <br />
            <span className="text-ember">Built To Last.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg md:text-2xl text-bone/85 mt-8 max-w-2xl leading-relaxed"
          >
            Award-quality general contracting, concrete, and restoration —
            engineered for residential and commercial clients across Northern
            California.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 mt-10"
          >
            <a href="tel:+19166646200" className="btn-call group">
              <span aria-hidden className="text-base">☏</span>
              Call (916) 664-6200
              <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
            </a>
            <Link href="/gallery" className="btn-secondary">
              See Our Gallery
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center gap-6 mt-12 text-xs uppercase tracking-widest text-bone/55"
          >
            <span>Free Estimates</span>
            <span className="w-1 h-1 bg-ember rounded-full" />
            <span>10+ Years</span>
            <span className="w-1 h-1 bg-ember rounded-full" />
            <span>Family Operated</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold tracking-[0.4em] text-bone/55 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-ember to-transparent"
        />
      </motion.div>
    </section>
  );
}
