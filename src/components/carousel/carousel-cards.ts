import { RESEARCH_TOOLS } from "@/lib/data/sample";
import type { ResearchTool } from "@/types/research";

export type FeatureCard = {
  id: string;
  tool: ResearchTool;
  accent: string;
};

const accents = ["#5b8a72", "#7ba3c9", "#c9a87c", "#9b8ec4", "#6eb5a8", "#d4a5a5"];

/** Feature modules only — site copy lives on the page, not in cards. */
export function buildFeatureCards(): FeatureCard[] {
  return RESEARCH_TOOLS.map((tool, i) => ({
    id: tool.id,
    tool,
    accent: accents[i % accents.length],
  }));
}
