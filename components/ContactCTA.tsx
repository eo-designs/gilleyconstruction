"use client";

import Link from "next/link";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

const HIGHLIGHTS = [
  {
    label: "Homeowners",
    desc: "Custom remodels, ADUs, outdoor living, and full home restorations.",
  },
  {
    label: "Property Managers",
    desc: "Multi-unit repairs, tenant improvements, and ongoing maintenance contracts.",
  },
  {
    label: "Commercial Owners",
    desc: "Site work, structural concrete, foundations, and tenant fit-outs.",
  },
  {
    label: "Designers & Architects",
    desc: "Reliable build partner — bondable, insured, and code-fluent.",
  },
];

export default function ContactCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-ember-glow opacity-50 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-ember/10 blur-3xl rounded-full pointer-events-none" />

      <div className="container relative">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-start">
          <Reveal direction="right">
            <span className="eyebrow">Who We Build For</span>
            <h2 className="mt-5">
              Your Project.
              <br />
              <span className="text-ember">Our Reputation.</span>
            </h2>
            <p className="mt-6 text-lg text-bone/70 max-w-xl leading-relaxed">
              From single-family remodels to commercial site work, we partner with
              clients who expect transparent communication, on-time delivery, and
              workmanship that holds up.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <a href="tel:+19166646200" className="btn-call">
                ☏ (916) 664-6200
              </a>
              <Link href="/contact" className="btn-primary">
                Request a Quote →
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-px bg-white/[0.06] rounded-tight overflow-hidden max-w-md">
              {[
                { v: "24h", l: "Response" },
                { v: "Free", l: "Estimates" },
                { v: "100%", l: "Insured" },
              ].map((s) => (
                <div key={s.l} className="bg-graphite p-5 text-center">
                  <div className="text-ember font-bold text-2xl">{s.v}</div>
                  <div className="text-[10px] tracking-widest uppercase text-bone/50 mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <StaggerGroup className="grid gap-px bg-white/[0.06] rounded-tight overflow-hidden">
            {HIGHLIGHTS.map((h, i) => (
              <StaggerItem key={h.label} direction="left">
                <div className="group bg-graphite p-6 md:p-8 hover:bg-steel transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-ember/60 text-sm font-bold tracking-widest">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-white/10 group-hover:bg-ember/40 transition" />
                    <span className="text-ember opacity-0 group-hover:opacity-100 transition">
                      →
                    </span>
                  </div>
                  <h3 className="mt-4 text-bone uppercase tracking-wider text-lg">
                    {h.label}
                  </h3>
                  <p className="mt-2 text-bone/60 text-sm leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
