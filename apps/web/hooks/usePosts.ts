"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Post, PostRow, mapPostRow } from "@/lib/types";

interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePosts(): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (supabaseError) throw supabaseError;
      if (data) {
        setPosts((data as PostRow[]).map(mapPostRow));
      }
    } catch (err) {
      console.error("Gönderiler çekilirken hata:", err);
      setError("Gönderiler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();

    const handleRefresh = () => fetchPosts();
    window.addEventListener("postCreated", handleRefresh);
    return () => window.removeEventListener("postCreated", handleRefresh);
  }, [fetchPosts]);

  return { posts, loading, error, refetch: fetchPosts };
}
