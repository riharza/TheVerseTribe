"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FeatureCard } from "@/components/carousel/carousel-cards";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FeatureFlashcardProps {
  card: FeatureCard;
  active?: boolean;
  surface?: string;
  accent?: string;
}

export function FeatureFlashcard({
  card,
  active = true,
  surface,
  accent,
}: FeatureFlashcardProps) {
  const Icon = card.icon;
  const surfaceColor = surface ?? card.surface;
  const accentColor = accent ?? card.accent;

  return (
    <article
      className={cn(
        "carousel-flashcard w-full transition-[filter,opacity,transform] duration-[950ms] ease-out",
        active ? "carousel-flashcard-active" : "carousel-flashcard-side"
      )}
      style={
        {
          ["--card-accent" as string]: accentColor,
          ["--card-surface" as string]: surfaceColor,
        } as CSSProperties
      }
    >
      <div
        className={cn(
          "carousel-flashcard-inner flex h-full flex-col items-center text-center",
          active ? "justify-center p-5 sm:p-7 md:p-9" : "p-5 sm:p-7"
        )}
      >
        <div
          className={cn(
            "flashcard-symbol-ring mb-5 flex items-center justify-center rounded-full",
            active ? "h-20 w-20 sm:h-24 sm:w-24 md:h-[6.5rem] md:w-[6.5rem]" : "h-20 w-20"
          )}
        >
          <Icon
            className={cn(
              "text-[var(--forest-mist)]",
              active ? "h-10 w-10 sm:h-11 sm:w-11" : "h-9 w-9"
            )}
            strokeWidth={1.35}
            aria-hidden
          />
        </div>
        <h2
          className={cn(
            "font-display font-semibold tracking-tight text-[var(--forest-mist)]",
            active ? "text-2xl sm:text-[1.75rem] sm:leading-tight" : "text-xl sm:text-2xl"
          )}
        >
          {card.tool.name.replace("Research ", "").replace("AI ", "")}
        </h2>
        <p
          className={cn(
            "mt-3 max-w-[26ch] font-sans leading-snug text-[var(--forest-mint)]",
            active ? "text-base sm:text-lg" : "text-sm"
          )}
        >
          {card.blurb}
        </p>
        <Link href={card.tool.href} className="mt-7 inline-block" tabIndex={active ? 0 : -1}>
          <Button variant="primary" size={active ? "md" : "sm"}>
            Open
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </article>
  );
}
