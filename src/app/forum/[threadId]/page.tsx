import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, Eye } from "lucide-react";
import {
  getForumThreadById,
  getForumRepliesByThread,
  getForumCategoryById,
} from "@/lib/data/mock-data";
import { FadeIn } from "@/components/motion/FadeIn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatRelativeTime, formatNumber } from "@/lib/utils";

interface Props {
  params: Promise<{ threadId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { threadId } = await params;
  const thread = getForumThreadById(threadId);
  if (!thread) return { title: "Thread Not Found" };
  return { title: thread.title };
}

export default async function ForumThreadPage({ params }: Props) {
  const { threadId } = await params;
  const thread = getForumThreadById(threadId);
  if (!thread) notFound();

  const replies = getForumRepliesByThread(threadId);
  const category = getForumCategoryById(thread.categoryId);

  return (
    <div className="verse-container py-8 md:py-12 max-w-4xl">
      <FadeIn>
        <Link
          href="/forum"
          className="inline-flex items-center gap-2 text-sm font-sans text-ivory-dim hover:text-violet transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Forum
        </Link>
      </FadeIn>

      <FadeIn delay={0.1}>
        <article className="verse-panel p-6 md:p-8 mb-8">
          {category && (
            <Badge variant="genre" className="mb-4">{category.name}</Badge>
          )}
          <h1 className="verse-heading text-2xl md:text-3xl mb-4">{thread.title}</h1>

          <div className="flex items-center gap-4 text-xs font-sans text-ivory-dim mb-6">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={thread.author.avatarUrl}
                  alt={thread.author.name}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <span>{thread.author.name}</span>
            </div>
            <span>·</span>
            <time>{formatRelativeTime(new Date(thread.createdAt))}</time>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" />
              {thread.replyCount}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {formatNumber(thread.viewCount)}
            </span>
          </div>

          <div
            className="prose-verse text-base"
            dangerouslySetInnerHTML={{ __html: thread.content }}
          />
        </article>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="verse-heading text-xl">
            Replies
            <span className="text-ivory-dim text-base font-sans ml-2">
              ({replies.length})
            </span>
          </h2>
          <Button variant="outline" size="sm">Reply</Button>
        </div>
      </FadeIn>

      <div className="space-y-4">
        {replies.map((reply, i) => (
          <FadeIn key={reply.id} delay={0.05 * i}>
            <div className="verse-panel p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={reply.author.avatarUrl}
                    alt={reply.author.name}
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div>
                  <span className="text-sm font-sans text-ivory">{reply.author.name}</span>
                  <time className="block text-xs font-sans text-ivory-dim">
                    {formatRelativeTime(new Date(reply.createdAt))}
                  </time>
                </div>
              </div>
              <p className="text-ivory-muted font-sans text-sm leading-relaxed">
                {reply.content}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
