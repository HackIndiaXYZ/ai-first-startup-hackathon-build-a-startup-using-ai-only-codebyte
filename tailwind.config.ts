import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#ededed",
        brand: {
          DEFAULT: "#0070f3",
          light: "#3291ff",
          dark: "#0051b3",
          glow: "rgba(0, 112, 243, 0.15)",
        },
        card: {
          DEFAULT: "#111111",
          foreground: "#ededed",
          border: "#222222",
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      letterSpacing: {
        widest: "0.15em",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s infinite linear",
        "border-glow": "borderGlow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        borderGlow: {
          "0%": { borderColor: "rgba(0, 112, 243, 0.3)" },
          "100%": { borderColor: "rgba(0, 112, 243, 0.8)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
