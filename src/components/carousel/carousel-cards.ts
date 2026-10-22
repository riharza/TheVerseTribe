import { RESEARCH_TOOLS } from "@/lib/data/sample";
import { FOREST } from "@/lib/theme/forest-palette";
import type { ResearchTool } from "@/types/research";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Bot,
  FlaskConical,
  GitCompare,
  LayoutDashboard,
  Library,
} from "lucide-react";

export type FeatureCard = {
  id: string;
  tool: ResearchTool;
  accent: string;
  surface: string;
  icon: LucideIcon;
  blurb: string;
};

const iconById: Record<string, LucideIcon> = {
  "tool-workspace": LayoutDashboard,
  "tool-assistant": Bot,
  "tool-literature": Library,
  "tool-analysis": GitCompare,
  "tool-experiments": FlaskConical,
};

const shortBlurbs: Record<string, string> = {
  "tool-workspace": "Papers, projects, activity.",
  "tool-assistant": "Evidence-grounded Q&A.",
  "tool-literature": "Search and organize papers.",
  "tool-analysis": "Compare methods and metrics.",
  "tool-experiments": "Runs, configs, history.",
};

const surfaces = [
  FOREST.earth,
  FOREST.mid,
  FOREST.chestnut,
  FOREST.earth,
  FOREST.sage,
] as const;
const accents = [FOREST.sand, FOREST.mint, FOREST.sand, FOREST.mist, FOREST.sand] as const;

export function buildFeatureCards(): FeatureCard[] {
  return RESEARCH_TOOLS.map((tool, i) => ({
    id: tool.id,
    tool,
    accent: accents[i % accents.length],
    surface: surfaces[i % surfaces.length],
    icon: iconById[tool.id] ?? BookOpen,
    blurb: shortBlurbs[tool.id] ?? tool.description.split(".")[0] + ".",
  }));
}

export type ActiveCardColors = { surface: string; accent: string };

/** Random green / brown pair for the centered flashcard on each selection. */
export const ACTIVE_CARD_PALETTE: ActiveCardColors[] = [
  { surface: FOREST.earth, accent: FOREST.sand },
  { surface: FOREST.chestnut, accent: FOREST.mist },
  { surface: FOREST.mid, accent: FOREST.sand },
  { surface: FOREST.sage, accent: FOREST.mint },
  { surface: FOREST.terracotta, accent: FOREST.mist },
  { surface: FOREST.deep, accent: FOREST.sand },
  { surface: FOREST.earth, accent: FOREST.mint },
  { surface: FOREST.chestnut, accent: FOREST.sand },
];

export function randomActiveCardColors(): ActiveCardColors {
  return ACTIVE_CARD_PALETTE[Math.floor(Math.random() * ACTIVE_CARD_PALETTE.length)];
}
