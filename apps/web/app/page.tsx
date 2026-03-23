"use client";

import { PostCard } from "@/components/post-card";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Page() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      
      if (data) {
        const mappedPosts = data.map((item: any) => ({
          id: item.id,
          content: item.content,
          mood: item.mood,
          nickname: "Anonim",
          repliesCount: item.replies_count || 0,
          createdAt: new Date(item.created_at),
        }));
        setPosts(mappedPosts);
      }
    } catch (err) {
      console.error("Gönderiler çekilirken hata:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    const handlePostCreated = () => {
      fetchPosts();
    };

    window.addEventListener("postCreated", handlePostCreated);
    return () => window.removeEventListener("postCreated", handlePostCreated);
  }, []);

  return (
    <div>
        <div className="relative min-h-screen w-full flex flex-col items-center">
      <header className="relative z-10 w-full pt-12 pb-8 px-6">
        <div className="w-full max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-[44px] lg:text-[32px] font-serif text-white mb-4 tracking-wide opacity-90">
            Yalnız değilsin.
          </h1>
          <p className="text-[#94a3b8] text-[15px] font-medium tracking-wide">
            Uykuyu Unutmuş Bir İnsana İyi Geceler Diyemezsin
          </p>
        </div>
      </header>

      <main className="relative z-10 w-full pb-32 px-6">
        <div className="w-full max-w-5xl mx-auto">
            {loading ? (
              <div className="w-full col-span-1 sm:col-span-2 lg:col-span-3 text-center py-10 opacity-60 text-white flex flex-col items-center gap-3">
                <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                Dertler yükleniyor...
              </div>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="break-inside-avoid mb-5">
                  <PostCard {...post} />
                </div>
              ))
            ) : (
              <div className="w-full col-span-1 sm:col-span-2 lg:col-span-3 text-center py-10 opacity-60 text-white">
                Henüz hiçbir dert girilmemiş. İlk içini döken sen ol!
              </div>
            )}
          </div>
      </main>
      </div>
    </div>
  );
}

