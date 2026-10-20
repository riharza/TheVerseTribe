import { RESEARCH_TOOLS } from "@/lib/data/sample";
import { ResearchHero } from "@/components/home/ResearchHero";
import { PlatformDemo } from "@/components/home/PlatformDemo";
import { ToolGrid } from "@/components/research/ToolGrid";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <>
      <ResearchHero />

      <section className="verse-container py-16 md:py-24 border-t border-white/5 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-groove-border opacity-40 pointer-events-none" aria-hidden />
        <SectionHeader
          eyebrow="Capabilities"
          title="Modular tools for the full research loop"
          description="From literature discovery to structured analysis and experiment logging — each module shares projects, papers, and provenance."
        />
        <ToolGrid tools={RESEARCH_TOOLS.filter((t) => t.id !== "tool-workspace")} />
      </section>

      <PlatformDemo />

      <section className="verse-container pb-20 md:pb-28">
        <FadeIn>
          <div className="verse-panel p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <p className="verse-subheading text-accent-cyan/80 mb-2">Research workspace</p>
                <h2 className="font-serif text-2xl md:text-3xl text-ivory mb-3">
                  Start with the dashboard
                </h2>
                <p className="text-ivory-muted font-sans text-sm leading-relaxed">
                  Review recent papers, active projects, and activity — powered by typed sample data
                  in <code className="font-mono text-xs text-accent-cyan">src/lib/data/sample</code>.
                </p>
              </div>
              <Link href="/dashboard" className="shrink-0">
                <Button variant="primary" size="lg">
                  Go to dashboard
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
