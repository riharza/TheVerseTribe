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

import { cn } from "@/lib/utils";



const cards = buildFeatureCards();

const slideEase = [0.22, 1, 0.36, 1] as const;
const SLIDE_DURATION_S = 0.95;

const CARD_WIDTH = 320;

const CARD_GAP = 22;

const SLIDE_STRIDE = CARD_WIDTH + CARD_GAP;

/** Wide viewport so prev/next cards peek on both sides of the narrower active card. */
const VIEWPORT_MAX = 860;



function trackOffset(viewportWidth: number, activeIndex: number) {

  return viewportWidth / 2 - CARD_WIDTH / 2 - activeIndex * SLIDE_STRIDE;

}



export function HorizontalFeatureCarousel() {

  const [index, setIndex] = useState(0);

  const [activeColors, setActiveColors] = useState<ActiveCardColors>(() => randomActiveCardColors());

  const [trackX, setTrackX] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);



  const syncTrack = useCallback((activeIndex: number) => {

    const width = viewportRef.current?.clientWidth ?? VIEWPORT_MAX;

    setTrackX(trackOffset(width, activeIndex));

  }, []);



  const selectIndex = useCallback(

    (next: number) => {

      setActiveColors(randomActiveCardColors());

      setIndex(next);

    },

    []

  );



  const go = useCallback((delta: number) => {
    setIndex((i) => (i + delta + cards.length * 8) % cards.length);
    setActiveColors(randomActiveCardColors());
  }, []);



  const jumpTo = useCallback(

    (next: number) => {

      if (next === index) return;

      selectIndex(next);

    },

    [index, selectIndex]

  );



  useLayoutEffect(() => {

    syncTrack(index);

  }, [index, syncTrack]);



  useEffect(() => {

    const node = viewportRef.current;

    if (!node) return;



    const ro = new ResizeObserver(() => syncTrack(index));

    ro.observe(node);

    return () => ro.disconnect();

  }, [index, syncTrack]);



  useEffect(() => {

    const onKey = (e: KeyboardEvent) => {

      if (e.key === "ArrowLeft") go(-1);

      if (e.key === "ArrowRight") go(1);

    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);

  }, [go]);



  return (

    <div className="horizontal-carousel-shell relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center px-4 pb-10 pt-20 lg:px-8 lg:pt-24">

      <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">

        <div className="order-1 flex w-full flex-col justify-center lg:order-2">

          <div

            className="carousel-stage relative flex min-h-[340px] w-full items-center justify-center"

            role="region"

            aria-label="Research modules"

            aria-live="polite"

          >

            <div

              ref={viewportRef}

              className="carousel-viewport relative min-h-[340px] shrink-0 overflow-hidden"

              style={{ width: `min(98vw, ${VIEWPORT_MAX}px)` }}

            >

              <motion.div

                className="carousel-sliding-track flex items-stretch will-change-transform"

                style={{ gap: CARD_GAP }}

                animate={{ x: trackX }}

                transition={{ duration: SLIDE_DURATION_S, ease: slideEase }}

              >

                {cards.map((card, i) => {

                  const isActive = i === index;

                  return (

                    <div

                      key={card.id}

                      className="carousel-slide shrink-0"

                      style={{ width: CARD_WIDTH }}

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
                style={{ width: CARD_WIDTH }}
              >
                <motion.button
                  type="button"
                  onClick={() => go(-1)}
                  className="carousel-side-arrow carousel-flashcard-nav carousel-flashcard-nav-prev pointer-events-auto"
                  aria-label="Previous module"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <ChevronLeft className="h-5 w-5" />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => go(1)}
                  className="carousel-side-arrow carousel-flashcard-nav carousel-flashcard-nav-next pointer-events-auto"
                  aria-label="Next module"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </div>

            </div>

          </div>



          <motion.div

            className="mt-5 flex flex-col items-center gap-2"

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            transition={{ delay: 0.35, duration: 0.4 }}

          >

            <p className="font-sans text-xs uppercase tracking-wider text-[var(--theme-muted)]">

              {index + 1} / {cards.length}

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


