import Link from "next/link";
import { FileText, ExternalLink } from "lucide-react";
import type { Paper } from "@/types/research";
import { Badge } from "@/components/research/Badge";
import { truncate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const statusVariant: Record<Paper["status"], "default" | "cyan" | "violet" | "preview"> = {
  unread: "default",
  reading: "cyan",
  reviewed: "violet",
  archived: "default",
};

interface PaperCardProps {
  paper: Paper;
  variant?: "default" | "compact";
  className?: string;
}

export function PaperCard({ paper, variant = "default", className }: PaperCardProps) {
  const authorLine =
    paper.authors.length > 3
      ? `${paper.authors.slice(0, 3).join(", ")} et al.`
      : paper.authors.join(", ");

  return (
    <article className={cn("glass-tile p-4 md:p-5 flex flex-col h-full", className)}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <FileText className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" aria-hidden />
        <Badge variant={statusVariant[paper.status]}>{paper.status}</Badge>
      </div>
      <h3 className="font-serif text-lg text-ivory leading-snug mb-1">{paper.title}</h3>
      <p className="text-xs text-ivory-dim font-sans mb-2">
        {authorLine} · {paper.year} · {paper.venue}
      </p>
      {variant === "default" && (
        <p className="text-sm text-ivory-muted font-sans leading-relaxed flex-1 mb-4">
          {truncate(paper.abstract, 180)}
        </p>
      )}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {paper.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 rounded-full bg-navy-mid/80 text-ivory-dim border border-white/5"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-white/5">
        <span className="text-xs text-ivory-dim tabular-nums">{paper.citationCount.toLocaleString()} citations</span>
        <div className="flex items-center gap-2">
          <Link
            href={`/literature?paper=${paper.id}`}
            className="text-xs font-sans text-accent-cyan hover:text-accent-cyan-bright transition-colors"
          >
            Open
          </Link>
          {paper.sourceUrl && (
            <a
              href={paper.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-ivory-dim hover:text-accent-cyan transition-colors"
              aria-label="External source"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
