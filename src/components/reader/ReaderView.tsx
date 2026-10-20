"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  List,
  Minus,
  Plus,
  Sun,
  Moon,
  X,
} from "lucide-react";
import {
  getStoryBySlug,
  getChapterById,
} from "@/lib/data/mock-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { LikeButton, BookmarkButton, FollowButton, ShareButton } from "@/components/ui/MicroInteractions";

interface ReaderProps {
  slug: string;
  chapterId: string;
}

export function ReaderView({ slug, chapterId }: ReaderProps) {
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const chapter = getChapterById(slug, chapterId);
  if (!chapter) notFound();

  const publishedChapters = story.chapters.filter((c) => c.isPublished);
  const currentIndex = publishedChapters.findIndex((c) => c.id === chapterId);
  const prevChapter = currentIndex > 0 ? publishedChapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < publishedChapters.length - 1
      ? publishedChapters[currentIndex + 1]
      : null;

  const [fontSize, setFontSize] = useState(18);
  const [maxWidth, setMaxWidth] = useState<"narrow" | "medium" | "wide">("medium");
  const [readingMode, setReadingMode] = useState<"dark" | "light">("dark");
  const [showToc, setShowToc] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const widthClasses = {
    narrow: "max-w-xl",
    medium: "max-w-2xl",
    wide: "max-w-4xl",
  };

  const progress = ((currentIndex + 1) / publishedChapters.length) * 100;

  const defaultContent = `<p>The chapter content would appear here. Connect your database and seed data to load full chapter text.</p>
<p>For now, enjoy this preview of the reading experience — distraction-free, elegant, and designed for long-form literary immersion.</p>
<p>Adjust font size, reading width, and switch between light and dark modes using the controls above. Navigate between chapters with the arrows at the bottom.</p>`;

  const content = chapter.content || defaultContent;

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300 relative",
        readingMode === "dark" ? "bg-navy-deep" : "bg-[#f5f0e8]"
      )}
    >
      {/* Subtle fantasy atmosphere at edges — does not interfere with reading */}
      {readingMode === "dark" && (
        <>
          <div className="fixed inset-x-0 top-0 h-32 bg-gradient-to-b from-ocean/10 to-transparent pointer-events-none z-0" />
          <div className="fixed inset-x-0 bottom-0 h-32 bg-gradient-to-t from-emerald-deep/10 to-transparent pointer-events-none z-0" />
        </>
      )}

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-ivory/5">
        <div
          className="h-full bg-champagne/70 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top bar */}
      <header
        className={cn(
          "fixed top-0.5 left-0 right-0 z-40 transition-transform duration-300",
          !showControls && "-translate-y-full",
          readingMode === "dark"
            ? "bg-navy-deep/90 backdrop-blur-md border-b border-champagne/10"
            : "bg-[#f5f0e8]/90 backdrop-blur-md border-b border-stone-200"
        )}
      >
        <div className="flex items-center justify-between px-4 h-14 max-w-5xl mx-auto">
          <Link
            href={`/story/${slug}`}
            className={cn(
              "text-sm font-sans transition-colors truncate max-w-[40%]",
              readingMode === "dark"
                ? "text-ivory-muted hover:text-champagne"
                : "text-stone-500 hover:text-stone-800"
            )}
          >
            ← {story.title}
          </Link>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setFontSize((s) => Math.max(14, s - 2))}
              className={cn(
                "p-2 rounded-md transition-colors",
                readingMode === "dark" ? "hover:bg-champagne/5" : "hover:bg-stone-200"
              )}
              aria-label="Decrease font size"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span
              className={cn(
                "text-xs font-sans w-8 text-center",
                readingMode === "dark" ? "text-ivory-dim" : "text-stone-500"
              )}
            >
              {fontSize}
            </span>
            <button
              onClick={() => setFontSize((s) => Math.min(28, s + 2))}
              className={cn(
                "p-2 rounded-md transition-colors",
                readingMode === "dark" ? "hover:bg-champagne/5" : "hover:bg-stone-200"
              )}
              aria-label="Increase font size"
            >
              <Plus className="w-4 h-4" />
            </button>

            <div className="w-px h-5 bg-ivory/10 mx-1 hidden sm:block" />

            {(["narrow", "medium", "wide"] as const).map((w) => (
              <button
                key={w}
                onClick={() => setMaxWidth(w)}
                className={cn(
                  "px-2 py-1 text-xs font-sans rounded transition-colors capitalize hidden sm:block",
                  maxWidth === w
                    ? "bg-champagne/20 text-champagne"
                    : readingMode === "dark"
                      ? "text-ivory-dim hover:text-ivory"
                      : "text-stone-500 hover:text-stone-800"
                )}
              >
                {w[0].toUpperCase()}
              </button>
            ))}

            <div className="w-px h-5 bg-ivory/10 mx-1" />

            <button
              onClick={() => setReadingMode((m) => (m === "dark" ? "light" : "dark"))}
              className={cn(
                "p-2 rounded-md transition-colors",
                readingMode === "dark" ? "hover:bg-champagne/5" : "hover:bg-stone-200"
              )}
              aria-label="Toggle reading mode"
            >
              {readingMode === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setShowToc(true)}
              className={cn(
                "p-2 rounded-md transition-colors",
                readingMode === "dark" ? "hover:bg-champagne/5" : "hover:bg-stone-200"
              )}
              aria-label="Table of contents"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Chapter content — clean reading zone */}
      <article
        className={cn("relative mx-auto px-6 pt-24 pb-32 z-10", widthClasses[maxWidth])}
        onClick={() => setShowControls((s) => !s)}
      >
        <p
          className={cn(
            "text-xs font-sans uppercase tracking-widest mb-2",
            readingMode === "dark" ? "text-ivory-dim" : "text-stone-400"
          )}
        >
          Chapter {chapter.orderIndex}
        </p>
        <h1
          className={cn(
            "font-serif text-3xl md:text-4xl font-light mb-8",
            readingMode === "dark" ? "text-ivory" : "text-stone-800"
          )}
        >
          {chapter.title}
        </h1>
        <div
          className={cn(
            readingMode === "dark" ? "reader-prose-dark" : "reader-prose-light"
          )}
          style={{ fontSize: `${fontSize}px` }}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Social actions below chapter — minimal, non-distracting */}
        <div
          className={cn(
            "flex flex-wrap items-center gap-2 mt-12 pt-8 border-t",
            readingMode === "dark" ? "border-champagne/10" : "border-stone-200"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <LikeButton count={story.likeCount} />
          <BookmarkButton />
          <FollowButton name={story.author.name} />
          <ShareButton />
        </div>
      </article>

      {/* Bottom navigation */}
      <footer
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300",
          !showControls && "translate-y-full",
          readingMode === "dark"
            ? "bg-navy-deep/90 backdrop-blur-md border-t border-champagne/10"
            : "bg-[#f5f0e8]/90 backdrop-blur-md border-t border-stone-200"
        )}
      >
        <div className="flex items-center justify-between px-4 h-16 max-w-5xl mx-auto">
          {prevChapter ? (
            <Link href={`/story/${slug}/chapter/${prevChapter.id}`}>
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
            </Link>
          ) : (
            <div />
          )}

          <span
            className={cn(
              "text-xs font-sans",
              readingMode === "dark" ? "text-ivory-dim" : "text-stone-400"
            )}
          >
            {currentIndex + 1} of {publishedChapters.length}
          </span>

          {nextChapter ? (
            <Link href={`/story/${slug}/chapter/${nextChapter.id}`}>
              <Button variant="ghost" size="sm">
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <Link href={`/story/${slug}`}>
              <Button variant="primary" size="sm">
                Finish
              </Button>
            </Link>
          )}
        </div>
      </footer>

      {/* Table of Contents overlay */}
      {showToc && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-navy-deep/60 backdrop-blur-sm"
            onClick={() => setShowToc(false)}
          />
          <aside className="relative ml-auto w-full max-w-sm bg-navy-mid border-l border-champagne/10 h-full overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between p-4 border-b border-champagne/10">
              <h2 className="verse-heading text-lg">Chapters</h2>
              <button
                onClick={() => setShowToc(false)}
                className="p-1 text-ivory-muted hover:text-champagne"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-2">
              {publishedChapters.map((ch) => (
                <Link
                  key={ch.id}
                  href={`/story/${slug}/chapter/${ch.id}`}
                  onClick={() => setShowToc(false)}
                  className={cn(
                    "block px-4 py-3 rounded-md text-sm font-sans transition-colors",
                    ch.id === chapterId
                      ? "bg-champagne/10 text-champagne"
                      : "text-ivory-muted hover:text-ivory hover:bg-champagne/5"
                  )}
                >
                  <span className="text-ivory-dim mr-2">{ch.orderIndex}.</span>
                  {ch.title}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}
