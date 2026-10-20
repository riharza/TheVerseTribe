/** Domain types for The Verse Tribe research platform (frontend contract). */

export type PaperStatus = "unread" | "reading" | "reviewed" | "archived";

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  abstract: string;
  doi?: string;
  tags: string[];
  citationCount: number;
  status: PaperStatus;
  projectIds: string[];
  sourceUrl?: string;
  addedAt: string;
}

export type ProjectStatus = "active" | "paused" | "completed";

export interface ResearchProject {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  paperCount: number;
  updatedAt: string;
  color: "cyan" | "violet" | "ocean";
}

export type ActivityKind =
  | "paper_added"
  | "note_created"
  | "analysis_run"
  | "experiment_logged"
  | "assistant_query";

export interface ResearchActivity {
  id: string;
  kind: ActivityKind;
  title: string;
  detail: string;
  timestamp: string;
  projectId?: string;
}

export interface ResearchTool {
  id: string;
  name: string;
  description: string;
  href: string;
  status: "available" | "preview" | "planned";
  icon: "assistant" | "literature" | "analysis" | "experiments" | "workspace";
}

export interface WorkspaceStats {
  papersTotal: number;
  projectsActive: number;
  experimentsThisMonth: number;
  assistantSessions: number;
}

export interface AnalysisComparisonRow {
  paperId: string;
  paperTitle: string;
  method: string;
  dataset: string;
  sampleSize: string;
  metrics: string;
  limitations: string;
  keyFinding: string;
}

export type ExperimentStatus = "completed" | "running" | "failed" | "queued";

export interface ExperimentRun {
  id: string;
  name: string;
  projectId: string;
  model: string;
  dataset: string;
  status: ExperimentStatus;
  metricPrimary: string;
  metricValue: number;
  seed: number;
  startedAt: string;
  notes?: string;
}

export interface SourcePassage {
  paperId: string;
  paperTitle: string;
  page?: number;
  excerpt: string;
}

export interface AssistantMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: SourcePassage[];
  insufficientEvidence?: boolean;
  timestamp: string;
}
