import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Services | Gilley Construction",
  description:
    "Full-service general contracting: design-build, concrete, hardscape, restoration, residential and commercial work.",
};

const SERVICES = [
  {
    num: "01",
    title: "Design + Build",
    desc: "Single-source delivery from initial concept through final walkthrough — architecture, engineering, permits, and field execution under one roof.",
    bullets: ["Concept & space planning", "Permit & code coordination", "Project management"],
  },
  {
    num: "02",
    title: "Concrete & Hardscape",
    desc: "Structural and decorative concrete, stamped finishes, foundations, retaining walls, drainage, and complete outdoor living installations.",
    bullets: ["Stamped & decorative concrete", "Driveways, patios, walkways", "Retaining walls & drainage"],
  },
  {
    num: "03",
    title: "Restoration",
    desc: "Insurance-eligible restoration for water, fire, and structural damage — combined with modern renovations and aesthetic upgrades.",
    bullets: ["Water & fire damage", "Structural repairs", "Full renovations"],
  },
  {
    num: "04",
    title: "Residential",
    desc: "Custom remodels, ADUs, additions, kitchens, baths, and outdoor living spaces tailored to homeowners with high standards.",
    bullets: ["Kitchens & baths", "ADUs & additions", "Outdoor living"],
  },
  {
    num: "05",
    title: "Commercial",
    desc: "Tenant improvements, structural concrete, site work, foundations, and ground-up commercial fit-outs.",
    bullets: ["Tenant improvements", "Site work & foundations", "Commercial concrete"],
  },
  {
    num: "06",
    title: "Fencing & Walls",
    desc: "Custom wood and metal fencing, perimeter security, decorative walls, and gate installations.",
    bullets: ["Wood & composite fencing", "Metal & security fencing", "Decorative walls"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-25 pointer-events-none" />
        <div className="absolute inset-0 bg-ember-glow opacity-50 pointer-events-none" />
        <div className="container relative">
          <Reveal direction="up" onLoad>
            <span className="eyebrow">What We Do</span>
            <h1 className="mt-6 max-w-4xl">
              Full-Spectrum
              <br />
              <span className="text-ember">Construction Services.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-bone/70 max-w-2xl">
              One licensed team. Six core service lines. Every project handled
              with the same discipline, transparency, and attention to detail.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services list */}
      <section className="relative pb-24 md:pb-32">
        <div className="container">
          <StaggerGroup className="grid gap-px bg-white/[0.06] rounded-tight overflow-hidden">
            {SERVICES.map((s) => (
              <StaggerItem key={s.num} direction="up">
                <article className="group bg-graphite p-8 md:p-12 hover:bg-steel transition-colors duration-300">
                  <div className="grid md:grid-cols-[120px_1fr_1fr] gap-6 md:gap-12 items-start">
                    <div>
                      <div className="text-ember text-sm font-bold tracking-[0.3em]">
                        {s.num}
                      </div>
                      <div className="mt-3 w-12 h-px bg-ember/40 group-hover:w-20 group-hover:bg-ember transition-all duration-500" />
                    </div>
                    <div>
                      <h3 className="text-bone group-hover:text-ember transition-colors">
                        {s.title}
                      </h3>
                      <p className="mt-4 text-bone/65 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                    <ul className="space-y-3">
                      {s.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 text-sm text-bone/75"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 bg-ember rotate-45 flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal direction="up" delay={0.1} className="mt-16 text-center">
            <p className="text-bone/65 mb-6">
              Don&apos;t see your project type? We handle custom scopes too.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+19166646200" className="btn-call">
                ☏ Call (916) 664-6200
              </a>
              <Link href="/contact" className="btn-primary">
                Get a Quote →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
