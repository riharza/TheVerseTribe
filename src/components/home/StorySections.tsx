import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Story } from "@/lib/data/mock-data";
import { StoryCard } from "@/components/stories/StoryCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { VerseLink } from "@/components/ui/Link";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}

export function SectionHeader({ title, subtitle, href, linkLabel = "View all" }: SectionHeaderProps) {
  return (
    <FadeIn className="flex items-end justify-between mb-10">
      <div>
        <h2 className="verse-heading text-2xl md:text-3xl lg:text-4xl font-light">{title}</h2>
        {subtitle && (
          <p className="text-ivory-muted text-sm font-sans mt-2 tracking-wide">{subtitle}</p>
        )}
      </div>
      {href && (
        <VerseLink
          href={href}
          variant="champagne"
          className="hidden sm:flex items-center gap-1.5 text-sm font-sans group"
        >
          {linkLabel}
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </VerseLink>
      )}
    </FadeIn>
  );
}

interface StoryGridProps {
  stories: Story[];
  columns?: 2 | 3 | 4;
}

export function StoryGrid({ stories, columns = 4 }: StoryGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <StaggerContainer className={`grid ${gridCols[columns]} gap-5 md:gap-7`}>
      {stories.map((story) => (
        <StaggerItem key={story.id}>
          <StoryCard story={story} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

interface FeaturedStoriesProps {
  stories: Story[];
}

export function FeaturedStories({ stories }: FeaturedStoriesProps) {
  const [hero, ...rest] = stories;

  return (
    <section className="verse-container py-20 md:py-28">
      <SectionHeader
        title="Featured Stories"
        subtitle="Handpicked tales from across the verse"
        href="/discover?sort=featured"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {hero && (
          <FadeIn className="lg:row-span-2">
            <StoryCard story={hero} variant="featured" />
          </FadeIn>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {rest.map((story) => (
            <FadeIn key={story.id} delay={0.1}>
              <StoryCard story={story} variant="compact" />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

interface StorySectionProps {
  title: string;
  subtitle?: string;
  stories: Story[];
  href?: string;
  columns?: 2 | 3 | 4;
}

export function StorySection({
  title,
  subtitle,
  stories,
  href,
  columns = 4,
}: StorySectionProps) {
  return (
    <section className="verse-container py-16 md:py-20">
      <SectionHeader title={title} subtitle={subtitle} href={href} />
      <StoryGrid stories={stories} columns={columns} />
      {href && (
        <div className="sm:hidden mt-8 text-center">
          <Link href={href}>
            <VerseLink href={href} variant="champagne" className="text-sm font-sans inline-flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </VerseLink>
          </Link>
        </div>
      )}
    </section>
  );
}
