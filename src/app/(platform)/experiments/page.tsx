import { SectionHeader } from "@/components/layout/SectionHeader";
import { ExperimentLab } from "@/components/experiments/ExperimentLab";
import { MockBanner } from "@/components/ui/MockBanner";

export const metadata = {
  title: "Experiment Lab",
};

export default function ExperimentsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Experiments"
        title="Experiment lab"
        description="Track runs, model configurations, datasets, and evaluation metrics."
      />
      <MockBanner feature="Run logging and execution pipelines are preview-only" />
      <ExperimentLab />
    </div>
  );
}
