"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";

interface LuminousFairyProps {
  size?: "sm" | "md" | "lg";
  /** Scroll can modulate glow/wing speed — never pins position */
  scrollProgress?: MotionValue<number>;
  className?: string;
}

const sizes = { sm: 90, md: 130, lg: 170 };

/** Fully animated SVG fairy — wings, glow, particles. No raster image. */
export function LuminousFairy({ size = "md", scrollProgress, className }: LuminousFairyProps) {
  const dim = sizes[size];

  const glowIntensity = scrollProgress
    ? useTransform(scrollProgress, [0, 0.5, 1], [0.7, 1, 1.2])
    : undefined;

  return (
    <motion.div
      className={`relative pointer-events-none select-none ${className ?? ""}`}
      style={{ width: dim, height: dim * 1.35 }}
      animate={{ y: [0, -10, -4, -14, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      {/* Aura */}
      <motion.div
        className="absolute inset-[-30%] rounded-full blur-2xl"
        style={{
          opacity: glowIntensity ?? 0.75,
          background:
            "radial-gradient(circle, rgba(184,169,212,0.45) 0%, rgba(94,200,232,0.2) 45%, transparent 70%)",
        }}
        animate={{ scale: [0.92, 1.08, 0.92] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />

      <svg viewBox="0 0 200 260" className="w-full h-full drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]">
        <defs>
          <linearGradient id="wingGradL" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd4b0" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#b8a9d4" stopOpacity="0.7" />
            <stop offset="65%" stopColor="#74c69d" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#5ec8e8" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="wingGradR" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f4c89a" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#9d8ec7" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#5ec8e8" stopOpacity="0.55" />
          </linearGradient>
          <radialGradient id="dressGlow" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#e8e0f0" stopOpacity="0.5" />
          </radialGradient>
        </defs>

        {/* Back wings */}
        <motion.g
          style={{ transformOrigin: "100px 115px" }}
          animate={{ rotate: [-18, -8, -18], scaleY: [0.95, 1.05, 0.95] }}
          transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M100 115 C60 90 25 100 20 130 C18 150 35 165 55 155 C70 148 85 130 100 115Z"
            fill="url(#wingGradL)"
            opacity="0.55"
          />
          <path
            d="M100 115 C140 90 175 100 180 130 C182 150 165 165 145 155 C130 148 115 130 100 115Z"
            fill="url(#wingGradR)"
            opacity="0.55"
          />
        </motion.g>

        {/* Dress / body */}
        <motion.path
          d="M100 125 C88 140 82 175 85 210 C88 228 95 235 100 238 C105 235 112 228 115 210 C118 175 112 140 100 125Z"
          fill="url(#dressGlow)"
          animate={{ d: [
            "M100 125 C88 140 82 175 85 210 C88 228 95 235 100 238 C105 235 112 228 115 210 C118 175 112 140 100 125Z",
            "M100 125 C86 142 80 178 84 212 C87 230 94 236 100 238 C106 236 113 230 116 212 C120 178 114 142 100 125Z",
            "M100 125 C88 140 82 175 85 210 C88 228 95 235 100 238 C105 235 112 228 115 210 C118 175 112 140 100 125Z",
          ]}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Arms */}
        <motion.path
          d="M92 135 Q78 150 75 168 Q80 172 88 160"
          fill="none"
          stroke="#f5f0e8"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ d: [
            "M92 135 Q78 150 75 168 Q80 172 88 160",
            "M92 135 Q76 148 72 165 Q78 170 88 158",
            "M92 135 Q78 150 75 168 Q80 172 88 160",
          ]}}
          transition={{ duration: 3.5, repeat: Infinity }}
        />
        <motion.path
          d="M108 135 Q122 150 125 168 Q120 172 112 160"
          fill="none"
          stroke="#f5f0e8"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ d: [
            "M108 135 Q122 150 125 168 Q120 172 112 160",
            "M108 135 Q124 148 128 165 Q122 170 112 158",
            "M108 135 Q122 150 125 168 Q120 172 112 160",
          ]}}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.15 }}
        />

        {/* Head */}
        <circle cx="100" cy="108" r="14" fill="#f4c89a" />
        <path d="M88 102 Q100 88 112 102" fill="#e8e0f0" opacity="0.9" />
        {/* Ears */}
        <path d="M87 104 L82 96 L88 100 Z" fill="#f4c89a" />
        <path d="M113 104 L118 96 L112 100 Z" fill="#f4c89a" />
        <motion.path
          d="M94 106 Q100 112 106 106"
          fill="none"
          stroke="#c9c0b4"
          strokeWidth="1"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Front wings — faster flap */}
        <motion.g
          animate={{ rotate: [14, 30, 14] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "100px 112px" }}
        >
          <path
            d="M100 112 C55 85 15 95 12 128 C10 152 30 170 58 158 C78 148 90 128 100 112Z"
            fill="url(#wingGradL)"
            opacity="0.82"
          />
          <path
            d="M58 120 L52 108 M70 135 L64 122 M45 140 L38 128"
            stroke="#fff"
            strokeWidth="0.6"
            opacity="0.5"
          />
        </motion.g>
        <motion.g
          animate={{ rotate: [-14, -30, -14] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut", delay: 0.06 }}
          style={{ transformOrigin: "100px 112px" }}
        >
          <path
            d="M100 112 C145 85 185 95 188 128 C190 152 170 170 142 158 C122 148 110 128 100 112Z"
            fill="url(#wingGradR)"
            opacity="0.82"
          />
          <path
            d="M142 120 L148 108 M130 135 L136 122 M155 140 L162 128"
            stroke="#fff"
            strokeWidth="0.6"
            opacity="0.5"
          />
        </motion.g>

        {/* Wing star glints */}
        {[0, 1, 2, 3].map((i) => (
          <motion.g key={i} animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}>
            <path
              d={`M${[42, 158, 38, 162][i]} ${[100, 98, 130, 128][i]} l3 -3 l3 3 l-3 3 z`}
              fill="#fff"
            />
          </motion.g>
        ))}
      </svg>

      {/* Pixie dust */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white"
          style={{
            left: `${30 + (i % 4) * 12}%`,
            top: `${20 + Math.floor(i / 4) * 40}%`,
            boxShadow: "0 0 6px rgba(255,255,255,0.9)",
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, -30 - i * 4, -60],
            x: [0, (i % 2 === 0 ? 10 : -10), 0],
            scale: [0, 1.5, 0],
          }}
          transition={{ duration: 2 + i * 0.2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </motion.div>
  );
}
