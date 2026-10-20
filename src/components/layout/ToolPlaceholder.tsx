import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ToolPlaceholderProps {
  title: string;
  description: string;
  backendNote: string;
}

export function ToolPlaceholder({ title, description, backendNote }: ToolPlaceholderProps) {
  return (
    <div className="verse-container py-12 md:py-16 max-w-3xl">
      <div className="verse-panel p-8 md:p-10">
        <div className="flex gap-3 items-start mb-6">
          <AlertCircle className="w-5 h-5 text-champagne shrink-0 mt-0.5" aria-hidden />
          <div>
            <h1 className="font-serif text-2xl md:text-3xl text-ivory mb-2">{title}</h1>
            <p className="text-ivory-muted font-sans leading-relaxed">{description}</p>
          </div>
        </div>
        <p className="text-sm text-ivory-dim font-sans border-l-2 border-accent-cyan/40 pl-4 mb-8">
          {backendNote}
        </p>
        <Link href="/dashboard">
          <Button variant="secondary">Back to dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
