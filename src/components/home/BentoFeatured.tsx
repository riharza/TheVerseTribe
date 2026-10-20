"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Story } from "@/lib/data/mock-data";
import { formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion/FadeIn";
import { VerseLink } from "@/components/ui/Link";

interface BentoFeaturedProps {
  stories: Story[];
}

export function BentoFeatured({ stories }: BentoFeaturedProps) {
  const [hero, second, third, ...rest] = stories;

  return (
    <section className="verse-container py-20 md:py-28">
      <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <p className="verse-subheading text-violet/60 mb-3">Curated by the Fae</p>
          <h2 className="verse-heading text-4xl md:text-5xl font-light">Featured Tales</h2>
        </div>
        <VerseLink href="/discover?sort=featured" variant="champagne" className="text-sm font-sans flex items-center gap-1 group">
          View all <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </VerseLink>
      </FadeIn>

      <div className="grid grid-cols-12 gap-4 md:gap-5 auto-rows-[180px] md:auto-rows-[200px]">
        {hero && (
          <FadeIn className="col-span-12 md:col-span-7 md:row-span-3 bento-tilt">
            <Link href={`/story/${hero.slug}`} className="group block h-full">
              <article className="relative h-full min-h-[360px] md:min-h-0 rounded-3xl overflow-hidden glass-tile verse-glow">
                <Image
                  src={hero.coverUrl}
                  alt={hero.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                  sizes="(max-width: 768px) 100vw, 55vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-midnight/40 to-midnight/10" />
                <div className="absolute inset-0 bg-fae-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 backdrop-blur-sm bg-white/[0.03] border-t border-white/[0.06]">
                  <Badge variant="genre" className="mb-3">{hero.genre}</Badge>
                  <h3 className="verse-heading text-3xl md:text-4xl mb-2 group-hover:text-violet transition-colors">
                    {hero.title}
                  </h3>
                  <p className="text-ivory-muted text-sm font-sans line-clamp-2 max-w-lg mb-3">
                    {hero.description}
                  </p>
                  <p className="text-ivory-dim text-xs font-sans">
                    {hero.author.name} · {formatNumber(hero.viewCount)} reads
                  </p>
                </div>
              </article>
            </Link>
          </FadeIn>
        )}

        {second && (
          <FadeIn delay={0.1} className="col-span-6 md:col-span-5 md:row-span-2 bento-tilt-reverse">
            <StoryTile story={second} tall />
          </FadeIn>
        )}

        {third && (
          <FadeIn delay={0.15} className="col-span-6 md:col-span-5 md:row-span-1">
            <StoryTile story={third} />
          </FadeIn>
        )}

        {rest.slice(0, 2).map((story, i) => (
          <FadeIn key={story.id} delay={0.2 + i * 0.05} className="col-span-6 md:col-span-5 md:row-span-1">
            <StoryTile story={story} horizontal />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function StoryTile({
  story,
  tall,
  horizontal,
}: {
  story: Story;
  tall?: boolean;
  horizontal?: boolean;
}) {
  return (
    <Link href={`/story/${story.slug}`} className="group block h-full">
      <article className={`glass-tile overflow-hidden h-full flex ${horizontal ? "flex-row" : "flex-col"}`}>
        <div
          className={`relative overflow-hidden ${
            horizontal ? "w-2/5 min-h-[120px]" : tall ? "flex-1 min-h-[200px]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={story.coverUrl}
            alt={story.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-75 group-hover:opacity-90"
            sizes="300px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent" />
        </div>
        <div className={`p-4 flex flex-col justify-center relative z-[1] ${horizontal ? "flex-1" : ""}`}>
          <Badge variant="tag" className="self-start mb-2">{story.genre}</Badge>
          <h3 className="verse-heading text-lg group-hover:text-violet transition-colors line-clamp-2">
            {story.title}
          </h3>
          <p className="text-ivory-dim text-xs font-sans mt-1">{story.author.name}</p>
        </div>
      </article>
    </Link>
  );
}
