import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "verse-panel p-10 md:p-12 text-center flex flex-col items-center gap-3",
        className
      )}
    >
      <h3 className="font-display font-semibold text-lg text-ivory">{title}</h3>
      <p className="text-sm text-ivory-muted font-sans max-w-md leading-relaxed">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
