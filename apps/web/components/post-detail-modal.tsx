"use client";

import { X, Send, Clock, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase, getAuthorId } from "../lib/supabase";

interface PostDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: string;
    content: string;
    mood?: string;
    createdAt: Date;
    nickname: string;
    repliesCount: number;
  } | null;
}

export function PostDetailModal({ isOpen, onClose, post }: PostDetailModalProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && post) {
      fetchComments();
    }
  }, [isOpen, post]);

  const fetchComments = async () => {
    if (!post) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", post.id)
        .order("created_at", { ascending: true });
        
      if (error) throw error;
      if (data) setComments(data);
    } catch (err) {
      console.error("Yorumlar çekilirken hata:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendComment = async () => {
    if (!newComment.trim() || !post) return;
    
    setIsSubmitting(true);
    const author_id = getAuthorId();
    
    const { error } = await supabase
      .from("comments")
      .insert([{ 
        post_id: post.id, 
        content: newComment.trim(), 
        author_id 
      }]);

    setIsSubmitting(false);

    if (error) {
      console.error("Yorum ekleme hatası:", error);
      alert("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
      return;
    }
    
    setNewComment("");
    fetchComments();
    window.dispatchEvent(new Event("postCreated")); // To refresh counts globally if needed
  };

  if (!isOpen || !post) return null;

  const getTimeAgo = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - d.getTime()) / (1000 * 60));
    if (diffInMinutes < 60) return `${diffInMinutes}dk önce`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}s önce`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}g önce`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[var(--bg-card)] rounded-[24px] border border-[var(--border-subtle)] 
                      shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh]
                      animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header / Current Post */}
        <div className="shrink-0 p-6 border-b border-[var(--border-subtle)] relative bg-black/10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col gap-3 pr-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#64748b] to-[#334155] flex items-center justify-center text-xs font-bold text-white shadow-inner">
                {post.nickname.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-medium text-white">{post.nickname}</span>
                <span className="text-[11px] text-[#94a3b8] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {getTimeAgo(post.createdAt)}
                </span>
              </div>
              {post.mood && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-[#cbd5e1]">
                  {post.mood}
                </span>
              )}
            </div>
            <p className="text-[#e2e8f0] leading-relaxed whitespace-pre-wrap break-words text-[15px] font-medium">
              {post.content}
            </p>
          </div>
        </div>

        {/* Comments Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-transparent to-black/10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 opacity-50 space-y-3">
              <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
              <span className="text-sm text-white">Yorumlar yükleniyor...</span>
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={comment.id || index} className="flex gap-3 animate-in slide-in-from-bottom-2 fade-in duration-300" style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}>
                <div className="w-7 h-7 rounded-full bg-[#1e293b] flex items-center justify-center text-[10px] font-bold text-[#94a3b8] shrink-0 mt-1">
                  A
                </div>
                <div className="flex-1 bg-[#0f172a] rounded-[18px] rounded-tl-sm p-3.5 px-4 border border-white/5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[12px] font-medium text-[#94a3b8]">Anonim</span>
                    <span className="text-[11px] text-[#64748b]">{getTimeAgo(comment.created_at)}</span>
                  </div>
                  <p className="text-sm text-[#cbd5e1] whitespace-pre-wrap break-words leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
              <MessageCircle className="w-10 h-10 mb-3 text-[#94a3b8]" />
              <p className="text-sm text-white font-medium">İlk yorumu sen yaz!</p>
              <p className="text-xs text-[#94a3b8] mt-1">Bu gönderiye henüz kimse yorum yapmamış.</p>
            </div>
          )}
        </div>

        {/* Comment Input */}
        <div className="shrink-0 p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="relative flex items-center">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendComment();
                }
              }}
              placeholder="Fikrini paylaş (Anonim)..."
              className="w-full bg-black/20 text-[#e2e8f0] placeholder:text-[#64748b] 
                         rounded-full pl-5 pr-12 py-3.5 border border-white/10
                         focus:outline-none focus:border-[#7dd3fc]/30 focus:bg-black/30 transition-all text-sm"
              disabled={isSubmitting}
            />
            <button
              onClick={handleSendComment}
              disabled={!newComment.trim() || isSubmitting}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full 
                         bg-[#7dd3fc]/10 text-[#7dd3fc] hover:bg-[#7dd3fc]/20 hover:scale-105 active:scale-95
                         disabled:opacity-50 disabled:grayscale disabled:hover:scale-100 disabled:cursor-not-allowed
                         transition-all"
            >
              {isSubmitting ? (
                 <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                 <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
