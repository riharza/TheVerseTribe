"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

export function HomeSiteIntro() {
  const [intro, setIntro] = useState(false);

  useEffect(() => {
    setIntro(true);
  }, []);

  return (
    <motion.section
      className="home-site-intro relative z-20 mx-auto w-full max-w-lg text-center md:text-left"
      initial={{ opacity: 0, y: 12 }}
      animate={intro ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.5, ease }}
    >
      <p className="mb-3 font-sans text-xs uppercase tracking-[0.28em] text-[var(--theme-muted)] sm:text-[13px]">
        Research · AI
      </p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-[var(--theme-ink)] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
        The Verse Tribe
      </h1>
      <p className="mt-4 font-sans text-base leading-relaxed text-[var(--theme-body)] sm:text-lg sm:leading-relaxed">
        Literature, assistant, analysis — one workspace.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
        <Link href="/dashboard">
          <Button variant="primary" size="lg">
            Dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link
          href="/docs"
          className="inline-flex min-h-[44px] items-center font-sans text-sm text-[var(--theme-muted)] hover:text-[var(--theme-ink)]"
        >
          Docs
        </Link>
      </div>
    </motion.section>
  );
}
