"use client";

import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

const SERVICES = [
  {
    num: "01",
    title: "Design + Build",
    desc: "Concept-to-completion ownership. Architecture, engineering, and field execution under one roof.",
    tags: ["Planning", "Permits", "Build"],
  },
  {
    num: "02",
    title: "Concrete & Hardscape",
    desc: "Stamped concrete, foundations, retaining walls, drainage, pavers, driveways, and outdoor living.",
    tags: ["Stamped", "Pavers", "Drainage"],
  },
  {
    num: "03",
    title: "Restoration",
    desc: "Structural repairs, water and fire damage rebuilds, modern renovations, and full restorations.",
    tags: ["Repair", "Renovate", "Insure"],
  },
  {
    num: "04",
    title: "Residential",
    desc: "Custom kitchens, baths, additions, ADUs, patios, and outdoor living spaces built to last decades.",
    tags: ["ADU", "Remodel", "Outdoor"],
  },
  {
    num: "05",
    title: "Commercial",
    desc: "Tenant improvements, foundations, site work, infrastructure concrete, and commercial fit-outs.",
    tags: ["TI", "Foundations", "Site"],
  },
  {
    num: "06",
    title: "Fencing & Walls",
    desc: "Custom wood and metal fencing, retaining systems, perimeter walls, and security installations.",
    tags: ["Wood", "Metal", "Security"],
  },
];

export default function ServicesGrid() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-ember/5 via-transparent to-transparent pointer-events-none" />

      <div className="container relative">
        {/* License headline strip */}
        <Reveal direction="up" duration={0.7}>
          <div className="text-center mb-16">
            <span className="eyebrow justify-center">What We Deliver</span>
            <h2 className="mt-5">
              Licensed. Bonded. <span className="text-ember">Built To Code.</span>
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg">
              A full-service general contractor with the discipline of commercial
              builders and the personal touch of a family operation.
            </p>
          </div>
        </Reveal>

        <StaggerGroup
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-tight overflow-hidden"
          staggerChildren={0.07}
        >
          {SERVICES.map((s) => (
            <StaggerItem key={s.num} direction="up">
              <article className="group relative h-full bg-graphite p-8 md:p-10 transition-colors duration-300 hover:bg-steel cursor-default">
                {/* Animated corner accent */}
                <span className="absolute top-0 right-0 w-12 h-px bg-ember origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <span className="absolute top-0 right-0 w-px h-12 bg-ember origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100" />

                <div className="flex items-center justify-between mb-6">
                  <span className="text-ember/40 text-sm font-bold tracking-[0.3em]">
                    {s.num}
                  </span>
                  <div className="w-10 h-px bg-ember/40 group-hover:w-16 group-hover:bg-ember transition-all duration-500" />
                </div>

                <h3 className="text-bone mb-4 group-hover:text-ember transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-bone/60 leading-relaxed mb-6">{s.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-bold uppercase tracking-widest border border-bone/15 px-2.5 py-1 rounded-tight text-bone/70 group-hover:border-ember/40 group-hover:text-ember transition"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Stats */}
        <Reveal direction="up" delay={0.1} className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-tight overflow-hidden">
            {[
              { num: "50+", label: "Projects Built" },
              { num: "10+", label: "Years Active" },
              { num: "7", label: "Counties Served" },
              { num: "100%", label: "Licensed Work" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-graphite p-8 text-center"
              >
                <div className="stat-num">{s.num}</div>
                <div className="text-[10px] font-bold tracking-[0.3em] text-bone/55 uppercase mt-3">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
