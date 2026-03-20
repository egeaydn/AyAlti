
"use client";

import { useState } from "react";
import { PostCard } from "@/components/post-card";
import { BottomNav } from "@/components/bottom-nav";
import { ShareModal } from "@/components/share-modal";

// Mock data - sonra API'den gelecek
const mockPosts = [
  {
    id: "1",
    content: "İyi bayramlar",
    nickname: "Anonim",
    repliesCount: 0,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 gün önce
  },
  {
    id: "2",
    content: "kimse beni sevmiyor",
    nickname: "Anonim",
    repliesCount: 6,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 gün önce
  },
  {
    id: "3",
    content: "Son sınıf yazılım mühendisliği okuyorum backend Java frontend react ytte ve pythona hakim olmama rağmen Vibe coding ileti, yüzünden stajımda da kendi projelemde de tamamen Vibe coding çalışmadan vızgeçemiyorum bu da vicdani bir yük olmaya başladı",
    nickname: "Anonim",
    repliesCount: 3,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    content: "Mimarlık okudum, computational designer olarak çalıştım. Bu sırada programlama öğrendim. Algoritmayla çalıştım. Şu anda beni bir web application projesine aktılar. 0'dan bir platform yapılıyor. Bu alanda çok sınırlı bilgim var ama mimansının oluşturuyoruz. Hangi database kullanılacak, backend frontend dili, hangi deployment method nereye deploy edilecek vs. Hepsi ilk kez duydugum şeyler. Sizce bu alandn devam etmeli miyim, mesleğimi nasıl şey dönüştürebilirim. Bu yaptığım işe ne deniyor",
    nickname: "Anonim",
    repliesCount: 1,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: "5",
    content: "Spariş üzerine kod yazıyormusunuz",
    nickname: "Anonim",
    repliesCount: 1,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "6",
    content: "Şu anda bi web uygulama üzerinde çalışıyorum. Neredeyse bitmek üzere ama dönere altyapısını nasıl kuracağım, yurtıçı-yurtdışi şirket nasıl bilmek Yazılım istiyorum ama daha önce ne bilgisayar ne yazılım hiçbir bilgim yok ama buna uygun olan kullanıcılara da bu süreçte güvedeye yol. Tüm bu süreci cephen yiyerek yürütmeye çalışıyorum ve günlerdir stresten kıvranıyorum",
    nickname: "Anonim",
    repliesCount: 0,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: "7",
    content: "Python çalışıyorum ama bir türlü öğrenemedim yıllardır çalışıyorum ama hala bir arpa boyu yol alamadım . Ve bunu hemen hatırletim lazım çünkü okulum bitiyor",
    nickname: "Anonim",
    repliesCount: 1,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "8",
    content: "Şuan 12. Sınıfım YKS Çalışıyorum dedim yazılım ise başlıcam hiçbir fikrim yok derken herşeyden vazgeçtim yaşamak istemiyordm bi anda yurt dışından kabul aldım 2 senedir yurt dışında okuyorum",
    nickname: "Anonim",
    repliesCount: 2,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "9",
    content: "Test için yazıyorum",
    nickname: "Anonim",
    repliesCount: 0,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "10",
    content: "Liverpool maçı ne olur?",
    nickname: "Anonim",
    repliesCount: 1,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "11",
    content: "Adem abi saat 12 de halı saha maçı var gelir misin",
    nickname: "Anonim",
    repliesCount: 0,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "12",
    content: "yillardır biseyle savaşıyorum ama adını koyamıyorum canım bisey yapmak istemiyor aileset mevzular utangaçlık dış görünüşü beğenmeme derken kendimi hiep kötü hissettim derslerime odaklanamadım mezuna kaldım bir yandan ile baskısı derken herşeyden vazgeçtim yaşamak istemiyordum bi anda",
    nickname: "Anonim",
    repliesCount: 0,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
];

export default function Page() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full">
      <header className="relative z-10 pt-12 pb-8 pl-10">
        <div className="w-full max-w-7xl mx-0 text-center">
          <h1 className="text-4xl md:text-5xl font-normal text-gray-100 mb-3">
            Yalnız değilsin.
          </h1>
          <p className="text-gray-400 text-base">
            Belki senin bir cümlen, birinin gecesini aydınlatır.
          </p>
        </div>
      </header>

      <main className="relative z-10 pb-32 px-6">
        <div className="w-full max-w-7xl mx-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {mockPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </main>

      <BottomNav onOpenShareAction={() => setIsShareModalOpen(true)} />

      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
      />
    </div>
  );
}

