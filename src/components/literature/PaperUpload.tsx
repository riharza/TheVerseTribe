"use client";

import { useCallback, useState } from "react";
import { FileUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_MB = 25;
const ACCEPT = "application/pdf";

export function PaperUpload({ onSimulatedUpload }: { onSimulatedUpload?: (name: string) => void }) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validate = (file: File) => {
    if (file.type !== ACCEPT && !file.name.toLowerCase().endsWith(".pdf")) {
      return "Only PDF files are allowed.";
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      return `File must be under ${MAX_MB} MB.`;
    }
    return null;
  };

  const handleFiles = useCallback(
    (files: FileList | null) => {
      setError(null);
      setSuccess(null);
      if (!files?.length) return;
      const file = files[0];
      const err = validate(file);
      if (err) {
        setError(err);
        return;
      }
      setSuccess(`“${file.name}” validated locally — upload API not connected.`);
      onSimulatedUpload?.(file.name);
    },
    [onSimulatedUpload]
  );

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "verse-panel p-8 border-dashed border-2 text-center transition-colors",
          dragOver ? "border-accent-cyan/50 bg-accent-cyan/5" : "border-white/15"
        )}
      >
        <FileUp className="w-8 h-8 text-accent-cyan mx-auto mb-3" aria-hidden />
        <p className="font-sans text-ivory mb-1">Drop a scientific PDF here</p>
        <p className="text-xs text-ivory-dim font-sans mb-4">Max {MAX_MB} MB · PDF only</p>
        <label className="inline-flex cursor-pointer">
          <span className="px-4 py-2 rounded-full text-sm font-sans bg-accent-violet/20 border border-accent-violet/30 text-ivory hover:bg-accent-violet/30 transition-colors">
            Browse files
          </span>
          <input
            type="file"
            accept=".pdf,application/pdf"
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      </div>
      {error && (
        <p className="flex items-center gap-2 text-sm text-red-400 font-sans" role="alert">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </p>
      )}
      {success && (
        <p className="flex items-center gap-2 text-sm text-accent-cyan font-sans">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {success}
        </p>
      )}
    </div>
  );
}
