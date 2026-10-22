"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FeatureCard } from "@/components/carousel/carousel-cards";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FeatureFlashcardProps {
  card: FeatureCard;
  active?: boolean;
}

const statusLabel = {
  available: "Available",
  preview: "Preview",
  planned: "Planned",
} as const;

export function FeatureFlashcard({ card, active = true }: FeatureFlashcardProps) {
  return (
    <article
      className={cn("carousel-flashcard w-full carousel-flashcard-active")}
      style={{ ["--card-accent" as string]: card.accent }}
    >
      <div className="carousel-flashcard-inner flex h-full flex-col p-5 sm:p-6">
        <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.18em] text-[var(--theme-muted)]">
          {statusLabel[card.tool.status]}
        </p>
        <h2 className="font-display text-lg font-semibold leading-snug tracking-tight text-[var(--theme-ink)] sm:text-xl">
          {card.tool.name}
        </h2>
        <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-[var(--theme-body)]">
          {card.tool.description}
        </p>
        <Link href={card.tool.href} className="mt-5 inline-block" tabIndex={active ? 0 : -1}>
          <Button variant="primary" size="sm" className="w-full sm:w-auto">
            Open
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </article>
  );
}
