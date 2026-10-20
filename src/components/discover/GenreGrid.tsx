import Link from "next/link";
import { GENRES } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface GenreGridProps {
  activeGenre?: string;
  linkPrefix?: string;
}

export function GenreGrid({ activeGenre, linkPrefix = "/discover" }: GenreGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {GENRES.map((genre) => (
        <Link
          key={genre}
          href={`${linkPrefix}?genre=${encodeURIComponent(genre)}`}
          className={cn(
            "verse-card px-4 py-3 text-center text-sm font-sans transition-all duration-200",
            "hover:border-violet/30 hover:text-violet",
            activeGenre === genre && "border-violet/40 text-violet bg-violet/5"
          )}
        >
          {genre}
        </Link>
      ))}
    </div>
  );
}
