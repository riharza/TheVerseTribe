"use client";

import { useState } from "react";
import { Send, AlertTriangle } from "lucide-react";
import { SAMPLE_PAPERS } from "@/lib/data/sample";
import { queryAssistant } from "@/lib/api/client";
import type { AssistantMessage } from "@/types/research";
import { MockBanner } from "@/components/ui/MockBanner";
import { LabSpinner } from "@/components/ui/LabSpinner";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export function AssistantWorkspace() {
  const [selected, setSelected] = useState<string[]>(["paper-rag-2020"]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);

  const togglePaper = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const send = async () => {
    const q = question.trim();
    if (!q) return;
    setError(null);
    const userMsg: AssistantMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: q,
      timestamp: new Date().toISOString(),
    };
    setMessages((m) => [...m, userMsg]);
    setQuestion("");
    setLoading(true);
    try {
      const res = await queryAssistant({ paperIds: selected, question: q });
      const assistantMsg: AssistantMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: res.answer,
        insufficientEvidence: res.insufficientEvidence,
        sources: res.sources.map((s) => {
          const paper = SAMPLE_PAPERS.find((p) => p.id === s.paperId);
          return {
            paperId: s.paperId,
            paperTitle: paper?.title ?? s.paperId,
            page: s.page,
            excerpt: s.excerpt,
          };
        }),
        timestamp: new Date().toISOString(),
      };
      setMessages((m) => [...m, assistantMsg]);
    } catch {
      setError("Could not reach the assistant service. Check API configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <MockBanner feature="AI answers use mock retrieval over sample passages, not live PDFs" />

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        <aside className="verse-panel p-4 groove-panel">
          <h2 className="text-sm font-sans font-medium text-ivory mb-3">Context papers</h2>
          <ul className="space-y-2 max-h-[420px] overflow-y-auto">
            {SAMPLE_PAPERS.map((paper) => {
              const on = selected.includes(paper.id);
              return (
                <li key={paper.id}>
                  <button
                    type="button"
                    onClick={() => togglePaper(paper.id)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg text-xs font-sans border transition-colors",
                      on
                        ? "border-accent-cyan/40 bg-accent-cyan/10 text-ivory"
                        : "border-white/10 text-ivory-muted hover:border-white/20"
                    )}
                  >
                    {paper.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="flex min-h-[360px] flex-col verse-panel groove-panel overflow-hidden sm:min-h-[480px]">
          <div className="max-h-[min(52vh,520px)] flex-1 space-y-4 overflow-y-auto p-4 md:max-h-[520px] md:p-6" aria-live="polite">
            {messages.length === 0 && (
              <p className="text-sm text-ivory-dim font-sans">
                Ask about methods, retrieval, or comparisons. Select papers for grounded sample excerpts.
              </p>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "rounded-xl p-4 border",
                  msg.role === "user"
                    ? "ml-0 border-accent-violet/20 bg-accent-violet/10 sm:ml-8"
                    : "mr-0 border-white/10 bg-white/[0.03] sm:mr-8"
                )}
              >
                <p className="text-sm font-sans text-ivory whitespace-pre-wrap">{msg.content}</p>
                {msg.insufficientEvidence && (
                  <p className="mt-2 flex items-center gap-2 text-xs text-champagne font-sans">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Insufficient evidence in sample index
                  </p>
                )}
                {msg.sources && msg.sources.length > 0 && (
                  <ul className="mt-3 space-y-2 border-t border-white/10 pt-3">
                    {msg.sources.map((s, i) => (
                      <li key={i} className="text-xs font-sans text-ivory-muted">
                        <span className="text-accent-cyan">
                          {s.paperTitle}
                          {s.page != null ? ` · p.${s.page}` : ""}
                        </span>
                        <p className="mt-1 italic">&ldquo;{s.excerpt}&rdquo;</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {loading && <LabSpinner label="Searching sample passages…" />}
          </div>

          {error && (
            <p className="px-4 text-sm text-red-400 font-sans" role="alert">
              {error}
            </p>
          )}

          <div className="p-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a research question…"
              rows={2}
              className="min-h-[80px] flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
            />
            <Button variant="primary" onClick={send} disabled={loading || !question.trim()} className="shrink-0">
              <Send className="w-4 h-4" />
              Ask
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
