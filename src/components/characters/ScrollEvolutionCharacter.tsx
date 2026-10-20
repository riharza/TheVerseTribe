"use client";

import { useEffect, useState } from "react";
import { motion, useTransform, useMotionTemplate, type MotionValue } from "framer-motion";
import { Storyteller } from "./Storyteller";
import { Wanderer } from "./Wanderer";
import { Scribe } from "./Scribe";
import { Guardian } from "./Guardian";
import { CompanionCreature } from "./CompanionCreature";
import { LuminousFairy } from "./LuminousFairy";
import { useFreeRoam } from "@/components/animations/useFreeRoam";

interface ScrollEvolutionCharacterProps {
  progress: MotionValue<number>;
}

const PHASES = [
  { label: "The Storyteller", sub: "A tale awakens from the book" },
  { label: "The Wanderer", sub: "Discovering hidden stories" },
  { label: "The Scribe", sub: "Crafting new worlds" },
  { label: "The Guardian", sub: "Protecting the realm" },
];

export function ScrollEvolutionCharacter({ progress }: ScrollEvolutionCharacterProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [phaseLabel, setPhaseLabel] = useState(PHASES[0]);

  /* Independent free roam — not tied to scroll position */
  const mainRoam = useFreeRoam({ speed: 0.85, margin: 120, seed: 1 });
  const fairyRoam = useFreeRoam({ speed: 1.15, margin: 80, seed: 2.7 });

  const mainTransform = useMotionTemplate`translate(${mainRoam.x}px, ${mainRoam.y}px) rotate(${mainRoam.rotate}deg) scaleX(${mainRoam.facing})`;
  const fairyTransform = useMotionTemplate`translate(${fairyRoam.x}px, ${fairyRoam.y}px) rotate(${fairyRoam.rotate}deg) scaleX(${fairyRoam.facing})`;

  /* Scroll only changes character phase — not placement */
  const storytellerOpacity = useTransform(progress, [0, 0.2, 0.28], [1, 1, 0]);
  const wandererOpacity = useTransform(progress, [0.2, 0.28, 0.45, 0.53], [0, 1, 1, 0]);
  const scribeOpacity = useTransform(progress, [0.45, 0.53, 0.68, 0.76], [0, 1, 1, 0]);
  const guardianOpacity = useTransform(progress, [0.68, 0.76, 1], [0, 1, 1]);

  const characterBlur = useTransform(progress, [0, 0.22, 0.28, 0.47, 0.53, 0.72, 0.78], [0, 0, 5, 0, 5, 0, 5]);
  const characterFilter = useTransform(characterBlur, (b) => `blur(${b}px)`);
  const labelOpacity = useTransform(progress, [0, 0.06], [0, 1]);
  const groupOpacity = useTransform(progress, [0, 0.03, 0.97, 1], [0, 1, 1, 0.4]);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const unsub = progress.on("change", (v) => {
      setPhaseLabel(PHASES[Math.min(3, Math.floor(v * 4))]);
    });
    return () => unsub();
  }, [progress]);

  if (reducedMotion) return null;

  return (
    <>
      {/* Fairy — roams independently across the viewport */}
      <motion.div
        className="fixed top-0 left-0 z-[34] pointer-events-none hidden sm:block will-change-transform"
        style={{ transform: fairyTransform, opacity: groupOpacity }}
        aria-hidden="true"
      >
        <LuminousFairy size="md" scrollProgress={progress} />
      </motion.div>

      {/* Tribe character — separate roam path, evolves with scroll */}
      <motion.div
        className="fixed top-0 left-0 z-[35] pointer-events-none hidden md:block will-change-transform"
        style={{ transform: mainTransform, opacity: groupOpacity, filter: characterFilter }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
          style={{ opacity: labelOpacity, scaleX: mainRoam.facing }}
        >
          <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-champagne drop-shadow-lg">
            {phaseLabel.label}
          </p>
          <p className="text-xs font-serif italic text-ivory/90 mt-0.5 drop-shadow-md">{phaseLabel.sub}</p>
        </motion.div>

        <div className="relative w-[150px] h-[170px] md:w-[190px] md:h-[210px]">
          <motion.div className="absolute inset-0" style={{ opacity: storytellerOpacity }}>
            <Storyteller size="hero" intensity={1.3} />
            <div className="absolute -bottom-1 -right-5">
              <CompanionCreature />
            </div>
          </motion.div>

          <motion.div className="absolute inset-0 flex items-end justify-center" style={{ opacity: wandererOpacity }}>
            <motion.div animate={{ x: [0, 8, -4, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <Wanderer className="scale-110 origin-bottom" />
            </motion.div>
          </motion.div>

          <motion.div className="absolute inset-0 flex items-end justify-center" style={{ opacity: scribeOpacity }}>
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
              <Scribe writing className="scale-105 origin-bottom" />
            </motion.div>
          </motion.div>

          <motion.div className="absolute inset-0 flex items-end justify-center" style={{ opacity: guardianOpacity }}>
            <Guardian gateOpen />
          </motion.div>
        </div>

        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-7 rounded-full bg-champagne/25 blur-xl"
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.35, 1] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        />
      </motion.div>

      {/* Mobile: roaming fairy only */}
      <motion.div
        className="fixed top-0 left-0 z-[35] sm:hidden pointer-events-none will-change-transform"
        style={{ transform: fairyTransform, opacity: groupOpacity }}
      >
        <LuminousFairy size="sm" scrollProgress={progress} />
      </motion.div>
    </>
  );
}
