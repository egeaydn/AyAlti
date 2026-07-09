// =============================================
// AyAltı — Yardımcı Fonksiyonlar
// =============================================

/**
 * Verilen tarihten bu yana geçen süreyi Türkçe kısaltmayla döner.
 * Örnek: "5dk önce", "3s önce", "2g önce"
 */
export function getTimeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - d.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return "Az önce";
  if (diffInMinutes < 60) return `${diffInMinutes}dk önce`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}s önce`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}g önce`;

  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths}ay önce`;
}

/**
 * Büyük sayıları kısaltır.
 * Örnek: 1500 → "1.5K", 2100000 → "2.1M"
 */
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

/**
 * Son N günün "YYYY-MM-DD" formatında listesini döner.
 */
export function getLastNDays(n: number): string[] {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (n - 1 - i));
    return d.toISOString().split("T")[0] ?? "";
  });
}

/**
 * ISO string'den saat bilgisini (0-23) çeker.
 */
export function getHour(isoString: string): number {
  return new Date(isoString).getHours();
}
