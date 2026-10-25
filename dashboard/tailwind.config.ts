import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "bg-deep": "var(--bg-deep, #0B0709)",
        aubergine: {
          DEFAULT: "var(--aubergine, #3A0F34)",
          glow: "rgba(58, 15, 52, 0.45)",
        },
        ice: {
          DEFAULT: "var(--ice-silver, #DDE3E8)",
          silver: "var(--ice-silver, #DDE3E8)",
          dim: "rgba(221, 227, 232, 0.15)",
        },
        ink: "var(--ink, #12040F)",
        "text-muted": "var(--text-muted, rgba(221, 227, 232, 0.60))",
        "text-faint": "var(--text-faint, rgba(221, 227, 232, 0.38))",
        hint: "var(--hint, #3DDBB0)",
        glass: {
          bg: "var(--glass-bg, rgba(58,15,52,0.28))",
          "bg-strong": "var(--glass-bg-strong, rgba(58,15,52,0.42))",
          border: "var(--glass-border, rgba(221,227,232,0.10))",
          "border-strong": "var(--glass-border-strong, rgba(221,227,232,0.18))",
          highlight: "var(--glass-highlight, rgba(255,255,255,0.14))",
        },
        success: "var(--success, #34D399)",
        warning: "var(--warning, #FBBF24)",
        error: "var(--error, #F87171)",

        // Compatibility aliases
        bg: "var(--bg-deep, #0B0709)",
        surface: "var(--glass-bg-strong, rgba(58,15,52,0.42))",
        card: "var(--glass-bg, rgba(58,15,52,0.28))",
        border: "var(--glass-border, rgba(221,227,232,0.10))",
        "border-strong": "var(--glass-border-strong, rgba(221,227,232,0.18))",
        text: "var(--ice-silver, #DDE3E8)",
        accent: {
          DEFAULT: "var(--accent, #3DDBB0)",
          ink: "var(--accent-ink, #071610)",
        },
        tint: "var(--tint, rgba(221, 227, 232, 0.06))",
        brand: {
          DEFAULT: "var(--brand-color, #3DDBB0)",
          hover: "#64E8C2",
          light: "#A5F3D9",
        },
        dark: {
          bg: "var(--bg-deep, #0B0709)",
          card: "var(--glass-bg, rgba(58,15,52,0.28))",
          subtle: "rgba(58, 15, 52, 0.20)",
          border: "var(--glass-border, rgba(221,227,232,0.10))",
          "border-light": "var(--glass-border-strong, rgba(221,227,232,0.18))",
        },
      },
      fontFamily: {
        display: ["Barlow Condensed", "sans-serif"],
        sans: ["IBM Plex Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        glass: "20px",
        "glass-lg": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
