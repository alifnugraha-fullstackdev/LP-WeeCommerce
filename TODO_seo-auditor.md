# Audit dan Rencana Optimalisasi SEO: WeeCommerce Landing Page

## Konteks
- **Situs Utama**: `https://weecommerce.id`
- **Cakupan Audit**: Halaman Utama (Landing Page tunggal dalam dua bahasa: ID dan EN)
- **Target Pasar / Wilayah**: Indonesia (Utama) & Global (Bahasa Inggris)
- **Tema Kata Kunci Utama**: Jasa Pembuatan E-Commerce Custom, E-Commerce AI Chatbot, Sistem RAG E-Commerce, Integrasi Automasi n8n

---

### Temuan Audit (Audit Findings)

- [x] **SEO-FIND-1.1 [Ketiadaan robots.txt di Folder Public]**:
  - **Lokasi**: [public/robots.txt](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/public/robots.txt)
  - **Deskripsi**: File `robots.txt` tidak ditemukan di folder `public/`. Hal ini menyebabkan robot perayap mesin pencari (seperti Googlebot) menerima status error 404 ketika meminta panduan perayapan (crawling).
  - **Dampak**: Medium (Membatasi kontrol perayapan dan rujukan sitemap).
  - **Rekomendasi**: Buat file `robots.txt` di direktori `public/` dengan pengaturan standar yang mengizinkan semua bot dan merujuk ke sitemap XML resmi.

- [x] **SEO-FIND-1.2 [Ketiadaan sitemap.xml di Folder Public]**:
  - **Lokasi**: [public/sitemap.xml](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/public/sitemap.xml)
  - **Deskripsi**: Tidak ada sitemap XML yang mendaftarkan URL penting untuk mempermudah indeksasi mesin pencari secara cepat dan menyeluruh.
  - **Dampak**: High (Memperlambat mesin pencari dalam mendeteksi dan mengindeks pembaruan halaman).
  - **Rekomendasi**: Buat file `sitemap.xml` statis di folder `public/` untuk mendeklarasikan halaman utama beserta modifikasi terakhirnya.

- [x] **SEO-FIND-1.3 [Ketiadaan Tag Canonical Self-Referencing]**:
  - **Lokasi**: [SeoHead.tsx](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/src/components/brand/SeoHead.tsx)
  - **Deskripsi**: Halaman tidak memiliki tag `<link rel="canonical">` di dalam elemen `<head>`. Tanpa tag ini, search engine dapat mengindeks variasi URL yang sama (misal: non-www vs www, HTTP vs HTTPS) sebagai konten duplikat yang menurunkan reputasi peringkat halaman.
  - **Dampak**: High (Risiko duplikasi konten dan fragmentasi otoritas link).
  - **Rekomendasi**: Tambahkan tag `<link rel="canonical">` dinamis di dalam component `SeoHead` yang mendeteksi url saat ini atau merujuk langsung ke `https://weecommerce.id/`.

- [x] **SEO-FIND-1.4 [Optimalisasi Relevansi Kata Kunci pada Judul Halaman (Title Tag)]**:
  - **Lokasi**: [id.json](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/src/i18n/locales/id.json) dan [en.json](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/src/i18n/locales/en.json)
  - **Deskripsi**: Judul halaman Indonesia saat ini (`WeeCommerce — Sistem E-Commerce dengan AI`) kurang menargetkan kata kunci transaksional/komersial berorientasi pencarian lokal seperti "Jasa Pembuatan Website/Sistem".
  - **Dampak**: Medium (Kurang optimal dalam menjaring impresi pencarian dengan intent pencari layanan).
  - **Rekomendasi**: Ubah judul bahasa Indonesia menjadi `WeeCommerce — Jasa Pembuatan Sistem E-Commerce Custom & AI` (57 karakter) untuk menangkap pencarian bermaksud tinggi.

