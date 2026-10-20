import Link from "next/link";
import { ActivityItem } from "@/lib/data/mock-data";
import { formatRelativeTime } from "@/lib/utils";
import { MessageCircle, Heart, UserPlus, BookOpen, PenLine } from "lucide-react";
import Image from "next/image";

const activityIcons = {
  comment: MessageCircle,
  like: Heart,
  follow: UserPlus,
  publish: PenLine,
  update: BookOpen,
};

const activityLabels = {
  comment: "commented on",
  like: "liked",
  follow: "followed",
  publish: "published",
  update: "updated",
};

interface ActivityFeedProps {
  items: ActivityItem[];
  limit?: number;
}

export function ActivityFeed({ items, limit }: ActivityFeedProps) {
  const displayItems = limit ? items.slice(0, limit) : items;

  return (
    <div className="space-y-3">
      {displayItems.map((item) => {
        const Icon = activityIcons[item.type];
        return (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-ivory/3 transition-colors"
          >
            <div className="relative w-8 h-8 flex-shrink-0 overflow-hidden rounded-full">
              <Image
                src={item.user.avatarUrl}
                alt={item.user.name}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-sans text-ivory-muted">
                <Link
                  href={`/writers/${item.user.username}`}
                  className="text-ivory hover:text-violet transition-colors font-medium"
                >
                  {item.user.name}
                </Link>{" "}
                <span className="inline-flex items-center gap-1">
                  <Icon className="w-3 h-3 inline text-ivory-dim" />
                  {activityLabels[item.type]}
                </span>{" "}
                <span className="text-ivory">{item.target}</span>
              </p>
              <time className="text-xs text-ivory-dim font-sans mt-0.5 block">
                {formatRelativeTime(new Date(item.timestamp))}
              </time>
            </div>
          </div>
        );
      })}
    </div>
  );
}
