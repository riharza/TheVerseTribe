"use client";

import { motion } from "framer-motion";

export function OrbitRing() {
  return (
    <div
      className="absolute right-[-5%] lg:right-[5%] top-1/2 -translate-y-1/2 w-[min(380px,90vw)] h-[min(380px,90vw)] pointer-events-none hidden sm:block"
      aria-hidden
    >
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-60">
        <defs>
          <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5ec8e8" />
            <stop offset="55%" stopColor="#8b7ec8" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="76" fill="none" stroke="url(#orbitGrad)" strokeWidth="0.6" opacity="0.55" />
        <circle cx="100" cy="100" r="52" fill="none" stroke="url(#orbitGrad)" strokeWidth="0.4" opacity="0.35" strokeDasharray="4 6" />
      </svg>
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute top-[12%] left-1/2 -ml-1 w-2 h-2 rounded-full bg-accent-cyan shadow-neon-cyan" />
      </motion.div>
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute bottom-[18%] left-[22%] w-1.5 h-1.5 rounded-full bg-accent-fuchsia shadow-neon-fuchsia" />
      </motion.div>
    </div>
  );
}
