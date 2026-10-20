"use client";

import { motion } from "framer-motion";

export function CompanionCreature() {
  return (
    <motion.div
      className="relative w-16 h-16 md:w-20 md:h-20"
      animate={{ y: [0, -6, 0], rotate: [0, 3, 0, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <motion.ellipse
          cx="40" cy="55" rx="20" ry="8"
          fill="rgba(212,175,106,0.15)"
          animate={{ rx: [18, 22, 18] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <ellipse cx="40" cy="42" rx="18" ry="22" fill="#2d6a4f" />
        <ellipse cx="40" cy="38" rx="14" ry="16" fill="#40916c" />
        <circle cx="34" cy="36" r="3" fill="#0a1628" />
        <circle cx="46" cy="36" r="3" fill="#0a1628" />
        <circle cx="35" cy="35" r="1" fill="#d4af6a" />
        <circle cx="47" cy="35" r="1" fill="#d4af6a" />
        {/* Small wings */}
        <motion.path
          d="M25 40 Q15 30 18 45 Q22 42 25 40"
          fill="rgba(157,142,199,0.4)"
          animate={{ scaleX: [1, 0.85, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{ transformOrigin: "25px 40px" }}
        />
        <motion.path
          d="M55 40 Q65 30 62 45 Q58 42 55 40"
          fill="rgba(157,142,199,0.4)"
          animate={{ scaleX: [1, 0.85, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
          style={{ transformOrigin: "55px 40px" }}
        />
        {/* Tail */}
        <motion.path
          d="M40 58 Q50 70 45 75 Q38 68 40 58"
          fill="#1b4332"
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: "40px 58px" }}
        />
      </svg>
    </motion.div>
  );
}
