import Link from "next/link";
import { FolderKanban } from "lucide-react";
import type { ResearchProject } from "@/types/research";
import { Badge } from "@/components/research/Badge";
import { formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

const colorRing = {
  cyan: "ring-accent-cyan/30 group-hover:border-accent-cyan/40",
  violet: "ring-accent-violet/30 group-hover:border-accent-violet/40",
  ocean: "ring-ocean-mist/30 group-hover:border-ocean-mist/40",
};

interface ProjectCardProps {
  project: ResearchProject;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      href={`/dashboard?project=${project.id}`}
      className={cn(
        "group glass-tile p-5 block ring-1 ring-transparent transition-all",
        colorRing[project.color],
        className
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <FolderKanban className="w-4 h-4 text-accent-violet-soft" aria-hidden />
        <Badge variant={project.status === "active" ? "cyan" : "default"}>{project.status}</Badge>
      </div>
      <h3 className="font-sans font-medium text-ivory mb-2 group-hover:text-accent-cyan transition-colors">
        {project.name}
      </h3>
      <p className="text-sm text-ivory-muted font-sans leading-relaxed mb-4">{project.description}</p>
      <div className="flex items-center justify-between text-xs text-ivory-dim font-sans">
        <span>{project.paperCount} papers</span>
        <span>{formatRelativeTime(new Date(project.updatedAt))}</span>
      </div>
    </Link>
  );
}
