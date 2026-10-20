import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          cyan: "#5ec8e8",
          "cyan-bright": "#7ee0ff",
          violet: "#8b7ec8",
          "violet-soft": "#b8a9e8",
          "violet-deep": "#5c4d9a",
          fuchsia: "#e879f9",
          "fuchsia-soft": "#f0abfc",
        },
        navy: {
          DEFAULT: "#0a1628",
          deep: "#060e1a",
          mid: "#0f2744",
          light: "#1a3a5c",
        },
        ocean: {
          DEFAULT: "#1e4976",
          deep: "#163a5f",
          light: "#2d6a9f",
          mist: "#4a8fc4",
        },
        emerald: {
          DEFAULT: "#2d6a4f",
          deep: "#1b4332",
          forest: "#40916c",
          glow: "#52b788",
          mist: "#74c69d",
        },
        lavender: {
          DEFAULT: "#9d8ec7",
          soft: "#b8a9d4",
          deep: "#6b5b95",
        },
        peach: {
          DEFAULT: "#e8a87c",
          soft: "#f4c89a",
          deep: "#c4784a",
          glow: "#ffd4b0",
        },
        champagne: {
          DEFAULT: "#d4af6a",
          light: "#e8c882",
          pale: "#f5e6c8",
          glow: "#fff3d4",
        },
        magic: {
          cyan: "#5ec8e8",
          violet: "#8b7ec8",
        },
        ivory: {
          DEFAULT: "#f0f4fa",
          muted: "#b8c2d0",
          dim: "#7a8494",
        },
        midnight: {
          DEFAULT: "#0a1628",
          50: "#0f2744",
          100: "#142d4a",
          200: "#1a3a5c",
          300: "#224a6e",
        },
        violet: {
          DEFAULT: "#8b7ec8",
          muted: "#6b5b95",
          deep: "#5c4d9a",
          whisper: "#b8a9e8",
        },
        gold: {
          DEFAULT: "#d4af6a",
          muted: "#c49a4a",
          dim: "#9a7840",
          glow: "#e8c882",
        },
        bloom: {
          DEFAULT: "#9d8ec7",
          muted: "#b8a9d4",
          deep: "#6b5b95",
          whisper: "#d4c8e8",
        },
      },
      fontFamily: {
        display: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-plex-serif)", "Georgia", "serif"],
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "float": "float 8s ease-in-out infinite",
        "float-slow": "float 14s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "drift": "drift 25s ease-in-out infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "page-flutter": "pageFlutter 3s ease-in-out infinite",
        "lantern-sway": "lanternSway 5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        drift: {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(20px) translateY(-10px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        pageFlutter: {
          "0%, 100%": { transform: "rotate(-2deg) translateY(0)" },
          "50%": { transform: "rotate(2deg) translateY(-6px)" },
        },
        lanternSway: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      backgroundImage: {
        "sky-sunset":
          "linear-gradient(180deg, #060e1a 0%, #0a1628 25%, #1a3a5c 55%, #2d5a87 75%, #c4784a 90%, #e8a87c 100%)",
        "gold-line":
          "linear-gradient(90deg, transparent, rgba(212, 175, 106, 0.45), rgba(232, 200, 130, 0.35), transparent)",
        "glass-shine":
          "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, transparent 60%)",
        "verse-gradient":
          "radial-gradient(ellipse at 50% 0%, rgba(212, 175, 106, 0.12) 0%, transparent 55%)",
        "groove-text":
          "linear-gradient(120deg, #7ee0ff 0%, #b8a9e8 45%, #f0abfc 100%)",
        "groove-border":
          "linear-gradient(120deg, rgba(94,200,232,0.5), rgba(139,126,200,0.5), rgba(232,121,249,0.4))",
      },
      boxShadow: {
        glass: "inset 0 1px 0 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.3)",
        "glass-hover":
          "inset 0 1px 0 0 rgba(255,255,255,0.12), 0 12px 40px rgba(212,175,106,0.15)",
        "book-glow": "0 0 30px rgba(94, 200, 232, 0.25), 0 0 60px rgba(212, 175, 106, 0.15)",
        "neon-cyan": "0 0 14px rgba(94, 200, 232, 0.9), 0 0 28px rgba(94, 200, 232, 0.35)",
        "neon-fuchsia": "0 0 14px rgba(232, 121, 249, 0.85), 0 0 24px rgba(232, 121, 249, 0.3)",
        groove: "0 0 40px rgba(139, 126, 200, 0.25), 0 8px 32px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [typography],
};

export default config;
