"use client";

import Image from "next/image";
import { localMedia } from "@/lib/media";

const ITEMS = [
  "Licensed CSLB #1111756",
  "Bonded & Insured",
  "Family-Operated",
  "10+ Years Experience",
  "7 Counties Served",
  "Free Consultations",
  "Design · Build · Restore",
  "Premium Craftsmanship",
];

const LOGO_BLACK = localMedia("logo_black.PNG");

export default function LicenseBanner() {
  return (
    <div className="relative bg-ember text-ink overflow-hidden border-y border-ink/30">
      <div className="marquee-mask flex">
        <div className="flex gap-12 py-3 animate-ticker whitespace-nowrap pr-12">
          {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em]"
            >
              {i % 4 === 0 && (
                <Image
                  src={LOGO_BLACK}
                  alt="Gilley logo"
                  width={22}
                  height={22}
                  className="w-4.5 h-4.5 object-contain"
                />
              )}
              <span className="w-1.5 h-1.5 bg-ink rotate-45" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
