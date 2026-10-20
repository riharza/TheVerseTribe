/**
 * Frontend ↔ backend integration contract (FastAPI — not implemented yet).
 * Use these shapes for fetch clients and server actions in later milestones.
 */

export interface AssistantQueryRequest {
  paperIds: string[];
  question: string;
  /** Uploaded document IDs when PDF pipeline is available */
  documentIds?: string[];
}

export interface SourcePassage {
  paperId: string;
  page?: number;
  excerpt: string;
  confidence: number;
}

export interface AssistantQueryResponse {
  answer: string;
  sources: SourcePassage[];
  /** When true, UI must show insufficient-evidence state — never invent citations */
  insufficientEvidence: boolean;
}

export interface HealthResponse {
  status: "ok" | "degraded";
  services: {
    database: boolean;
    embeddings: boolean;
    llm: boolean;
  };
}

/** Base URL from env when backend ships: process.env.NEXT_PUBLIC_API_URL */
export const API_ROUTES = {
  health: "/health",
  assistantQuery: "/v1/assistant/query",
  papers: "/v1/papers",
} as const;
