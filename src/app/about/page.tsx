import { SectionHeader } from "@/components/layout/SectionHeader";
import Link from "next/link";
import { RESEARCH_TOOLS } from "@/lib/data/sample";
import { ToolGrid } from "@/components/research/ToolGrid";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="verse-container py-6 pb-10 pt-[max(5.5rem,env(safe-area-inset-top))] sm:py-8 md:py-12 md:pt-28">
      <SectionHeader
        eyebrow="About"
        title="The Verse Tribe"
        description="Research software and applied AI for evidence-grounded literature work."
      />
      <div className="max-w-3xl space-y-6 text-ivory-muted font-sans leading-relaxed mb-16">
        <p>
          The Verse Tribe helps researchers discover papers, organize projects, compare methods and
          findings, log experiments, and collaborate with an assistant that surfaces source passages
          — and clearly signals when evidence is insufficient.
        </p>
        <p>
          The interface uses a forest-and-earth palette with restrained motion and dashboard-style
          layouts designed for long research sessions.
        </p>
        <p>
          <Link href="/docs" className="text-accent-cyan hover:underline">
            Read the documentation
          </Link>{" "}
          for setup, mock vs. live API behavior, and the backend roadmap.
        </p>
      </div>
      <SectionHeader title="Research tools" description="Modules share projects and sample library data in this build." />
      <ToolGrid tools={RESEARCH_TOOLS} />
    </div>
  );
}
