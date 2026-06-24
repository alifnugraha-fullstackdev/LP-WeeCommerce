# 🌐 WeeCommerce Landing Page

> **Base Digital dari Company Profile Resmi WeeCommerce**
> 
> *Sistem E-Commerce Bertenaga AI — Kami membangun sistem, bukan sekadar website.*

---

## 📌 Deskripsi Proyek
Repositori ini adalah implementasi dari landing page resmi **WeeCommerce**, yang dibangun berdasarkan pedoman **WeeCommerce Company Profile** dan **WeeCommerce Brand Blueprint**. Halaman ini berfungsi sebagai representasi digital utama dari profil perusahaan, memamerkan keahlian agensi dalam pengembangan storefront e-commerce kustom, integrasi agen kecerdasan buatan (AI Customer Service & RAG), serta otomatisasi alur kerja operasional (n8n).

Website ini dirancang dengan pendekatan estetika premium yang minimalis, mengedepankan performa maksimal, aksesibilitas tinggi, dan optimalisasi SEO tingkat lanjut agar siap bersaing di mesin pencarian lokal maupun global.

---

## 🛠️ Tech Stack & Arsitektur
Aplikasi ini dikembangkan menggunakan teknologi modern frontend dengan struktur yang dioptimalkan:
- **Core Engine**: React 19.0.0 (StrictMode aktif)
- **Bundler & Dev Server**: Vite 6.0.0 (Konfigurasi Code Splitting aktif)
- **Desain & Styling**: Tailwind CSS v4.0.0 (Menggunakan variabel CSS custom `@theme` terisolasi)
- **Animasi & Interaktivitas**: GSAP 3.12.0 (Animasi ScrollTrigger & micro-interaction)
- **Lokalisasi (Bilingual)**: i18next & react-i18next (Mendukung transisi instan ID/EN)
- **Komponen UI Aksesibel**: Radix UI (@radix-ui/react-accordion & @radix-ui/react-dialog)

---

## 🌟 Fitur Unggulan & Hasil Optimalisasi

### 1. Kepatuhan Aksesibilitas (WCAG 2.1 AA Compliance)
- **Keyboard Navigation**: Semua elemen interaktif (navigasi desktop, tombol pemilih bahasa, tombol stepper alur kerja) memiliki cincin fokus visual `:focus-visible` yang jelas dengan warna signature coral.
- **Formulir Semantis**: Input pada formulir kontak terhubung secara langsung dengan pesan validasi error melalui atribut `aria-describedby` dan `aria-invalid` untuk kemudahan pembaca layar (screen readers).

### 2. Optimalisasi Mesin Pencarian (Technical & On-Page SEO)
- **Tag Canonical Dinamis**: Menghindari duplikasi konten antar-protokol (HTTP/HTTPS) atau subdomain (www/non-www).
- **Struktur Data `@graph` JSON-LD**: Menggabungkan schema `Organization`, `WebSite`, dan `FAQPage` dinamis (menyesuaikan bahasa aktif) dalam satu tag skrip untuk meningkatkan peluang Rich Snippet di halaman Google SERP.
- **File Crawling Resmi**: Dilengkapi dengan `robots.txt` dan `sitemap.xml` di direktori `public` untuk mempercepat perayapan bot.

### 3. Keamanan Rendering & Toleransi Kesalahan (Error Boundaries)
- Dilengkapi dengan **React Error Boundary** kustom untuk mengisolasi kegagalan rendering di tingkat komponen, menjaga agar landing page tetap berjalan dan menampilkan antarmuka pemulihan (recovery screen) yang ramah pengguna jika terjadi crash.

### 4. Performa Kecepatan (Core Web Vitals)
- **Vendor Code Splitting**: Konfigurasi Rollup di `vite.config.ts` memisahkan dependensi berat (`gsap` dan `i18n`) dari berkas index utama untuk menekan ukuran pemuatan awal hingga di bawah **200KB gzipped**.

---

## 📂 Struktur Direktori Proyek

```
LP-WeeCommerce/
├── public/                 # Aset statis & Konfigurasi Bot
│   ├── favicon.svg         # Ikon situs
│   ├── robots.txt          # Aturan perayapan mesin pencari
│   └── sitemap.xml         # Peta indeksasi URL situs
├── src/
│   ├── components/
│   │   ├── brand/          # Logika SEO & Penanganan Error (SeoHead, ErrorBoundary)
│   │   ├── layout/         # Kerangka navigasi & Footer (SiteHeader, LanguageToggle)
│   │   ├── sections/       # Komponen halaman utama (Hero, Stats, Services, Faq, dll.)
│   │   └── ui/             # Komponen UI dasar yang dapat digunakan kembali
│   ├── data/               # Data statis ter-lokalisasi (FAQ, Alur Kerja, Layanan)
│   ├── i18n/               # Konfigurasi i18next & Kamus Terjemahan (ID/EN)
│   ├── lib/                # Util, Integrasi GSAP, & Penghubung API WhatsApp
│   ├── pages/              # Halaman Aplikasi (HomePage)
│   ├── styles/             # Pengaturan Token CSS Desain Sistem
│   ├── App.tsx             # Wrapper Utama Aplikasi
│   └── main.tsx            # Entrypoint Rendering React
├── vite.config.ts          # Konfigurasi Bundler & Split Manual Chunks
└── tsconfig.json           # Aturan Kompilasi TypeScript Strict
```

---

## 🚀 Panduan Memulai (Quick Start)

### Persyaratan Sistem
Pastikan Anda memiliki **Node.js** (versi 18+) dan npm terinstal di sistem Anda.

### 1. Instalasi Dependensi
Jalankan perintah berikut di direktori proyek untuk mengunduh semua pustaka yang dibutuhkan:
```bash
npm install
```

### 2. Menjalankan Server Pengembangan Lokal
Nyalakan server lokal untuk melakukan pratinjau halaman secara real-time:
```bash
npm run dev
```
Buka tautan yang muncul di terminal (biasanya `http://localhost:5173/`).

### 3. Kompilasi Produksi (Production Build)
Untuk melakukan kompilasi aset siap rilis ke folder `dist` dan memeriksa kebenaran pengetikan TypeScript:
```bash
npm run build
```

### 4. Pratinjau Bundel Produksi
Uji kinerja bundle hasil kompilasi produksi secara lokal sebelum melakukan deploy:
```bash
npm run preview
```
