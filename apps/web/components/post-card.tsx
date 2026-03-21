"use client";

import { MessageCircle } from "lucide-react";

export interface PostCardProps {
  id: string;
  content: string;
  mood?: string;
  nickname: string;
  repliesCount: number;
  createdAt: Date;
}

export function PostCard({ id, content, repliesCount, createdAt }: PostCardProps) {
  // Zaman farkını hesapla
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}dk önce`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}s önce`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}g önce`;
  };

  return (
    <div 
      className="group relative bg-(--bg-card) rounded-[28px] p-6 
                 border border-(--border-subtle) hover:bg-(--bg-card-hover) w-full h-full
                 transition-all duration-300 cursor-pointer flex flex-col shadow-lg shadow-black/20"
      onClick={() => window.location.href = `/post/${id}`}
    >
      {/* İçerik */}
      <div className="mb-6 flex-1">
        <p className="text-[#e2e8f0] leading-relaxed whitespace-pre-wrap text-[15px] font-medium tracking-wide">
          {content}
        </p>
      </div>

      {/* Alt kısım: zaman ve cevap sayısı */}
      <div className="flex items-center justify-between text-[#64748b] text-[13px] mt-auto font-medium">
        <span>{getTimeAgo(createdAt)}</span>
        
        <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
          <MessageCircle className="w-[15px] h-[15px]" />
          <span>{repliesCount > 0 ? repliesCount : ""}</span>
        </div>
      </div>
    </div>
  );
}
