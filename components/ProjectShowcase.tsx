"use client";

import Link from "next/link";
import { Reveal } from "./Reveal";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "@/lib/projects";

export default function ProjectShowcase({ limit }: { limit?: number }) {
  const items = limit ? PROJECTS.slice(0, limit) : PROJECTS;

  return (
    <section className="relative py-24 md:py-32 bg-ink">
      <div className="absolute inset-0 bg-gradient-to-b from-graphite/30 to-transparent pointer-events-none" />

      <div className="container relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <Reveal direction="up">
            <div>
              <span className="eyebrow">Recent Work</span>
              <h2 className="mt-5">
                Showcase. <span className="text-ember">Not Just Talk.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal direction="left" delay={0.1} className="md:text-right">
            <p className="max-w-md text-bone/65 leading-relaxed">
              Real projects, real craftsmanship. Tap any card to flip through the
              full gallery from on-site execution to finished delivery.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {limit && (
          <Reveal direction="up" delay={0.1} className="mt-12 text-center">
            <Link href="/gallery" className="btn-secondary">
              View Full Gallery <span aria-hidden>→</span>
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
