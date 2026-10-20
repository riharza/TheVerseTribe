"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import type { AnalysisComparisonRow } from "@/types/research";
import { Button } from "@/components/ui/Button";

export function ComparisonTable({ rows }: { rows: AnalysisComparisonRow[] }) {
  const [exported, setExported] = useState(false);

  const exportCsv = () => {
    const header = ["Paper", "Method", "Dataset", "Sample size", "Metrics", "Limitations", "Finding"];
    const lines = rows.map((r) =>
      [r.paperTitle, r.method, r.dataset, r.sampleSize, r.metrics, r.limitations, r.keyFinding]
        .map((c) => `"${c.replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "verse-tribe-analysis-export.csv";
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={exportCsv}>
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
        {exported && (
          <span className="ml-3 text-xs text-accent-cyan self-center font-sans">Downloaded</span>
        )}
      </div>
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm font-sans min-w-[800px]">
          <thead>
            <tr className="bg-white/[0.04] text-ivory-muted text-xs uppercase tracking-wider">
              <th className="p-3 font-medium">Paper</th>
              <th className="p-3 font-medium">Method</th>
              <th className="p-3 font-medium">Dataset</th>
              <th className="p-3 font-medium">Sample</th>
              <th className="p-3 font-medium">Metrics</th>
              <th className="p-3 font-medium">Limitations</th>
              <th className="p-3 font-medium">Key finding</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.paperId} className="border-t border-white/5 hover:bg-white/[0.02]">
                <td className="p-3 text-ivory font-medium align-top max-w-[180px]">{row.paperTitle}</td>
                <td className="p-3 text-ivory-muted align-top">{row.method}</td>
                <td className="p-3 text-ivory-muted align-top">{row.dataset}</td>
                <td className="p-3 text-ivory-muted align-top">{row.sampleSize}</td>
                <td className="p-3 text-ivory-muted align-top">{row.metrics}</td>
                <td className="p-3 text-ivory-muted align-top">{row.limitations}</td>
                <td className="p-3 text-accent-cyan/90 align-top">{row.keyFinding}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
