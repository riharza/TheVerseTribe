import type { ResearchActivity } from "@/types/research";
import { formatRelativeTime } from "@/lib/utils";
import {
  Bot,
  FilePlus,
  FlaskConical,
  GitCompare,
  StickyNote,
} from "lucide-react";

const kindIcon = {
  paper_added: FilePlus,
  note_created: StickyNote,
  analysis_run: GitCompare,
  experiment_logged: FlaskConical,
  assistant_query: Bot,
};

interface ActivityTimelineProps {
  items: ResearchActivity[];
}

export function ActivityTimeline({ items }: ActivityTimelineProps) {
  return (
    <ul className="space-y-3" aria-label="Recent research activity">
      {items.map((item) => {
        const Icon = kindIcon[item.kind];
        return (
          <li
            key={item.id}
            className="flex gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-accent-cyan/20 transition-colors"
          >
            <div className="mt-0.5 p-1.5 rounded-lg bg-accent-violet/10 border border-accent-violet/15 shrink-0">
              <Icon className="w-3.5 h-3.5 text-accent-violet-soft" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-sans text-ivory">{item.title}</p>
              <p className="text-xs text-ivory-muted font-sans mt-0.5 truncate">{item.detail}</p>
              <p className="text-[10px] text-ivory-dim mt-1 uppercase tracking-wider">
                {formatRelativeTime(new Date(item.timestamp))}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
