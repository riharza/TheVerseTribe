import { Info } from "lucide-react";

export function MockBanner({ feature }: { feature: string }) {
  return (
    <div
      className="flex gap-3 items-start p-4 rounded-xl border border-champagne/25 bg-champagne/5 text-sm font-sans text-ivory-muted"
      role="note"
    >
      <Info className="w-4 h-4 text-champagne shrink-0 mt-0.5" aria-hidden />
      <p>
        <strong className="text-ivory font-medium">Sample / preview:</strong> {feature} uses local
        demo data. Set{" "}
        <code className="font-mono text-xs text-accent-cyan">NEXT_PUBLIC_USE_MOCK_API=false</code>{" "}
        and configure <code className="font-mono text-xs text-accent-cyan">NEXT_PUBLIC_API_URL</code>{" "}
        when the FastAPI backend is ready.
      </p>
    </div>
  );
}
