import { Metadata } from "next";
import Link from "next/link";
import { getFeaturedWriters } from "@/lib/data/mock-data";
import { WriterCard } from "@/components/writers/WriterCard";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Writers",
  description: "Meet the writers publishing original fiction on The Verse Tribe.",
};

export default function WritersPage() {
  const writers = getFeaturedWriters();

  return (
    <div className="verse-container py-8 md:py-12">
      <FadeIn>
        <h1 className="verse-heading text-3xl md:text-4xl mb-2">Writers</h1>
        <p className="text-ivory-muted font-sans mb-10 max-w-xl">
          The voices shaping our literary universe — discover their stories and follow
          their latest chapters.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {writers.map((writer, i) => (
          <FadeIn key={writer.id} delay={0.05 * i}>
            <WriterCard author={writer} />
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3} className="mt-12 text-center">
        <p className="text-ivory-dim font-sans text-sm mb-4">
          Want to see your name here?
        </p>
        <Link
          href="/for-writers"
          className="text-violet hover:text-violet-muted font-sans text-sm transition-colors"
        >
          Learn about publishing on The Verse Tribe →
        </Link>
      </FadeIn>
    </div>
  );
}
