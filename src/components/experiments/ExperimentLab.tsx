"use client";

import { SAMPLE_EXPERIMENTS, SAMPLE_PROJECTS } from "@/lib/data/sample";
import type { ExperimentRun, ExperimentStatus } from "@/types/research";
import { Badge } from "@/components/research/Badge";
import { formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

const statusVariant: Record<ExperimentStatus, "cyan" | "violet" | "preview" | "default"> = {
  completed: "cyan",
  running: "violet",
  failed: "preview",
  queued: "default",
};

function MetricBars({ runs }: { runs: ExperimentRun[] }) {
  const completed = runs.filter((r) => r.status === "completed" && r.metricPrimary === "nDCG@10");
  if (completed.length === 0) return null;
  const max = Math.max(...completed.map((r) => r.metricValue));
  return (
    <div className="verse-panel p-6 groove-panel">
      <h3 className="font-sans font-medium text-ivory mb-4">Retrieval metrics (sample)</h3>
      <div className="space-y-3">
        {completed.map((run) => (
          <div key={run.id}>
            <div className="flex justify-between text-xs font-sans text-ivory-dim mb-1">
              <span>{run.name}</span>
              <span className="tabular-nums text-accent-cyan">{run.metricValue.toFixed(2)}</span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan"
                style={{ width: `${(run.metricValue / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExperimentLab() {
  const projectName = (id: string) => SAMPLE_PROJECTS.find((p) => p.id === id)?.name ?? id;

  return (
    <div className="space-y-8">
      <MetricBars runs={SAMPLE_EXPERIMENTS} />

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm font-sans min-w-[640px]">
          <thead>
            <tr className="bg-white/[0.04] text-xs uppercase tracking-wider text-ivory-muted">
              <th className="p-3 text-left">Run</th>
              <th className="p-3 text-left">Project</th>
              <th className="p-3 text-left">Model</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Metric</th>
              <th className="p-3 text-left">When</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_EXPERIMENTS.map((run) => (
              <tr key={run.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                <td className="p-3">
                  <p className="text-ivory font-medium">{run.name}</p>
                  <p className="text-xs text-ivory-dim">{run.dataset}</p>
                </td>
                <td className="p-3 text-ivory-muted text-xs">{projectName(run.projectId)}</td>
                <td className="p-3 text-ivory-muted text-xs max-w-[140px] truncate">{run.model}</td>
                <td className="p-3">
                  <Badge variant={statusVariant[run.status]}>{run.status}</Badge>
                </td>
                <td className={cn("p-3 tabular-nums", run.status === "completed" && "text-accent-cyan")}>
                  {run.status === "queued" ? "—" : `${run.metricPrimary}: ${run.metricValue}`}
                </td>
                <td className="p-3 text-xs text-ivory-dim">
                  {formatRelativeTime(new Date(run.startedAt))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
