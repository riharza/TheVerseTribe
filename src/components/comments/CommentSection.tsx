import Image from "next/image";
import Link from "next/link";
import { Comment } from "@/lib/data/mock-data";
import { formatRelativeTime } from "@/lib/utils";

interface CommentSectionProps {
  comments: Comment[];
}

export function CommentSection({ comments }: CommentSectionProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

function CommentItem({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) {
  return (
    <div className={isReply ? "ml-8 md:ml-12" : ""}>
      <article className="flex gap-3 p-4 verse-card">
        <div className="relative w-9 h-9 flex-shrink-0 overflow-hidden rounded-full">
          <Image
            src={comment.author.avatarUrl}
            alt={comment.author.name}
            fill
            className="object-cover"
            sizes="36px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-sans font-medium text-ivory">
              {comment.author.name}
            </span>
            <time className="text-xs font-sans text-ivory-dim">
              {formatRelativeTime(new Date(comment.createdAt))}
            </time>
          </div>
          <p className="text-sm font-sans text-ivory-muted leading-relaxed">
            {comment.content}
          </p>
        </div>
      </article>

      {comment.replies?.map((reply) => (
        <div key={reply.id} className="mt-3">
          <CommentItem comment={reply} isReply />
        </div>
      ))}
    </div>
  );
}
