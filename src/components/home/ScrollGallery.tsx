"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { Story } from "@/lib/data/mock-data";
import { formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion/FadeIn";
import { VerseLink } from "@/components/ui/Link";

interface ScrollGalleryProps {
  title: string;
  subtitle?: string;
  stories: Story[];
  href?: string;
}

export function ScrollGallery({ title, subtitle, stories, href }: ScrollGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollRef.current.clientWidth * 0.75 : scrollRef.current.clientWidth * 0.75,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 diagonal-section glass-tile opacity-40 pointer-events-none border-0" />

      <div className="verse-container relative">
        <FadeIn className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-violet" />
              <p className="verse-subheading text-violet/60">{subtitle}</p>
            </div>
            <h2 className="verse-heading text-3xl md:text-4xl font-light">{title}</h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full glass-tile text-ivory-muted hover:text-violet transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full glass-tile text-ivory-muted hover:text-violet transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </FadeIn>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-snap-x pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 mask-fade-edges"
        >
          {stories.map((story, i) => (
            <FadeIn key={story.id} delay={0.05 * i} className="scroll-snap-item flex-shrink-0 w-[280px] sm:w-[300px]">
              <Link
                href={`/story/${story.slug}`}
                className="group block"
                style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
              >
                <article className="glass-tile overflow-hidden hover:-translate-y-2 transition-transform duration-500">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={story.coverUrl}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-85"
                      sizes="300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent" />
                    <Badge variant="genre" className="absolute top-3 left-3">{story.genre}</Badge>
                    <div className="absolute bottom-0 p-4 w-full backdrop-blur-md bg-white/[0.04] border-t border-white/[0.05]">
                      <h3 className="verse-heading text-xl group-hover:text-violet transition-colors line-clamp-2">
                        {story.title}
                      </h3>
                      <p className="text-ivory-dim text-xs font-sans mt-1">
                        {story.author.name} · {formatNumber(story.viewCount)} reads
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            </FadeIn>
          ))}
        </div>

        {href && (
          <div className="mt-8 text-center sm:text-left">
            <VerseLink href={href} variant="champagne" className="text-sm font-sans">
              Explore all →
            </VerseLink>
          </div>
        )}
      </div>
    </section>
  );
}
