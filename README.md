# WeeCommerce Landing Page

Sistem E-Commerce Bertenaga AI. Landing page premium dengan fitur multibahasa (ID/EN), peta jalan (stepper) interaktif, data terstruktur rich snippet FAQPage, penanganan crash halaman dengan Error Boundary, dan pemisahan modul bundle (code splitting) untuk performa optimal.

## Teknologi Utama
- React 19.0.0
- Vite 6.0.0
- Tailwind CSS v4.0.0
- GSAP 3.12.0 (Animasi Scroll & Efek Entrance)
- i18next (Lokalisasi Multibahasa)
- Radix UI (Aksesibilitas Komponen)

## Fitur Ungkapan SEO & Optimasi
- **Data Terstruktur Schema `@graph`**: Menggabungkan metadata Organisasi, Situs Web, dan FAQPage dinamis.
- **Tag Canonical Dinamis**: Menghindari duplikasi konten antar-protokol.
- ** robots.txt & sitemap.xml**: Mengatur prioritas crawling bot mesin pencari.
- **Pemisahan Bundle Vendor**: Pemisahan module `gsap` dan `i18n` untuk mempercepat FCP (First Contentful Paint).
