import Link from "next/link";
import { ArrowRight, Feather, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

export default function ForWritersPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-verse-gradient pointer-events-none" />
        <div className="verse-container py-20 md:py-28 relative">
          <FadeIn className="max-w-2xl">
            <p className="verse-subheading mb-4">For Writers</p>
            <h1 className="verse-heading text-4xl md:text-5xl mb-6 text-balance">
              Your story deserves a place in the verse
            </h1>
            <p className="text-ivory-muted font-sans text-lg leading-relaxed mb-8">
              The Verse Tribe is a literary website — not a social app. We publish
              original fiction and poetry with care, giving every writer a beautiful
              home for their work and every reader a reason to stay.
            </p>
            <Link href="/about">
              <Button variant="primary" size="lg" className="group">
                Learn how we publish
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="verse-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: BookOpen,
              title: "Beautiful Story Pages",
              desc: "Each work gets its own cover, description, chapter list, and a distraction-free reader built for long-form reading.",
            },
            {
              icon: Feather,
              title: "Literary Presentation",
              desc: "No clutter, no feeds fighting for attention. Your writing is presented the way it deserves — with elegance and space.",
            },
            {
              icon: Sparkles,
              title: "Community, Not Chaos",
              desc: "Readers can discuss chapters and discover your work through curated features, genre browsing, and the journal.",
            },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={0.1 * i}>
              <article className="verse-card p-6 h-full">
                <item.icon className="w-6 h-6 text-violet mb-4" />
                <h2 className="verse-heading text-xl mb-3">{item.title}</h2>
                <p className="text-ivory-muted font-sans text-sm leading-relaxed">
                  {item.desc}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="verse-container pb-20">
        <FadeIn>
          <div className="verse-card p-8 md:p-12 text-center bg-violet/5 border-violet/20">
            <h2 className="verse-heading text-2xl md:text-3xl mb-4">
              Ready to share your work?
            </h2>
            <p className="text-ivory-muted font-sans max-w-lg mx-auto mb-6">
              We&apos;re accepting submissions from fiction and poetry writers.
              Send us your story, a brief bio, and a cover image suggestion.
            </p>
            <a href="mailto:submissions@versetribe.com">
              <Button variant="gold" size="lg">
                submissions@versetribe.com
              </Button>
            </a>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
