"use client";

import { ReactNode } from "react";
import { formatNumber } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  subtitle?: string;
  accentColor?: "teal" | "indigo" | "purple" | "amber";
  trend?: number; // pozitif = artış, negatif = azalış
}

const accentMap = {
  teal: {
    glow: "shadow-teal-500/20",
    border: "border-teal-500/20",
    icon: "from-teal-500/20 to-teal-600/10 text-teal-400",
    badge: "bg-teal-500/10 text-teal-400",
  },
  indigo: {
    glow: "shadow-indigo-500/20",
    border: "border-indigo-500/20",
    icon: "from-indigo-500/20 to-indigo-600/10 text-indigo-400",
    badge: "bg-indigo-500/10 text-indigo-400",
  },
  purple: {
    glow: "shadow-purple-500/20",
    border: "border-purple-500/20",
    icon: "from-purple-500/20 to-purple-600/10 text-purple-400",
    badge: "bg-purple-500/10 text-purple-400",
  },
  amber: {
    glow: "shadow-amber-500/20",
    border: "border-amber-500/20",
    icon: "from-amber-500/20 to-amber-600/10 text-amber-400",
    badge: "bg-amber-500/10 text-amber-400",
  },
};

export function StatCard({
  title,
  value,
  icon,
  subtitle,
  accentColor = "teal",
  trend,
}: StatCardProps) {
  const accent = accentMap[accentColor];

  return (
    <div
      className={`glass-card rounded-2xl p-6 border ${accent.border}
                  shadow-xl ${accent.glow}
                  transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group`}
    >
      {/* İkon */}
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accent.icon}
                    flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
      >
        {icon}
      </div>

      {/* Değer */}
      <div className="flex items-end gap-3 mb-2">
        <span className="text-4xl font-bold text-white tabular-nums tracking-tight">
          {formatNumber(value)}
        </span>
        {trend !== undefined && (
          <span
            className={`text-sm font-medium pb-1 ${
              trend >= 0 ? "text-teal-400" : "text-red-400"
            }`}
          >
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </span>
        )}
      </div>

      {/* Başlık */}
      <p className="text-white font-semibold text-[15px] mb-1">{title}</p>

      {/* Alt yazı */}
      {subtitle && (
        <p className="text-gray-500 text-[13px]">{subtitle}</p>
      )}
    </div>
  );
}
