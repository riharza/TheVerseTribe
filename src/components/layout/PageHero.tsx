"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { Fireflies } from "@/components/atmosphere/Fireflies";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  compact?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden border-b border-champagne/10 ${
        compact ? "py-12 md:py-16" : "py-16 md:py-24"
      }`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-verse-gradient" />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/10 via-transparent to-navy-deep/50" />
        <Fireflies density={24} />
      </div>
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-champagne/5 blur-[100px] pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="verse-container relative">
        <FadeIn>
          {eyebrow && (
            <p className="verse-subheading mb-4 text-champagne/60">{eyebrow}</p>
          )}
          <h1 className="verse-heading text-4xl md:text-5xl lg:text-6xl font-light mb-4 text-balance gold-text">
            {title}
          </h1>
          {description && (
            <p className="text-ivory-muted font-sans text-lg max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </FadeIn>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gold-line pointer-events-none" />
    </section>
  );
}
