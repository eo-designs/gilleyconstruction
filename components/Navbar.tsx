"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localMedia } from "@/lib/media";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const LOGO_WHITE = localMedia("logo_white.PNG");

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/85 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-24 md:h-28">
        <Link href="/" className="group flex items-center gap-4 md:gap-5">
          <span className="relative inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-tight overflow-hidden bg-white/5 border border-white/10">
            <Image
              src={LOGO_WHITE}
              alt="Gilley Construction and Restoration logo"
              width={120}
              height={120}
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
              priority
            />
            <span className="absolute inset-0 bg-white/20 animate-sweep opacity-0 group-hover:opacity-100" />
          </span>
          <span className="flex flex-col leading-[0.95]">
            <span className="text-bone font-bold text-[1.2rem] md:text-[1.6rem] tracking-[0.05em] uppercase">
              Gilley Construction
            </span>
            <span className="text-ember text-[0.65rem] md:text-[0.85rem] font-bold tracking-[0.2em] uppercase mt-1.5">
              & Restoration Inc.
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname === item.href ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+19166646200" className="btn-call text-xs">
            <span aria-hidden>☏</span> (916) 664-6200
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span
            className={`block h-0.5 w-6 bg-bone transition ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-bone transition ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-bone transition ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-ink/95 backdrop-blur-xl border-t border-white/[0.06]">
          <div className="container py-6 flex flex-col gap-5">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg font-semibold uppercase tracking-wider ${
                  pathname === item.href ? "text-ember" : "text-bone"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a href="tel:+19166646200" className="btn-call justify-center mt-2">
              ☏ Call (916) 664-6200
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
