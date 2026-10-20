import type { AnalysisComparisonRow } from "@/types/research";

export const SAMPLE_ANALYSIS: AnalysisComparisonRow[] = [
  {
    paperId: "paper-rag-2020",
    paperTitle: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    method: "Dense passage retrieval + BART seq2seq generator",
    dataset: "Natural Questions, TriviaQA, WebQuestions",
    sampleSize: "Multi-task benchmarks (thousands of QA pairs)",
    metrics: "Exact Match, F1 on open-domain QA",
    limitations: "Wikipedia-only index; generator can still hallucinate without retrieval",
    keyFinding: "Retrieval improves knowledge-intensive generation vs. parametric-only baselines",
  },
  {
    paperId: "paper-scibert-2019",
    paperTitle: "SciBERT: A Pretrained Language Model for Scientific Text",
    method: "BERT pretraining on Semantic Scholar corpus",
    dataset: "Scientific NLP task suite (NER, relation, classification)",
    sampleSize: "1.14M papers pretraining; task-specific train/dev/test splits",
    metrics: "F1, accuracy per downstream task",
    limitations: "Domain shift outside biomedical+CS heavy coverage",
    keyFinding: "Domain-specific pretraining beats generic BERT on scientific tasks",
  },
  {
    paperId: "paper-repro-2021",
    paperTitle: "Show Your Work: Improved Reporting of Experimental Results in NLP",
    method: "Survey + reporting checklist (not a new model)",
    dataset: "Corpus of EMNLP 2019 papers",
    sampleSize: "403 papers sampled for reporting practices",
    metrics: "Checklist compliance rates",
    limitations: "Conference-specific snapshot; self-reported fields",
    keyFinding: "Many papers omit seeds, compute, and data versioning details",
  },
];
