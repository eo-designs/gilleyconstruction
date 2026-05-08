"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export type Project = {
  id: string;
  title: string;
  category: string;
  blurb: string;
  cover: string;
  images: string[];
};

export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight")
        setActive((i) => (i + 1) % project.images.length);
      if (e.key === "ArrowLeft")
        setActive((i) => (i - 1 + project.images.length) % project.images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, project.images.length]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => {
          setActive(0);
          setOpen(true);
        }}
        className="group relative block w-full text-left bg-graphite rounded-tight overflow-hidden border border-white/[0.06] hover:border-ember/50 transition-colors duration-300"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
        transition={{
          duration: 0.6,
          delay: (index % 6) * 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ y: -6 }}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-90 group-hover:opacity-100 transition" />

          {/* Sweep highlight */}
          <span className="absolute inset-0 overflow-hidden pointer-events-none">
            <span className="absolute -inset-y-2 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000" />
          </span>

          {/* Corner tag */}
          <span className="corner-tag">
            <span className="w-1 h-1 bg-ink rotate-45" />
            {project.category}
          </span>

          {/* Counter */}
          <div className="absolute top-4 right-4 bg-ink/70 backdrop-blur-md border border-white/10 rounded-tight px-2.5 py-1 text-[10px] font-bold tracking-widest text-bone uppercase">
            {project.images.length} Photos
          </div>
        </div>

        <div className="relative p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-bone group-hover:text-ember transition-colors text-xl">
              {project.title}
            </h3>
            <span className="text-ember translate-x-0 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
          <p className="text-bone/60 text-sm leading-relaxed">{project.blurb}</p>
          <div className="ember-divider mt-5" />
          <div className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-bone/45">
            <span>View Gallery</span>
            <span className="text-ember/70">Click to expand</span>
          </div>
        </div>
      </motion.button>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-xl flex flex-col"
            onClick={() => setOpen(false)}
          >
            <div className="container flex items-center justify-between py-4 border-b border-white/[0.06]">
              <div>
                <div className="text-ember text-[10px] font-bold tracking-[0.3em] uppercase">
                  {project.category}
                </div>
                <div className="text-bone font-bold uppercase tracking-wider">
                  {project.title}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-bone hover:text-ember transition text-2xl px-3"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div
              className="relative flex-1 flex items-center justify-center px-4 py-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() =>
                  setActive(
                    (i) => (i - 1 + project.images.length) % project.images.length
                  )
                }
                className="absolute left-4 md:left-8 z-10 w-12 h-12 flex items-center justify-center bg-graphite/80 hover:bg-ember hover:text-ink border border-white/10 rounded-tight text-bone text-2xl transition"
                aria-label="Previous"
              >
                ‹
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={project.images[active]}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full max-w-5xl aspect-[16/10]"
                >
                  <Image
                    src={project.images[active]}
                    alt={`${project.title} ${active + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={() =>
                  setActive((i) => (i + 1) % project.images.length)
                }
                className="absolute right-4 md:right-8 z-10 w-12 h-12 flex items-center justify-center bg-graphite/80 hover:bg-ember hover:text-ink border border-white/10 rounded-tight text-bone text-2xl transition"
                aria-label="Next"
              >
                ›
              </button>
            </div>

            <div
              className="container py-4 border-t border-white/[0.06] flex items-center justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-bone/60 text-xs uppercase tracking-widest">
                {active + 1} / {project.images.length}
              </div>
              <div className="hidden md:flex gap-2 overflow-x-auto max-w-2xl">
                {project.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`relative w-16 h-12 flex-shrink-0 rounded-tight overflow-hidden border transition ${
                      i === active
                        ? "border-ember"
                        : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={src} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
