"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";

const demoPanels = [
  {
    title: "Literature library",
    metric: "6 sample papers",
    bars: [72, 48, 88, 56, 64],
  },
  {
    title: "Retrieval latency",
    metric: "Preview only",
    bars: [40, 55, 35, 62, 45, 58],
  },
  {
    title: "Experiment runs",
    metric: "4 logged (mock)",
    bars: [30, 42, 38, 50, 44, 52, 48],
  },
];

export function PlatformDemo() {
  return (
    <section className="verse-container py-20 md:py-28">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="verse-subheading text-accent-fuchsia-soft mb-3">Product demonstration</p>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-ivory mb-4 tracking-tight">
            See your research pulse
          </h2>
          <p className="text-ivory-muted font-sans text-sm md:text-base leading-relaxed">
            Clean charts and panels — futuristic look, familiar layout. No clutter, no guesswork.
          </p>
        </div>
      </FadeIn>

      <div className="grid lg:grid-cols-3 gap-6">
        {demoPanels.map((panel, idx) => (
          <FadeIn key={panel.title} delay={idx * 0.08}>
            <div className="verse-panel p-6 h-full groove-panel">
              <div className="flex items-baseline justify-between mb-6">
                <h3 className="font-sans font-medium text-ivory">{panel.title}</h3>
                <span className="text-xs font-mono text-accent-cyan tabular-nums">{panel.metric}</span>
              </div>
              <div className="flex items-end gap-1.5 h-32">
                {panel.bars.map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-accent-violet-deep via-accent-violet to-accent-cyan"
                    initial={{ height: 0, opacity: 0.5 }}
                    whileInView={{ height: `${h}%`, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
              </div>
              <p className="mt-4 text-[11px] text-ivory-dim font-sans">
                Illustrative only — not live telemetry.
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
