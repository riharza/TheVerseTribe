"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { MagicalPathParticles } from "./MagicalPathParticles";

interface FantasyRealmBackgroundProps {
  scrollProgress?: MotionValue<number>;
  variant?: "hero" | "full" | "ambient";
  className?: string;
}

export function FantasyRealmBackground({
  scrollProgress,
  variant = "hero",
  className,
}: FantasyRealmBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 20 });
  const [reducedMotion, setReducedMotion] = useState(false);

  const fallbackProgress = useMotionValue(0);
  const progress = scrollProgress ?? fallbackProgress;

  /* Camera travels from the open book up toward the castle */
  const bgY = useTransform(progress, [0, 0.35, 0.7, 1], ["8%", "-5%", "-14%", "-22%"]);
  const bgScale = useTransform(progress, [0, 0.5, 1], [1.12, 1.22, 1.32]);
  const bgRotate = useTransform(progress, [0, 1], [0, 0.8]);

  /* Layered parallax depths */
  const skyLayerY = useTransform(progress, [0, 1], ["0%", "-8%"]);
  const castleLayerY = useTransform(progress, [0, 1], ["0%", "-18%"]);
  const treeLayerX = useTransform(smoothX, [0, 1], [18, -18]);
  const treeLayerY = useTransform(progress, [0, 1], ["0%", "-28%"]);
  const foregroundY = useTransform(progress, [0, 1], ["0%", "-35%"]);

  const parallaxX = useTransform(smoothX, [0, 1], [16, -16]);
  const parallaxY = useTransform(smoothY, [0, 1], [10, -10]);
  const skyLayerX = useTransform(smoothX, [0, 1], [4, -4]);

  const moonGlow = useTransform(progress, [0, 0.5, 1], [0.55, 0.75, 0.95]);
  const bookGlow = useTransform(progress, [0, 0.3, 0.6, 1], [1, 0.85, 0.5, 0.25]);
  const mistOpacity = useTransform(progress, [0, 0.5, 1], [0.15, 0.35, 0.55]);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  const isFull = variant === "full";
  const isHero = variant === "hero" || isFull;
  const imageSrc = "/images/verse-realm-bg.png";

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden bg-[#0a1628] ${className ?? ""}`}
      aria-hidden="true"
    >
      {/* Layer 1 — Sky / moon (slowest) */}
      <motion.div
        className="absolute inset-0 gpu"
        style={{
          y: reducedMotion ? 0 : skyLayerY,
          x: reducedMotion ? 0 : skyLayerX,
          scale: 1.05,
        }}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          priority={isHero}
          className="object-cover object-[center_25%] opacity-90"
          sizes="100vw"
          quality={95}
        />
      </motion.div>

      {/* Layer 2 — Main realm (scroll + mouse parallax) */}
      <motion.div
        className="absolute inset-0 gpu"
        style={{
          y: reducedMotion ? 0 : bgY,
          scale: reducedMotion ? 1.12 : bgScale,
          x: reducedMotion ? 0 : parallaxX,
          rotate: reducedMotion ? 0 : bgRotate,
        }}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          priority={isHero}
          className="object-cover object-[center_55%]"
          sizes="100vw"
          quality={95}
        />
      </motion.div>

      {/* Layer 3 — Castle emphasis (mid parallax) */}
      <motion.div
        className="absolute inset-0 gpu mix-blend-lighten opacity-30"
        style={{ y: reducedMotion ? 0 : castleLayerY, x: parallaxX }}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />
      </motion.div>

      {/* Layer 4 — Foreground trees (fastest parallax) */}
      {!reducedMotion && (
        <motion.div
          className="absolute inset-0 gpu pointer-events-none"
          style={{ x: treeLayerX, y: treeLayerY }}
        >
          <div className="absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-lavender-deep/25 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-[22%] bg-gradient-to-l from-lavender-deep/25 to-transparent" />
        </motion.div>
      )}

      {/* Moon pulse — aligned with reference */}
      <motion.div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[35%] max-w-md aspect-square rounded-full pointer-events-none"
        style={{
          opacity: moonGlow,
          background: "radial-gradient(circle, rgba(255,243,212,0.45) 0%, rgba(232,200,130,0.15) 40%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={reducedMotion ? {} : { scale: [1, 1.12, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Book glow at bottom */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[35%] pointer-events-none"
        style={{
          opacity: bookGlow,
          background: "radial-gradient(ellipse at center bottom, rgba(232,200,130,0.5) 0%, rgba(212,175,106,0.2) 35%, transparent 70%)",
        }}
        animate={reducedMotion ? {} : { opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />

      {/* Mushroom glow accents — bottom corners */}
      {!reducedMotion && (
        <>
          <motion.div
            className="absolute bottom-[8%] left-[8%] w-16 h-16 rounded-full bg-magic-cyan/25 blur-2xl"
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-[10%] right-[10%] w-14 h-14 rounded-full bg-lavender/30 blur-2xl"
            animate={{ opacity: [0.25, 0.6, 0.25], scale: [1, 1.15, 1] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </>
      )}

      {/* Golden path particles */}
      {!reducedMotion && isHero && (
        <motion.div style={{ y: reducedMotion ? 0 : foregroundY, x: parallaxY }}>
          <MagicalPathParticles scrollProgress={isFull ? progress : undefined} />
        </motion.div>
      )}

      {/* Tree lantern fireflies */}
      {!reducedMotion && isHero && (
        <motion.div className="absolute inset-0" style={{ x: treeLayerX }}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <motion.div
              key={`firefly-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-champagne-glow"
              style={{
                left: i < 4 ? `${4 + i * 5}%` : `${88 - (i - 4) * 5}%`,
                top: `${25 + (i % 4) * 12}%`,
                boxShadow: "0 0 8px rgba(232,200,130,0.9)",
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                y: [0, -12 - i * 2, 0],
                x: [0, i % 2 === 0 ? 8 : -8, 0],
              }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.25 }}
            />
          ))}
        </motion.div>
      )}

      {/* Subtle color grade — preserve reference palette */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/25 via-transparent to-navy-deep/50 pointer-events-none" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-navy-deep/20 to-transparent pointer-events-none"
        style={{ opacity: mistOpacity }}
      />

      {/* Center readability vignette for hero text */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgba(6,14,26,0.35)_0%,transparent_65%)] pointer-events-none" />
    </div>
  );
}
