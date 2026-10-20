import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
  className?: string;
}

export function StatCard({ label, value, icon: Icon, hint, className }: StatCardProps) {
  return (
    <div className={cn("glass-tile p-4 md:p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-ivory-dim mb-2">{label}</p>
          <p className="font-display text-2xl md:text-3xl text-accent-cyan tabular-nums">{value}</p>
          {hint && <p className="mt-1 text-xs text-ivory-dim font-sans">{hint}</p>}
        </div>
        <div className="p-2 rounded-lg bg-accent-violet/10 border border-accent-violet/20">
          <Icon className="w-4 h-4 text-accent-violet-soft" aria-hidden />
        </div>
      </div>
    </div>
  );
}
