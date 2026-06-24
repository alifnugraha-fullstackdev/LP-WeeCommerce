import type { LocalizedString } from '@/lib/localized'

export type WhyPoint = {
  id: string
  number: string
  title: string
  description: LocalizedString
}

export const whyPoints: WhyPoint[] = [
  {
    id: 'ai-native',
    number: '01',
    title: 'AI-Native, Not AI-Added',
    description: {
      id: 'AI bukan ditambah di akhir. Setiap sistem kami bangun dengan AI integration dari baris pertama arsitektur. Chatbot, RAG, automation — first-class citizen, bukan afterthought.',
      en: "We don't bolt AI on at the end. Every system we build is designed with AI integration from the first line of architecture. Chatbot, RAG, automation — first-class citizens, not afterthoughts.",
    },
  },
  {
    id: 'specialist',
    number: '02',
    title: 'Specialist, Not Generalist',
    description: {
      id: 'WeeCommerce fokus satu hal: sistem e-commerce. Bukan branding, bukan social media. Fokus ini berarti deeper expertise dan delivery lebih cepat di stack yang actually matters.',
      en: 'WeeCommerce does one thing: e-commerce systems. No branding, no social media. This focus translates to deeper expertise and faster delivery in the stack that actually matters.',
    },
  },
  {
    id: 'ownership',
    number: '03',
    title: 'End-to-End Ownership',
    description: {
      id: 'Dari discovery sampai deployment — satu tim handle full scope. Nggak ada handoff, nggak ada lost context, nggak ada "itu bukan departemen kami." Satu point of contact throughout.',
      en: 'From discovery to deployment — one team handles the full scope. No handoffs, no lost context, no "that\'s not our department." One point of contact throughout.',
    },
  },
  {
    id: 'scale',
    number: '04',
    title: 'Built to Scale',
    description: {
      id: 'Keputusan arsitektur dibuat dengan fase berikutnya dalam pikiran. Sistem yang lo launch harus tetap perform ketika order volume naik 10x — tanpa full rebuild.',
      en: 'Architecture decisions are made with your next phase in mind. The system you launch with should still perform when you 10x your order volume — without a full rebuild.',
    },
  },
]

export type NexaFeature = {
  id: string
  label: string
  title: string
  description: LocalizedString
}

export const nexaFeatures: NexaFeature[] = [
  {
    id: 'core',
    label: 'E-COMMERCE CORE',
    title: 'Custom Storefront',
    description: {
      id: 'Next.js + Supabase. Product catalog, dynamic cart, multi-step checkout dengan real payment gateway. Admin dashboard untuk order & inventory.',
      en: 'Next.js + Supabase. Product catalog, dynamic cart, multi-step checkout with real payment gateway. Admin dashboard for order & inventory management.',
    },
  },
  {
    id: 'chatbot',
    label: 'AI CHATBOT',
    title: '24/7 Customer Service',
    description: {
      id: 'Chatbot di-train pada full NexaMart catalog dan FAQ library. Handle product inquiry, order status, dan returns — tanpa intervensi manusia.',
      en: 'Chatbot trained on the full NexaMart catalog and FAQ library. Handles product inquiries, order status, and returns — without human intervention.',
    },
  },
  {
    id: 'rag',
    label: 'RAG SYSTEM',
    title: 'Context-Aware Knowledge',
    description: {
      id: 'Retrieval-augmented generation yang power chatbot product knowledge. Jawaban kontekstual dari catalog database — akurat dan up-to-date.',
      en: 'Retrieval-augmented generation powering the chatbot product knowledge. Context-aware responses from the catalog database — accurate and up-to-date.',
    },
  },
  {
    id: 'automation',
    label: 'N8N AUTOMATION',
    title: 'Full Workflow Suite',
    description: {
      id: 'Order confirmation, low stock alerts, customer follow-up, dan CRM sync workflows. Semua running tanpa manual trigger.',
      en: 'Order confirmation, low stock alerts, customer follow-up, and CRM sync workflows. All running without manual triggers.',
    },
  },
]

export type DemoCard = {
  id: string
  label: string
  title: string
  description: LocalizedString
  surface: 'cream' | 'peach' | 'mint' | 'yellow'
}

export const demoCards: DemoCard[] = [
  {
    id: 'storefront',
    label: 'STOREFRONT',
    title: 'Custom Build',
    description: {
      id: 'Next.js + Supabase, dynamic cart, multi-step checkout.',
      en: 'Next.js + Supabase, dynamic cart, multi-step checkout.',
    },
    surface: 'cream',
  },
  {
    id: 'cs',
    label: 'AI SERVICE',
    title: 'Customer Service',
    description: {
      id: 'Trained on full catalog, handles inquiries 24/7.',
      en: 'Trained on full catalog, handles inquiries 24/7.',
    },
    surface: 'peach',
  },
  {
    id: 'kb',
    label: 'RAG',
    title: 'Knowledge Base',
    description: {
      id: 'Context-aware responses from catalog database.',
      en: 'Context-aware responses from catalog database.',
    },
    surface: 'mint',
  },
  {
    id: 'auto',
    label: 'AUTOMATION',
    title: 'Workflow Suite',
    description: {
      id: 'Order alerts, low stock, follow-up sequences.',
      en: 'Order alerts, low stock, follow-up sequences.',
    },
    surface: 'yellow',
  },
]
