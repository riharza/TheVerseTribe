"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useVerseKeeperSafe, KeeperMood } from "./VerseKeeperContext";

export type FairyVariant = "lumen" | "bloom" | "pollen";

const FAIRY_PALETTES: Record<
  FairyVariant,
  { primary: string; secondary: string; glow: string; wing: string; core: string }
> = {
  lumen: {
    primary: "#34d399",
    secondary: "#6ee7b7",
    glow: "rgba(52, 211, 153, 0.45)",
    wing: "rgba(16, 185, 129, 0.25)",
    core: "#a7f3d0",
  },
  bloom: {
    primary: "#5eead4",
    secondary: "#99f6e4",
    glow: "rgba(94, 234, 212, 0.4)",
    wing: "rgba(45, 212, 191, 0.22)",
    core: "#ccfbf1",
  },
  pollen: {
    primary: "#fde68a",
    secondary: "#fef3c7",
    glow: "rgba(253, 230, 138, 0.35)",
    wing: "rgba(251, 191, 36, 0.18)",
    core: "#fffbeb",
  },
};

const MOOD_VARIANT: Record<KeeperMood, FairyVariant> = {
  welcome: "lumen",
  explore: "pollen",
  read: "bloom",
  write: "lumen",
  guard: "pollen",
  reflect: "bloom",
  listen: "bloom",
  search: "pollen",
  invite: "lumen",
  idle: "lumen",
};

const MOOD_POSES: Record<KeeperMood, { tilt: number; wingSpread: number; armRaise: number }> = {
  welcome: { tilt: -5, wingSpread: 1, armRaise: -10 },
  explore: { tilt: 8, wingSpread: 1.12, armRaise: 15 },
  read: { tilt: -12, wingSpread: 0.88, armRaise: -20 },
  write: { tilt: 10, wingSpread: 0.92, armRaise: 25 },
  guard: { tilt: 0, wingSpread: 1.06, armRaise: 0 },
  reflect: { tilt: -8, wingSpread: 0.96, armRaise: -15 },
  listen: { tilt: 6, wingSpread: 1, armRaise: 10 },
  search: { tilt: 15, wingSpread: 1.18, armRaise: 30 },
  invite: { tilt: -3, wingSpread: 1.1, armRaise: 5 },
  idle: { tilt: 0, wingSpread: 1, armRaise: 0 },
};

interface FairyCharacterProps {
  variant?: FairyVariant;
  size?: "hero" | "ambient" | "float" | "companion" | "tiny";
  className?: string;
  followCursor?: boolean;
  /** Used by FairyField — skip global visibility gate */
  fieldMode?: boolean;
  parallaxDepth?: number;
}

