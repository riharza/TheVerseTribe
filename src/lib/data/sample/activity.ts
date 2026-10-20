import type { ResearchActivity } from "@/types/research";

export const SAMPLE_ACTIVITY: ResearchActivity[] = [
  {
    id: "act-1",
    kind: "assistant_query",
    title: "Assistant session",
    detail: "Compared RAG indexing strategies for PDF corpora (sample — no model connected).",
    timestamp: "2025-10-17T20:10:00Z",
    projectId: "proj-evidence-assistant",
  },
  {
    id: "act-2",
    kind: "paper_added",
    title: "Paper added to library",
    detail: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    timestamp: "2025-10-01T14:30:00Z",
    projectId: "proj-evidence-assistant",
  },
  {
    id: "act-3",
    kind: "analysis_run",
    title: "Methods comparison draft",
    detail: "Exported comparison table for 3 papers on evaluation metrics (UI preview).",
    timestamp: "2025-10-11T11:00:00Z",
    projectId: "proj-literature-mining",
  },
  {
    id: "act-4",
    kind: "experiment_logged",
    title: "Run logged",
    detail: "Baseline embedding model — nDCG@10 on sample query set (mock metrics).",
    timestamp: "2025-10-09T16:20:00Z",
    projectId: "proj-experiment-lab",
  },
  {
    id: "act-5",
    kind: "note_created",
    title: "Research note",
    detail: "Hypothesis: hybrid BM25 + dense retrieval for scientific PDFs.",
    timestamp: "2025-10-07T09:00:00Z",
    projectId: "proj-platform-architecture",
  },
];
