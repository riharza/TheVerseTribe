import type { ResearchProject } from "@/types/research";

export const SAMPLE_PROJECTS: ResearchProject[] = [
  {
    id: "proj-evidence-assistant",
    name: "Evidence-Grounded Assistant",
    description: "PDF ingestion, chunk retrieval, and citation-linked answers for literature review.",
    status: "active",
    paperCount: 2,
    updatedAt: "2025-10-12T18:00:00Z",
    color: "cyan",
  },
  {
    id: "proj-foundation-models",
    name: "Foundation Model Benchmarks",
    description: "Track evaluation metrics and training configurations across transformer baselines.",
    status: "active",
    paperCount: 1,
    updatedAt: "2025-10-08T12:00:00Z",
    color: "violet",
  },
  {
    id: "proj-literature-mining",
    name: "Literature Mining Pipeline",
    description: "Metadata normalization, tagging, and cross-study comparison tables.",
    status: "active",
    paperCount: 2,
    updatedAt: "2025-10-06T09:30:00Z",
    color: "ocean",
  },
  {
    id: "proj-experiment-lab",
    name: "Experiment Lab — Repro Checklist",
    description: "Structured logging of runs, seeds, datasets, and reported limitations.",
    status: "paused",
    paperCount: 1,
    updatedAt: "2025-09-30T15:00:00Z",
    color: "violet",
  },
  {
    id: "proj-platform-architecture",
    name: "Platform Architecture",
    description: "Next.js frontend, FastAPI services, PostgreSQL + pgvector storage design.",
    status: "active",
    paperCount: 1,
    updatedAt: "2025-10-14T10:00:00Z",
    color: "cyan",
  },
];
