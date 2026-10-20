import Link from "next/link";
import { Pin, MessageCircle, Eye } from "lucide-react";
import {
  forumCategories,
  forumThreads,
  getForumCategoryById,
} from "@/lib/data/mock-data";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/motion/FadeIn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatRelativeTime, formatNumber } from "@/lib/utils";

export default function ForumPage() {
  const pinned = forumThreads.filter((t) => t.isPinned);
  const recent = forumThreads.filter((t) => !t.isPinned);

  return (
    <>
      <PageHero
        eyebrow="Community Voices"
        title="The Forum"
        description="Discuss craft, share discoveries, and connect with fellow storytellers of the verse."
        compact
      >
        <Button variant="primary" size="md">
          Start a Discussion
        </Button>
      </PageHero>

      <div className="verse-container py-10 md:py-14">
        {/* Categories */}
        <FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {forumCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/forum?category=${cat.slug}`}
                className="verse-panel p-5 hover:border-champagne/20 transition-all duration-500 group"
              >
                <h3 className="verse-heading text-lg group-hover:text-champagne transition-colors mb-1">
                  {cat.name}
                </h3>
                <p className="text-ivory-dim text-xs font-sans leading-relaxed mb-3">
                  {cat.description}
                </p>
                <span className="text-[11px] font-sans text-champagne/60 uppercase tracking-widest">
                  {cat.threadCount} threads
                </span>
              </Link>
            ))}
          </div>
        </FadeIn>

        {/* Pinned threads */}
        {pinned.length > 0 && (
          <section className="mb-10">
            <FadeIn>
              <h2 className="verse-subheading mb-5 flex items-center gap-2">
                <Pin className="w-3.5 h-3.5" />
                Pinned
              </h2>
            </FadeIn>
            <div className="space-y-3">
              {pinned.map((thread, i) => {
                const category = getForumCategoryById(thread.categoryId);
                return (
                  <FadeIn key={thread.id} delay={0.05 * i}>
                    <Link
                      href={`/forum/${thread.id}`}
                      className="verse-panel flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 hover:border-gold/20 transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Pin className="w-3 h-3 text-gold" />
                          {category && (
                            <Badge variant="tag">{category.name}</Badge>
                          )}
                        </div>
                        <h3 className="verse-heading text-lg group-hover:text-champagne transition-colors">
                          {thread.title}
                        </h3>
                        <p className="text-ivory-dim text-xs font-sans mt-1">
                          {thread.author.name} · {formatRelativeTime(new Date(thread.updatedAt))}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-sans text-ivory-dim">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {thread.replyCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {formatNumber(thread.viewCount)}
                        </span>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          </section>
        )}

        {/* Recent threads */}
        <section>
          <FadeIn>
            <h2 className="verse-heading text-xl mb-6 font-light">Recent Discussions</h2>
          </FadeIn>
          <div className="space-y-3">
            {recent.map((thread, i) => {
              const category = getForumCategoryById(thread.categoryId);
              return (
                <FadeIn key={thread.id} delay={0.05 * i}>
                  <Link
                    href={`/forum/${thread.id}`}
                    className="verse-panel flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 hover:border-champagne/20 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      {category && (
                        <Badge variant="genre" className="mb-2">{category.name}</Badge>
                      )}
                      <h3 className="verse-heading text-lg group-hover:text-champagne transition-colors">
                        {thread.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {thread.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-sans text-ivory-dim uppercase tracking-wider">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-sans text-ivory-dim shrink-0">
                      <span>{thread.author.name}</span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" />
                        {thread.replyCount}
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
