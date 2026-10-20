"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "@/lib/data/mock-data";
import { formatRelativeTime } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface ManuscriptCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function ManuscriptCard({ post, featured = false }: ManuscriptCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className={`relative h-full overflow-hidden rounded-2xl border border-champagne/15 bg-navy-mid/60 backdrop-blur-xl transition-all duration-500 group-hover:border-champagne/35 group-hover:shadow-book-glow ${
          featured ? "grid grid-cols-1 md:grid-cols-2" : "flex flex-col"
        }`}
      >
        {/* Manuscript edge decoration */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-champagne/40 via-champagne/20 to-transparent z-10" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-champagne/20 rounded-tr-lg pointer-events-none" />

        <div className={`relative overflow-hidden ${featured ? "aspect-[16/10] md:aspect-auto min-h-[220px]" : "aspect-[16/10]"}`}>
          <Image
            src={post.coverUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />
        </div>

        <div className={`p-5 md:p-6 flex flex-col ${featured ? "justify-center" : "flex-1"}`}>
          <Badge variant="genre" className="self-start mb-3">{post.category}</Badge>
          <h3 className={`font-display text-ivory mb-2 group-hover:text-champagne transition-colors line-clamp-2 ${
            featured ? "text-2xl md:text-3xl" : "text-lg"
          }`}>
            {post.title}
          </h3>
          <p className="text-ivory-dim text-sm font-serif leading-relaxed line-clamp-3 flex-1 italic">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-champagne/10 text-xs font-sans text-ivory-dim">
            <span className="text-champagne/70">{post.author.name}</span>
            <span>·</span>
            <time>{formatRelativeTime(new Date(post.publishedAt))}</time>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
