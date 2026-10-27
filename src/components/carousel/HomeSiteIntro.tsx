"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HomeSiteIntro() {
  return (
    <section className="home-site-intro home-intro-enter relative z-20 mx-auto w-full max-w-lg text-center md:text-left">
      <p className="mb-3 font-sans text-xs uppercase tracking-[0.28em] text-[var(--theme-muted)] sm:text-[13px]">
        Research · AI
      </p>
      <h1 className="font-display text-[clamp(1.875rem,7vw,2.75rem)] font-semibold leading-tight tracking-tight text-[var(--theme-ink)] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
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
    </section>
  );
}
