import { blogPosts } from "@/lib/data/mock-data";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/motion/FadeIn";
import { ManuscriptCard } from "@/components/blog/ManuscriptCard";
import { Badge } from "@/components/ui/Badge";
import { BLOG_CATEGORIES } from "@/lib/utils";
import { FantasyScene } from "@/components/animations/FantasyScene";

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
          <FantasyScene variant="ambient" />
        </div>
        <PageHero
          eyebrow="The Verse Archive"
          title="Literary Manuscripts"
          description="Writing advice, author interviews, book recommendations, community news, and platform updates — preserved like ancient scrolls."
        />
      </div>

      <div className="verse-container py-10 md:py-14">
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {BLOG_CATEGORIES.map((cat) => (
              <Badge
                key={cat}
                variant="tag"
                className="cursor-pointer hover:border-champagne/30 hover:text-champagne transition-colors duration-300"
              >
                {cat}
              </Badge>
            ))}
          </div>
        </FadeIn>

        {featured && (
          <FadeIn delay={0.15} className="mb-12">
            <ManuscriptCard post={featured} featured />
          </FadeIn>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <FadeIn key={post.id} delay={0.08 * i}>
              <ManuscriptCard post={post} />
            </FadeIn>
          ))}
        </div>
      </div>
    </>
  );
}
