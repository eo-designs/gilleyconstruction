import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/[0.06] bg-ink/80">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
      <div className="container relative py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 bg-ember text-ink font-black text-xl rounded-tight">
                G
              </span>
              <div className="leading-none">
                <div className="text-bone font-bold uppercase tracking-wider">
                  Gilley
                </div>
                <div className="text-ember text-[10px] font-bold tracking-[0.3em] uppercase">
                  Construction
                </div>
              </div>
            </div>
            <p className="text-bone/60 text-sm leading-relaxed">
              Licensed general contractor delivering design-build, concrete, and
              restoration across Northern California.
            </p>
            <p className="text-ember text-xs font-bold tracking-widest uppercase mt-4">
              CSLB #1111756 · Bonded · Insured
            </p>
          </div>

          <div>
            <h4 className="text-bone font-bold uppercase tracking-wider text-xs mb-4">
              Navigate
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/gallery", label: "Project Gallery" },
                { href: "/contact", label: "Get a Quote" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-bone/65 hover:text-ember transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-bone font-bold uppercase tracking-wider text-xs mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="tel:+19166646200"
                  className="text-bone/65 hover:text-ember"
                >
                  ☏ (916) 664-6200
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@gilleydesignbuild.com"
                  className="text-bone/65 hover:text-ember break-all"
                >
                  ✉ info@gilleydesignbuild.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-bone font-bold uppercase tracking-wider text-xs mb-4">
              Service Area
            </h4>
            <p className="text-bone/65 text-sm leading-relaxed">
              Sacramento · San Joaquin · Stanislaus · Solano · Alameda · Contra
              Costa · Yolo
            </p>
          </div>
        </div>

        <div className="ember-divider mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-bone/45 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Gilley Construction & Restoration, Inc.</p>
          <p>Built to last.</p>
        </div>
      </div>
    </footer>
  );
}
