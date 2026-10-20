import { SectionHeader } from "@/components/layout/SectionHeader";
import { AssistantWorkspace } from "@/components/assistant/AssistantWorkspace";

export const metadata = {
  title: "AI Research Assistant",
};

export default function AssistantPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Assistant"
        title="AI research assistant"
        description="Ask questions about selected papers with evidence passages and page references when available."
      />
      <AssistantWorkspace />
    </div>
  );
}
