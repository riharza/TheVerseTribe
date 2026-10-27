"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  buildFeatureCards,
  randomActiveCardColors,
  type ActiveCardColors,
} from "@/components/carousel/carousel-cards";
import { FeatureFlashcard } from "@/components/carousel/FeatureFlashcard";
import { HomeSiteIntro } from "@/components/carousel/HomeSiteIntro";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const cards = buildFeatureCards();
const slideEase = [0.22, 1, 0.36, 1] as const;
const SLIDE_DURATION_S = 0.95;
const CARD_WIDTH_MAX = 320;
const CARD_WIDTH_MIN = 252;
const CARD_GAP = 18;
const VIEWPORT_MAX = 860;
const SWIPE_THRESHOLD_PX = 48;

function getCardWidth(viewportWidth: number) {
  const peekReserve = viewportWidth < 640 ? 72 : 96;
  return Math.round(
    Math.min(CARD_WIDTH_MAX, Math.max(CARD_WIDTH_MIN, viewportWidth - peekReserve))
  );
}

function trackOffset(viewportWidth: number, cardWidth: number, activeIndex: number) {
  const stride = cardWidth + CARD_GAP;
  return viewportWidth / 2 - cardWidth / 2 - activeIndex * stride;
}

type CarouselLayout = {
  viewportWidth: number;
  cardWidth: number;
  trackX: number;
};

function measureLayout(activeIndex: number, viewportEl: HTMLDivElement | null): CarouselLayout {
  const viewportWidth = viewportEl?.clientWidth ?? Math.min(VIEWPORT_MAX, 360);
  const cardWidth = getCardWidth(viewportWidth);
  return {
    viewportWidth,
    cardWidth,
    trackX: trackOffset(viewportWidth, cardWidth, activeIndex),
  };
}

export function HorizontalFeatureCarousel() {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const [activeColors, setActiveColors] = useState<ActiveCardColors>(() => randomActiveCardColors());
  const [layout, setLayout] = useState<CarouselLayout>(() => ({
    viewportWidth: 360,
    cardWidth: CARD_WIDTH_MAX,
    trackX: 0,
  }));
  const [animateSlide, setAnimateSlide] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  indexRef.current = index;

  const go = useCallback(
    (delta: number) => {
      setAnimateSlide(!reducedMotion);
      setActiveColors(randomActiveCardColors());
      setIndex((i) => (i + delta + cards.length * 8) % cards.length);
    },
    [reducedMotion]
  );

  const jumpTo = useCallback(
    (next: number) => {
      if (next === index) return;
      setAnimateSlide(!reducedMotion);
      setActiveColors(randomActiveCardColors());
      setIndex(next);
    },
    [index, reducedMotion]
  );

  useLayoutEffect(() => {
    setLayout(measureLayout(index, viewportRef.current));
  }, [index]);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    let debounceId: ReturnType<typeof setTimeout> | undefined;
    const ro = new ResizeObserver(() => {
      clearTimeout(debounceId);
      debounceId = setTimeout(() => {
        setAnimateSlide(false);
        setLayout(measureLayout(indexRef.current, viewportRef.current));
      }, 120);
    });
    ro.observe(node);
    return () => {
      ro.disconnect();
      clearTimeout(debounceId);
    };
  }, []);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0]?.clientX ?? null;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const start = touchStartX.current;
      touchStartX.current = null;
      if (start == null) return;
      const endX = e.changedTouches[0]?.clientX ?? start;
      const delta = endX - start;
      if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
      go(delta > 0 ? -1 : 1);
    };

    node.addEventListener("touchstart", onTouchStart, { passive: true });
    node.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      node.removeEventListener("touchstart", onTouchStart);
      node.removeEventListener("touchend", onTouchEnd);
    };
  }, [go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const { cardWidth, trackX } = layout;
  const slideDuration = animateSlide && !reducedMotion ? SLIDE_DURATION_S : 0;

  return (
    <div className="horizontal-carousel-shell relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center px-3 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(5rem,env(safe-area-inset-top))] sm:px-4 lg:px-8 lg:pt-24">
      <div className="relative z-10 grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="order-1 flex w-full min-w-0 flex-col justify-center lg:order-2">
          <div
            className="carousel-stage relative flex min-h-[300px] w-full items-center justify-center sm:min-h-[340px]"
            role="region"
            aria-label="Research modules"
            aria-live="polite"
          >
            <div
              ref={viewportRef}
              className="carousel-viewport relative mx-auto min-h-[300px] w-full max-w-[860px] shrink-0 overflow-hidden touch-pan-y sm:min-h-[340px]"
            >
              <motion.div
                className="carousel-sliding-track flex items-stretch"
                style={{ gap: CARD_GAP }}
                animate={{ x: trackX }}
                transition={{ duration: slideDuration, ease: slideEase }}
              >
                {cards.map((card, i) => {
                  const isActive = i === index;
                  return (
                    <div
                      key={card.id}
                      className="carousel-slide shrink-0"
                      style={{ width: cardWidth }}
                      aria-hidden={!isActive}
                    >
                      <FeatureFlashcard
                        card={card}
                        active={isActive}
                        surface={isActive ? activeColors.surface : undefined}
                        accent={isActive ? activeColors.accent : undefined}
                      />
                    </div>
                  );
                })}
              </motion.div>

              <div
                className="carousel-flashcard-nav-rail pointer-events-none absolute inset-y-0 left-1/2 z-20 -translate-x-1/2"
                style={{ width: cardWidth }}
              >
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="carousel-side-arrow carousel-flashcard-nav carousel-flashcard-nav-prev pointer-events-auto"
                  aria-label="Previous module"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="carousel-side-arrow carousel-flashcard-nav carousel-flashcard-nav-next pointer-events-auto"
                  aria-label="Next module"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center gap-2 sm:mt-5">
            <p className="font-sans text-xs uppercase tracking-wider text-[var(--theme-muted)]">
              {index + 1} / {cards.length}
            </p>
            <div className="flex max-w-full flex-wrap justify-center gap-2 px-1">
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
          </div>
        </div>

        <div className="order-2 min-w-0 lg:order-1">
          <HomeSiteIntro />
        </div>
      </div>
    </div>
  );
}
