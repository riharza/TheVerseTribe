"use client";

import Link from "next/link";
import { GENRES } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";
import { motion } from "framer-motion";

const GENRE_STYLES = [
  "from-violet/15 to-emerald-deep/20",
  "from-bloom/12 to-emerald-mist/15",
  "from-gold/10 to-emerald-deep/15",
  "from-violet/10 to-bloom/8",
  "from-bloom/10 to-violet/8",
  "from-gold/12 to-violet/8",
];

export function GenreConstellation() {
  return (
    <section className="verse-container py-20 md:py-28">
      <FadeIn className="text-center mb-14">
        <p className="verse-subheading text-violet/50 mb-3">Chart Your Path</p>
        <h2 className="verse-heading text-4xl md:text-5xl font-light">Genre Constellation</h2>
        <p className="text-ivory-muted font-sans mt-3 max-w-md mx-auto">
          Each genre glows like a star through the emerald canopy
        </p>
      </FadeIn>

      <div className="relative max-w-3xl mx-auto">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full glass-tile flex items-center justify-center z-10"
          animate={{
            boxShadow: [
              "0 0 30px rgba(52,211,153,0.1)",
              "0 0 60px rgba(52,211,153,0.2)",
              "0 0 30px rgba(52,211,153,0.1)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <span className="font-display text-sm text-violet">Verse</span>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          {GENRES.slice(0, 9).map((genre, i) => (
            <FadeIn key={genre} delay={0.04 * i}>
              <Link href={`/discover?genre=${encodeURIComponent(genre)}`} className="group block">
                <motion.article
                  className={`relative glass-tile p-4 md:p-5 bg-gradient-to-br ${GENRE_STYLES[i % GENRE_STYLES.length]} group-hover:border-violet/35`}
                  whileHover={{ y: -4, scale: 1.02 }}
                  style={{ transform: `rotate(${(i % 3 - 1) * 1.2}deg)` }}
                >
                  <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-violet opacity-50 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                  <h3 className="font-serif text-lg text-ivory group-hover:text-violet transition-colors">
                    {genre}
                  </h3>
                  <p className="text-[10px] font-sans text-ivory-dim mt-1 uppercase tracking-wider">
                    Explore →
                  </p>
                </motion.article>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
