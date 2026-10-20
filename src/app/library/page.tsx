import Link from "next/link";
import { BookOpen, Bookmark, Clock } from "lucide-react";
import { libraryItems } from "@/lib/data/mock-data";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/motion/FadeIn";
import { StoryCard } from "@/components/stories/StoryCard";
import { formatRelativeTime } from "@/lib/utils";

export default function LibraryPage() {
  const reading = libraryItems.filter((item) => item.progress > 0);
  const saved = libraryItems.filter((item) => item.isBookmarked);

  return (
    <>
      <PageHero
        eyebrow="Your Collection"
        title="Library"
        description="Stories you've saved and tales you're wandering through."
        compact
      />

      <div className="verse-container py-10 md:py-14 space-y-16">
        <section>
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-5 h-5 text-violet" />
              <h2 className="verse-heading text-2xl md:text-3xl font-light">
                Currently Reading
              </h2>
            </div>
          </FadeIn>

          {reading.length > 0 ? (
            <div className="space-y-4">
              {reading.map((item, i) => (
                <FadeIn key={item.story.id} delay={0.05 * i}>
                  <Link
                    href={`/story/${item.story.slug}`}
                    className="verse-panel flex flex-col sm:flex-row gap-5 p-5 group hover:border-violet/20 transition-colors duration-500"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-sans text-ivory-dim uppercase tracking-widest mb-1">
                        {item.story.genre}
                      </p>
                      <h3 className="verse-heading text-xl group-hover:text-violet transition-colors">
                        {item.story.title}
                      </h3>
                      <p className="text-ivory-muted text-sm font-sans mt-1">
                        by {item.story.author.name}
                      </p>
                      <p className="text-ivory-dim text-xs font-sans mt-3">
                        Last read {formatRelativeTime(new Date(item.lastReadAt))}
                      </p>
                    </div>
                    <div className="sm:w-48 flex flex-col justify-center">
                      <div className="flex justify-between text-xs font-sans text-ivory-dim mb-2">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="h-1 bg-midnight-300 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-deep to-violet rounded-full transition-all duration-500"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          ) : (
            <p className="text-ivory-dim font-sans">No stories in progress.</p>
          )}
        </section>

        <section>
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <Bookmark className="w-5 h-5 text-gold" />
              <h2 className="verse-heading text-2xl md:text-3xl font-light">
                Saved Stories
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {saved.map((item, i) => (
              <FadeIn key={item.story.id} delay={0.05 * i}>
                <StoryCard story={item.story} />
              </FadeIn>
            ))}
          </div>
        </section>

        <FadeIn>
          <div className="verse-panel p-8 text-center">
            <BookOpen className="w-8 h-8 text-violet/60 mx-auto mb-4" />
            <h3 className="verse-heading text-xl mb-2">Discover More Tales</h3>
            <p className="text-ivory-muted font-sans text-sm mb-6 max-w-md mx-auto">
              Your library grows with every story you save. Wander the verse to
              find your next obsession.
            </p>
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 text-sm font-sans text-violet hover:text-violet-whisper transition-colors"
            >
              Explore Discover →
            </Link>
          </div>
        </FadeIn>
      </div>
    </>
  );
}