- [x] **SEO-FIND-1.5 [Peluang Penggunaan FAQPage Schema & WebSite Schema]**:
  - **Lokasi**: [SeoHead.tsx](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/src/components/brand/SeoHead.tsx)
  - **Deskripsi**: Bagian FAQ sudah sangat detail dan fungsional di UI, namun belum dibaca sebagai data terstruktur oleh Google karena ketiadaan `FAQPage` schema pada blok JSON-LD.
  - **Dampak**: Medium (Kehilangan peluang mendapatkan tampilan Rich Snippet/akordion di halaman hasil pencarian).
  - **Rekomendasi**: Gabungkan data terstruktur `Organization`, `WebSite`, dan `FAQPage` ke dalam satu skrip `@graph` JSON-LD di dalam `SeoHead.tsx` yang dinamis menyesuaikan bahasa aktif.

---

## Rencana Perbaikan (Remediation Recommendations)

- [x] **SEO-REC-1.1 [Penerapan robots.txt dan sitemap.xml secara Langsung]**:
  - **Prioritas**: Critical
  - **Estimasi Usaha**: 15 menit
  - **Hasil yang Diharapkan**: Otoritas crawling Googlebot berjalan tanpa hambatan dan rujukan sitemap terdaftar resmi.
  - **Validasi**: Buka `https://weecommerce.id/robots.txt` dan `https://weecommerce.id/sitemap.xml` di browser, pastikan status response 200 OK.

- [x] **SEO-REC-1.2 [Pemasangan Tag Canonical Dinamis]**:
  - **Prioritas**: High
  - **Estimasi Usaha**: 15 menit
  - **Hasil yang Diharapkan**: Mencegah fragmentasi link equity dan duplikasi konten.
  - **Validasi**: Periksa source code halaman ter-render (F12 inspect) untuk memastikan keberadaan tag `<link rel="canonical" href="https://weecommerce.id/">` (atau versi localized).

- [x] **SEO-REC-1.3 [Pembalutan Keyword Judul di File Lokalisasi]**:
  - **Prioritas**: High
  - **Estimasi Usaha**: 10 menit
  - **Hasil yang Diharapkan**: Kenaikan impresi organik di Google Search Console untuk kata kunci terkait "jasa pembuatan e-commerce".
  - **Validasi**: Lakukan tes rendering di lingkungan lokal dan lihat title halaman di tab browser.

- [x] **SEO-REC-1.4 [Integrasi @graph JSON-LD Schema (Org + WebSite + FAQ)]**:
  - **Prioritas**: Medium
  - **Estimasi Usaha**: 30 menit
  - **Hasil yang Diharapkan**: Peningkatan CTR di hasil pencarian karena struktur rich snippet FAQ yang valid.
  - **Validasi**: Salin output HTML dan uji menggunakan Google Rich Results Test (Uji Hasil Kaya).

---

## Usulan Perubahan Kode (Proposed Code Changes)

### Pembuatan File robots.txt

Buat file baru di direktori [public/robots.txt](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/public/robots.txt) dengan kode berikut:

```txt
User-agent: *
Allow: /

Sitemap: https://weecommerce.id/sitemap.xml
```

### Pembuatan File sitemap.xml

Buat file baru di direktori [public/sitemap.xml](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/public/sitemap.xml) dengan kode berikut:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://weecommerce.id/</loc>
    <lastmod>2026-06-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Optimalisasi Metadata SEO Lokalisasi di id.json dan en.json

Terapkan modifikasi kata kunci pada file lokalisasi bahasa:

```diff
--- src/i18n/locales/id.json
+++ src/i18n/locales/id.json
@@ -110,6 +110,6 @@
   "seo": {
-    "title": "WeeCommerce — Sistem E-Commerce dengan AI",
+    "title": "WeeCommerce — Jasa Pembuatan Sistem E-Commerce Custom & AI",
     "description": "Kami bangun sistem e-commerce dengan AI terintegrasi — bukan sekadar website. Custom storefront, AI chatbot, RAG, dan automation untuk brand yang siap scale."
   }
 }
```

