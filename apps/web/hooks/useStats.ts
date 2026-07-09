"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  PlatformStats,
  MoodStat,
  DailyActivity,
} from "@/lib/types";
import { getLastNDays, getHour } from "@/lib/utils";

interface UseStatsReturn {
  stats: PlatformStats | null;
  loading: boolean;
  error: string | null;
}

export function useStats(): UseStatsReturn {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Paralel sorgular — toplam sayılar ve ham veriler
      const [postsRes, commentsRes, pollsRes, votesRes] = await Promise.all([
        supabase
          .from("posts")
          .select("id, mood, created_at")
          .order("created_at", { ascending: false }),

        supabase
          .from("comments")
          .select("id, created_at"),

        supabase
          .from("polls")
          .select("id"),

        supabase
          .from("poll_votes")
          .select("id"),
      ]);

      if (postsRes.error) throw postsRes.error;
      if (commentsRes.error) throw commentsRes.error;
      if (pollsRes.error) throw pollsRes.error;
      if (votesRes.error) throw votesRes.error;

      const posts = postsRes.data ?? [];
      const comments = commentsRes.data ?? [];

      // --- Mood dağılımı ---
      const moodCounts: Record<string, number> = {};
      for (const post of posts) {
        if (post.mood) {
          moodCounts[post.mood] = (moodCounts[post.mood] ?? 0) + 1;
        }
      }
      const totalWithMood = Object.values(moodCounts).reduce((a, b) => a + b, 0);
      const moodDistribution: MoodStat[] = Object.entries(moodCounts)
        .map(([mood, count]) => ({
          mood,
          count,
          percentage: totalWithMood > 0 ? Math.round((count / totalWithMood) * 100) : 0,
        }))
        .sort((a, b) => b.count - a.count);

      // --- Son 7 günlük aktivite ---
      const last7Days = getLastNDays(7);
      const dailyActivity: DailyActivity[] = last7Days.map((date) => ({
        date,
        posts: posts.filter(
          (p) => p.created_at.startsWith(date)
        ).length,
        comments: comments.filter(
          (c) => c.created_at.startsWith(date)
        ).length,
      }));

      // --- En aktif saat ---
      const hourCounts: number[] = new Array(24).fill(0) as number[];
      for (const post of posts) {
        const h = getHour(post.created_at);
        hourCounts[h] = (hourCounts[h] ?? 0) + 1;
      }
      for (const comment of comments) {
        const h = getHour(comment.created_at);
        hourCounts[h] = (hourCounts[h] ?? 0) + 1;
      }
      const mostActiveHour = hourCounts.indexOf(Math.max(...hourCounts));

      setStats({
        totalPosts: posts.length,
        totalComments: comments.length,
        totalPolls: (pollsRes.data ?? []).length,
        totalVotes: (votesRes.data ?? []).length,
        moodDistribution,
        dailyActivity,
        mostActiveHour,
      });
    } catch (err) {
      console.error("İstatistikler çekilirken hata:", err);
      setError("İstatistikler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error };
}
