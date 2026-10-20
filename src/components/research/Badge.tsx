import { cn } from "@/lib/utils";

const variants = {
  default: "bg-white/5 text-ivory-muted border-white/10",
  cyan: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/25",
  violet: "bg-accent-violet/10 text-accent-violet-soft border-accent-violet/25",
  ocean: "bg-ocean/20 text-ocean-mist border-ocean-light/30",
  preview: "bg-champagne/10 text-champagne border-champagne/25",
  planned: "bg-white/5 text-ivory-dim border-white/10",
} as const;

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-sans uppercase tracking-wider border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
