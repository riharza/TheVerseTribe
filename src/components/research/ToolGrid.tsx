import Link from "next/link";
import {
  Bot,
  BookOpen,
  FlaskConical,
  GitCompare,
  LayoutDashboard,
} from "lucide-react";
import type { ResearchTool } from "@/types/research";
import { Badge } from "@/components/research/Badge";
import { cn } from "@/lib/utils";

const iconMap = {
  workspace: LayoutDashboard,
  assistant: Bot,
  literature: BookOpen,
  analysis: GitCompare,
  experiments: FlaskConical,
};

const statusBadge = {
  available: { label: "Live", variant: "cyan" as const },
  preview: { label: "Preview", variant: "preview" as const },
  planned: { label: "Planned", variant: "planned" as const },
};

interface ToolGridProps {
  tools: ResearchTool[];
  className?: string;
}

export function ToolGrid({ tools, className }: ToolGridProps) {
  return (
    <div className={cn("grid sm:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {tools.map((tool) => {
        const Icon = iconMap[tool.icon];
        const badge = statusBadge[tool.status];
        return (
          <Link
            key={tool.id}
            href={tool.href}
            className="glass-tile p-5 group flex flex-col h-full hover:border-accent-cyan/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-accent-violet/20 to-accent-cyan/10 border border-white/10">
                <Icon className="w-5 h-5 text-accent-cyan" aria-hidden />
              </div>
              <Badge variant={badge.variant}>{badge.label}</Badge>
            </div>
            <h3 className="font-sans font-medium text-ivory mb-2 group-hover:text-accent-cyan transition-colors">
              {tool.name}
            </h3>
            <p className="text-sm text-ivory-muted font-sans leading-relaxed flex-1">{tool.description}</p>
            <span className="mt-4 text-xs font-sans text-accent-cyan/80 group-hover:text-accent-cyan">
              Open tool →
            </span>
          </Link>
        );
      })}
    </div>
  );
}
