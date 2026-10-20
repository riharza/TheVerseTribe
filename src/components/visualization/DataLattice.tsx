"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface DataLatticeProps {
  className?: string;
}

/** Lightweight SVG network motif — no canvas, respects reduced motion via CSS. */
export function DataLattice({ className }: DataLatticeProps) {
  const nodes = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < 24; i++) {
      pts.push({
        x: 8 + (i % 6) * 16 + (Math.sin(i) * 3),
        y: 10 + Math.floor(i / 6) * 22 + (Math.cos(i * 1.3) * 4),
      });
    }
    return pts;
  }, []);

  const edges = useMemo(() => {
    const lines: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (dx * dx + dy * dy < 280) lines.push([i, j]);
      }
    }
    return lines;
  }, [nodes]);

  return (
    <svg
      className={cn("w-full h-full text-accent-cyan/30", className)}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="latticeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(94, 200, 232, 0.35)" />
          <stop offset="100%" stopColor="rgba(139, 126, 200, 0.25)" />
        </linearGradient>
      </defs>
      {edges.map(([a, b], idx) => (
        <line
          key={idx}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="url(#latticeGrad)"
          strokeWidth="0.15"
          className="animate-pulse-glow"
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="0.45" fill="currentColor" opacity={0.4 + (i % 3) * 0.15} />
      ))}
    </svg>
  );
}
