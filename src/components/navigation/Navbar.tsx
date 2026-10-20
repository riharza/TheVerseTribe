"use client";



import { useState, useEffect } from "react";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";

import { Menu, X } from "lucide-react";

import { Logo } from "@/components/brand/Logo";

import { Button } from "@/components/ui/Button";

import { cn } from "@/lib/utils";



const navLinks = [

  { href: "/", label: "Home" },

  { href: "/dashboard", label: "Dashboard" },

  { href: "/literature", label: "Literature" },

  { href: "/assistant", label: "Assistant" },

  { href: "/docs", label: "Docs" },

];



export function Navbar() {

  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === "/";



  useEffect(() => {

    const onScroll = () => setScrolled(window.scrollY > 32);

    window.addEventListener("scroll", onScroll, { passive: true });

    onScroll();

    return () => window.removeEventListener("scroll", onScroll);

  }, []);



  useEffect(() => {

    setMobileOpen(false);

  }, [pathname]);



  return (

    <header

      className={cn(

        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",

        scrolled || !isHome

          ? "bg-navy-deep/70 backdrop-blur-2xl border-b border-white/10 shadow-groove"

          : "bg-navy-deep/20 backdrop-blur-md border-b border-white/5"

      )}

    >

      {scrolled && (

        <div className="absolute bottom-0 left-0 right-0 h-px bg-groove-border opacity-60" aria-hidden />

      )}

      <div className="verse-container">

        <div className="flex items-center justify-between h-16 md:h-[4.25rem] gap-4">

          <Logo compact />



          <nav className="hidden lg:flex nav-dock" aria-label="Main">

            {navLinks.map(({ href, label }) => {

              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

              return (

                <Link

                  key={href}

                  href={href}

                  className={cn(

                    "relative px-4 py-2 text-sm font-sans rounded-full transition-colors min-h-[40px] flex items-center",

                    active ? "text-accent-cyan" : "text-ivory-muted hover:text-ivory"

                  )}

                >

                  {active && (

                    <motion.span

                      layoutId="nav-pill"

                      className="absolute inset-0 rounded-full border border-accent-cyan/30 bg-accent-cyan/10"

                      transition={{ type: "spring", stiffness: 380, damping: 30 }}

                    />

                  )}

                  <span className="relative">{label}</span>

                </Link>

              );

            })}

          </nav>



          <div className="flex items-center gap-2">

            <Link href="/dashboard" className="hidden sm:block">

              <Button variant="primary" size="sm">

                Open dashboard

              </Button>

            </Link>

            <button

              type="button"

              onClick={() => setMobileOpen(!mobileOpen)}

              className="lg:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-ivory-muted hover:text-ivory rounded-full hover:bg-white/5 border border-white/10"

              aria-expanded={mobileOpen}

              aria-label={mobileOpen ? "Close menu" : "Open menu"}

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

            className="lg:hidden border-t border-white/10 bg-navy-deep/95 backdrop-blur-2xl overflow-hidden"

          >

            <div className="verse-container py-4 space-y-1">

              {navLinks.map(({ href, label }) => (

                <Link

                  key={href}

                  href={href}

                  className={cn(

                    "block px-4 py-3.5 min-h-[48px] rounded-xl text-sm font-sans",

                    (href === "/" ? pathname === "/" : pathname.startsWith(href))

                      ? "text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/25"

                      : "text-ivory-muted hover:text-ivory hover:bg-white/5"

                  )}

                >

                  {label}

                </Link>

              ))}

              <Link href="/dashboard" className="block pt-2">

                <Button variant="primary" size="md" className="w-full">

                  Open dashboard

                </Button>

              </Link>

            </div>

          </motion.nav>

        )}

      </AnimatePresence>

    </header>

  );

}

