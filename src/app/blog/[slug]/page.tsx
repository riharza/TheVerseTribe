import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/data/mock-data";
import { formatRelativeTime } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion/FadeIn";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverUrl }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="verse-container py-8 md:py-12 max-w-3xl">
      <FadeIn>
        <Badge variant="genre" className="mb-4">{post.category}</Badge>
        <h1 className="verse-heading text-3xl md:text-4xl lg:text-5xl mb-6 text-balance">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-8">
          <div className="relative w-10 h-10 overflow-hidden rounded-full">
            <Image
              src={post.author.avatarUrl}
              alt={post.author.name}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <Link
              href={`/writers/${post.author.username}`}
              className="text-sm font-sans text-ivory hover:text-violet transition-colors"
            >
              {post.author.name}
            </Link>
            <time className="block text-xs font-sans text-ivory-dim">
              {formatRelativeTime(new Date(post.publishedAt))}
            </time>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-10">
          <Image
            src={post.coverUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="prose-verse">
          <p className="text-xl text-ivory-muted font-serif leading-relaxed mb-8 italic">
            {post.excerpt}
          </p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-[var(--border)]">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="tag">{tag}</Badge>
          ))}
        </div>
      </FadeIn>
    </article>
  );
}
