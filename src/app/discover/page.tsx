"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { searchStories, getTrendingStories, getFeaturedWriters } from "@/lib/data/mock-data";
import { MagicalBookCard } from "@/components/stories/MagicalBookCard";
import { GenreFilter } from "@/components/discover/GenreFilter";
import { FantasyScene } from "@/components/animations/FantasyScene";
import { Wanderer } from "@/components/characters/Wanderer";
import { FadeIn } from "@/components/motion/FadeIn";
import { WriterCard } from "@/components/writers/WriterCard";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "trending", label: "Trending" },
  { value: "popular", label: "Popular" },
  { value: "newest", label: "Newest" },
  { value: "updated", label: "Recently Updated" },
];

function ExploreContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [genre, setGenre] = useState(searchParams.get("genre") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "trending");

  let results = searchStories(query, genre || undefined);
  if (sort === "trending") results = [...results].sort((a, b) => b.viewCount - a.viewCount);
  else if (sort === "popular") results = [...results].sort((a, b) => b.likeCount - a.likeCount);
  else if (sort === "newest") results = [...results].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  else if (sort === "updated") results = [...results].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const authors = getFeaturedWriters();
  const featured = getTrendingStories().slice(0, 3);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 h-[50vh] overflow-hidden pointer-events-none">
        <FantasyScene variant="ambient" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-deep/50 to-navy-deep" />
      </div>

      <div className="relative verse-container pt-28 pb-16 md:pt-32 md:pb-24">
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <p className="verse-subheading text-champagne/60 mb-3">The Enchanted Library</p>
              <h1 className="verse-heading text-4xl md:text-5xl font-light gold-text">Explore</h1>
              <p className="text-ivory-muted font-sans mt-3 max-w-lg">
                Wander through shelves of magical books — trending tales, hidden gems, and voices waiting to be discovered.
              </p>
            </div>
            <div className="hidden lg:block opacity-70">
              <Wanderer />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ivory-dim" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stories, authors, tags..."
                className="verse-input pl-11 py-3"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSort(opt.value)}
                  className={cn(
                    "px-4 py-2 text-sm font-sans rounded-xl transition-all",
                    sort === opt.value
                      ? "bg-champagne/15 text-champagne border border-champagne/30"
                      : "glass-tile text-ivory-muted hover:text-ivory"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="mb-10">
          <GenreFilter activeGenre={genre} onSelect={setGenre} />
        </FadeIn>

        {!query && !genre && (
          <FadeIn delay={0.2} className="mb-12">
            <h2 className="verse-heading text-xl mb-6 text-champagne/80">Featured Stories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5">
              {featured.map((story, i) => (
                <FadeIn key={story.id} delay={0.05 * i}>
                  <MagicalBookCard story={story} />
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.25}>
          <h2 className="verse-heading text-xl mb-6">
            {query || genre ? "Search Results" : "All Stories"}
            <span className="text-ivory-dim text-sm font-sans ml-3">({results.length})</span>
          </h2>
          {results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
              {results.map((story, i) => (
                <FadeIn key={story.id} delay={0.03 * i}>
                  <MagicalBookCard story={story} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="glass-tile p-12 text-center">
              <p className="verse-heading text-xl text-ivory-muted">No stories found</p>
            </div>
          )}
        </FadeIn>

        <FadeIn delay={0.3} className="mt-16">
          <h2 className="verse-heading text-xl mb-6 text-champagne/80">Popular Authors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {authors.map((a) => (
              <WriterCard key={a.id} author={a} />
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="verse-container py-32 text-center text-ivory-muted">Entering the library...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
