"use client";

import { motion } from "framer-motion";

interface ScribeProps {
  writing?: boolean;
  className?: string;
}

export function Scribe({ writing = false, className }: ScribeProps) {
  return (
    <motion.div
      className={`relative w-44 h-48 pointer-events-none select-none ${className ?? ""}`}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 180 200" className="w-full h-full">
        <path d="M75 85 L68 175 Q90 182 112 175 L105 85 Z" fill="#2d1f14" opacity="0.9" />
        <path d="M70 90 Q60 130 62 165" fill="#1a3a5c" opacity="0.6" />
        <circle cx="90" cy="72" r="16" fill="#f4c89a" />
        <circle cx="84" cy="70" r="1.8" fill="#0a1628" />
        <circle cx="96" cy="70" r="1.8" fill="#0a1628" />

        {/* Desk */}
        <rect x="50" y="130" width="80" height="8" rx="2" fill="#2d1f14" opacity="0.7" />
        <rect x="55" y="118" width="50" height="14" rx="1" fill="#f5f0e8" opacity="0.9" />

        {/* Quill */}
        <motion.g
          animate={writing ? { rotate: [0, 5, -3, 0] } : { rotate: [0, 2, 0] }}
          transition={{ duration: writing ? 1.5 : 4, repeat: Infinity }}
          style={{ transformOrigin: "120px 125px" }}
        >
          <path d="M120 125 L145 105" stroke="#d4af6a" strokeWidth="2" strokeLinecap="round" />
          <path d="M145 105 L150 98" stroke="#9d8ec7" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>

        {/* Floating pages */}
        {[0, 1, 2].map((i) => (
          <motion.rect
            key={i}
            x={100 + i * 12}
            y={90 - i * 8}
            width="14"
            height="18"
            rx="1"
            fill="#f5f0e8"
            opacity="0.7"
            animate={{ y: [90 - i * 8, 82 - i * 8, 90 - i * 8], rotate: [i * 5, i * 5 + 8, i * 5] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        {/* Ink particles */}
        {writing &&
          [0, 1, 2].map((i) => (
            <motion.circle
              key={`ink-${i}`}
              cx={130 + i * 3}
              cy={120}
              r="1.5"
              fill="#8b7ec8"
              animate={{ opacity: [0, 1, 0], y: [0, -15, -25] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
      </svg>
    </motion.div>
  );
}
