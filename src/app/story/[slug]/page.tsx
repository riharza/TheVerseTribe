import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Eye, MessageCircle, Play } from "lucide-react";
import { getStoryBySlug, sampleComments } from "@/lib/data/mock-data";
import { formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { CommentSection } from "@/components/comments/CommentSection";
import { LikeButton, BookmarkButton, FollowButton, ShareButton } from "@/components/ui/MicroInteractions";
import { FantasyScene } from "@/components/animations/FantasyScene";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return { title: "Story Not Found" };

  return {
    title: story.title,
    description: story.description,
    openGraph: {
      title: story.title,
      description: story.description,
      images: [{ url: story.coverUrl }],
    },
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const firstChapter = story.chapters.find((c) => c.isPublished);

  return (
    <div className="relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <FantasyScene variant="ambient" />
      </div>

      <div className="verse-container relative py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <FadeIn className="lg:col-span-1">
            <div className="magical-book relative aspect-[2/3] max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-lg">
              <Image
                src={story.coverUrl}
                alt={`Cover of ${story.title}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
          </FadeIn>

          <div className="lg:col-span-2">
            <FadeIn delay={0.1}>
              <Badge variant="genre" className="mb-4">{story.genre}</Badge>
              <h1 className="verse-heading text-3xl md:text-4xl lg:text-5xl mb-4 gold-text">
                {story.title}
              </h1>
              <p className="text-ivory-muted font-sans mb-2">
                by{" "}
                <Link
                  href={`/writers/${story.author.username}`}
                  className="text-champagne hover:text-champagne-light transition-colors"
                >
                  {story.author.name}
                </Link>
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-ivory-dim font-sans mb-6">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" /> {formatNumber(story.viewCount)} reads
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> {story.chapterCount} chapters
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4" /> {formatNumber(story.commentCount)} comments
                </span>
              </div>

              <p className="text-ivory-muted font-serif leading-relaxed mb-6 max-w-2xl italic">
                {story.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {story.tags.map((tag) => (
                  <Badge key={tag} variant="tag">{tag}</Badge>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-8">
                {firstChapter && (
                  <Link href={`/story/${story.slug}/chapter/${firstChapter.id}`}>
                    <Button variant="primary" size="lg" className="group">
                      <Play className="w-4 h-4" />
                      Start Reading
                    </Button>
                  </Link>
                )}
                <LikeButton count={story.likeCount} />
                <BookmarkButton />
                <FollowButton name={story.author.name} />
                <ShareButton />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="verse-heading text-xl mb-4">Chapters</h2>
              <div className="space-y-2">
                {story.chapters.filter((c) => c.isPublished).map((chapter) => (
                  <Link
                    key={chapter.id}
                    href={`/story/${story.slug}/chapter/${chapter.id}`}
                    className="verse-card flex items-center justify-between p-4 hover:border-champagne/20 transition-colors group"
                  >
                    <div>
                      <span className="text-ivory-dim text-xs font-sans mr-3">
                        {chapter.orderIndex}
                      </span>
                      <span className="font-serif text-ivory group-hover:text-champagne transition-colors">
                        {chapter.title}
                      </span>
                    </div>
                    <span className="text-ivory-dim text-xs font-sans">
                      {chapter.wordCount.toLocaleString()} words
                    </span>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.3} className="mt-12 md:mt-16">
          <h2 className="verse-heading text-xl mb-6">
            Reader Discussions
            <span className="text-ivory-dim text-base font-sans ml-2">
              ({story.commentCount})
            </span>
          </h2>
          <CommentSection comments={sampleComments} />
        </FadeIn>
      </div>
    </div>
  );
}
