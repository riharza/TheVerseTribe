import type { AssistantQueryRequest, AssistantQueryResponse, HealthResponse } from "./contract";
import { API_ROUTES } from "./contract";
import { mockAssistantReply } from "@/lib/data/sample";

/** When false, client calls NEXT_PUBLIC_API_URL + API_ROUTES (FastAPI — not deployed yet). */
export const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API !== "false";

const baseUrl = () => process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

export async function fetchHealth(): Promise<HealthResponse> {
  if (USE_MOCK_API) {
    return {
      status: "degraded",
      services: { database: false, embeddings: false, llm: false },
    };
  }
  const res = await fetch(`${baseUrl()}${API_ROUTES.health}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Health check failed");
  return res.json();
}

export async function queryAssistant(body: AssistantQueryRequest): Promise<AssistantQueryResponse> {
  if (USE_MOCK_API) {
    await delay(800);
    const { answer, sources, insufficientEvidence } = mockAssistantReply(
      body.question,
      body.paperIds
    );
    return {
      answer,
      insufficientEvidence,
      sources: sources.map((s) => ({
        paperId: s.paperId,
        page: s.page,
        excerpt: s.excerpt,
        confidence: insufficientEvidence ? 0.3 : 0.85,
      })),
    };
  }
  const res = await fetch(`${baseUrl()}${API_ROUTES.assistantQuery}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Assistant request failed");
  return res.json();
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
