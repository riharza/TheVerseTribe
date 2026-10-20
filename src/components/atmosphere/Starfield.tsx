"use client";

import { Fireflies } from "./Fireflies";

/** @deprecated Use Fireflies — kept for import compatibility */
export function Starfield({ density = 40, className }: { density?: number; className?: string }) {
  return <Fireflies density={density} className={className} />;
}
