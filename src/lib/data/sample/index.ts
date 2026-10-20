import type { Paper, PaperStatus, WorkspaceStats } from "@/types/research";
import { SAMPLE_PAPERS } from "./papers";
import { SAMPLE_PROJECTS } from "./projects";
import { SAMPLE_ACTIVITY } from "./activity";
import { RESEARCH_TOOLS } from "./tools";
import { SAMPLE_ANALYSIS } from "./analysis";
import { SAMPLE_EXPERIMENTS } from "./experiments";

export { SAMPLE_PAPERS, SAMPLE_PROJECTS, SAMPLE_ACTIVITY, RESEARCH_TOOLS, SAMPLE_ANALYSIS, SAMPLE_EXPERIMENTS };
export { mockAssistantReply, SAMPLE_PASSAGES } from "./assistant";

export function getRecentPapers(limit = 5): Paper[] {
  return [...SAMPLE_PAPERS]
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, limit);
}

export function getPaperById(id: string): Paper | undefined {
  return SAMPLE_PAPERS.find((p) => p.id === id);
}

export function filterPapers(options: {
  query?: string;
  status?: PaperStatus | "all";
  projectId?: string;
}): Paper[] {
  const q = options.query?.trim().toLowerCase() ?? "";
  return SAMPLE_PAPERS.filter((paper) => {
    if (options.status && options.status !== "all" && paper.status !== options.status) {
      return false;
    }
    if (options.projectId && !paper.projectIds.includes(options.projectId)) {
      return false;
    }
    if (!q) return true;
    const haystack = [
      paper.title,
      paper.abstract,
      paper.venue,
      paper.authors.join(" "),
      paper.tags.join(" "),
      paper.doi ?? "",
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getWorkspaceStats(): WorkspaceStats {
  return {
    papersTotal: SAMPLE_PAPERS.length,
    projectsActive: SAMPLE_PROJECTS.filter((p) => p.status === "active").length,
    experimentsThisMonth: 4,
    assistantSessions: 12,
  };
}
