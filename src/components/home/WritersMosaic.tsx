"use client";

import Image from "next/image";
import Link from "next/link";
import { Author } from "@/lib/data/mock-data";
import { formatNumber } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";
import { VerseLink } from "@/components/ui/Link";

interface WritersMosaicProps {
  writers: Author[];
}

export function WritersMosaic({ writers }: WritersMosaicProps) {
  const [featured, ...others] = writers;

  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute inset-0 diagonal-section bg-emerald-deep/20 pointer-events-none" />
      <div className="verse-container relative">
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="verse-subheading text-violet/50 mb-3">Voices of the Forest</p>
            <h2 className="verse-heading text-4xl md:text-5xl font-light">Featured Writers</h2>
          </div>
          <VerseLink href="/writers" variant="champagne" className="text-sm font-sans">
            All writers →
          </VerseLink>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {featured && (
            <FadeIn className="md:col-span-5">
              <Link
                href={`/writers/${featured.username}`}
                className="group block glass-tile p-6 md:p-8 h-full hover:border-violet/30"
              >
                <div className="relative w-28 h-28 rounded-full overflow-hidden ring-2 ring-violet/25 ring-offset-2 ring-offset-transparent mb-6 group-hover:ring-violet/45 transition-all">
                  <Image src={featured.avatarUrl} alt={featured.name} fill className="object-cover" sizes="112px" />
                </div>
                <h3 className="verse-heading text-2xl md:text-3xl group-hover:text-violet transition-colors">
                  {featured.name}
                </h3>
                <p className="text-ivory-dim text-sm font-sans mt-1">@{featured.username}</p>
                <p className="text-ivory-muted font-sans text-sm leading-relaxed mt-4 line-clamp-3">
                  {featured.bio}
                </p>
                <p className="text-violet text-xs font-sans mt-4 uppercase tracking-widest">
                  {formatNumber(featured.followerCount)} readers · {featured.storyCount} stories
                </p>
              </Link>
            </FadeIn>
          )}

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {others.map((writer, i) => (
              <FadeIn key={writer.id} delay={0.08 * (i + 1)}>
                <Link
                  href={`/writers/${writer.username}`}
                  className="group flex items-center gap-4 glass-tile p-4 hover:border-violet/25 transition-colors"
                  style={{ transform: `translateY(${i % 2 === 0 ? 0 : 10}px)` }}
                >
                  <div className="relative w-14 h-14 rounded-full overflow-hidden ring-1 ring-violet/20 flex-shrink-0">
                    <Image src={writer.avatarUrl} alt={writer.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg text-ivory truncate group-hover:text-violet transition-colors">
                      {writer.name}
                    </h3>
                    <p className="text-ivory-dim text-xs font-sans truncate">
                      {writer.storyCount} stories
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
