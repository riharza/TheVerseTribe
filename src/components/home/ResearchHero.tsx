"use client";



import Link from "next/link";

import { motion } from "framer-motion";

import { ArrowRight, BookOpen, Bot, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/Button";

import { DataLattice } from "@/components/visualization/DataLattice";

import { OrbitRing } from "@/components/visualization/OrbitRing";



const quickLinks = [

  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },

  { href: "/literature", label: "Library", icon: BookOpen },

  { href: "/assistant", label: "Assistant", icon: Bot },

];



export function ResearchHero() {

  return (

    <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden">

      <DataLattice className="absolute inset-0 opacity-50" />

      <OrbitRing />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-deep/30 to-navy-deep pointer-events-none" />



      <div className="verse-container relative z-10">

        <div className="grid lg:grid-cols-[1fr_min(420px,40%)] gap-12 items-center">

          <motion.div

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}

          >

            <p className="verse-subheading text-accent-cyan mb-4 flex items-center gap-2">

              <span className="inline-block w-2 h-2 rounded-full bg-accent-cyan shadow-neon-cyan animate-pulse-glow" />

              Research OS · Evidence first

            </p>

            <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-[3.25rem] text-ivory leading-[1.06] text-balance mb-6 tracking-tight">

              Discover literature.{" "}

              <span className="text-groove">Ground every answer.</span> Ship reproducible science.

            </h1>

            <p className="text-lg text-ivory-muted font-sans leading-relaxed max-w-xl mb-8">

              A calm, futuristic workspace for papers, comparisons, and AI that cites sources — never

              inventing them.

            </p>



            <div className="flex flex-col sm:flex-row gap-3 mb-8">

              <Link href="/dashboard">

                <Button variant="primary" size="lg" className="w-full sm:w-auto">

                  Open dashboard

                  <ArrowRight className="w-4 h-4" />

                </Button>

              </Link>

              <Link href="/docs">

                <Button variant="outline" size="lg" className="w-full sm:w-auto">

                  How it works

                </Button>

              </Link>

            </div>



            <div className="flex flex-wrap gap-2" aria-label="Quick links">

              {quickLinks.map(({ href, label, icon: Icon }) => (

                <Link key={href} href={href} className="pill-link">

                  <Icon className="w-4 h-4 text-accent-cyan" aria-hidden />

                  {label}

                </Link>

              ))}

            </div>



            <p className="mt-8 text-xs text-ivory-dim font-sans max-w-lg leading-relaxed">

              Preview build: sample data only. Connect FastAPI + PostgreSQL in a later milestone.

            </p>

          </motion.div>



          <motion.div

            initial={{ opacity: 0, scale: 0.96 }}

            animate={{ opacity: 1, scale: 1 }}

            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}

            className="hidden lg:block verse-panel p-6 groove-panel"

          >

            <p className="text-[10px] font-mono uppercase tracking-widest text-accent-cyan/80 mb-4">

              Live preview · sample telemetry

            </p>

            <div className="space-y-4 font-mono text-xs">

              {[

                { k: "papers.indexed", v: "6" },

                { k: "retrieval.status", v: "standby" },

                { k: "evidence.mode", v: "strict" },

              ].map((row) => (

                <div

                  key={row.k}

                  className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"

                >

                  <span className="text-ivory-dim">{row.k}</span>

                  <span className="text-accent-cyan-bright">{row.v}</span>

                </div>

              ))}

            </div>

            <div className="mt-6 flex gap-1 h-16 items-end">

              {[35, 55, 42, 70, 48, 62, 58].map((h, i) => (

                <div

                  key={i}

                  className="flex-1 rounded-t bg-gradient-to-t from-accent-violet-deep via-accent-violet to-accent-cyan opacity-90"

                  style={{ height: `${h}%` }}

                />

              ))}

            </div>

          </motion.div>

        </div>

      </div>

    </section>

  );

}

