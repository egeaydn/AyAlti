// =============================================
// AyAltı — Merkezi Tip Tanımları
// =============================================

// ---------------------
// Mood (Ruh Hali)
// ---------------------
export type Mood =
  | "Yorgunum"
  | "Kırgınım"
  | "Kaygılıyım"
  | "Öfkeliyim"
  | "Boşluktayım"
  | "Sadece anlatmak istiyorum";

export const MOODS: Mood[] = [
  "Yorgunum",
  "Kırgınım",
  "Kaygılıyım",
  "Öfkeliyim",
  "Boşluktayım",
  "Sadece anlatmak istiyorum",
];

export const MOOD_COLORS: Record<Mood, string> = {
  Yorgunum: "border-blue-500/50 text-blue-300 hover:bg-blue-500/10",
  Kırgınım: "border-purple-500/50 text-purple-300 hover:bg-purple-500/10",
  Kaygılıyım: "border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/10",
  Öfkeliyim: "border-red-500/50 text-red-300 hover:bg-red-500/10",
  Boşluktayım: "border-gray-500/50 text-gray-300 hover:bg-gray-500/10",
  "Sadece anlatmak istiyorum":
    "border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10",
};

// ---------------------
// Post (Gönderi)
// ---------------------
export interface Post {
  id: string;
  content: string;
  mood?: Mood;
  nickname: string;
  repliesCount: number;
  createdAt: Date;
}

/** Ham Supabase satırı */
export interface PostRow {
  id: string;
  content: string;
  mood: string | null;
  author_id: string;
  created_at: string;
  replies_count: number;
}

/** PostRow → Post dönüşümü */
export function mapPostRow(row: PostRow): Post {
  return {
    id: row.id,
    content: row.content,
    mood: (row.mood as Mood) ?? undefined,
    nickname: "Anonim",
    repliesCount: row.replies_count ?? 0,
    createdAt: new Date(row.created_at),
  };
}

// ---------------------
// Comment (Yorum)
// ---------------------
export interface Comment {
  id: string;
  content: string;
  postId: string;
  createdAt: Date;
}

export interface CommentDetail {
  id: string;
  post_id: string;
  content: string;
  author_id: string;
  likes_count: number;
  created_at: string;
}

/** CommentDetail → Comment dönüşümü */
export function mapCommentRow(row: CommentDetail): Comment {
  return {
    id: row.id,
    content: row.content,
    postId: row.post_id,
    createdAt: new Date(row.created_at),
  };
}

// ---------------------
// Poll (Anket)
// ---------------------
export interface PollOption {
  id: string;
  option_text: string;
  votes_count: number;
}

export interface Poll {
  id: string;
  question: string;
  totalVotes: number;
  options: PollOption[];
  hasVotedProp: boolean;
  createdAt: Date;
}

export interface PollRow {
  id: string;
  question: string;
  author_id: string;
  created_at: string;
  total_votes: number;
  poll_options: PollOption[];
  poll_votes: { id: string; author_id: string }[];
}

/** PollRow → Poll dönüşümü */
export function mapPollRow(row: PollRow, currentAuthorId: string): Poll {
  return {
    id: row.id,
    question: row.question,
    totalVotes: row.total_votes ?? 0,
    options: row.poll_options ?? [],
    hasVotedProp: row.poll_votes?.some((v) => v.author_id === currentAuthorId) ?? false,
    createdAt: new Date(row.created_at),
  };
}

// ---------------------
// Stats (İstatistik)
// ---------------------
export interface MoodStat {
  mood: string;
  count: number;
  percentage: number;
}

export interface DailyActivity {
  date: string; // "YYYY-MM-DD"
  posts: number;
  comments: number;
}

export interface PlatformStats {
  totalPosts: number;
  totalComments: number;
  totalPolls: number;
  totalVotes: number;
  moodDistribution: MoodStat[];
  dailyActivity: DailyActivity[];
  mostActiveHour: number; // 0-23
}
