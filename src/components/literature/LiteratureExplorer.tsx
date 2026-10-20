"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { PaperStatus } from "@/types/research";
import { SAMPLE_PAPERS, SAMPLE_PROJECTS, filterPapers } from "@/lib/data/sample";
import { PaperCard } from "@/components/research/PaperCard";
import { PaperUpload } from "@/components/literature/PaperUpload";
import { Input } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";

const statuses: { value: PaperStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "reading", label: "Reading" },
  { value: "reviewed", label: "Reviewed" },
];

export function LiteratureExplorer() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<PaperStatus | "all">("all");
  const [projectId, setProjectId] = useState<string>("all");
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  const papers = useMemo(
    () =>
      filterPapers({
        query,
        status,
        projectId: projectId === "all" ? undefined : projectId,
      }),
    [query, status, projectId]
  );

  return (
    <div className="space-y-10">
      <PaperUpload onSimulatedUpload={(name) => setUploadNotice(name)} />
      {uploadNotice && (
        <p className="text-xs font-sans text-ivory-dim">
          Queued (demo): {uploadNotice} — will sync when document ingestion service is live.
        </p>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ivory-dim pointer-events-none" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, authors, tags, DOI…"
            className="pl-10"
            aria-label="Search papers"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
            {statuses.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setStatus(s.value)}
                className={`px-4 py-2 min-h-[40px] rounded-full text-xs font-sans border transition-colors ${
                  status === s.value
                    ? "bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30"
                    : "bg-white/5 text-ivory-muted border-white/10 hover:border-white/20"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm font-sans text-ivory-muted">
            Project
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="px-3 py-2 rounded-lg bg-navy-mid border border-white/10 text-ivory text-sm focus:border-accent-cyan/40 focus:outline-none"
            >
              <option value="all">All projects</option>
              {SAMPLE_PROJECTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="text-xs text-ivory-dim font-sans">
        Showing {papers.length} of {SAMPLE_PAPERS.length} sample papers
      </p>

      {papers.length === 0 ? (
        <EmptyState
          title="No papers match"
          description="Try clearing filters or upload a PDF once the backend is connected."
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {papers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      )}
    </div>
  );
}