```diff
--- src/i18n/locales/en.json
+++ src/i18n/locales/en.json
@@ -110,6 +110,6 @@
   "seo": {
-    "title": "WeeCommerce — E-Commerce Systems, Powered by AI",
+    "title": "WeeCommerce — Custom E-Commerce Systems Powered by AI",
     "description": "We build e-commerce systems with integrated AI — not just websites. Custom storefronts, AI chatbots, RAG, and automation for brands ready to scale."
   }
 }
```

### Integrasi Canonical dan @graph Schema di SeoHead.tsx

Perbarui [SeoHead.tsx](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/src/components/brand/SeoHead.tsx) untuk menambahkan link canonical dinamis serta FAQPage schema terintegrasi berdasarkan i18n aktif:

```diff
--- src/components/brand/SeoHead.tsx
+++ src/components/brand/SeoHead.tsx
@@ -2,6 +2,9 @@
 import { Helmet } from 'react-helmet-async'
 import { useTranslation } from 'react-i18next'
+import { faqItems } from '@/data/faq'
+import { pickLocalized } from '@/lib/localized'
 
 export function SeoHead() {
   const { t, i18n } = useTranslation()
   const lang = i18n.language?.startsWith('en') ? 'en' : 'id'
@@ -14,20 +17,39 @@
   return (
     <Helmet>
       <title>{t('seo.title')}</title>
       <meta name="description" content={t('seo.description')} />
       <meta property="og:title" content={t('seo.title')} />
       <meta property="og:description" content={t('seo.description')} />
       <meta property="og:type" content="website" />
       <meta property="og:url" content="https://weecommerce.id" />
+      <link rel="canonical" href="https://weecommerce.id" />
       <script type="application/ld+json">
         {JSON.stringify({
           '@context': 'https://schema.org',
-          '@type': 'Organization',
-          name: 'WeeCommerce',
-          url: 'https://weecommerce.id',
-          email: 'hello@weecommerce.id',
-          description: 'E-Commerce Systems, Powered by AI',
-          areaServed: 'Worldwide',
-          knowsAbout: ['E-commerce', 'AI Chatbot', 'RAG', 'n8n Automation'],
+          '@graph': [
+            {
+              '@type': 'Organization',
+              name: 'WeeCommerce',
+              url: 'https://weecommerce.id',
+              email: 'hello@weecommerce.id',
+              description: 'E-Commerce Systems, Powered by AI',
+              areaServed: 'Worldwide',
+              knowsAbout: ['E-commerce', 'AI Chatbot', 'RAG', 'n8n Automation']
+            },
+            {
+              '@type': 'WebSite',
+              name: 'WeeCommerce',
+              url: 'https://weecommerce.id'
+            },
+            {
+              '@type': 'FAQPage',
+              mainEntity: faqItems.map((item) => ({
+                '@type': 'Question',
+                name: pickLocalized(item.question, lang),
+                acceptedAnswer: {
+                  '@type': 'Answer',
+                  text: pickLocalized(item.answer, lang)
+                }
+              }))
+            }
+          ]
         })}
       </script>
     </Helmet>
   )
 }
```

---

## Perintah (Commands)
- **Jalankan Verifikasi Lokal**: `npm run build`
- **Uji Server Staging Lokal**: `npm run preview`

---

## Daftar Tugas Penjaminan Mutu (Quality Assurance Task Checklist)

Sebelum merilis perubahan, pastikan:

- [ ] File `robots.txt` dapat diakses langsung dan tidak memblokir resource stylesheet atau skrip Javascript penting
- [ ] Validitas file `sitemap.xml` lolos verifikasi XML Parser
- [ ] Tag Canonical self-referencing merujuk ke domain utama yang tepat
- [ ] Pengujian data terstruktur `@graph` lolos validasi tanpa error di Google Rich Results Test
- [ ] Judul halaman baru tidak melebihi 60 karakter untuk mencegah terpotong (truncated) di SERP Google
- [ ] Penerapan i18n pada schema FAQPage berfungsi secara dinamis saat tombol Language Toggle ditekan
