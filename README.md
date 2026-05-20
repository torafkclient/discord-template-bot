# 📋 Discord Sunucu Şablonu Botu (Discord Template Bot)

Profesyonel, üretime hazır (production-ready) ve tamamen Türkçe olarak geliştirilmiş, gelişmiş sunucu şablonu (template) yönetim botu. 

Bu bot yardımıyla sunucularınızı saniyeler içerisinde 25 farklı hazır şablondan birini kullanarak kurabilir, kendi sunucunuzun yapısını JSON formatında yedekleyebilir veya başka sunuculardan şablon dosyaları aktarabilirsiniz.

---

## ✨ Özellikler

1. **Katı Hata Yakalama (24/7 Çevrimdışı Kalmama Güvencesi):** Global hata yakalayıcıları sayesinde Discord API kesintilerinde veya veritabanı hatalarında bot asla çökmez.
2. **Gelişmiş Loglama (Winston):** Konsola renkli günlükler basarken, hataları otomatik olarak `logs/error.log` dosyasına kaydeder.
3. **Güvenli Sıfırlama Akışı:** Sunucu silme işlemi yıkıcı olduğundan, `/template apply` veya `/setup quick` çalıştırıldığında interaktif butonlarla onay istenir.
4. **Otomatik Rol & Kanal Yönetimi:** İzin matrisi, kategori yapıları, özel emojiler, kurallar embed mesajı ve karşılama embed mesajı sıfırdan oluşturulur.
5. **Dinamik Autocomplete (Arama):** `/template apply` yazarken tüm şablon isimleri klavyeden yazıldığı anda dinamik olarak aranabilir ve listelenir.
6. **Şablon Dışa Aktarma & İçe Aktarma (Yedekleme):**
   - `/template export`: Sunucunuzun mevcut kanal, kategori ve rol yapısını okuyup veritabanına ve bir JSON dosyası olarak bilgisayarınıza kaydeder.
   - `/template import`: Başka bir sunucunun JSON şablonunu bota yükleyerek yeni şablon olarak kullanabilmenizi sağlar.
7. **Premium & Standart Abonelik Sistemi:** Bazı gelişmiş şablonlar premium korumalıdır. Global bot sahibi dilediği sunucuya `/premium grant` komutu ile premium tanımlayabilir.
8. **Güvenlik Otomatik Ayrılma:** Bot Yönetici yetkisine sahip değilse sunucu sahibine durumu açıklayan bir DM atıp otomatik olarak sunucudan ayrılır.

---

## 📂 Hazır 14 Şablon Listesi

### 🆓 Ücretsiz Şablonlar
- **Genel Topluluk / Public Community:** Büyük topluluklar için duyuru, kurallar, karşılama, sohbet, medya ve zengin rol yapısı.
- **Oyuncu / Gaming Clan:** Klanlar ve takımlar için turnuva, başvuru, takım odaları ve özel rütbeler.
- **Arkadaş Grubu / Private Friends:** Sadece yakın arkadaşlar için özel, dışarıya kapalı, sade ve yüksek güvenlikli.
- **Eğitim / Okul / Ders:** Sınıf kanalları, ödev teslim, kaynak paylaşım ve canlı ders odaları.
- **Meme / Eğlence:** Caps, komik videolar, OwO ve bot oyun odaları.
- **Müzik / Streamer:** Yayıncı duyuruları, şarkı istek, müzik odaları ve abone rolleri.

### 💎 Premium Şablonlar
- **Anime & Manga:** Otakular için özel rol renkleri, spoiler kanalları ve cosplay alanları.
- **Spor / Futbol Kulübü:** Maç günü canlı sohbet odaları, kadro-taktik analiz ve tribün kanalları.
- **Altyapı / Developer:** Yazılımcılar için kod kanalları (JS, Python vb.), proje vitrini ve ticket (destek) sistemi.
- **Roleplay (RP):** Lore-harita, karakter başvuruları, şehir hanı ve han sesli RP odaları.
- **E-Ticaret / Satış:** Ürün listeleri, nasıl satın alırım rehberi, kargo/iade ve sipariş destek biletleri.
- **Fitness & Sağlık:** Antrenman programları, diyet tarifleri ve motivasyon kanalları.
- **İş / Networking:** Sektör duyuruları, CV paylaşımı, girişim fikirleri ve yatırımcı pitching ses odaları.
- **Destek / Helpdesk:** SaaS veya kurumsal firmalar için bilgi tabanı, FAQ, versiyon notları ve destek masası.

---

## 🛠️ Kurulum ve Yerel Çalıştırma

### Gereksinimler
- [Node.js v18.0.0+](https://nodejs.org/)
- [MongoDB (Yerel veya Atlas)](https://www.mongodb.com/)

### Adımlar

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Klasör içindeki `.env.example` dosyasının adını `.env` olarak değiştirin ve bilgilerinizi doldurun:
   - `DISCORD_TOKEN`: [Discord Developer Portal](https://discord.com/developers/applications) üzerinden aldığınız bot tokenı.
   - `CLIENT_ID`: Bot uygulamanızın ID'si.
   - `OWNER_ID`: `/premium grant` komutunu çalıştırabilmek için kendi Discord hesabınızın ID'si.
   - `MONGODB_URI`: MongoDB veritabanı bağlantı adresiniz.
3. Botu geliştirici (yerel) modunda başlatın:
   ```bash
   npm run dev
   ```
4. Botu üretim (production) modunda çalıştırın:
   ```bash
   npm start
   ```

---

## 🐳 Docker Deployment

Botu Docker kullanarak çalıştırmak için aşağıdaki komutları kullanabilirsiniz:

```bash
# Resmi derleme
docker build -t discord-template-bot .

# Çalıştırma
docker run -d --name template-bot --env-file .env discord-template-bot
```

---

## 📜 Komut Listesi

| Komut | Açıklama | Yetki Seviyesi |
|---|---|---|
| `/template list` | Kullanılabilir tüm şablonları listeler. | Üye |
| `/template apply <isim>` | Seçilen şablonu sunucuya uygular. (Sıfırlama Onaylı) | Yönetici |
| `/template export <isim> <aciklama>` | Sunucu yapısını JSON formatında dışa aktarır. | Yönetici |
| `/template import <dosya>` | JSON şablon dosyasını veritabanına aktarır. | Yönetici |
| `/setup quick` | En popüler (Genel Topluluk) şablonu hızlıca uygular. | Yönetici |
| `/premium status` | Sunucunun premium durumunu ve şablon geçmişini listeler. | Üye |
| `/premium grant <sunucu_id> <aktif>` | Belirtilen sunucunun premium durumunu değiştirir. | Global Sahip (Bot Owner) |

---

## 🎨 Bot Tanıtım Görseli / Banner

![Discord Template Bot Banner](assets/banner.png)
