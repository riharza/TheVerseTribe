"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface Firefly {
  id: number;
  x: number;
  y: number;
  color: string;
  delay: number;
  duration: number;
}

function generateFireflies(count: number): Firefly[] {
  const colors = ["#34d399", "#6ee7b7", "#10b981", "#5eead4", "#fde68a"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: colors[i % colors.length],
    delay: Math.random() * 6,
    duration: Math.random() * 4 + 3,
  }));
}

interface FirefliesProps {
  density?: number;
  className?: string;
}

export function Fireflies({ density = 40, className }: FirefliesProps) {
  const fireflies = useMemo(() => generateFireflies(density), [density]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className ?? ""}`}
      aria-hidden="true"
    >
      {fireflies.map((fly) => (
        <motion.div
          key={fly.id}
          className="absolute rounded-full"
          style={{
            left: `${fly.x}%`,
            top: `${fly.y}%`,
            width: 3,
            height: 3,
            background: fly.color,
            boxShadow: `0 0 8px ${fly.color}, 0 0 16px ${fly.color}50`,
          }}
          animate={{
            opacity: [0.1, 1, 0.1],
            x: [0, Math.random() * 30 - 15, 0],
            y: [0, Math.random() * -25, 0],
          }}
          transition={{
            duration: fly.duration,
            repeat: Infinity,
            delay: fly.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
