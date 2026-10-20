"use client";

import { motion } from "framer-motion";
import { useCharacterSafe } from "./CharacterContext";

export function Wanderer({ className }: { className?: string }) {
  const ctx = useCharacterSafe();
  const lookX = ctx ? (ctx.mouseX - 0.5) * 8 : 0;

  return (
    <motion.div
      className={`relative w-36 h-40 pointer-events-none select-none ${className ?? ""}`}
      animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 140 160" className="w-full h-full">
        <path d="M60 70 L55 140 Q70 145 85 140 L80 70 Z" fill="#1a3a5c" />
        <path d="M55 75 Q45 100 48 130" stroke="#2d6a4f" strokeWidth="3" fill="none" />
        <motion.g animate={{ x: lookX }}>
          <circle cx="70" cy="58" r="14" fill="#f4c89a" />
          <circle cx="65" cy="56" r="1.5" fill="#0a1628" />
          <circle cx="75" cy="56" r="1.5" fill="#0a1628" />
        </motion.g>
        {/* Lantern */}
        <motion.g
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ transformOrigin: "95px 85px" }}
        >
          <line x1="90" y1="75" x2="95" y2="95" stroke="#d4af6a" strokeWidth="1.5" />
          <rect x="88" y="95" width="14" height="18" rx="2" fill="#d4af6a" opacity="0.3" stroke="#e8c882" strokeWidth="0.8" />
          <motion.circle
            cx="95" cy="104" r="12"
            fill="rgba(212,175,106,0.2)"
            animate={{ opacity: [0.2, 0.5, 0.2], r: [10, 14, 10] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.g>
        {/* Floating book discovered */}
        <motion.rect
          x="105" y="60" width="16" height="20" rx="1"
          fill="#0f2744" stroke="#5ec8e8" strokeWidth="0.5"
          animate={{ y: [60, 52, 60], rotate: [-8, -4, -8] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  );
}
