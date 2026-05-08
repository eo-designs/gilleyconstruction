import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import ProjectShowcase from "@/components/ProjectShowcase";

export const metadata: Metadata = {
  title: "Project Gallery | Gilley Construction",
  description:
    "A showcase of recent residential, commercial, concrete, and fencing projects across Northern California.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-25 pointer-events-none" />
        <div className="absolute inset-0 bg-ember-glow opacity-50 pointer-events-none" />
        <div className="container relative">
          <Reveal direction="up" onLoad>
            <span className="eyebrow">The Portfolio</span>
            <h1 className="mt-6 max-w-4xl">
              Real Projects.
              <br />
              <span className="text-ember">Real Craftsmanship.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-bone/70 max-w-2xl">
              Click any project to flip through the full gallery — from on-site
              build to finished delivery.
            </p>
          </Reveal>
        </div>
      </section>

      <ProjectShowcase />
    </>
  );
}
