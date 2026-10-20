import { cn } from "@/lib/utils";

export function LabSpinner({
  label = "Loading…",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)} role="status" aria-live="polite">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-accent-violet/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent-cyan animate-spin" />
      </div>
      <p className="text-sm font-sans text-ivory-muted">{label}</p>
    </div>
  );
}
