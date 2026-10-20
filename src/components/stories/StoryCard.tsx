import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, BookOpen } from "lucide-react";
import { Story } from "@/lib/data/mock-data";
import { formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { HoverLift } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

interface StoryCardProps {
  story: Story;
  variant?: "default" | "featured" | "compact" | "horizontal";
  className?: string;
}

export function StoryCard({ story, variant = "default", className }: StoryCardProps) {
  if (variant === "featured") {
    return (
      <HoverLift className={cn("group", className)}>
        <Link href={`/story/${story.slug}`} className="block">
          <article className="verse-card overflow-hidden">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={story.coverUrl}
                alt={`Cover of ${story.title}`}
                fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-75 group-hover:opacity-90"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-midnight/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-md bg-white/[0.04] border-t border-white/[0.06]">
                <Badge variant="genre" className="mb-3">
                  {story.genre}
                </Badge>
                <h3 className="verse-heading text-2xl md:text-3xl mb-2 group-hover:text-violet transition-colors">
                  {story.title}
                </h3>
                <p className="text-ivory-muted text-sm font-sans mb-3 line-clamp-2">
                  {story.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-ivory-dim font-sans">
                  <span>{story.author.name}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {formatNumber(story.viewCount)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {formatNumber(story.likeCount)}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </Link>
      </HoverLift>
    );
  }

  if (variant === "horizontal") {
    return (
      <HoverLift className={cn("group", className)}>
        <Link href={`/story/${story.slug}`} className="block">
          <article className="verse-card flex gap-4 p-4">
            <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden rounded-md">
              <Image
                src={story.coverUrl}
                alt={`Cover of ${story.title}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <Badge variant="genre" className="mb-1.5">
                {story.genre}
              </Badge>
              <h3 className="verse-heading text-lg truncate group-hover:text-violet transition-colors">
                {story.title}
              </h3>
              <p className="text-ivory-muted text-xs font-sans mt-1">
                by {story.author.name}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-ivory-dim font-sans">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  {story.chapterCount} ch.
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {formatNumber(story.likeCount)}
                </span>
              </div>
            </div>
          </article>
        </Link>
      </HoverLift>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/story/${story.slug}`} className={cn("group block", className)}>
        <article>
          <div className="relative aspect-[2/3] overflow-hidden rounded-md mb-2">
            <Image
              src={story.coverUrl}
              alt={`Cover of ${story.title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="150px"
            />
          </div>
          <h3 className="verse-heading text-sm truncate group-hover:text-violet transition-colors">
            {story.title}
          </h3>
          <p className="text-ivory-dim text-xs font-sans mt-0.5">{story.author.name}</p>
        </article>
      </Link>
    );
  }

  return (
    <HoverLift className={cn("group", className)}>
      <Link href={`/story/${story.slug}`} className="block">
        <article className="verse-card overflow-hidden h-full flex flex-col">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={story.coverUrl}
              alt={`Cover of ${story.title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-70 group-hover:opacity-85"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/50 to-transparent pointer-events-none" />
            <div className="absolute top-3 left-3">
              <Badge variant="genre">{story.genre}</Badge>
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="verse-heading text-lg mb-1 group-hover:text-violet transition-colors line-clamp-2">
              {story.title}
            </h3>
            <p className="text-ivory-muted text-xs font-sans mb-2">
              by {story.author.name}
            </p>
            <p className="text-ivory-dim text-sm font-sans line-clamp-2 flex-1">
              {story.description}
            </p>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[var(--border)] text-xs text-ivory-dim font-sans">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {formatNumber(story.viewCount)}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5" />
                {formatNumber(story.likeCount)}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                {story.chapterCount}
              </span>
            </div>
          </div>
        </article>
      </Link>
    </HoverLift>
  );
}
