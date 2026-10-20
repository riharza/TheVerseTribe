import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoryBySlug, getChapterById } from "@/lib/data/mock-data";
import { ReaderView } from "@/components/reader/ReaderView";

interface Props {
  params: Promise<{ slug: string; chapterId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, chapterId } = await params;
  const story = getStoryBySlug(slug);
  const chapter = getChapterById(slug, chapterId);
  if (!story || !chapter) return { title: "Chapter Not Found" };

  return {
    title: `${chapter.title} — ${story.title}`,
    description: `Read ${chapter.title} from ${story.title} by ${story.author.name}`,
  };
}

export default async function ChapterPage({ params }: Props) {
  const { slug, chapterId } = await params;
  const story = getStoryBySlug(slug);
  const chapter = getChapterById(slug, chapterId);
  if (!story || !chapter) notFound();

  return <ReaderView slug={slug} chapterId={chapterId} />;
}
