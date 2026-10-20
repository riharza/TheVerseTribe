import Link from "next/link";
import { communityActivity, getFeaturedWriters, forumThreads, forumCategories } from "@/lib/data/mock-data";
import { ActivityFeed } from "@/components/community/ActivityFeed";
import { Guardian } from "@/components/characters/Guardian";
import { FadeIn } from "@/components/motion/FadeIn";
import { WriterCard } from "@/components/writers/WriterCard";
import { formatRelativeTime } from "@/lib/utils";

export default function CommunityPage() {
  const writers = getFeaturedWriters();
  const recentThreads = forumThreads.slice(0, 4);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-mid/30 to-navy-deep pointer-events-none" />

      <div className="relative verse-container pt-28 pb-16 md:pt-32 md:pb-24">
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-14">
            <div className="max-w-xl">
              <p className="verse-subheading text-champagne/60 mb-3">Beyond the Gate</p>
              <h1 className="verse-heading text-4xl md:text-5xl font-light gold-text mb-4">Community</h1>
              <p className="text-ivory-muted font-sans leading-relaxed">
                Step through the Guardian&apos;s gate into discussions, writing help, recommendations, and the living pulse of the Verse Tribe.
              </p>
            </div>
            <div className="hidden md:block shrink-0">
              <Guardian gateOpen />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="mb-12">
          <h2 className="verse-heading text-xl mb-5 text-champagne/80">Forum Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {forumCategories.map((cat) => (
              <Link key={cat.id} href={`/forum?category=${cat.slug}`} className="glass-tile p-5 hover:border-champagne/30 group block">
                <h3 className="font-serif text-lg text-ivory group-hover:text-champagne transition-colors">{cat.name}</h3>
                <p className="text-ivory-dim text-xs font-sans mt-1 leading-relaxed">{cat.description}</p>
                <p className="text-champagne/60 text-[10px] font-sans uppercase tracking-widest mt-3">{cat.threadCount} threads</p>
              </Link>
            ))}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <FadeIn delay={0.15}>
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="verse-heading text-xl">Recent Discussions</h2>
                  <Link href="/forum" className="text-sm font-sans text-champagne hover:text-champagne-light">View Forum →</Link>
                </div>
                <div className="space-y-3">
                  {recentThreads.map((thread) => (
                    <Link key={thread.id} href={`/forum/${thread.id}`} className="glass-tile block p-5 hover:border-champagne/25 group">
                      <h3 className="font-serif text-lg text-ivory group-hover:text-champagne transition-colors">{thread.title}</h3>
                      <p className="text-ivory-dim text-xs font-sans mt-2">
                        {thread.author.name} · {thread.replyCount} replies · {formatRelativeTime(new Date(thread.updatedAt))}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            </FadeIn>

            <FadeIn delay={0.2}>
              <section className="verse-panel p-5">
                <h2 className="verse-heading text-xl mb-4">Recent Activity</h2>
                <ActivityFeed items={communityActivity} />
              </section>
            </FadeIn>
          </div>

          <FadeIn delay={0.18}>
            <section>
              <h2 className="verse-heading text-xl mb-4">Active Writers</h2>
              <div className="space-y-4">
                {writers.slice(0, 4).map((w) => (
                  <WriterCard key={w.id} author={w} />
                ))}
              </div>
            </section>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
