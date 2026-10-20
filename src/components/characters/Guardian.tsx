"use client";

import { motion } from "framer-motion";

interface GuardianProps {
  gateOpen?: boolean;
  className?: string;
}

export function Guardian({ gateOpen = false, className }: GuardianProps) {
  return (
    <motion.div
      className={`relative w-56 h-64 pointer-events-none select-none ${className ?? ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 220 260" className="w-full h-full">
        {/* Gate arch */}
        <path d="M30 260 L30 100 Q110 20 190 100 L190 260 Z" fill="none" stroke="#d4af6a" strokeWidth="2" opacity="0.4" />
        <motion.path
          d="M30 260 L30 100 Q110 20 190 100"
          fill="none"
          stroke="#5ec8e8"
          strokeWidth="1"
          animate={{ opacity: gateOpen ? [0.3, 0.8, 0.3] : [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Gate doors */}
        <motion.g
          animate={gateOpen ? { x: [-15, -25], opacity: 0.6 } : { x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <rect x="35" y="110" width="70" height="150" fill="#1a3a5c" opacity="0.8" stroke="#d4af6a" strokeWidth="0.5" />
        </motion.g>
        <motion.g
          animate={gateOpen ? { x: [15, 25], opacity: 0.6 } : { x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <rect x="115" y="110" width="70" height="150" fill="#1a3a5c" opacity="0.8" stroke="#d4af6a" strokeWidth="0.5" />
        </motion.g>

        {/* Guardian figure */}
        <motion.g animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity }}>
          <path d="M95 180 L90 230 Q110 235 130 230 L125 180 Z" fill="#2d1f14" />
          <circle cx="110" cy="165" r="14" fill="#c9c0b4" opacity="0.9" />
          <path d="M100 158 Q110 145 120 158" fill="#1a3a5c" />
          {/* Staff */}
          <line x1="130" y1="170" x2="130" y2="240" stroke="#d4af6a" strokeWidth="2" />
          <motion.circle
            cx="130" cy="165" r="6"
            fill="#5ec8e8"
            animate={{ opacity: [0.4, 1, 0.4], r: [5, 7, 5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.g>

        {/* Magical symbols */}
        {gateOpen &&
          ["✦", "◈", "❧"].map((sym, i) => (
            <motion.text
              key={i}
              x={80 + i * 30}
              y={140}
              fill="#d4af6a"
              fontSize="12"
              animate={{ opacity: [0, 1, 0], y: [140, 120, 140] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            >
              {sym}
            </motion.text>
          ))}
      </svg>
    </motion.div>
  );
}
