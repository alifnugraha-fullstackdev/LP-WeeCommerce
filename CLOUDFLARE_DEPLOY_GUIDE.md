# Panduan Deploy WeeCommerce ke Cloudflare Pages & Workers

Sistem ini dirancang untuk berjalan di atas arsitektur serverless **Cloudflare Pages & Workers** menggunakan **REST API** yang sangat cepat dan hemat *resources*.

Berikut adalah langkah-langkah untuk melakukan *deployment* proyek ini ke Cloudflare Pages.

---

## 1. Hubungkan Repositori ke Cloudflare Pages
1. Masuk ke dashboard [Cloudflare](https://dash.cloudflare.com/).
2. Buka menu **Workers & Pages** di panel kiri.
3. Klik tombol **Create application** lalu pilih tab **Pages**.
4. Klik **Connect to Git** dan hubungkan akun GitHub Anda.
5. Pilih repositori `LP-WeeCommerce`.

---

## 2. Konfigurasi Build Settings
Atur konfigurasi pembuatan aplikasi sebagai berikut:
- **Framework Preset**: `Vite` (atau pilih `None`)
- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`
- **Root Directory**: `/` (biarkan default)

---

## 3. Tambahkan Environment Variable (Penting)
Formulir kontak terintegrasi dengan **Resend API** untuk mengirim email otomatis ke Gmail Anda. Anda perlu menambahkan kunci API dari Resend di dalam dashboard Cloudflare:
1. Setelah membuat proyek, buka tab **Settings** > **Environment variables**.
2. Tambahkan variabel berikut pada bagian **Production** dan **Preview**:
   - **Variable Name**: `RESEND_API_KEY`
   - **Value**: *(Masukkan API Key dari akun Resend Anda)*

---

## 4. Proses Deploy
1. Klik tombol **Save and Deploy**.
2. Cloudflare secara otomatis akan mendeteksi direktori `/functions` di dalam proyek ini dan men-*deploy* berkas tersebut sebagai **Cloudflare Pages Functions** (Serverless Edge Workers).
3. Setelah proses selesai, Anda akan mendapatkan URL proyek Anda (misal: `https://lp-weecommerce.pages.dev`).

---

## Fitur Fail-Safe Terintegrasi (Fallback)
Jika karena alasan tertentu API Workers tidak dapat dihubungi (misalnya kunci API belum diset atau batas harian terlampaui), formulir akan mendeteksi kegagalan tersebut secara dinamis dan mengarahkan pengguna untuk mengirim pesan menggunakan aplikasi email klien mereka ke **alifnugraha.studio@gmail.com** secara otomatis.
