"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.45, ease },
  }),
};

export function HomeSiteIntro() {
  const [intro, setIntro] = useState(false);

  useEffect(() => {
    setIntro(true);
  }, []);

  if (!intro) {
    return (
      <section className="home-site-intro relative z-20 mx-auto w-full max-w-xl text-center md:text-left lg:max-w-lg">
        <h1 className="font-display text-3xl font-semibold text-[var(--theme-ink)]">The Verse Tribe</h1>
      </section>
    );
  }

  return (
    <motion.section
      className="home-site-intro relative z-20 mx-auto w-full max-w-xl text-center md:text-left lg:max-w-lg"
      initial="hidden"
      animate="show"
    >
      <motion.p
        custom={0}
        variants={fadeUp}
        className="mb-3 font-sans text-xs uppercase tracking-[0.24em] text-[var(--theme-muted)]"
      >
        Research software &amp; AI
      </motion.p>
      <motion.h1
        custom={1}
        variants={fadeUp}
        className="font-display text-3xl font-semibold tracking-tight text-[var(--theme-ink)] sm:text-4xl md:text-[2.35rem] text-balance"
      >
        The Verse Tribe
      </motion.h1>
      <motion.p
        custom={2}
        variants={fadeUp}
        className="mt-4 font-sans text-base leading-relaxed text-[var(--theme-body)] sm:text-lg"
      >
        Discover, organize, and analyze scientific literature with evidence-grounded AI and
        reproducible experiment workflows — built for research teams.
      </motion.p>
      <motion.ul
        custom={3}
        variants={fadeUp}
        className="mt-5 inline-block space-y-2 text-left font-sans text-sm text-[var(--theme-body)] md:text-left"
      >
        {[
          "Literature library with search and project scoping",
          "AI assistant with source-grounded answers",
          "Analysis comparison and experiment tracking",
        ].map((line) => (
          <li key={line} className="flex gap-2">
            <span className="text-[var(--theme-primary)]" aria-hidden>
              •
            </span>
            {line}
          </li>
        ))}
      </motion.ul>
      <motion.div
        custom={4}
        variants={fadeUp}
        className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:justify-start"
      >
        <Link href="/dashboard">
          <Button variant="primary" size="lg">
            Open dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link
          href="/docs"
          className="inline-flex min-h-[44px] items-center font-sans text-sm text-[var(--theme-muted)] underline-offset-4 hover:text-[var(--theme-ink)] hover:underline"
        >
          Documentation
        </Link>
      </motion.div>
    </motion.section>
  );
}
