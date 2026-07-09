"use client";

import { DailyActivity } from "@/lib/types";

interface ActivitySparklineProps {
  data: DailyActivity[];
}

function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("tr-TR", { weekday: "short" });
}

export function ActivitySparkline({ data }: ActivitySparklineProps) {
  if (!data.length) {
    return (
      <div className="glass-card rounded-2xl p-6 flex items-center justify-center min-h-[200px]">
        <p className="text-gray-500 text-sm">Henüz veri yok.</p>
      </div>
    );
  }

  const maxVal = Math.max(...data.flatMap((d) => [d.posts, d.comments]), 1);

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Son 7 Gün Aktivite</h3>
        <div className="flex items-center gap-4 text-[12px]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
            <span className="text-gray-400">Gönderi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
            <span className="text-gray-400">Yorum</span>
          </div>
        </div>
      </div>

      {/* Grafik */}
      <div className="flex items-end gap-2 h-32">
        {data.map((day) => {
          const postH = maxVal > 0 ? (day.posts / maxVal) * 100 : 0;
          const commentH = maxVal > 0 ? (day.comments / maxVal) * 100 : 0;

          return (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1 group">
              {/* Barlar */}
              <div className="w-full flex items-end gap-0.5 h-24">
                {/* Gönderi barı */}
                <div className="flex-1 flex flex-col justify-end">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-teal-600 to-teal-400
                                shadow-sm shadow-teal-500/30 transition-all duration-500 ease-out
                                group-hover:from-teal-500 group-hover:to-teal-300 min-h-[3px]"
                    style={{ height: `${Math.max(postH, 4)}%` }}
                    title={`${day.posts} gönderi`}
                  />
                </div>
                {/* Yorum barı */}
                <div className="flex-1 flex flex-col justify-end">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-indigo-400
                                shadow-sm shadow-indigo-500/30 transition-all duration-500 ease-out
                                group-hover:from-indigo-500 group-hover:to-indigo-300 min-h-[3px]"
                    style={{ height: `${Math.max(commentH, 4)}%` }}
                    title={`${day.comments} yorum`}
                  />
                </div>
              </div>

              {/* Tooltip sayıları (hover) */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -mt-12 bg-[#0f172a] border border-white/10 rounded-lg px-2 py-1 text-[10px] text-white pointer-events-none whitespace-nowrap">
                📝 {day.posts} · 💬 {day.comments}
              </div>

              {/* Gün etiketi */}
              <span className="text-[10px] text-gray-600 group-hover:text-gray-400 transition-colors capitalize">
                {formatShortDate(day.date)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
