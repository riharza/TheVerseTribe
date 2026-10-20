"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";

interface MagicalPathParticlesProps {
  scrollProgress?: MotionValue<number>;
  count?: number;
}

/** Golden sparks rising along the storybook path — matches reference image */
export function MagicalPathParticles({ scrollProgress, count = 28 }: MagicalPathParticlesProps) {
  const wrapperOpacity = scrollProgress
    ? useTransform(scrollProgress, [0, 0.5, 1], [0.7, 1, 1.2])
    : undefined;

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={wrapperOpacity ? { opacity: wrapperOpacity } : undefined}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => {
        const baseX = 42 + (i % 7) * 2.5 + Math.sin(i * 1.3) * 8;
        const delay = i * 0.18;
        const duration = 4 + (i % 5) * 0.6;
        const size = i % 4 === 0 ? 4 : i % 3 === 0 ? 3 : 2;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${baseX + (i % 2 === 0 ? -3 : 3)}%`,
              bottom: `${8 + (i % 6) * 2}%`,
              background: i % 5 === 0 ? "#5ec8e8" : i % 3 === 0 ? "#fff3d4" : "#e8c882",
              boxShadow: `0 0 ${size * 3}px rgba(232, 200, 130, 0.8)`,
            }}
            animate={{
              y: [0, -280 - (i % 4) * 40, -560 - (i % 3) * 60],
              x: [0, i % 2 === 0 ? 12 : -12, i % 2 === 0 ? -8 : 8],
              opacity: [0, 1, 0.8, 0],
              scale: [0.5, 1.2, 0.8, 0.3],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeOut",
            }}
          />
        );
      })}

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-[5%] w-24 md:w-32 h-[70%] rounded-full"
        style={{
          background:
            "linear-gradient(to top, rgba(232,200,130,0.35) 0%, rgba(212,175,106,0.15) 40%, transparent 100%)",
          filter: "blur(20px)",
        }}
        animate={{ opacity: [0.25, 0.55, 0.25], scaleX: [0.9, 1.1, 0.9] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  );
}
