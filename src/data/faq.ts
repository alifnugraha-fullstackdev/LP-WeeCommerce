import type { LocalizedString } from '@/lib/localized'

export type FaqItem = {
  id: string
  question: LocalizedString
  answer: LocalizedString
}

export const faqItems: FaqItem[] = [
  {
    id: 'different',
    question: {
      id: 'Apa beda WeeCommerce sama agency lain?',
      en: 'What makes WeeCommerce different from other agencies?',
    },
    answer: {
      id: 'Kami spesialis e-commerce, bukan agency umum. AI-native dari awal arsitektur, dan end-to-end ownership — dari discovery sampai deployment, satu tim yang handle full scope tanpa handoff.',
      en: 'We are e-commerce specialists, not a generalist agency. AI-native from the first line of architecture, and end-to-end ownership — from discovery to deployment, one team handles the full scope with no handoffs.',
    },
  },
  {
    id: 'platform',
    question: {
      id: 'Kalian bangun di Shopify atau custom?',
      en: 'Do you build on Shopify or custom?',
    },
    answer: {
      id: 'Custom (Next.js + Supabase) untuk Jalur A (Build). Untuk yang sudah pakai Shopify atau platform lain, kami bisa tambahkan layer AI lewat Jalur B (Integrate) tanpa rebuild total.',
      en: 'Custom (Next.js + Supabase) for Path A (Build). For those already on Shopify or another platform, we can add an AI layer via Path B (Integrate) without a full rebuild.',
    },
  },
  {
    id: 'included',
    question: {
      id: 'Apa yang termasuk di harga awal?',
      en: "What's included in the starting price?",
    },
    answer: {
      id: 'Selalu termasuk: source code ownership (setelah pelunasan), dokumentasi code + API + workflow, staging environment untuk review, dan 30 hari post-launch support untuk bug fix. Tidak termasuk: copywriting, fotografi, paid marketing, dan biaya API third-party (ditanggung klien, tanpa markup).',
      en: 'Always included: source code ownership (after final payment), code + API + workflow documentation, staging environment for review, and 30 days post-launch support for bug fixes. Not included: copywriting, photography, paid marketing, and third-party API costs (client-borne, no markup).',
    },
  },
  {
    id: 'timeline',
    question: {
      id: 'Berapa lama sebuah project?',
      en: 'How long does a project take?',
    },
    answer: {
      id: 'Tergantung tier. LAUNCH: 4–6 minggu. CONVERT: 7–10 minggu. SCALE: 10–16 minggu. Untuk Jalur B (Integrate), biasanya 3–8 minggu tergantung scope modul.',
      en: 'Depends on tier. LAUNCH: 4–6 weeks. CONVERT: 7–10 weeks. SCALE: 10–16 weeks. For Path B (Integrate), typically 3–8 weeks depending on module scope.',
    },
  },
  {
    id: 'payment',
    question: {
      id: 'Cara pembayaran gimana?',
      en: 'How does payment work?',
    },
    answer: {
      id: 'Semua project milestone-based. 50% kickoff (saat SPK ditandatangani) → 30% staging delivery (saat preview di-approve) → 20% final launch (sebelum go-live). Lo hanya bayar untuk work yang completed dan approved.',
      en: 'All projects are milestone-based. 50% kickoff (upon signing the agreement) → 30% staging delivery (when preview approved) → 20% final launch (before go-live). You only pay for completed, approved work.',
    },
  },
  {
    id: 'thirdparty',
    question: {
      id: 'Biaya third-party gimana?',
      en: 'What about third-party costs?',
    },
    answer: {
      id: 'API (OpenAI), hosting, dan domain adalah tanggungan klien. Kami configure-nya, tapi klien setup akun sendiri. Semua biaya di-pass at cost — tanpa markup. Ini selalu di-explicit di proposal.',
      en: 'API (OpenAI), hosting, and domain are client responsibilities. We configure them, but the client sets up their own accounts. All costs are passed at cost — no markup. This is always made explicit in the proposal.',
    },
  },
  {
    id: 'finetuning',
    question: {
      id: 'Kalian offer AI fine-tuning?',
      en: 'Do you offer AI fine-tuning?',
    },
    answer: {
      id: 'Tersedia sebagai engagement terpisah setelah data audit dan feasibility assessment. Fine-tuning butuh data training yang substantial dan tidak cocok untuk semua project. Kami selalu jujur kalau pendekatan lebih sederhana (RAG, prompt engineering) sudah cukup.',
      en: 'Available as a separate engagement after data audit and feasibility assessment. Fine-tuning requires substantial training data and is not suitable for every project. We will always tell you honestly if simpler approaches (RAG, prompt engineering) will serve you just as well.',
    },
  },
  {
    id: 'postlaunch',
    question: {
      id: 'Setelah launch, terus gimana?',
      en: 'What happens after launch?',
    },
    answer: {
      id: '30 hari gratis untuk bug fix. Setelah itu, ada retainer opsional — Basic (Rp 2–3 juta/bulan, response 48 jam) atau Advanced (Rp 4–6 juta/bulan, response 24 jam, termasuk AI re-training dan workflow maintenance).',
      en: '30 days free for bug fixes. After that, optional retainers — Basic (Rp 2–3 million/month, 48-hour response) or Advanced (Rp 4–6 million/month, 24-hour response, includes AI re-training and workflow maintenance).',
    },
  },
  {
    id: 'migration',
    question: {
      id: 'Bisa migrasi toko yang udah ada dari marketplace?',
      en: 'Can you migrate my existing store from a marketplace?',
    },
    answer: {
      id: 'Bisa. Tier LAUNCH memang didesain untuk ini — migrasi dari dependency Tokopedia/Shopee ke platform sendiri. Kami handle seluruh proses migrasinya.',
      en: 'Yes. The LAUNCH tier is designed exactly for this — migrating from Tokopedia/Shopee dependency to your own platform. We handle the entire migration process.',
    },
  },
  {
    id: 'ownership',
    question: {
      id: 'Source code milik siapa?',
      en: 'Do I own the source code?',
    },
    answer: {
      id: 'Ya. Full ownership ditransfer ke klien setelah pelunasan. Tidak ada lock-in, tidak ada vendor dependency setelah project selesai.',
      en: 'Yes. Full ownership is transferred to the client upon final payment. No lock-in, no vendor dependency after the project is complete.',
    },
  },
]
