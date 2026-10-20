import { Author } from "@/lib/data/mock-data";
import { WriterCard } from "@/components/writers/WriterCard";
import { SectionHeader } from "@/components/home/StorySections";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";

interface FeaturedWritersProps {
  writers: Author[];
}

export function FeaturedWriters({ writers }: FeaturedWritersProps) {
  return (
    <section className="verse-container py-12 md:py-16">
      <SectionHeader
        title="Featured Writers"
        subtitle="Voices shaping the literary verse"
        href="/writers"
        linkLabel="All writers"
      />
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {writers.map((writer) => (
          <StaggerItem key={writer.id}>
            <WriterCard author={writer} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

interface GenreDiscoveryProps {
  children: React.ReactNode;
}

export function GenreDiscovery({ children }: GenreDiscoveryProps) {
  return (
    <section className="verse-container py-12 md:py-16">
      <SectionHeader
        title="Explore by Genre"
        subtitle="Find your next literary obsession"
        href="/discover"
      />
      <FadeIn delay={0.1}>{children}</FadeIn>
    </section>
  );
}

interface CommunitySectionProps {
  children: React.ReactNode;
}

export function CommunitySection({ children }: CommunitySectionProps) {
  return (
    <section className="verse-container py-12 md:py-16">
      <div className="verse-card p-6 md:p-8">
        <SectionHeader
          title="Community Activity"
          subtitle="What's happening in the verse right now"
          href="/community"
        />
        <FadeIn delay={0.1}>{children}</FadeIn>
      </div>
    </section>
  );
}
