"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

type MotionState = {
  opacity: number;
  scale?: number;
  y?: number;
  x?: number;
  filter?: string;
};

function getMotionStates(pathname: string): { initial: MotionState; animate: MotionState; exit: MotionState } {
  if (pathname === "/") {
    return {
      initial: { opacity: 0, scale: 1.02 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.98 },
    };
  }
  if (pathname.startsWith("/discover") || pathname.startsWith("/explore")) {
    return {
      initial: { opacity: 0, y: 40, filter: "blur(4px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      exit: { opacity: 0, y: -20 },
    };
  }
  if (pathname.startsWith("/write")) {
    return {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    };
  }
  if (pathname.startsWith("/community") || pathname.startsWith("/forum")) {
    return {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.02 },
    };
  }
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
}

export function CinematicTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isReader = pathname.includes("/chapter/");
  const { initial, animate, exit } = getMotionStates(pathname);

  if (isReader) return <>{children}</>;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
