"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Eye, Heart } from "lucide-react";
import { Story } from "@/lib/data/mock-data";
import { formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface MagicalBookCardProps {
  story: Story;
  className?: string;
}

export function MagicalBookCard({ story, className }: MagicalBookCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={cn("group relative", className)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/story/${story.slug}`} className="block">
        <article className="magical-book overflow-hidden">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={story.coverUrl}
              alt={story.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/30 to-transparent" />

            {/* Spine effect */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-champagne/20 to-transparent" />

            {/* Glow on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: "inset 0 0 40px rgba(94,200,232,0.15), inset 0 0 80px rgba(212,175,106,0.1)",
              }}
            />

            {/* Flutter particles */}
            {hovered && (
              <>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-champagne"
                    style={{ left: `${30 + i * 20}%`, bottom: "20%" }}
                    animate={{ y: [0, -30, -50], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </>
            )}

            <Badge variant="genre" className="absolute top-3 left-4">{story.genre}</Badge>

            <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-md bg-white/[0.04] border-t border-white/[0.06]">
              <h3 className="verse-heading text-lg mb-1 group-hover:text-champagne transition-colors line-clamp-2">
                {story.title}
              </h3>
              <p className="text-ivory-dim text-xs font-sans mb-2">by {story.author.name}</p>
              <div className="flex items-center gap-3 text-xs text-ivory-dim font-sans">
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{formatNumber(story.viewCount)}</span>
                <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{formatNumber(story.likeCount)}</span>
                <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{story.chapterCount}</span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
                className="mt-3"
              >
                <Button variant="primary" size="sm" className="w-full rounded-lg" tabIndex={-1}>
                  Read Now
                </Button>
              </motion.div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
