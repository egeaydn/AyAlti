"use client";

import { useStats } from "@/hooks/useStats";
import { StatCard } from "@/components/stats/stat-card";
import { MoodDistributionChart } from "@/components/stats/mood-distribution-chart";
import { ActivitySparkline } from "@/components/stats/activity-sparkline";
import { ActiveHourCard } from "@/components/stats/active-hour-card";
import {
  MessageSquare,
  MessageCircle,
  PieChart,
  Vote,
  BarChart3,
} from "lucide-react";

export default function StatsPage() {
  const { stats, loading, error } = useStats();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center">
      {/* Header */}
      <header className="relative z-10 w-full pt-16 pb-10 px-4 sm:px-6">
        <div className="w-full max-w-5xl mx-auto animate-float">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-indigo-500/20 border border-teal-500/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-teal-400" />
            </div>
            <span className="text-[13px] font-semibold uppercase tracking-widest text-teal-400/70">
              Platform Verileri
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient-premium mb-3 tracking-tight">
            İstatistikler
          </h1>
          <p className="text-[#cbd5e1] text-[15px] font-medium tracking-wide max-w-xl">
            Topluluğun nabzı, ruh hallerin haritası. Kimler burada, ne hissediyorlar?
          </p>
        </div>
      </header>

      {/* İçerik */}
      <main className="relative z-10 w-full pb-36 px-4 sm:px-6">
        <div className="w-full max-w-5xl mx-auto space-y-8">

          {/* Hata durumu */}
          {error && (
            <div className="glass-card rounded-2xl p-6 border border-red-500/20 text-red-400 text-center">
              {error}
            </div>
          )}

          {/* Loading durumu */}
          {loading && !error && (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-[--teal-accent]">
              <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-teal-400 rounded-full animate-spin" />
              <span className="animate-pulse-soft font-medium">İstatistikler hesaplanıyor...</span>
            </div>
          )}

          {/* Veriler yüklendi */}
          {!loading && !error && stats && (
            <>
              {/* Üst metrik kartları */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Toplam Gönderi"
                  value={stats.totalPosts}
                  accentColor="teal"
                  subtitle="Platform geneli"
                  icon={<MessageSquare className="w-6 h-6" />}
                />
                <StatCard
                  title="Toplam Yorum"
                  value={stats.totalComments}
                  accentColor="indigo"
                  subtitle="Tüm gönderilere"
                  icon={<MessageCircle className="w-6 h-6" />}
                />
                <StatCard
                  title="Anket Sayısı"
                  value={stats.totalPolls}
                  accentColor="purple"
                  subtitle="Açık anketler"
                  icon={<PieChart className="w-6 h-6" />}
                />
                <StatCard
                  title="Toplam Oy"
                  value={stats.totalVotes}
                  accentColor="amber"
                  subtitle="Tüm anketlerde"
                  icon={<Vote className="w-6 h-6" />}
                />
              </div>

              {/* Orta satır — Aktivite grafiği + En aktif saat */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ActivitySparkline data={stats.dailyActivity} />
                <ActiveHourCard hour={stats.mostActiveHour} />
              </div>

              {/* Mood dağılımı — tam genişlik */}
              <MoodDistributionChart data={stats.moodDistribution} />

              {/* Boş veri durumu */}
              {stats.totalPosts === 0 && stats.totalComments === 0 && (
                <div className="text-center py-16 glass-card rounded-2xl">
                  <div className="text-5xl mb-4">🌙</div>
                  <p className="text-white font-medium text-lg mb-2">
                    Henüz veri yok
                  </p>
                  <p className="text-gray-400 text-sm">
                    İlk gönderiyi paylaş, istatistikler burada görünecek.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
