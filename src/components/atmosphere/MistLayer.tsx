"use client";

import { motion } from "framer-motion";

interface MistLayerProps {
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export function MistLayer({ className, intensity = "medium" }: MistLayerProps) {
  const opacity = { low: 0.1, medium: 0.18, high: 0.28 }[intensity];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className ?? ""}`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-[70%] h-[60%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(16, 185, 129, 0.12) 0%, transparent 70%)",
          opacity,
        }}
        animate={{ x: [0, 50, 0], y: [0, -25, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/3 -right-1/4 w-[65%] h-[55%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(4, 120, 87, 0.14) 0%, transparent 70%)",
          opacity: opacity * 0.9,
        }}
        animate={{ x: [0, -40, 0], y: [0, 20, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="absolute top-1/4 left-1/3 w-[50%] h-[40%] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(52, 211, 153, 0.05) 0%, transparent 60%)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
