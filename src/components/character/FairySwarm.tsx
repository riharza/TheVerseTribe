"use client";

import { motion } from "framer-motion";
import { FairyCharacter, FairyVariant } from "./FairyCharacter";

const SWARM: {
  variant: FairyVariant;
  className: string;
  delay: number;
  duration: number;
}[] = [
  {
    variant: "lumen",
    className: "relative z-10",
    delay: 0,
    duration: 6,
  },
  {
    variant: "bloom",
    className: "absolute -top-8 -right-4 lg:-right-12 z-0 scale-[0.55] opacity-80",
    delay: 1,
    duration: 7,
  },
  {
    variant: "pollen",
    className: "absolute -bottom-4 -left-6 lg:-left-16 z-0 scale-[0.45] opacity-70",
    delay: 2,
    duration: 8,
  },
];

export function FairySwarm() {
  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto h-[380px] md:h-[420px]">
      {/* Orbital ring */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full border border-violet/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[220px] h-[220px] rounded-full border border-bloom/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {SWARM.map(({ variant, className, delay, duration }) => (
        <motion.div
          key={variant}
          className={className}
          animate={{
            y: [0, -14, 0],
            x: [0, variant === "bloom" ? 8 : variant === "pollen" ? -6 : 0, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        >
          <FairyCharacter variant={variant} size="hero" followCursor={variant === "lumen"} />
        </motion.div>
      ))}

      {/* Floating motes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: i % 3 === 0 ? "#5eead4" : i % 3 === 1 ? "#f0abfc" : "#fde68a",
            left: `${20 + (i * 7) % 60}%`,
            top: `${15 + (i * 11) % 70}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.2, 0.5],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}
