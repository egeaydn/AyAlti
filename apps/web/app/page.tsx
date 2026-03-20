
"use client";

import { useState } from "react";
import { PostCard } from "@/components/post-card";
import { BottomNav } from "@/components/bottom-nav";
import { ShareModal } from "@/components/share-modal";

// Mock data - sonra API'den gelecek
const mockPosts = [
  {
    id: "1",
    content: "Artık hiçbir şeye enerjim kalmadı. Sabah kalkmak bile zor geliyor. Herkes etrafımda mutlu görünüyor ama ben sadece yorgunum.",
    mood: "Yorgunum",
    nickname: "Gece Yolcusu",
    repliesCount: 12,
    createdAt: new Date("2024-03-20T02:15:00"),
  },
  {
    id: "2",
    content: "En yakın arkadaşım bile beni anlamadı. Söylediği sözler hala aklımda dönüp duruyor.",
    mood: "Kırgınım",
    nickname: "Sessiz Biri",
    repliesCount: 8,
    createdAt: new Date("2024-03-20T01:30:00"),
  },
  {
    id: "3",
    content: "Yarın olacak şeyler için çok endişeleniyorum. Uyuyamıyorum, kafam sürekli en kötü senaryoları düşünüyor.",
    mood: "Kaygılıyım",
    nickname: "Ay Işığı",
    repliesCount: 15,
    createdAt: new Date("2024-03-20T00:45:00"),
  },
  {
    id: "4",
    content: "İçimde biriken öfkeyi kontrol edemiyorum. Küçük şeyler bile beni tetikliyor, sonra pişman oluyorum.",
    mood: "Öfkeliyim",
    nickname: "Kayıp Uyku",
    repliesCount: 6,
    createdAt: new Date("2024-03-19T23:20:00"),
  },
  {
    id: "5",
    content: "Hiçbir şey hissetmiyorum artık. Ne mutlu ne üzgün. Sadece boşlukta sürükleniyorum.",
    mood: "Boşluktayım",
    nickname: "Derin Nefes",
    repliesCount: 10,
    createdAt: new Date("2024-03-19T22:50:00"),
  },
  {
    id: "6",
    content: "Bugün güzel bir gün geçirdim ama kimseye anlatacak kimse yok. Sadece bu mutluluğu paylaşmak istedim.",
    mood: "Sadece anlatmak istiyorum",
    nickname: "Gece Yolcusu",
    repliesCount: 18,
    createdAt: new Date("2024-03-19T22:10:00"),
  },
];

export default function Page() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <header className="relative z-10 pt-8 pb-6 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-[var(--accent-moon)] glow-text mb-2">
            AyAltı
          </h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Burası anonim bir gece duvarı. İçini dökebilir, başkasına iyi gelebilirsin.
          </p>
        </div>
      </header>

      {/* Feed */}
      <main className="relative z-10 pb-32 px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {mockPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav onOpenShareAction={() => setIsShareModalOpen(true)} />

      {/* Share Modal */}
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
      />
    </div>
  );
}

