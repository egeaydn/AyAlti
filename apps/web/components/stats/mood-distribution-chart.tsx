"use client";

import { MoodStat } from "@/lib/types";

interface MoodDistributionChartProps {
  data: MoodStat[];
}

const MOOD_GRADIENT: Record<string, { bar: string; glow: string; dot: string }> = {
  Yorgunum: { bar: "from-blue-500 to-blue-400", glow: "shadow-blue-500/30", dot: "bg-blue-400" },
  Kırgınım: { bar: "from-purple-500 to-purple-400", glow: "shadow-purple-500/30", dot: "bg-purple-400" },
  Kaygılıyım: { bar: "from-yellow-500 to-amber-400", glow: "shadow-yellow-500/30", dot: "bg-yellow-400" },
  Öfkeliyim: { bar: "from-red-500 to-red-400", glow: "shadow-red-500/30", dot: "bg-red-400" },
  Boşluktayım: { bar: "from-slate-500 to-slate-400", glow: "shadow-slate-500/30", dot: "bg-slate-400" },
  "Sadece anlatmak istiyorum": { bar: "from-cyan-500 to-cyan-400", glow: "shadow-cyan-500/30", dot: "bg-cyan-400" },
};

const DEFAULT_STYLE = { bar: "from-teal-500 to-teal-400", glow: "shadow-teal-500/30", dot: "bg-teal-400" };

export function MoodDistributionChart({ data }: MoodDistributionChartProps) {
  if (!data.length) {
    return (
      <div className="glass-card rounded-2xl p-6 flex items-center justify-center min-h-[200px]">
        <p className="text-gray-500 text-sm">Henüz yeterli veri yok.</p>
      </div>
    );
  }

  const maxCount = Math.max(...data.map((d) => d.count));

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-6">Ruh Hali Dağılımı</h3>

      <div className="space-y-4">
        {data.map((item) => {
          const style = MOOD_GRADIENT[item.mood] ?? DEFAULT_STYLE;
          const barWidth = maxCount > 0 ? (item.count / maxCount) * 100 : 0;

          return (
            <div key={item.mood} className="group">
              {/* Etiket + yüzde */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${style.dot}`} />
                  <span className="text-[13px] text-gray-300 font-medium">{item.mood}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-gray-500">{item.count} gönderi</span>
                  <span className="text-[13px] font-bold text-white">{item.percentage}%</span>
                </div>
              </div>

              {/* Bar */}
              <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${style.bar} shadow-sm ${style.glow}
                              transition-all duration-700 ease-out`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
