import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "genre" | "tag" | "gold";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-white/5 text-ivory-muted border-white/10",
    genre: "bg-champagne/10 text-champagne border-champagne/25",
    tag: "bg-white/5 text-ivory-muted border-white/10",
    gold: "bg-magic-cyan/10 text-magic-cyan border-magic-cyan/25",
  };

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 text-xs font-sans rounded-full border", variants[variant], className)}>
      {children}
    </span>
  );
}
