"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase, getAuthorId } from "@/lib/supabase";
import {
  Post,
  Comment,
  Poll,
  PostRow,
  CommentDetail,
  PollRow,
  mapPostRow,
  mapCommentRow,
  mapPollRow,
} from "@/lib/types";

interface MyActivityData {
  posts: Post[];
  comments: Comment[];
  polls: Poll[];
}

interface UseMyActivityReturn extends MyActivityData {
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useMyActivity(): UseMyActivityReturn {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);

    const authorId = getAuthorId();

    try {
      const [postsRes, commentsRes, pollsRes] = await Promise.all([
        supabase
          .from("posts")
          .select("*")
          .eq("author_id", authorId)
          .order("created_at", { ascending: false }),

        supabase
          .from("comments")
          .select("*")
          .eq("author_id", authorId)
          .order("created_at", { ascending: false }),

        supabase
          .from("polls")
          .select("*, poll_options(*), poll_votes(id, author_id)")
          .eq("author_id", authorId)
          .order("created_at", { ascending: false }),
      ]);

      if (postsRes.error) throw postsRes.error;
      if (commentsRes.error) throw commentsRes.error;
      if (pollsRes.error) throw pollsRes.error;

      if (postsRes.data) {
        setPosts((postsRes.data as PostRow[]).map(mapPostRow));
      }
      if (commentsRes.data) {
        setComments((commentsRes.data as CommentDetail[]).map(mapCommentRow));
      }
      if (pollsRes.data) {
        setPolls((pollsRes.data as PollRow[]).map((row) => mapPollRow(row, authorId)));
      }
    } catch (err) {
      console.error("Aktivite çekilirken hata:", err);
      setError("Veriler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();

    const handleRefresh = () => fetchAll();
    window.addEventListener("postCreated", handleRefresh);
    window.addEventListener("pollCreated", handleRefresh);
    return () => {
      window.removeEventListener("postCreated", handleRefresh);
      window.removeEventListener("pollCreated", handleRefresh);
    };
  }, [fetchAll]);

  return { posts, comments, polls, loading, error, refetch: fetchAll };
}
