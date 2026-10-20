"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, BookOpen, User, Newspaper, MessagesSquare } from "lucide-react";
import { globalSearch } from "@/lib/data/mock-data";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/motion/FadeIn";
import { StoryCard } from "@/components/stories/StoryCard";
import { Badge } from "@/components/ui/Badge";
import { formatRelativeTime } from "@/lib/utils";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const results = globalSearch(query);
  const totalResults =
    results.stories.length +
    results.authors.length +
    results.blogPosts.length +
    results.forumThreads.length;

  return (
    <>
      <PageHero
        eyebrow="Find Your Thread"
        title="Search the Verse"
        description="Stories, authors, blog posts, and forum discussions — all in one place."
        compact
      >
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ivory-dim" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the verse..."
            className="verse-input pl-12 py-3.5 text-base"
            autoFocus
          />
        </div>
      </PageHero>

      <div className="verse-container py-10 md:py-14">
        {query && (
          <FadeIn>
            <p className="text-sm font-sans text-ivory-dim mb-10">
              {totalResults} result{totalResults !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
            </p>
          </FadeIn>
        )}

        {!query && (
          <FadeIn>
            <p className="text-ivory-muted font-sans text-center py-16">
              Begin typing to search across the entire verse
            </p>
          </FadeIn>
        )}

        {results.stories.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-4 h-4 text-violet" />
              <h2 className="verse-heading text-xl">Stories</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {results.stories.map((story, i) => (
                <FadeIn key={story.id} delay={0.05 * i}>
                  <StoryCard story={story} />
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {results.authors.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-4 h-4 text-violet" />
              <h2 className="verse-heading text-xl">Authors</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.authors.map((author, i) => (
                <FadeIn key={author.id} delay={0.05 * i}>
                  <Link
                    href={`/writers/${author.username}`}
                    className="verse-panel flex items-center gap-4 p-4 hover:border-violet/20 transition-colors"
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-violet/20">
                      <Image src={author.avatarUrl} alt={author.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div>
                      <h3 className="font-serif text-ivory">{author.name}</h3>
                      <p className="text-ivory-dim text-xs font-sans">@{author.username}</p>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {results.blogPosts.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-6">
              <Newspaper className="w-4 h-4 text-violet" />
              <h2 className="verse-heading text-xl">Blog</h2>
            </div>
            <div className="space-y-3">
              {results.blogPosts.map((post, i) => (
                <FadeIn key={post.id} delay={0.05 * i}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="verse-panel block p-5 hover:border-violet/20 transition-colors group"
                  >
                    <Badge variant="genre" className="mb-2">{post.category}</Badge>
                    <h3 className="verse-heading text-lg group-hover:text-violet transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-ivory-dim text-sm font-sans mt-1">{post.excerpt}</p>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {results.forumThreads.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <MessagesSquare className="w-4 h-4 text-violet" />
              <h2 className="verse-heading text-xl">Forum</h2>
            </div>
            <div className="space-y-3">
              {results.forumThreads.map((thread, i) => (
                <FadeIn key={thread.id} delay={0.05 * i}>
                  <Link
                    href={`/forum/${thread.id}`}
                    className="verse-panel block p-5 hover:border-violet/20 transition-colors group"
                  >
                    <h3 className="verse-heading text-lg group-hover:text-violet transition-colors">
                      {thread.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-xs font-sans text-ivory-dim">
                      <span>{thread.author.name}</span>
                      <span>·</span>
                      <span>{thread.replyCount} replies</span>
                      <span>·</span>
                      <time>{formatRelativeTime(new Date(thread.updatedAt))}</time>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {query && totalResults === 0 && (
          <div className="text-center py-20">
            <p className="verse-heading text-xl text-ivory-muted mb-2">Nothing found</p>
            <p className="text-ivory-dim font-sans text-sm">
              Try different words or browse{" "}
              <Link href="/discover" className="text-violet hover:text-violet-whisper">
                Discover
              </Link>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="verse-container py-20 text-center text-ivory-muted">Searching...</div>}>
      <SearchContent />
    </Suspense>
  );
}
