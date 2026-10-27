import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "gold" | "glass";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variants = {
      primary:
        "bg-[var(--forest-sand)] text-[var(--forest-chestnut)] font-medium shadow-md border border-[var(--forest-terracotta)]/35 " +
        "hover:bg-[var(--forest-mist)] hover:text-[var(--forest-void)] hover:shadow-lg",
      secondary:
        "bg-navy-mid/50 text-ivory hover:bg-navy-light/50 border border-white/12 backdrop-blur-md",
      ghost: "text-ivory-muted hover:text-accent-cyan hover:bg-accent-cyan/5",
      outline:
        "border border-accent-cyan/35 text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan/55 backdrop-blur-sm",
      gold: "bg-champagne/10 text-champagne border border-champagne/30 hover:bg-champagne/20",
      glass: "glass-tile text-ivory hover:text-accent-cyan border-white/10 hover:border-accent-cyan/30",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-full min-h-[40px]",
      md: "px-5 py-2.5 text-sm rounded-full min-h-[44px]",
      lg: "px-7 py-3 text-base rounded-full min-h-[48px]",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex touch-manipulation items-center justify-center gap-2 font-sans transition-all duration-300",
          "disabled:opacity-50 disabled:pointer-events-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
          "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
