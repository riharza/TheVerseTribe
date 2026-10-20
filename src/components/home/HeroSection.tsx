"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BookOpen, PenLine } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Fireflies } from "@/components/atmosphere/Fireflies";
import { MistLayer } from "@/components/atmosphere/MistLayer";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.55], [0, -80]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 80,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(".hero-fade", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.9,
      });
      gsap.to(".hero-parallax-bg", {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] overflow-hidden">
      <div className="hero-parallax-bg absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-verse-gradient" />
        <div className="absolute inset-0 bg-verse-radial opacity-70" />
        <Fireflies density={70} />
        <MistLayer intensity="high" />
        <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-page-fade" />
      </div>

      <motion.div style={{ opacity, y }} className="relative verse-container min-h-[100svh] flex items-center py-20">
        <div className="max-w-3xl lg:max-w-4xl">
          <motion.div className="hero-fade inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-tile mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet" />
            </span>
            <span className="text-[11px] font-sans text-ivory-muted uppercase tracking-[0.25em]">
              Fae guides drift through every page
            </span>
          </motion.div>

          <h1 className="verse-heading font-light leading-[0.95] mb-8">
            <span className="hero-line block text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem]">
              Stories
            </span>
            <span className="hero-line block text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] italic text-violet ml-4 sm:ml-10">
              bloom
            </span>
            <span className="hero-line block text-4xl sm:text-5xl md:text-6xl text-ivory-muted/85 mt-3 ml-0 sm:ml-2">
              in the <span className="text-bloom italic">emerald</span> dark
            </span>
          </h1>

          <p className="hero-fade text-ivory-muted text-lg md:text-xl font-sans leading-relaxed max-w-xl mb-10 pl-0 sm:pl-6 sm:border-l border-violet/25">
            Wander a living forest of tales — glass-clear, dream-deep, and
            alive with fairies who follow your every step.
          </p>

          <div className="hero-fade flex flex-wrap items-center gap-4">
            <Link href="/discover">
              <Button variant="primary" size="lg" className="group rounded-full px-8">
                <BookOpen className="w-4 h-4" />
                Wander In
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="glass" size="lg" className="rounded-full px-8">
                <PenLine className="w-4 h-4" />
                Join the Tribe
              </Button>
            </Link>
          </div>

          <motion.div
            className="hero-fade mt-16 flex flex-wrap gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            {[
              { n: "2.4K+", l: "Stories" },
              { n: "180+", l: "Writers" },
              { n: "∞", l: "Worlds" },
            ].map((stat) => (
              <div key={stat.l} className="glass-tile px-5 py-3 rounded-xl">
                <p className="font-display text-xl text-violet">{stat.n}</p>
                <p className="text-[10px] font-sans uppercase tracking-widest text-ivory-dim">{stat.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gold-line" />
    </section>
  );
}
