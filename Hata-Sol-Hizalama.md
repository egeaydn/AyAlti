# Hata Başlığı: Sayfa Sol Hizaya Alınamıyor (mx-auto Yüzünden)

Sayfadaki kartlar ve üst başlık, ekran geniş olduğu durumlarda yatayda ortalanıyordu. Bunun ana sebebi TailwindCSS’te kullandığımız `mx-auto` sınıfıdır.

## Neden oldu?

`mx-auto` = `margin-left: auto` ve `margin-right: auto` demektir. Ayrıca aynı elemanda `max-w-7xl` kullanıldığında:

- Elemanın genişliği sınırlanır (`max-w-7xl`)
- Kalan boşluk (sol + sağ) otomatik olarak iki tarafa “dağıtılır”
- Sonuç: içerik ekranın ortasına kayar

Bu proje özelinde bu durum sadece bir yerde değil, aynı sayfada **birden fazla sarmalayıcıda** vardı:

- Başlık alanında: `mx-auto`
- Kart grid’i alanında: `mx-auto`

Sen belki kartların/başlıkların içindeki düzeni (ör. `text-center`, `grid` ayarları, padding vb.) değiştirmeye çalıştın; ama sarmalayıcı hâlâ `mx-auto` ile ortalandığı için nihai görünüm düzelmiyordu.

## Nasıl düzelttik?

Sarmalayıcılardan `mx-auto` kaldırılıp yerine sol hizaya zorlayan `mx-0` verildi:

- `mx-auto` -> `mx-0`

Böylece eleman yatayda ortalanmak yerine normal akışta (sol taraftan başlayarak) konumlanıyor.

## Not

Bu düzeltme “sol hizalama” etkisini verirken, tasarımın bozulmaması için `max-w-7xl` korunmuştur. Geniş ekranlarda hâlâ içerik çok büyümeyecek, fakat artık ortalanmayacaktır.

