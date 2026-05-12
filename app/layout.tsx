import type { Metadata } from "next";
import { Barlow_Condensed, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Gilley Construction & Restoration Inc. | Licensed Design-Build · Northern California",
  description:
    "Licensed CSLB #1111756 general contractor delivering design-build, concrete, hardscape, restoration, and commercial work across Northern California.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var isLocal =
                    location.hostname === "localhost" ||
                    location.hostname === "127.0.0.1";
                  if (!isLocal || !("serviceWorker" in navigator) || !("caches" in window)) return;
                  var key = "gilley_sw_cleanup_v2";
                  if (sessionStorage.getItem(key) === "1") return;
                  Promise.all([
                    navigator.serviceWorker.getRegistrations().then(function (regs) {
                      return Promise.all(regs.map(function (r) { return r.unregister(); }));
                    }),
                    caches.keys().then(function (keys) {
                      return Promise.all(keys.map(function (k) { return caches.delete(k); }));
                    }),
                  ]).finally(function () { sessionStorage.setItem(key, "1"); });
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${barlow.variable} ${spaceGrotesk.variable} bg-ink text-bone antialiased`}
      >
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
