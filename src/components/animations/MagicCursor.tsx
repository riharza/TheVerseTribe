"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagicCursor() {
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    setReducedMotion(reduced || touch);
    if (reduced || touch) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [role='button'], input, textarea, select"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", over);
    document.body.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", over);
      document.body.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (reducedMotion) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 1.8 : 1 }}
        transition={{ scale: { duration: 0.2 } }}
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212,175,106,0.9) 0%, rgba(94,200,232,0.4) 60%, transparent 100%)",
            boxShadow: "0 0 12px rgba(212,175,106,0.5), 0 0 24px rgba(94,200,232,0.3)",
          }}
        />
      </motion.div>
    </>
  );
}
