"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildFeatureCards } from "@/components/carousel/carousel-cards";
import { FeatureFlashcard } from "@/components/carousel/FeatureFlashcard";
import { HomeSiteIntro } from "@/components/carousel/HomeSiteIntro";
import { cn } from "@/lib/utils";

const cards = buildFeatureCards();
const slideEase = [0.22, 1, 0.36, 1] as const;

export function HorizontalFeatureCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((delta: number) => {
    setDirection(delta >= 0 ? 1 : -1);
    setIndex((i) => (i + delta + cards.length * 8) % cards.length);
  }, []);

  const jumpTo = useCallback(
    (next: number) => {
      setDirection(next >= index ? 1 : -1);
      setIndex(next);
    },
    [index]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const card = cards[index];

  return (
    <div className="horizontal-carousel-shell relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center px-4 pb-10 pt-20 lg:px-8 lg:pt-24">
      <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="order-1 flex w-full flex-col justify-center lg:order-2">
          <div
            className="carousel-stage relative flex min-h-[340px] w-full items-center justify-center gap-2 sm:gap-4"
            role="region"
            aria-label="Research modules"
            aria-live="polite"
          >
            <motion.button
              type="button"
              onClick={() => go(-1)}
              className="carousel-side-arrow shrink-0"
              aria-label="Previous module"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            <div className="relative min-h-[320px] w-[min(78vw,280px)] shrink-0 overflow-hidden">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={card.id}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({
                      opacity: 0,
                      x: d > 0 ? 56 : -56,
                      rotateY: d > 0 ? 10 : -10,
                      scale: 0.94,
                    }),
                    center: {
                      opacity: 1,
                      x: 0,
                      rotateY: 0,
                      scale: 1,
                      transition: { duration: 0.42, ease: slideEase },
                    },
                    exit: (d: number) => ({
                      opacity: 0,
                      x: d > 0 ? -56 : 56,
                      rotateY: d > 0 ? -10 : 10,
                      scale: 0.94,
                      transition: { duration: 0.32, ease: slideEase },
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ transformPerspective: 900 }}
                >
                  <FeatureFlashcard card={card} active />
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.button
              type="button"
              onClick={() => go(1)}
              className="carousel-side-arrow shrink-0"
              aria-label="Next module"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>

          <motion.div
            className="mt-5 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            <p className="font-sans text-xs text-[var(--theme-muted)]">
              {index + 1} of {cards.length} · {card.tool.name}
            </p>
            <div className="flex gap-2">
              {cards.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => jumpTo(i)}
                  className={cn(
                    "h-2 min-w-[8px] rounded-full transition-all duration-300",
                    i === index
                      ? "w-7 bg-[var(--theme-primary)] shadow-[0_0_12px_color-mix(in_srgb,var(--theme-primary)_45%,transparent)]"
                      : "w-2 bg-[var(--theme-border-strong)] hover:bg-[var(--theme-muted)]"
                  )}
                  aria-label={`Show ${c.tool.name}`}
                  aria-current={i === index}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="order-2 lg:order-1">
          <HomeSiteIntro />
        </div>
      </div>
    </div>
  );
}
