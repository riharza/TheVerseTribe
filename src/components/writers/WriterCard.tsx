import Image from "next/image";
import Link from "next/link";
import { Author } from "@/lib/data/mock-data";
import { formatNumber } from "@/lib/utils";
import { HoverLift } from "@/components/motion/FadeIn";

interface WriterCardProps {
  author: Author;
}

export function WriterCard({ author }: WriterCardProps) {
  return (
    <HoverLift>
      <Link href={`/writers/${author.username}`} className="group block">
        <article className="verse-card p-6 text-center">
          <div className="relative w-20 h-20 mx-auto mb-4 overflow-hidden rounded-full ring-2 ring-violet/20 group-hover:ring-violet/40 transition-all">
            <Image
              src={author.avatarUrl}
              alt={author.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <h3 className="verse-heading text-lg group-hover:text-violet transition-colors">
            {author.name}
          </h3>
          <p className="text-ivory-dim text-xs font-sans mt-0.5">@{author.username}</p>
          <p className="text-ivory-muted text-sm font-sans mt-3 line-clamp-2">
            {author.bio}
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-ivory-dim font-sans">
            <span>{formatNumber(author.followerCount)} followers</span>
            <span>{author.storyCount} stories</span>
          </div>
        </article>
      </Link>
    </HoverLift>
  );
}
