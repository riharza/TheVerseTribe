import { SectionHeader } from "@/components/layout/SectionHeader";
import { ComparisonTable } from "@/components/analysis/ComparisonTable";
import { MockBanner } from "@/components/ui/MockBanner";
import { SAMPLE_ANALYSIS } from "@/lib/data/sample";

export const metadata = {
  title: "Research Analysis",
};

export default function AnalysisPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Analysis"
        title="Research analysis"
        description="Compare methods, datasets, sample sizes, metrics, limitations, and findings."
      />
      <MockBanner feature="Comparison rows are curated sample data; extraction pipelines not connected" />
      <ComparisonTable rows={SAMPLE_ANALYSIS} />
    </div>
  );
}
