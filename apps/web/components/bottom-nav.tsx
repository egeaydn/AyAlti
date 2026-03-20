"use client";

import { Home, Plus, Shuffle } from "lucide-react";
import { usePathname } from "next/navigation";

export function BottomNav({ onOpenShareAction }: { onOpenShareAction: () => void }) {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="mx-auto max-w-2xl px-4 pb-4">
        <div className="bg-[var(--bg-card)]/80 backdrop-blur-xl rounded-3xl border border-[var(--border-subtle)] 
                        shadow-[0_0_30px_rgba(125,211,252,0.1)]">
          <div className="flex items-center justify-around py-2 px-4">
            {/* Akış */}
            <button
              onClick={() => window.location.href = '/'}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all duration-200
                ${pathname === '/' 
                  ? 'text-[var(--accent-moon)] bg-[var(--accent-moon)]/10' 
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs font-medium">Akış</span>
            </button>

            {/* Paylaş - Ortada büyük */}
            <button
              onClick={onOpenShareAction}
              className="flex flex-col items-center -mt-4 px-8 py-3 bg-linear-to-br from-(--accent-moon) to-(--accent-glow)
                         rounded-3xl shadow-[0_0_25px_rgba(125,211,252,0.3)] hover:shadow-[0_0_35px_rgba(125,211,252,0.4)]
                         hover:scale-105 transition-all duration-200"
            >
              <Plus className="w-6 h-6 text-[var(--bg-midnight)]" strokeWidth={2.5} />
              <span className="text-xs font-bold text-[var(--bg-midnight)] mt-0.5">Paylaş</span>
            </button>

            {/* Rastgele */}
            <button
              onClick={() => window.location.href = '/random'}
              className="flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all duration-200
                         text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            >
              <Shuffle className="w-5 h-5" />
              <span className="text-xs font-medium">Rastgele</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
