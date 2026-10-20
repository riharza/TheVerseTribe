"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  Sparkles,
  Compass,
  PenLine,
  Library,
  Newspaper,
  MessagesSquare,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/write", label: "Write", icon: PenLine },
  { href: "/library", label: "Library", icon: Library },
  { href: "/blog", label: "Blog", icon: Newspaper },
  { href: "/forum", label: "Forum", icon: MessagesSquare },
];

const READER_ROUTES = ["/story/"];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMinimal =
    (READER_ROUTES.some(
      (route) => pathname.includes(route) && pathname.includes("/chapter/")
    )) ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  if (isMinimal) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-midnight/60 backdrop-blur-xl">
      <div className="verse-container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-5 h-5 text-violet group-hover:text-bloom transition-colors duration-300" />
            </motion.div>
            <span className="font-display text-lg text-ivory tracking-wide">
              The Verse Tribe
            </span>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-0.5"
            aria-label="Main navigation"
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-sans rounded-xl transition-colors duration-300",
                  pathname.startsWith(href)
                    ? "text-violet"
                    : "text-ivory-muted hover:text-ivory"
                )}
              >
                {pathname.startsWith(href) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-violet/10 rounded-xl border border-violet/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/search"
              className="p-2 text-ivory-muted hover:text-violet transition-colors rounded-xl hover:bg-violet/5"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
                Sign In
              </Button>
            </Link>

            <Link href="/register" className="hidden sm:block">
              <Button variant="glass" size="sm">
                Join
              </Button>
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-ivory-muted hover:text-ivory transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[var(--border)] bg-midnight-100/95 backdrop-blur-xl overflow-hidden"
            aria-label="Mobile navigation"
          >
            <div className="verse-container py-4 space-y-1">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans transition-colors",
                    pathname.startsWith(href)
                      ? "text-violet bg-violet/10"
                      : "text-ivory-muted hover:text-ivory hover:bg-violet/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
              <div className="pt-3 flex gap-2">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button variant="ghost" size="sm" className="w-full">Sign In</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button variant="glass" size="sm" className="w-full">Join</Button>
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
