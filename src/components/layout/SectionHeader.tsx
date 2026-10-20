import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8", className)}>
      <div>
        {eyebrow && <p className="verse-subheading text-accent-violet-soft mb-2">{eyebrow}</p>}
        <h2 className="font-display font-semibold text-2xl md:text-3xl text-ivory tracking-tight">{title}</h2>
        {description && (
          <p className="mt-2 text-sm md:text-base text-ivory-muted font-sans max-w-2xl">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
