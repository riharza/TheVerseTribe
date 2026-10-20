"use client";

import { useEffect } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

interface FreeRoamOptions {
  /** Movement speed multiplier */
  speed?: number;
  /** Edge padding in px */
  margin?: number;
  /** Phase offset so multiple roamers diverge */
  seed?: number;
}

interface FreeRoamResult {
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
  facing: MotionValue<number>;
  drift: MotionValue<number>;
}

export function useFreeRoam(options: FreeRoamOptions = {}): FreeRoamResult {
  const { speed = 1, margin = 100, seed = 0 } = options;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  const facing = useMotionValue(1);
  const drift = useMotionValue(0);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      x.set(window.innerWidth * 0.75);
      y.set(window.innerHeight * 0.55);
      return;
    }

    let t = seed * 17.3;
    let prevX = window.innerWidth * 0.5;
    let frame = 0;

    const tick = () => {
      t += 0.011 * speed;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const m = Math.min(margin, w * 0.08, h * 0.08);

      const nx =
        m +
        (w - 2 * m) *
          (0.5 +
            0.44 * Math.sin(t * 0.55 + seed) * Math.cos(t * 0.19 + seed * 2) +
            0.12 * Math.sin(t * 1.35 + seed * 0.5));

      const ny =
        m +
        (h - 2 * m) *
          (0.48 +
            0.4 * Math.cos(t * 0.42 + seed * 1.3) * Math.sin(t * 0.27 + seed) +
            0.1 * Math.cos(t * 1.1 + seed));

      x.set(nx);
      y.set(ny);
      rotate.set(Math.sin(t * 1.15 + seed) * 10 + Math.cos(t * 0.8) * 4);
      drift.set(Math.sin(t * 2.1) * 0.5 + 0.5);

      if (nx > prevX + 0.8) facing.set(1);
      else if (nx < prevX - 0.8) facing.set(-1);
      prevX = nx;

      frame = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(frame);
  }, [speed, margin, seed, x, y, rotate, facing, drift]);

  return { x, y, rotate, facing, drift };
}
