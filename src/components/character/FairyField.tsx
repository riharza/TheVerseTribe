"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FairyCharacter, FairyVariant } from "./FairyCharacter";
import { useVerseKeeperSafe } from "./VerseKeeperContext";

interface FieldFairy {
  variant: FairyVariant;
  x: string;
  y: string;
  size: "ambient" | "float" | "tiny";
  depth: number;
  delay: number;
  duration: number;
}

const FIELD_FAIRIES: FieldFairy[] = [
  { variant: "lumen", x: "6%", y: "12%", size: "ambient", depth: 0.35, delay: 0, duration: 7 },
  { variant: "bloom", x: "90%", y: "18%", size: "float", depth: 0.55, delay: 1.2, duration: 8 },
  { variant: "pollen", x: "94%", y: "58%", size: "tiny", depth: 0.25, delay: 2, duration: 6 },
  { variant: "lumen", x: "3%", y: "48%", size: "float", depth: 0.45, delay: 0.6, duration: 9 },
  { variant: "bloom", x: "78%", y: "78%", size: "ambient", depth: 0.6, delay: 1.8, duration: 7.5 },
  { variant: "pollen", x: "22%", y: "82%", size: "tiny", depth: 0.2, delay: 2.5, duration: 5.5 },
  { variant: "lumen", x: "48%", y: "6%", size: "tiny", depth: 0.15, delay: 3, duration: 6 },
  { variant: "bloom", x: "62%", y: "42%", size: "float", depth: 0.3, delay: 1, duration: 8.5 },
  { variant: "pollen", x: "14%", y: "28%", size: "tiny", depth: 0.18, delay: 2.2, duration: 7 },
  { variant: "lumen", x: "85%", y: "38%", size: "tiny", depth: 0.22, delay: 0.8, duration: 6.5 },
];

const HIDDEN_ROUTES = ["/chapter/", "/login", "/register"];

export function FairyField() {
  const pathname = usePathname();
  const ctx = useVerseKeeperSafe();

  const isHidden = HIDDEN_ROUTES.some((r) => pathname.includes(r));

  if (isHidden || !ctx?.isVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[2] overflow-hidden"
      aria-hidden="true"
    >
      {FIELD_FAIRIES.map((fairy, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: fairy.x, top: fairy.y }}
          animate={{
            y: [0, -20 * fairy.depth, 0],
            x: [0, 12 * (i % 2 === 0 ? 1 : -1) * fairy.depth, 0],
          }}
          transition={{
            duration: fairy.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: fairy.delay,
          }}
        >
          <FairyCharacter
            variant={fairy.variant}
            size={fairy.size}
            fieldMode
            followCursor={fairy.size !== "tiny"}
            parallaxDepth={fairy.depth}
          />
        </motion.div>
      ))}
    </div>
  );
}
