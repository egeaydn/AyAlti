"use client";

interface ActiveHourCardProps {
  hour: number; // 0-23
}

function describeHour(hour: number): { label: string; emoji: string; desc: string } {
  if (hour >= 0 && hour < 5)  return { label: "Gece Yarısı", emoji: "🌙", desc: "Gecelerin en derin saatlerinde..." };
  if (hour >= 5 && hour < 8)  return { label: "Şafak Vakti", emoji: "🌅", desc: "Güneş henüz doğarken..." };
  if (hour >= 8 && hour < 12) return { label: "Sabah", emoji: "☀️", desc: "Günün başlangıcında..." };
  if (hour >= 12 && hour < 15) return { label: "Öğle", emoji: "🌤️", desc: "Günün tam ortasında..." };
  if (hour >= 15 && hour < 18) return { label: "İkindi", emoji: "🌇", desc: "Öğleden sonranın yorgunluğunda..." };
  if (hour >= 18 && hour < 21) return { label: "Akşam", emoji: "🌆", desc: "Günün bitmesiyle birlikte..." };
  return { label: "Gece", emoji: "🌃", desc: "Şehir uyanıkken, herkes uyurken..." };
}

export function ActiveHourCard({ hour }: ActiveHourCardProps) {
  const { label, emoji, desc } = describeHour(hour);
  const formattedHour = `${hour.toString().padStart(2, "0")}:00 – ${(hour + 1).toString().padStart(2, "0")}:00`;

  // Saat çemberi (24 dilim)
  const segments = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="glass-card rounded-2xl p-6 border border-amber-500/15 shadow-xl shadow-amber-500/10">
      <h3 className="text-lg font-bold text-white mb-6">En Aktif Saat</h3>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Saat halkası */}
        <div className="relative w-36 h-36 shrink-0">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            {segments.map((seg) => {
              const angle = (seg / 24) * 360;
              const isActive = seg === hour;
              const isNear = Math.abs(seg - hour) <= 1 || Math.abs(seg - hour) >= 23;
              const r = 50;
              const cx = 60;
              const cy = 60;
              const startAngle = ((seg / 24) * 360 * Math.PI) / 180;
              const endAngle = (((seg + 0.85) / 24) * 360 * Math.PI) / 180;
              const x1 = cx + r * Math.cos(startAngle);
              const y1 = cy + r * Math.sin(startAngle);
              const x2 = cx + r * Math.cos(endAngle);
              const y2 = cy + r * Math.sin(endAngle);

              return (
                <line
                  key={seg}
                  x1={cx}
                  y1={cy}
                  x2={`${isActive ? cx + (r + 8) * Math.cos(startAngle) : x1}`}
                  y2={`${isActive ? cy + (r + 8) * Math.sin(startAngle) : y1}`}
                  stroke={isActive ? "#f59e0b" : isNear ? "#78716c" : "#1e293b"}
                  strokeWidth={isActive ? 3 : 1.5}
                  strokeLinecap="round"
                  opacity={isActive ? 1 : isNear ? 0.6 : 0.3}
                />
              );
            })}
          </svg>

          {/* Merkez */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl">{emoji}</span>
            <span className="text-[11px] text-amber-400 font-bold mt-1">{hour}:00</span>
          </div>
        </div>

        {/* Açıklama */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-white">{label}</span>
          </div>
          <p className="text-amber-400/80 font-mono text-sm mb-3">{formattedHour}</p>
          <p className="text-gray-400 text-[13px] leading-relaxed">{desc}</p>
          <p className="text-gray-400 text-[13px] mt-1">
            Platform bu saatte en çok dert dinliyor.
          </p>
        </div>
      </div>
    </div>
  );
}