export function FairyCharacter({
  variant: variantProp,
  size = "hero",
  className,
  followCursor = true,
  fieldMode = false,
  parallaxDepth = 1,
}: FairyCharacterProps) {
  const ctx = useVerseKeeperSafe();

  if (!fieldMode && (!ctx || !ctx.isVisible)) return null;

  const mood = ctx?.mood ?? "idle";
  const mouseX = ctx?.mouseX ?? 0.5;
  const mouseY = ctx?.mouseY ?? 0.5;
  const scrollProgress = ctx?.scrollProgress ?? 0;
  const isHovered = ctx?.isHovered ?? false;

  const variant = variantProp ?? MOOD_VARIANT[mood];
  const palette = FAIRY_PALETTES[variant];
  const pose = MOOD_POSES[mood];

  const depth = parallaxDepth;
  const lookX = followCursor ? (mouseX - 0.5) * 16 * depth : 0;
  const lookY = followCursor ? (mouseY - 0.5) * 12 * depth : 0;
  const parallaxX = followCursor ? (mouseX - 0.5) * -30 * depth : 0;
  const parallaxY =
    scrollProgress * -50 * depth + (followCursor ? (mouseY - 0.5) * -16 * depth : 0);

  const dimensions = {
    hero: 300,
    ambient: 200,
    float: 140,
    companion: 100,
    tiny: 72,
  }[size];

  const opacity = size === "tiny" ? 0.55 : size === "float" ? 0.7 : size === "ambient" ? 0.8 : 1;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={fieldMode ? variant : `${variant}-${mood}`}
        className={`relative select-none pointer-events-none ${className ?? ""}`}
        style={{ width: dimensions, height: dimensions * 1.2, opacity }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ x: parallaxX, y: parallaxY }}
          transition={{ type: "spring", stiffness: 30, damping: 16 }}
        >
          {/* Core glow */}
          <motion.div
            className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[90%] h-[55%] rounded-full blur-3xl"
            style={{ background: `radial-gradient(ellipse, ${palette.glow} 0%, transparent 68%)` }}
            animate={{
              scale: isHovered ? [1, 1.25, 1] : [1, 1.1, 1],
              opacity: [0.45, 0.85, 0.45],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            animate={{
              y: [0, -14, 0],
              rotate: [pose.tilt, pose.tilt + 3, pose.tilt],
            }}
            transition={{ duration: 4.5 + depth, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              viewBox="0 0 220 250"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_0_24px_rgba(52,211,153,0.25)]"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id={`wingGrad-${variant}`} cx="50%" cy="30%">
                  <stop offset="0%" stopColor={palette.secondary} stopOpacity="0.5" />
                  <stop offset="100%" stopColor={palette.wing} stopOpacity="0.1" />
                </radialGradient>
                <radialGradient id={`coreGrad-${variant}`} cx="40%" cy="35%">
                  <stop offset="0%" stopColor={palette.core} />
                  <stop offset="100%" stopColor={palette.primary} />
                </radialGradient>
                <filter id={`glow-${variant}`}>
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Dust trail */}
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.circle
                  key={i}
                  cx={110 - i * 6 + lookX * 0.15}
                  cy={195 + i * 5}
                  r={2.2 - i * 0.25}
                  fill={palette.primary}
                  filter={`url(#glow-${variant})`}
                  animate={{
                    opacity: [0, 0.9, 0],
                    cy: [195 + i * 5, 210 + i * 7, 195 + i * 5],
                    r: [1.5, 2.5, 1.5],
                  }}
                  transition={{ duration: 1.8 + i * 0.25, repeat: Infinity, delay: i * 0.35 }}
                />
              ))}

              {/* Upper wings (behind) */}
              <motion.g
                style={{ transformOrigin: "110px 120px" }}
                animate={{ scaleX: [pose.wingSpread, pose.wingSpread * 0.8, pose.wingSpread] }}
                transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
              >
                <path
                  d="M110 115 C60 90 30 100 25 135 C35 150 60 140 85 125 C95 118 110 115 110 115"
                  fill={`url(#wingGrad-${variant})`}
                  stroke={palette.primary}
                  strokeWidth="0.6"
                  opacity="0.65"
                />
                <path
                  d="M110 115 C160 90 190 100 195 135 C185 150 160 140 135 125 C125 118 110 115 110 115"
                  fill={`url(#wingGrad-${variant})`}
                  stroke={palette.primary}
                  strokeWidth="0.6"
                  opacity="0.65"
                />
              </motion.g>

              {/* Lower wings (behind) */}
              <motion.g
                style={{ transformOrigin: "110px 125px" }}
                animate={{ scaleX: [1, 0.85, 1], rotate: [-3, 3, -3] }}
                transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
              >
                <path
                  d="M110 125 C55 130 35 155 45 175 C65 168 85 150 100 135"
                  fill={palette.wing}
                  stroke={palette.secondary}
                  strokeWidth="0.5"
                  opacity="0.5"
                />
                <path
                  d="M110 125 C165 130 185 155 175 175 C155 168 135 150 120 135"
                  fill={palette.wing}
                  stroke={palette.secondary}
                  strokeWidth="0.5"
                  opacity="0.5"
                />
              </motion.g>

              {/* Body radiance */}
              <ellipse cx="110" cy="145" rx="14" ry="22" fill={palette.primary} opacity="0.2" />

              {/* Torso */}
              <path
                d="M100 125 Q110 112 120 125 L122 158 Q110 165 98 158 Z"
                fill={`url(#coreGrad-${variant})`}
                opacity="0.85"
              />

              {/* Head & face */}
              <motion.g animate={{ x: lookX * 0.5, y: lookY * 0.4 }}>
                <circle cx="110" cy="108" r="16" fill={palette.secondary} opacity="0.92" />
                {/* Hair wisps */}
                <path
                  d="M96 100 Q88 115 82 138 Q92 128 98 115 Q102 106 96 100"
                  fill={palette.primary}
                  opacity="0.45"
                />
                <path
                  d="M124 100 Q132 112 138 132 Q128 125 122 114 Q118 106 124 100"
                  fill={palette.primary}
                  opacity="0.45"
                />
                <path
                  d="M108 88 Q110 78 114 88 Q110 82 108 88"
                  fill={palette.primary}
                  opacity="0.6"
                />
                {/* Eyes */}
                <ellipse cx="104" cy="107" rx="2.2" ry="2.8" fill="#021a14" />
                <ellipse cx="116" cy="107" rx="2.2" ry="2.8" fill="#021a14" />
                <circle cx="104.8" cy="106" r="0.9" fill={palette.core} filter={`url(#glow-${variant})`} />
                <circle cx="116.8" cy="106" r="0.9" fill={palette.core} filter={`url(#glow-${variant})`} />
                {/* Smile hint */}
                <path d="M106 114 Q110 116 114 114" stroke={palette.primary} strokeWidth="0.8" fill="none" opacity="0.5" />
              </motion.g>

              {/* Arms */}
              <motion.g
                animate={{ rotate: pose.armRaise + lookX * 0.4 }}
                style={{ transformOrigin: "118px 128px" }}
              >
                <path
                  d="M118 128 Q138 122 148 108"
                  stroke={palette.secondary}
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  fill="none"
                />
                <motion.circle
                  cx="150"
                  cy="106"
                  r="5"
                  fill={palette.primary}
                  filter={`url(#glow-${variant})`}
                  animate={{ r: [4, 6, 4], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <motion.circle
                  cx="150"
                  cy="106"
                  r="9"
                  fill="none"
                  stroke={palette.primary}
                  strokeWidth="0.5"
                  animate={{ r: [8, 13, 8], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </motion.g>

              <path
                d="M102 130 Q82 128 72 115"
                stroke={palette.secondary}
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.85"
              />

              {/* Front wings */}
              <motion.g
                style={{ transformOrigin: "110px 118px" }}
                animate={{ scaleX: [1, 0.88, 1], rotate: [-4, 4, -4] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0.08 }}
              >
                <path
                  d="M110 118 C65 105 42 128 48 152 C62 158 82 142 98 128"
                  fill={`url(#wingGrad-${variant})`}
                  stroke={palette.primary}
                  strokeWidth="0.8"
                  opacity="0.9"
                />
                <path
                  d="M110 118 C155 105 178 128 172 152 C158 158 138 142 122 128"
                  fill={`url(#wingGrad-${variant})`}
                  stroke={palette.primary}
                  strokeWidth="0.8"
                  opacity="0.9"
                />
                <path d="M110 122 C85 128 62 140 52 150" stroke={palette.primary} strokeWidth="0.4" opacity="0.35" fill="none" />
                <path d="M110 122 C135 128 158 140 168 150" stroke={palette.primary} strokeWidth="0.4" opacity="0.35" fill="none" />
              </motion.g>

              {/* Legs */}
              <path d="M104 158 Q98 172 94 185" stroke={palette.secondary} strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.65" />
              <path d="M116 158 Q122 172 126 185" stroke={palette.secondary} strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.65" />
            </svg>
          </motion.div>
        </motion.div>

        {size === "hero" && !fieldMode && (
          <motion.p
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-sans uppercase tracking-[0.3em] whitespace-nowrap text-violet/70"
            animate={{ opacity: [0.35, 0.75, 0.35] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {variant === "lumen" && "Guide of the Verse"}
            {variant === "bloom" && "Muse of Stories"}
            {variant === "pollen" && "Scout of Wonder"}
          </motion.p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
