"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { supabase, getAuthorId } from "@/lib/supabase";
import { Mood, MOODS, MOOD_COLORS } from "@/lib/types";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<Mood | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleShare = async () => {
    if (!content.trim() || !selectedMood) return;

    setIsSubmitting(true);
    const author_id = getAuthorId();

    const { error } = await supabase
      .from("posts")
      .insert([{ content: content.trim(), mood: selectedMood, author_id }]);

    setIsSubmitting(false);

    if (error) {
      console.error("Paylaşım hatası:", error);
      alert("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
      return;
    }

    setContent("");
    setSelectedMood("");
    onClose();

    window.dispatchEvent(new Event("postCreated"));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl mx-4 mb-24 sm:mb-0 bg-[var(--bg-card)] backdrop-blur-xl
                      rounded-3xl border border-[var(--border-subtle)] shadow-[0_0_50px_rgba(125,211,252,0.2)]
                      animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 duration-300">

        {/* Başlık */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-subtle)]">
          <div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-1">
              Bugün ne içini sıktı?
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              İstersen kısa yaz, istersen dökül.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]
                       hover:bg-[var(--bg-card-hover)] rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* İçerik */}
        <div className="p-6 space-y-6">
          {/* Textarea */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Yargılanmadan buraya yazabilirsin..."
            className="w-full min-h-[160px] bg-[var(--bg-midnight)]/50 text-[var(--text-primary)]
                       placeholder:text-[var(--text-muted)] rounded-2xl p-4 border border-[var(--border-subtle)]
                       focus:border-[var(--accent-moon)]/50 focus:outline-none focus:ring-2
                       focus:ring-[var(--accent-moon)]/20 resize-none transition-all"
          />

          {/* Mood seçimi */}
          <div>
            <p className="text-sm text-[var(--text-secondary)] mb-3 font-medium">
              Şu an nasıl hissediyorsun?
            </p>
            <div className="grid grid-cols-2 gap-2">
              {MOODS.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all
                    ${selectedMood === mood
                      ? `${MOOD_COLORS[mood]} bg-opacity-20 ring-2 ring-current ring-opacity-30`
                      : `border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-moon)]/30`
                    }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          {/* Paylaş butonu */}
          <button
            onClick={handleShare}
            disabled={!content.trim() || !selectedMood || isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-[var(--accent-moon)] to-[var(--accent-glow)]
                       text-[var(--bg-midnight)] font-semibold rounded-2xl
                       shadow-[0_0_25px_rgba(125,211,252,0.3)] hover:shadow-[0_0_35px_rgba(125,211,252,0.4)]
                       hover:scale-[1.02] transition-all duration-200
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? "Paylaşılıyor..." : "Paylaş"}
          </button>
        </div>
      </div>
    </div>
  );
}
