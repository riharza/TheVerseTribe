"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="verse-container py-32 text-center max-w-lg mx-auto">
      <p className="verse-subheading text-accent-cyan/80 mb-4">Error</p>
      <h1 className="font-display font-semibold text-3xl text-ivory mb-4">Something went wrong</h1>
      <p className="text-ivory-muted font-sans mb-8 leading-relaxed">
        The page could not load. Try again, or return to the dashboard.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="primary" onClick={reset}>
          Try again
        </Button>
        <Link href="/dashboard">
          <Button variant="secondary">Go to dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
