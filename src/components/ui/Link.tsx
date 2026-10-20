import { cn } from "@/lib/utils";
import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "default" | "muted" | "champagne" | "gold";
}

export function VerseLink({
  href,
  className,
  variant = "default",
  children,
  ...props
}: LinkProps) {
  const variants = {
    default: "text-ivory hover:text-champagne transition-colors",
    muted: "text-ivory-muted hover:text-ivory transition-colors",
    champagne: "text-champagne hover:text-champagne-light transition-colors",
    gold: "text-gold hover:text-gold-glow transition-colors",
  };

  return (
    <Link href={href} className={cn(variants[variant], className)} {...props}>
      {children}
    </Link>
  );
}
