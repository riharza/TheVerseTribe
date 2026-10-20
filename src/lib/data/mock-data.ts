export interface Author {
  id: string;
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  followerCount: number;
  storyCount: number;
}

export interface StoryChapter {
  id: string;
  title: string;
  orderIndex: number;
  wordCount: number;
  isPublished: boolean;
  content?: string;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverUrl: string;
  genre: string;
  tags: string[];
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  viewCount: number;
  likeCount: number;
  commentCount: number;
  chapterCount: number;
  author: Author;
  chapters: StoryChapter[];
  publishedAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  author: Pick<Author, "id" | "username" | "name" | "avatarUrl">;
  createdAt: string;
  replies?: Comment[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverUrl: string;
  category: string;
  tags: string[];
  author: Pick<Author, "id" | "username" | "name" | "avatarUrl">;
  publishedAt: string;
}

export interface ActivityItem {
  id: string;
  type: "comment" | "like" | "follow" | "publish" | "update";
  user: Pick<Author, "username" | "name" | "avatarUrl">;
  target: string;
  timestamp: string;
}

export const authors: Author[] = [
  {
    id: "u1",
    username: "elara-veil",
    name: "Elara Veil",
    bio: "Weaver of moonlit tales and keeper of forgotten realms. Currently drafting the third book in the Thornwood Chronicles.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    followerCount: 12400,
    storyCount: 8,
  },
  {
    id: "u2",
    username: "marcus-chen",
    name: "Marcus Chen",
    bio: "Literary fiction writer exploring the spaces between memory and identity. Pushcart Prize nominee.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    followerCount: 8900,
    storyCount: 5,
  },
  {
    id: "u3",
    username: "soraya-north",
    name: "Soraya North",
    bio: "Dark fantasy and cosmic horror. I write about what lurks beneath starlight.",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    followerCount: 15600,
    storyCount: 12,
  },
  {
    id: "u4",
    username: "james-whitfield",
    name: "James Whitfield",
    bio: "Historical fiction set in the margins of empire. Oxford MFA.",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    followerCount: 6200,
    storyCount: 4,
  },
  {
    id: "u5",
    username: "mira-okonkwo",
    name: "Mira Okonkwo",
    bio: "Magical realism rooted in West African folklore. Stories that breathe.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    followerCount: 9800,
    storyCount: 7,
  },
  {
    id: "u6",
    username: "theo-ashford",
    name: "Theo Ashford",
    bio: "Sci-fi novelist. I ask what happens when humanity outgrows its cradle.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    followerCount: 11200,
    storyCount: 6,
  },
];

const chapterContent1 = `<p>The first thing Maren noticed was the silence.</p>

<p>Not the ordinary silence of a forest at dusk — the kind punctuated by distant birdsong and the rustle of leaves — but a silence so complete it pressed against her eardrums like deep water. She stood at the threshold of the Thornwood, where the path ended and the trees began their ancient congregation.</p>

<p>Her grandmother had warned her about this place. <em>"The wood remembers everything,"</em> she'd said, her voice dropping to a whisper that Maren could still hear, even now, three years after the old woman's death. <em>"And some memories are hungry."</em></p>

<p>Maren adjusted the strap of her satchel and stepped forward.</p>

<p>The light changed immediately. Where moments before the late afternoon sun had painted everything in warm amber, now a violet twilight seemed to emanate from the trees themselves. She looked back — the path was still there, but it looked distant, as though viewed through the wrong end of a telescope.</p>

<p>"Hello?" she called, and her voice was swallowed whole.</p>

<p>Something moved in the undergrowth. Not an animal — or not any animal she recognized. The movement had intention, a deliberate grace that made her skin prickle. She waited, heart hammering, for whatever it was to reveal itself.</p>

<p>Instead, a single white thorn bloom fell from nowhere and landed at her feet.</p>`;

const chapterContent2 = `<p>The village of Ashmere had no name for what happened on the night of the third moon — at least, not one they spoke aloud.</p>

<p>They called it <em>the Dimming</em>, when pressed, though the word always came out smaller than it should, as if afraid of its own weight. Children were told to come inside before the last light left the sky. Doors were bolted. Candles burned through till dawn.</p>

<p>Elias Thorne did not believe in the Dimming. He was a scholar, a man of ledgers and logic, and he had spent twelve years cataloguing the superstitions of rural communities with the detached curiosity of an entomologist studying insects. He had never once felt fear in these places.</p>

<p>That changed when he found the book.</p>

<p>It was wedged behind a loose stone in the cellar of the abandoned mill, its leather cover so dark it seemed to absorb the light from his lantern. No title marked its spine. When he opened it, the pages were blank — completely, impossibly blank — yet he could feel words there, pressing against the paper like something trying to be born.</p>

<p>He should have left it. Every instinct he possessed, honed by years of careful observation, told him to leave it exactly where he'd found it.</p>

<p>Instead, he tucked it under his arm and climbed back into the failing light.</p>`;

export const stories: Story[] = [
  {
    id: "s1",
    slug: "the-thornwood-chronicles",
    title: "The Thornwood Chronicles",
    description:
      "When Maren returns to her grandmother's village to settle her estate, she discovers a forest that remembers every secret ever whispered beneath its canopy — and some of those secrets want to be found.",
    coverUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=900&fit=crop",
    genre: "Fantasy",
    tags: ["dark fantasy", "folklore", "slow burn", "found family"],
    status: "PUBLISHED",
    viewCount: 284000,
    likeCount: 18200,
    commentCount: 1240,
    chapterCount: 24,
    author: authors[0],
    publishedAt: "2025-06-15T00:00:00Z",
    updatedAt: "2026-09-01T14:30:00Z",
    chapters: [
      { id: "c1", title: "The Threshold", orderIndex: 1, wordCount: 1840, isPublished: true, content: chapterContent1 },
      { id: "c2", title: "Whispers in the Root", orderIndex: 2, wordCount: 2100, isPublished: true },
      { id: "c3", title: "The Keeper's Warning", orderIndex: 3, wordCount: 1950, isPublished: true },
    ],
  },
  {
    id: "s2",
    slug: "letters-from-the-dimming",
    title: "Letters from the Dimming",
    description:
      "A scholar's discovery of an impossible book sets in motion events that blur the boundary between documentation and invocation. Literary horror for readers who prefer their dread intellectual.",
    coverUrl: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=600&h=900&fit=crop",
    genre: "Horror",
    tags: ["literary horror", "gothic", "epistolary", "atmospheric"],
    status: "PUBLISHED",
    viewCount: 156000,
    likeCount: 9800,
    commentCount: 876,
    chapterCount: 18,
    author: authors[2],
    publishedAt: "2025-09-20T00:00:00Z",
    updatedAt: "2026-08-28T09:15:00Z",
    chapters: [
      { id: "c4", title: "Ashmere", orderIndex: 1, wordCount: 2200, isPublished: true, content: chapterContent2 },
      { id: "c5", title: "The Blank Pages", orderIndex: 2, wordCount: 1980, isPublished: true },
    ],
  },
  {
    id: "s3",
    slug: "salt-and-starlight",
    title: "Salt and Starlight",
    description:
      "On a coast where the tide brings more than seaweed, a lighthouse keeper's daughter learns that her family's duty extends beyond guiding ships — they guard the door between worlds.",
    coverUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&h=900&fit=crop",
    genre: "Magical Realism",
    tags: ["coastal", "family saga", "mythology", " lyrical"],
    status: "PUBLISHED",
    viewCount: 198000,
    likeCount: 14500,
    commentCount: 654,
    chapterCount: 32,
    author: authors[4],
    publishedAt: "2025-04-10T00:00:00Z",
    updatedAt: "2026-09-05T11:00:00Z",
    chapters: [
      { id: "c6", title: "The Last Light", orderIndex: 1, wordCount: 2400, isPublished: true },
    ],
  },
  {
    id: "s4",
    slug: "the-weight-of-small-things",
    title: "The Weight of Small Things",
    description:
      "A meditation on grief and grace: when architect Claire Wei returns to Singapore after her father's death, she must decide which memories to keep and which to release.",
    coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=900&fit=crop",
    genre: "Literary Fiction",
    tags: ["contemporary", "family", "grief", "identity"],
    status: "PUBLISHED",
    viewCount: 89000,
    likeCount: 7200,
    commentCount: 432,
    chapterCount: 15,
    author: authors[1],
    publishedAt: "2025-11-01T00:00:00Z",
    updatedAt: "2026-08-15T16:45:00Z",
    chapters: [
      { id: "c7", title: "Return", orderIndex: 1, wordCount: 2600, isPublished: true },
    ],
  },
  {
    id: "s5",
    slug: "empire-of-echoes",
    title: "Empire of Echoes",
    description:
      "London, 1889. A disgraced historian and a Bengali translator uncover a conspiracy that rewrites the history of the East India Company — and the present day.",
    coverUrl: "https://images.unsplash.com/photo-1524995997941-5401adbeb145?w=600&h=900&fit=crop",
    genre: "Historical",
    tags: ["Victorian", "colonial history", "mystery", "dual timeline"],
    status: "PUBLISHED",
    viewCount: 134000,
    likeCount: 8900,
    commentCount: 567,
    chapterCount: 28,
    author: authors[3],
    publishedAt: "2025-07-22T00:00:00Z",
    updatedAt: "2026-09-02T08:20:00Z",
    chapters: [
      { id: "c8", title: "The Archivist's Fall", orderIndex: 1, wordCount: 2800, isPublished: true },
    ],
  },
  {
    id: "s6",
    slug: "void-garden",
    title: "Void Garden",
    description:
      "Three centuries after Earth's evacuation, the colony ship Verdant holds the last seeds of humanity — and something else that has been growing in the hydroponics bay.",
    coverUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=900&fit=crop",
    genre: "Sci-Fi",
    tags: ["space opera", "survival", "philosophical", "generation ship"],
    status: "PUBLISHED",
    viewCount: 167000,
    likeCount: 11200,
    commentCount: 789,
    chapterCount: 22,
    author: authors[5],
    publishedAt: "2025-12-05T00:00:00Z",
    updatedAt: "2026-09-04T19:00:00Z",
    chapters: [
      { id: "c9", title: "Cycle 847", orderIndex: 1, wordCount: 2300, isPublished: true },
    ],
  },
  {
    id: "s7",
    slug: "the-midnight-atelier",
    title: "The Midnight Atelier",
    description:
      "In a Parisian painting studio that only opens after midnight, artists trade more than canvases — they trade fragments of their souls. A dark romance for those who believe art demands sacrifice.",
    coverUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=900&fit=crop",
    genre: "Romance",
    tags: ["dark romance", "art", "paris", "supernatural"],
    status: "PUBLISHED",
    viewCount: 245000,
    likeCount: 19800,
    commentCount: 1456,
    chapterCount: 30,
    author: authors[0],
    publishedAt: "2025-03-18T00:00:00Z",
    updatedAt: "2026-09-06T06:30:00Z",
    chapters: [
      { id: "c10", title: "The Door on Rue des Lombards", orderIndex: 1, wordCount: 2100, isPublished: true },
    ],
  },
  {
    id: "s8",
    slug: "rootwork",
    title: "Rootwork",
    description:
      "When herbalist Ada Bell inherits her grandmother's apothecary in rural Louisiana, she discovers the remedies are older — and more powerful — than she imagined.",
    coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=900&fit=crop",
    genre: "Magical Realism",
    tags: ["southern gothic", "herbalism", "heritage", "community"],
    status: "PUBLISHED",
    viewCount: 112000,
    likeCount: 9400,
    commentCount: 398,
    chapterCount: 20,
    author: authors[4],
    publishedAt: "2025-08-30T00:00:00Z",
    updatedAt: "2026-08-30T12:00:00Z",
    chapters: [],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "the-art-of-the-opening-line",
    title: "The Art of the Opening Line",
    excerpt:
      "First sentences are contracts with your reader. Here's how to write openings that demand a second paragraph.",
    content: "<p>Every story begins with a promise...</p>",
    coverUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=500&fit=crop",
    category: "Writing Advice",
    tags: ["craft", "beginnings", "technique"],
    author: authors[1],
    publishedAt: "2026-08-20T00:00:00Z",
  },
  {
    id: "b2",
    slug: "spotlight-soraya-north",
    title: "In Conversation: Soraya North on Writing Cosmic Dread",
    excerpt:
      "The Void Garden author discusses Lovecraftian influences, rejecting nihilism, and finding beauty in the dark.",
    content: "<p>Soraya North doesn't believe in hopelessness...</p>",
    coverUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&h=500&fit=crop",
    category: "Author Spotlight",
    tags: ["interview", "horror", "craft"],
    author: authors[2],
    publishedAt: "2026-08-15T00:00:00Z",
  },
  {
    id: "b3",
    slug: "ten-stories-that-will-change-how-you-read-fantasy",
    title: "Ten Stories That Will Change How You Read Fantasy",
    excerpt:
      "Beyond elves and prophecies: a curated list of fantasy that redefines the genre for the modern reader.",
    content: "<p>Fantasy is not a monolith...</p>",
    coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=500&fit=crop",
    category: "Reading Recommendations",
    tags: ["fantasy", "reading list", "curated"],
    author: authors[0],
    publishedAt: "2026-08-10T00:00:00Z",
  },
  {
    id: "b4",
    slug: "building-the-verse-tribe-community",
    title: "Building a Literary Community in the Digital Age",
    excerpt:
      "Why we created The Verse Tribe — and what we believe about stories, writers, and the spaces between them.",
    content: "<p>Every great library begins with a single shelf...</p>",
    coverUrl: "https://images.unsplash.com/photo-1524995997941-5401adbeb145?w=800&h=500&fit=crop",
    category: "Community",
    tags: ["community", "platform", "literature"],
    author: authors[3],
    publishedAt: "2026-08-01T00:00:00Z",
  },
];

export const communityActivity: ActivityItem[] = [
  {
    id: "a1",
    type: "comment",
    user: { username: "reader_maya", name: "Maya K.", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
    target: "The Thornwood Chronicles · Chapter 3",
    timestamp: "2026-09-06T22:15:00Z",
  },
  {
    id: "a2",
    type: "publish",
    user: { username: "theo-ashford", name: "Theo Ashford", avatarUrl: authors[5].avatarUrl },
    target: "Void Garden · Chapter 14",
    timestamp: "2026-09-06T19:00:00Z",
  },
  {
    id: "a3",
    type: "like",
    user: { username: "bookworm_j", name: "Jordan P.", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
    target: "Salt and Starlight",
    timestamp: "2026-09-06T18:30:00Z",
  },
  {
    id: "a4",
    type: "follow",
    user: { username: "literary_luna", name: "Luna S.", avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop" },
    target: "Elara Veil",
    timestamp: "2026-09-06T17:45:00Z",
  },
  {
    id: "a5",
    type: "update",
    user: { username: "mira-okonkwo", name: "Mira Okonkwo", avatarUrl: authors[4].avatarUrl },
    target: "Rootwork · Chapter 12",
    timestamp: "2026-09-06T16:20:00Z",
  },
];

export const sampleComments: Comment[] = [
  {
    id: "cm1",
    content: "The way Elara describes the silence in the Thornwood — I felt it in my chest. This is the kind of opening that makes you cancel your plans for the evening.",
    author: { id: "r1", username: "reader_maya", name: "Maya K.", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
    createdAt: "2026-09-05T20:30:00Z",
    replies: [
      {
        id: "cm2",
        content: "Agreed. The 'silence so complete it pressed against her eardrums' — chef's kiss.",
        author: { id: "r2", username: "bookworm_j", name: "Jordan P.", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
        createdAt: "2026-09-05T21:00:00Z",
      },
    ],
  },
  {
    id: "cm3",
    content: "I've read a lot of portal fantasy but this feels different. The grandmother's warning haunts every page without being heavy-handed.",
    author: { id: "r3", username: "literary_luna", name: "Luna S.", avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop" },
    createdAt: "2026-09-04T14:15:00Z",
  },
];

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

export function getChapterById(storySlug: string, chapterId: string) {
  const story = getStoryBySlug(storySlug);
  if (!story) return undefined;
  return story.chapters.find((c) => c.id === chapterId);
}

export function getAuthorByUsername(username: string): Author | undefined {
  return authors.find((a) => a.username === username);
}

export function getStoriesByAuthor(username: string): Story[] {
  return stories.filter((s) => s.author.username === username);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function searchStories(query: string, genre?: string): Story[] {
  const q = query.toLowerCase();
  return stories.filter((s) => {
    const matchesQuery =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.author.name.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q));
    const matchesGenre = !genre || s.genre === genre;
    return matchesQuery && matchesGenre;
  });
}

export function getFeaturedStories(): Story[] {
  return [stories[0], stories[6], stories[2]];
}

export function getTrendingStories(): Story[] {
  return [...stories].sort((a, b) => b.viewCount - a.viewCount).slice(0, 6);
}

export function getRecentlyUpdated(): Story[] {
  return [...stories].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 6);
}

export function getRecommendedStories(): Story[] {
  return [stories[3], stories[5], stories[7], stories[1]];
}

export function getFeaturedWriters(): Author[] {
  return [authors[0], authors[2], authors[4], authors[5]];
}

export interface ForumCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  threadCount: number;
}

export interface ForumThread {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  author: Pick<Author, "id" | "username" | "name" | "avatarUrl">;
  replyCount: number;
  viewCount: number;
  isPinned?: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface ForumReply {
  id: string;
  threadId: string;
  content: string;
  author: Pick<Author, "id" | "username" | "name" | "avatarUrl">;
  createdAt: string;
}

export const forumCategories: ForumCategory[] = [
  { id: "fc1", slug: "general", name: "General Discussion", description: "Talk about anything in the Verse", threadCount: 312 },
  { id: "fc2", slug: "writing-help", name: "Writing Help", description: "Craft, technique, and feedback", threadCount: 189 },
  { id: "fc3", slug: "book-discussions", name: "Book Discussions", description: "Deep dives into stories and chapters", threadCount: 245 },
  { id: "fc4", slug: "fantasy", name: "Fantasy Discussions", description: "Worlds, magic, and imagined realms", threadCount: 167 },
  { id: "fc5", slug: "recommendations", name: "Recommendations", description: "Share and discover your next read", threadCount: 278 },
  { id: "fc6", slug: "author-corner", name: "Author Corner", description: "For writers sharing their journey", threadCount: 134 },
  { id: "fc7", slug: "announcements", name: "Announcements", description: "Platform news and tribe updates", threadCount: 42 },
];

export const forumThreads: ForumThread[] = [
  {
    id: "ft1",
    title: "How do you write silence into a scene?",
    content:
      "<p>I've been struggling with a chapter where the protagonist enters the Thornwood — a place defined by absolute silence. How do you convey that absence of sound without telling the reader 'it was silent'?</p><p>Would love to hear how others approach atmospheric restraint in their writing.</p>",
    categoryId: "fc1",
    author: { id: "r1", username: "reader_maya", name: "Maya K.", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
    replyCount: 24,
    viewCount: 890,
    isPinned: true,
    createdAt: "2026-09-05T10:00:00Z",
    updatedAt: "2026-09-06T14:30:00Z",
    tags: ["craft", "atmosphere", "technique"],
  },
  {
    id: "ft2",
    title: "Building a magic system that feels ancient, not arbitrary",
    content:
      "<p>I'm working on a fantasy where magic is tied to memory rather than willpower. Looking for examples of systems that feel like they've existed for centuries — rules discovered, not invented.</p>",
    categoryId: "fc2",
    author: authors[0],
    replyCount: 18,
    viewCount: 654,
    createdAt: "2026-09-04T16:20:00Z",
    updatedAt: "2026-09-06T09:15:00Z",
    tags: ["worldbuilding", "magic", "fantasy"],
  },
  {
    id: "ft3",
    title: "Stories that changed how you read fantasy",
    content:
      "<p>Not the usual suspects — looking for hidden gems and underappreciated works that shifted your understanding of what fantasy can be.</p>",
    categoryId: "fc3",
    author: { id: "r2", username: "bookworm_j", name: "Jordan P.", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
    replyCount: 47,
    viewCount: 1420,
    createdAt: "2026-09-03T08:00:00Z",
    updatedAt: "2026-09-06T20:00:00Z",
    tags: ["recommendations", "fantasy", "reading"],
  },
  {
    id: "ft4",
    title: "Welcome to The Verse Tribe Forum",
    content:
      "<p>Welcome, storytellers and wanderers. This is your space to discuss craft, share discoveries, and connect with fellow members of the tribe.</p><p>Be kind. Be curious. Every voice matters here.</p>",
    categoryId: "fc4",
    author: authors[3],
    replyCount: 56,
    viewCount: 3200,
    isPinned: true,
    createdAt: "2026-08-01T00:00:00Z",
    updatedAt: "2026-09-06T12:00:00Z",
    tags: ["welcome", "community"],
  },
  {
    id: "ft5",
    title: "The opening line challenge — share yours",
    content:
      "<p>Post the first line of your current work-in-progress. No context, no explanation. Just the line. Let's see what hooks the tribe.</p>",
    categoryId: "fc1",
    author: authors[4],
    replyCount: 89,
    viewCount: 2100,
    createdAt: "2026-09-01T12:00:00Z",
    updatedAt: "2026-09-06T18:45:00Z",
    tags: ["challenge", "openings", "wip"],
  },
];

export const forumReplies: ForumReply[] = [
  {
    id: "fr1",
    threadId: "ft1",
    content:
      "Try focusing on what the character expects to hear and doesn't. The Thornwood chapter does this beautifully — 'her voice was swallowed whole.' The absence becomes physical.",
    author: authors[0],
    createdAt: "2026-09-05T14:00:00Z",
  },
  {
    id: "fr2",
    threadId: "ft1",
    content:
      "Sensory substitution works well. When sound disappears, other senses sharpen. Describe the texture of silence — the pressure, the weight of it.",
    author: authors[2],
    createdAt: "2026-09-05T16:30:00Z",
  },
  {
    id: "fr3",
    threadId: "ft1",
    content:
      "White space on the page. A short paragraph after dense prose. Let the layout breathe the way the scene breathes.",
    author: { id: "r3", username: "literary_luna", name: "Luna S.", avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop" },
    createdAt: "2026-09-06T10:00:00Z",
  },
];

export interface LibraryItem {
  story: Story;
  progress: number;
  lastReadAt: string;
  isBookmarked: boolean;
}

export const libraryItems: LibraryItem[] = [
  { story: stories[0], progress: 12, lastReadAt: "2026-09-06T22:00:00Z", isBookmarked: true },
  { story: stories[2], progress: 45, lastReadAt: "2026-09-05T18:30:00Z", isBookmarked: true },
  { story: stories[6], progress: 8, lastReadAt: "2026-09-04T21:15:00Z", isBookmarked: false },
  { story: stories[4], progress: 0, lastReadAt: "2026-09-03T10:00:00Z", isBookmarked: true },
];

export function getForumThreadById(id: string): ForumThread | undefined {
  return forumThreads.find((t) => t.id === id);
}

export function getForumRepliesByThread(threadId: string): ForumReply[] {
  return forumReplies.filter((r) => r.threadId === threadId);
}

export function getForumCategoryById(id: string): ForumCategory | undefined {
  return forumCategories.find((c) => c.id === id);
}

export interface SearchResults {
  stories: Story[];
  authors: Author[];
  blogPosts: BlogPost[];
  forumThreads: ForumThread[];
}

export function globalSearch(query: string): SearchResults {
  const q = query.toLowerCase().trim();
  if (!q) {
    return { stories: [], authors: [], blogPosts: [], forumThreads: [] };
  }

  return {
    stories: stories.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.genre.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    ),
    authors: authors.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.username.toLowerCase().includes(q) ||
        a.bio.toLowerCase().includes(q)
    ),
    blogPosts: blogPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    ),
    forumThreads: forumThreads.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    ),
  };
}
