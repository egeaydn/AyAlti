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
      className="group relative bg-[#1a1f2e]/60 backdrop-blur-sm rounded-2xl p-5 
                 border border-white/5 hover:border-white/10 w-full h-full
                 transition-all duration-300 cursor-pointer flex flex-col"
      onClick={() => window.location.href = `/post/${id}`}
    >
      {/* İçerik */}
      <div className="mb-4 flex-1">
        <p className="text-gray-200/90 leading-relaxed whitespace-pre-wrap text-[15px]">
          {content}
        </p>
      </div>

      {/* Alt kısım: zaman ve cevap sayısı */}
      <div className="flex items-center justify-between text-gray-500 text-sm mt-auto">
        <span>{getTimeAgo(createdAt)}</span>
        
        <div className="flex items-center gap-1.5">
          <MessageCircle className="w-4 h-4" />
          <span>{repliesCount}</span>
        </div>
      </div>
    </div>
  );
}
