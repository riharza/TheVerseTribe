"use client";

import { GENRES } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface GenreFilterProps {
  activeGenre?: string;
  onSelect: (genre: string) => void;
}

export function GenreFilter({ activeGenre, onSelect }: GenreFilterProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {GENRES.map((genre) => (
        <button
          key={genre}
          onClick={() => onSelect(activeGenre === genre ? "" : genre)}
          className={cn(
            "verse-card px-4 py-3 text-center text-sm font-sans transition-all duration-200",
            "hover:border-violet/30 hover:text-violet",
            activeGenre === genre && "border-violet/40 text-violet bg-violet/5"
          )}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
