"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LuminousFairy } from "@/components/characters/LuminousFairy";

export function CinematicHero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Fairy flanking the title on desktop */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1.2 }}
        className="absolute left-[8%] top-[30%] hidden xl:block z-10"
      >
        <LuminousFairy size="md" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 40, scaleX: -1 }}
        animate={{ opacity: 1, x: 0, scaleX: -1 }}
        transition={{ delay: 1.4, duration: 1.2 }}
        className="absolute right-[8%] top-[35%] hidden xl:block z-10"
      >
        <LuminousFairy size="sm" />
      </motion.div>

      <div className="relative z-20 verse-container text-center px-4 py-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="verse-subheading text-champagne/80 mb-4 drop-shadow-md"
        >
          Welcome to the realm of stories
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-champagne tracking-[0.15em] md:tracking-[0.2em] mb-6 gold-text drop-shadow-[0_4px_40px_rgba(6,14,26,0.9)]"
        >
          THE VERSE TRIBE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-serif text-xl md:text-2xl lg:text-3xl text-ivory italic mb-10 text-balance max-w-2xl mx-auto drop-shadow-[0_2px_20px_rgba(6,14,26,0.8)]"
        >
          &ldquo;Every story creates a new world.&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <Link href="/discover">
            <Button variant="primary" size="lg" className="rounded-full px-10 min-w-[200px] group shadow-[0_0_40px_rgba(212,175,106,0.35)]">
              Start Reading
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="glass" size="lg" className="rounded-full px-10 min-w-[200px] group">
              <Users className="w-4 h-4" />
              Join Our Community
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs font-sans uppercase tracking-[0.35em] text-champagne/70 drop-shadow-md"
        >
          Read · Write · Connect
        </motion.p>

        {/* Mobile fairy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="xl:hidden flex justify-center mt-10"
        >
          <LuminousFairy size="sm" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-sans uppercase tracking-widest text-champagne/60">
            Scroll the golden path
          </span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-champagne/70 via-champagne/30 to-transparent"
            animate={{ scaleY: [1, 0.35, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Book glow pulse at bottom center */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50%] h-32 pointer-events-none z-[5]"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          background: "radial-gradient(ellipse at center bottom, rgba(232,200,130,0.4) 0%, transparent 70%)",
        }}
      />
    </section>
  );
}
