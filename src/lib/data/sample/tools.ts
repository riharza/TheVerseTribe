import type { ResearchTool } from "@/types/research";

export const RESEARCH_TOOLS: ResearchTool[] = [
  {
    id: "tool-workspace",
    name: "Research Workspace",
    description: "Dashboard for papers, projects, and recent activity.",
    href: "/dashboard",
    status: "available",
    icon: "workspace",
  },
  {
    id: "tool-assistant",
    name: "AI Research Assistant",
    description: "Upload PDFs and ask evidence-grounded questions with source passages.",
    href: "/assistant",
    status: "preview",
    icon: "assistant",
  },
  {
    id: "tool-literature",
    name: "Literature Explorer",
    description: "Search, filter, and organize papers with DOI and metadata fields.",
    href: "/literature",
    status: "preview",
    icon: "literature",
  },
  {
    id: "tool-analysis",
    name: "Research Analysis",
    description: "Extract and compare methods, datasets, metrics, and limitations.",
    href: "/analysis",
    status: "planned",
    icon: "analysis",
  },
  {
    id: "tool-experiments",
    name: "Experiment Lab",
    description: "Track configurations, datasets, metrics, and run history.",
    href: "/experiments",
    status: "planned",
    icon: "experiments",
  },
];
