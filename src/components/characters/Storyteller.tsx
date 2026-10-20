"use client";

import { motion } from "framer-motion";
import { useCharacterSafe } from "./CharacterContext";

interface StorytellerProps {
  size?: "hero" | "section" | "small";
  intensity?: number;
  className?: string;
}

export function Storyteller({ size = "section", intensity = 1, className }: StorytellerProps) {
  const ctx = useCharacterSafe();
  const lookX = ctx ? (ctx.mouseX - 0.5) * 10 : 0;
  const lookY = ctx ? (ctx.mouseY - 0.5) * 6 : 0;

  const dim = { hero: 220, section: 160, small: 100 }[size];

  return (
    <motion.div
      className={`relative select-none pointer-events-none ${className ?? ""}`}
      style={{ width: dim, height: dim * 1.1 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70%] h-[50%] rounded-full blur-3xl bg-champagne/15"
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <svg viewBox="0 0 200 220" className="w-full h-full drop-shadow-lg" aria-hidden="true">
        {/* Magical book glow */}
        <motion.ellipse
          cx="130" cy="150" rx="25" ry="15"
          fill="rgba(94,200,232,0.2)"
          animate={{ opacity: [0.2, 0.5, 0.2], rx: [22, 28, 22] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Robe/cloak */}
        <path d="M85 95 L75 190 Q100 200 125 190 L115 95 Z" fill="#1a3a5c" opacity="0.9" />
        <path d="M80 100 Q70 150 72 185 L128 185 Q130 150 120 100" fill="#2d6a4f" opacity="0.5" />

        {/* Head */}
        <motion.g animate={{ x: lookX, y: lookY }}>
          <circle cx="100" cy="82" r="18" fill="#f4c89a" opacity="0.95" />
          <path d="M85 75 Q100 55 115 75 Q100 88 85 75" fill="#2d1f14" opacity="0.8" />
          <circle cx="94" cy="80" r="2" fill="#0a1628" />
          <circle cx="106" cy="80" r="2" fill="#0a1628" />
          <circle cx="94.5" cy="79" r="0.8" fill="#d4af6a" />
          <circle cx="106.5" cy="79" r="0.8" fill="#d4af6a" />
        </motion.g>

        {/* Arms holding book */}
        <path d="M115 110 Q135 115 140 140" stroke="#f4c89a" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M85 110 Q65 115 60 135" stroke="#f4c89a" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Magical book */}
        <motion.g
          animate={{ rotate: [0, 2, 0, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{ transformOrigin: "130px 145px" }}
        >
          <rect x="118" y="130" width="28" height="36" rx="2" fill="#0f2744" stroke="#d4af6a" strokeWidth="1" />
          <line x1="132" y1="132" x2="132" y2="164" stroke="#d4af6a" strokeWidth="0.5" opacity="0.5" />
          <motion.rect
            x="120" y="138" width="12" height="16" fill="#5ec8e8" opacity="0.3"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.g>

        {/* Particles from book */}
        {Array.from({ length: Math.round(4 * intensity) }).map((_, i) => (
          <motion.circle
            key={i}
            cx={135 + i * 4}
            cy={125 - i * 3}
            r={1 + intensity * 0.5}
            fill="#5ec8e8"
            animate={{
              opacity: [0, intensity, 0],
              cy: [125 - i * 3, 105 - i * 6, 125 - i * 3],
              cx: [135 + i * 4, 140 + i * 7, 135 + i * 4],
            }}
            transition={{ duration: 2.5 / intensity, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
