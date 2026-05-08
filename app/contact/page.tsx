"use client";

import { useState } from "react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const project = String(data.get("project") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProject Type: ${project}\n\n${message}`
    );
    window.location.href = `mailto:info@gilleydesignbuild.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-25 pointer-events-none" />
        <div className="absolute inset-0 bg-ember-glow opacity-50 pointer-events-none" />
        <div className="container relative">
          <Reveal direction="up" onLoad>
            <span className="eyebrow">Let&apos;s Build</span>
            <h1 className="mt-6 max-w-4xl">
              Start Your
              <br />
              <span className="text-ember">Next Project.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-bone/70 max-w-2xl">
              Tell us about the work. Free consultations and fast quotes for
              residential and commercial clients across Northern California.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-24 md:pb-32">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10">
            {/* Info column */}
            <Reveal direction="right">
              <div className="panel p-8 md:p-10 h-full">
                <h3 className="text-bone">Reach Out Directly</h3>
                <div className="ember-divider my-6" />

                <ul className="space-y-6">
                  <li>
                    <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-bone/45 mb-1">
                      Phone
                    </div>
                    <a
                      href="tel:+19166646200"
                      className="text-bone hover:text-ember text-2xl font-bold tracking-wider"
                    >
                      (916) 664-6200
                    </a>
                  </li>
                  <li>
                    <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-bone/45 mb-1">
                      Email
                    </div>
                    <a
                      href="mailto:info@gilleydesignbuild.com"
                      className="text-bone hover:text-ember break-all"
                    >
                      info@gilleydesignbuild.com
                    </a>
                  </li>
                  <li>
                    <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-bone/45 mb-1">
                      Service Area
                    </div>
                    <p className="text-bone/75">
                      Sacramento · San Joaquin · Stanislaus · Solano · Alameda ·
                      Contra Costa · Yolo
                    </p>
                  </li>
                  <li>
                    <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-bone/45 mb-1">
                      License
                    </div>
                    <p className="text-bone/75">
                      CSLB #1111756 · Bonded · Fully Insured
                    </p>
                  </li>
                </ul>

                <div className="mt-10">
                  <a href="tel:+19166646200" className="btn-call w-full">
                    ☏ Call Now
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Form column */}
            <Reveal direction="left" delay={0.1}>
              <form
                onSubmit={onSubmit}
                className="panel p-8 md:p-10 space-y-5"
                noValidate
              >
                <h3 className="text-bone">Project Inquiry</h3>
                <div className="ember-divider" />

                <StaggerGroup className="grid sm:grid-cols-2 gap-5" staggerChildren={0.05}>
                  <StaggerItem>
                    <label className="block">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-bone/55">
                        Name
                      </span>
                      <input
                        name="name"
                        required
                        className="input mt-2"
                        placeholder="Your name"
                      />
                    </label>
                  </StaggerItem>
                  <StaggerItem>
                    <label className="block">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-bone/55">
                        Phone
                      </span>
                      <input
                        name="phone"
                        type="tel"
                        className="input mt-2"
                        placeholder="(___) ___-____"
                      />
                    </label>
                  </StaggerItem>
                  <StaggerItem className="sm:col-span-2">
                    <label className="block">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-bone/55">
                        Email
                      </span>
                      <input
                        name="email"
                        type="email"
                        required
                        className="input mt-2"
                        placeholder="you@example.com"
                      />
                    </label>
                  </StaggerItem>
                  <StaggerItem className="sm:col-span-2">
                    <label className="block">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-bone/55">
                        Project Type
                      </span>
                      <select name="project" className="input mt-2" defaultValue="">
                        <option value="" disabled>
                          Select a service…
                        </option>
                        <option>Design + Build</option>
                        <option>Concrete & Hardscape</option>
                        <option>Restoration</option>
                        <option>Residential Remodel</option>
                        <option>Commercial / TI</option>
                        <option>Fencing & Walls</option>
                        <option>Other</option>
                      </select>
                    </label>
                  </StaggerItem>
                  <StaggerItem className="sm:col-span-2">
                    <label className="block">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-bone/55">
                        Tell us about your project
                      </span>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        className="input mt-2 resize-none"
                        placeholder="Scope, timeline, location, anything we should know…"
                      />
                    </label>
                  </StaggerItem>
                </StaggerGroup>

                <button type="submit" className="btn-primary w-full">
                  Send Inquiry →
                </button>
                {submitted && (
                  <p className="text-ember text-sm text-center">
                    Opening your email — we&apos;ll respond within 24 hours.
                  </p>
                )}
                <p className="text-bone/45 text-xs text-center">
                  Or call directly: <a href="tel:+19166646200" className="text-ember">(916) 664-6200</a>
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
