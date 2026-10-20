"use client";

import { cn } from "@/lib/utils";

interface RuneSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const sizes = { sm: "w-8 h-8", md: "w-12 h-12", lg: "w-16 h-16" };

export function RuneSpinner({ size = "md", label = "Loading...", className }: RuneSpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className={cn("relative", sizes[size])}>
        <svg viewBox="0 0 64 64" className="w-full h-full animate-[spin_3s_linear_infinite]">
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(212,175,106,0.15)" strokeWidth="1" />
          <path
            d="M32 8 L36 20 L48 16 L40 28 L52 32 L40 36 L48 48 L36 44 L32 56 L28 44 L16 48 L24 36 L12 32 L24 28 L16 16 L28 20 Z"
            fill="none"
            stroke="#d4af6a"
            strokeWidth="1.5"
            className="animate-[pulseGlow_2s_ease-in-out_infinite]"
          />
          <circle cx="32" cy="32" r="4" fill="#5ec8e8" className="animate-pulse-glow" />
        </svg>
        <div className="absolute inset-0 rounded-full bg-champagne/10 blur-md animate-pulse-glow" />
      </div>
      {label && <p className="text-ivory-muted font-serif text-sm italic">{label}</p>}
    </div>
  );
}
