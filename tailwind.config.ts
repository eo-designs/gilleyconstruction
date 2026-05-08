import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0d10",
        graphite: "#15181d",
        steel: "#1f242c",
        ash: "#2a313b",
        bone: "#f5f1ea",
        sand: "#dcd3c2",
        ember: "#f59e0b",
        rust: "#c2410c",
        signal: "#ef4444",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        tight: "2px",
        sharp: "0px",
        snip: "4px",
      },
      boxShadow: {
        lift: "0 24px 60px rgba(0,0,0,0.45)",
        ember: "0 18px 40px rgba(245,158,11,0.25)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.04)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "ember-glow":
          "radial-gradient(circle at top right, rgba(245,158,11,0.18), transparent 55%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translate3d(0, 32px, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        sweep: {
          "0%": { transform: "translateX(-120%) skewX(-20deg)" },
          "100%": { transform: "translateX(220%) skewX(-20deg)" },
        },
        pulseLine: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        rise: "rise 0.8s ease-out both",
        ticker: "ticker 38s linear infinite",
        sweep: "sweep 2.4s ease-in-out infinite",
        "pulse-line": "pulseLine 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
