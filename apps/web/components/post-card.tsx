"use client";

import { MessageCircle } from "lucide-react";

export interface PostCardProps {
  id: string;
  content: string;
  mood: string;
  nickname: string;
  repliesCount: number;
  createdAt: Date;
}

const moodColors: Record<string, string> = {
  "Yorgunum": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Kırgınım": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Kaygılıyım": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "Öfkeliyim": "bg-red-500/20 text-red-300 border-red-500/30",
  "Boşluktayım": "bg-gray-500/20 text-gray-300 border-gray-500/30",
  "Sadece anlatmak istiyorum": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
};

export function PostCard({ id, content, mood, nickname, repliesCount, createdAt }: PostCardProps) {
  // İlk 2 satır veya 120 karakter
  const preview = content.length > 120 ? content.slice(0, 120) + "..." : content;
  const lines = preview.split("\n").slice(0, 2).join("\n");
  
  const moodStyle = moodColors[mood] || "bg-blue-500/20 text-blue-300 border-blue-500/30";

  return (
    <div 
      className="group relative bg-[var(--bg-card)] backdrop-blur-sm rounded-3xl p-5 border border-[var(--border-subtle)] 
                 hover:border-[var(--accent-moon)]/30 hover:shadow-[0_0_20px_rgba(125,211,252,0.15)] 
                 transition-all duration-300 cursor-pointer"
      onClick={() => window.location.href = `/post/${id}`}
    >
      {/* Glow efekti */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-moon)]/0 to-[var(--accent-moon)]/0 
                      group-hover:from-[var(--accent-moon)]/5 group-hover:to-transparent rounded-3xl 
                      transition-all duration-300 pointer-events-none" />
      
      {/* İçerik */}
      <div className="relative z-10">
        {/* Üst kısım: nickname ve mood */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[var(--text-secondary)] text-sm font-medium">
            {nickname}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs border ${moodStyle}`}>
            {mood}
          </span>
        </div>

        {/* Dert içeriği */}
        <p className="text-[var(--text-primary)] leading-relaxed mb-4 whitespace-pre-wrap">
          {lines}
        </p>

        {/* Alt kısım: cevap sayısı ve destek ol */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
            <MessageCircle className="w-4 h-4" />
            <span>{repliesCount} cevap</span>
          </div>
          
          <button 
            className="px-4 py-1.5 bg-[var(--accent-moon)]/10 hover:bg-[var(--accent-moon)]/20 
                       text-[var(--accent-moon)] rounded-full text-sm font-medium
                       border border-[var(--accent-moon)]/20 hover:border-[var(--accent-moon)]/40
                       transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/post/${id}`;
            }}
          >
            Destek ol
          </button>
        </div>
      </div>
    </div>
  );
}
