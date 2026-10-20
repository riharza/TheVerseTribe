import type { SourcePassage } from "@/types/research";

/** Canned evidence passages for mock assistant (not live PDF text). */
export const SAMPLE_PASSAGES: Record<string, SourcePassage[]> = {
  "paper-rag-2020": [
    {
      paperId: "paper-rag-2020",
      paperTitle: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
      page: 2,
      excerpt:
        "We combine parametric and non-parametric memory by pre-training a seq2seq model with access to an external dense vector index.",
    },
  ],
  "paper-scibert-2019": [
    {
      paperId: "paper-scibert-2019",
      paperTitle: "SciBERT: A Pretrained Language Model for Scientific Text",
      page: 1,
      excerpt:
        "SciBERT leverages unsupervised pretraining on a large corpus of scientific publications to improve downstream scientific NLP tasks.",
    },
  ],
  "paper-attention-2017": [
    {
      paperId: "paper-attention-2017",
      paperTitle: "Attention Is All You Need",
      page: 3,
      excerpt:
        "The Transformer relies solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
    },
  ],
};

export function mockAssistantReply(
  question: string,
  paperIds: string[]
): { answer: string; sources: SourcePassage[]; insufficientEvidence: boolean } {
  const q = question.toLowerCase();
  const sources = paperIds.flatMap((id) => SAMPLE_PASSAGES[id] ?? []);

  if (paperIds.length === 0) {
    return {
      answer:
        "Select at least one paper from your library so I can ground an answer in sample passages. (Backend retrieval is not connected.)",
      sources: [],
      insufficientEvidence: true,
    };
  }

  if (sources.length === 0) {
    return {
      answer:
        "I don't have sample passages indexed for the selected papers in this demo. Try RAG, SciBERT, or Attention papers.",
      sources: [],
      insufficientEvidence: true,
    };
  }

  if (q.includes("retriev") || q.includes("rag")) {
    return {
      answer:
        "Based on the selected literature, retrieval-augmented generation combines a generator with a dense passage index so answers can cite external knowledge rather than relying only on model weights.",
      sources: sources.slice(0, 2),
      insufficientEvidence: false,
    };
  }

  if (q.includes("method") || q.includes("compare")) {
    return {
      answer:
        "Across your selection, methods span domain-adaptive pretraining (SciBERT), retrieval-augmented seq2seq (RAG), and pure attention-based sequence modeling (Transformer). Use Research Analysis for structured side-by-side fields.",
      sources,
      insufficientEvidence: false,
    };
  }

  return {
    answer:
      "From the sample excerpts available: " +
      sources[0].excerpt +
      " — Expand the question or add papers for a narrower synthesis. Full PDF QA requires the FastAPI pipeline.",
    sources: [sources[0]],
    insufficientEvidence: false,
  };
}
