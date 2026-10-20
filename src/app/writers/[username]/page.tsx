import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Eye, Award, Bookmark, Heart } from "lucide-react";
import {
  getAuthorByUsername,
  getStoriesByAuthor,
  libraryItems,
} from "@/lib/data/mock-data";
import { formatNumber } from "@/lib/utils";
import { MagicalBookCard } from "@/components/stories/MagicalBookCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { FollowButton } from "@/components/ui/MicroInteractions";
import { Badge } from "@/components/ui/Badge";
import { FantasyScene } from "@/components/animations/FantasyScene";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const author = getAuthorByUsername(username);
  if (!author) return { title: "Writer Not Found" };

  return {
    title: author.name,
    description: author.bio,
  };
}

const achievements = [
  "Realm Weaver — 10+ published stories",
  "Starlight Reader — 50K+ total reads",
  "Tribe Elder — 5K+ followers",
];

export default async function WriterPage({ params }: Props) {
  const { username } = await params;
  const author = getAuthorByUsername(username);
  if (!author) notFound();

  const stories = getStoriesByAuthor(username);
  const published = stories.filter((s) => s.status === "PUBLISHED");
  const favorites = libraryItems.slice(0, 3);

  return (
    <div className="relative">
      {/* Personalized fantasy backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FantasyScene variant="ambient" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-navy/80 to-navy-deep" />
      </div>

      <div className="verse-container relative py-8 md:py-12">
        <FadeIn>
          <div className="verse-panel p-6 md:p-10 mb-10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-72 h-72 bg-champagne/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-glow/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-start gap-6 md:gap-8">
              <div className="relative w-28 h-28 md:w-36 md:h-36 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-champagne/40 shadow-[0_0_30px_rgba(212,175,106,0.2)]">
                <Image
                  src={author.avatarUrl}
                  alt={author.name}
                  fill
                  className="object-cover"
                  sizes="144px"
                  priority
                />
              </div>

              <div className="flex-1">
                <p className="verse-subheading text-champagne/50 mb-2">Author of the Verse</p>
                <h1 className="verse-heading text-3xl md:text-4xl gold-text">{author.name}</h1>
                <p className="text-ivory-dim font-sans text-sm mt-1">@{author.username}</p>
                <p className="text-ivory-muted font-serif leading-relaxed mt-4 max-w-2xl italic">
                  {author.bio}
                </p>

                <div className="flex flex-wrap items-center gap-6 mt-5 text-sm font-sans text-ivory-dim">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-champagne" />
                    {formatNumber(author.followerCount)} followers
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-champagne" />
                    {author.storyCount} stories
                  </span>
                </div>

                <div className="mt-6">
                  <FollowButton name={author.name} />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <section className="mb-10">
            <h2 className="verse-heading text-xl mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-champagne" />
              Achievements
            </h2>
            <div className="flex flex-wrap gap-3">
              {achievements.map((a) => (
                <Badge key={a} variant="gold" className="px-4 py-1.5">{a}</Badge>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.15}>
          <section className="mb-10">
            <h2 className="verse-heading text-xl mb-6">Published Stories</h2>
            {published.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {published.map((story) => (
                  <MagicalBookCard key={story.id} story={story} />
                ))}
              </div>
            ) : (
              <p className="text-ivory-dim font-sans text-sm">No stories published yet.</p>
            )}
          </section>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h2 className="verse-heading text-xl mb-4 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-champagne" />
                Reading List
              </h2>
              <div className="space-y-3">
                {favorites.map((item) => (
                  <Link
                    key={item.story.id}
                    href={`/story/${item.story.slug}`}
                    className="verse-panel flex items-center gap-3 p-4 hover:border-champagne/20 transition-colors group"
                  >
                    <div className="relative w-10 h-14 rounded overflow-hidden shrink-0">
                      <Image src={item.story.coverUrl} alt="" fill className="object-cover" sizes="40px" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-serif text-sm text-ivory group-hover:text-champagne transition-colors truncate">
                        {item.story.title}
                      </p>
                      <p className="text-xs text-ivory-dim">{item.progress}% read</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="verse-heading text-xl mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-champagne" />
                Favorite Stories
              </h2>
              <div className="space-y-3">
                {stories.slice(0, 3).map((story) => (
                  <Link
                    key={story.id}
                    href={`/story/${story.slug}`}
                    className="verse-panel flex items-center gap-3 p-4 hover:border-champagne/20 transition-colors group"
                  >
                    <div className="relative w-10 h-14 rounded overflow-hidden shrink-0">
                      <Image src={story.coverUrl} alt="" fill className="object-cover" sizes="40px" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-serif text-sm text-ivory group-hover:text-champagne transition-colors truncate">
                        {story.title}
                      </p>
                      <p className="text-xs text-ivory-dim">{story.genre}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
