import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  compact?: boolean;
}

export function Logo({ className, compact }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex flex-col gap-0.5 shrink-0 min-h-[44px] justify-center", className)}
    >
      <span className="font-display text-[0.65rem] sm:text-xs tracking-[0.35em] text-[var(--theme-muted)] uppercase leading-none">
        The
      </span>
      <span className="font-display font-semibold text-sm sm:text-base tracking-[0.2em] text-[var(--forest-mist)] group-hover:opacity-80 transition-opacity leading-tight">
        VERSE TRIBE
      </span>
      {!compact && (
        <span className="hidden md:block text-[10px] font-sans tracking-widest text-[var(--theme-muted)] uppercase">
          Research Platform
        </span>
      )}
    </Link>
  );
}
