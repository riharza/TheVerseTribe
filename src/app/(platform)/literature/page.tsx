import { SectionHeader } from "@/components/layout/SectionHeader";
import { LiteratureExplorer } from "@/components/literature/LiteratureExplorer";
import { MockBanner } from "@/components/ui/MockBanner";

export const metadata = {
  title: "Literature Library",
};

export default function LiteraturePage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Library"
        title="Literature library"
        description="Upload PDFs, search metadata, and organize papers by project."
      />
      <MockBanner feature="Search and filters run on sample JSON; uploads validate locally only" />
      <LiteratureExplorer />
    </div>
  );
}
