import type { LocalizedString } from '@/lib/localized'

export type Feature = LocalizedString

export type BuildTier = {
  id: 'launch' | 'convert' | 'scale'
  name: string
  tagline: LocalizedString
  priceIdr: string
  priceUsd: string
  timeline: LocalizedString
  features: Feature[]
  note?: LocalizedString
  featured?: boolean
  ctaKey: string
}

export type IntegrateModule = {
  id: string
  name: string
  description: LocalizedString
  priceIdr: string
  priceUsd: string
  featured?: boolean
}

export const buildTiers: BuildTier[] = [
  {
    id: 'launch',
    name: 'LAUNCH',
    tagline: {
      id: 'Punya platform sendiri. Berhenti numpang di marketplace.',
      en: 'Own your platform. Stop depending on marketplaces.',
    },
    priceIdr: 'Rp 18 juta',
    priceUsd: '$1,000',
    timeline: { id: '4–6 minggu', en: '4–6 weeks' },
    features: [
      { id: 'Custom storefront (Next.js + Supabase)', en: 'Custom storefront (Next.js + Supabase)' },
      { id: 'Payment gateway (Midtrans / Stripe)', en: 'Payment gateway (Midtrans / Stripe)' },
      { id: 'Shipping integration + admin dashboard', en: 'Shipping integration + admin dashboard' },
      { id: 'Mobile responsive + basic SEO', en: 'Mobile responsive + basic SEO' },
    ],
    note: {
      id: 'AI layer tidak termasuk',
      en: 'AI layer not included',
    },
    ctaKey: 'services.ctaLaunch',
  },
  {
    id: 'convert',
    name: 'CONVERT',
    tagline: {
      id: 'Toko lo jalan. Sekarang biarin AI yang kerja keras.',
      en: "Your store runs. Now let AI do the heavy lifting.",
    },
    priceIdr: 'Rp 35 juta',
    priceUsd: '$2,000',
    timeline: { id: '7–10 minggu', en: '7–10 weeks' },
    features: [
      { id: 'Semua yang ada di LAUNCH', en: 'Everything in LAUNCH' },
      { id: 'AI Customer Service Chatbot', en: 'AI Customer Service Chatbot' },
      { id: 'RAG Knowledge Base', en: 'RAG Knowledge Base' },
      { id: 'Basic n8n Automation', en: 'Basic n8n Automation' },
    ],
    featured: true,
    ctaKey: 'services.ctaConvert',
  },
  {
    id: 'scale',
    name: 'SCALE',
    tagline: {
      id: 'Sistem yang tumbuh bareng bisnis lo — tanpa nambah orang.',
      en: 'A system that grows with your business — without adding headcount.',
    },
    priceIdr: 'Rp 50 juta',
    priceUsd: '$2,800',
    timeline: { id: '10–16 minggu', en: '10–16 weeks' },
    features: [
      { id: 'Semua yang ada di CONVERT', en: 'Everything in CONVERT' },
      { id: 'Advanced n8n Suite + AI Analytics', en: 'Advanced n8n Suite + AI Analytics' },
      { id: 'WhatsApp Business API integration', en: 'WhatsApp Business API integration' },
      { id: 'Performance optimization (Core Web Vitals)', en: 'Performance optimization (Core Web Vitals)' },
    ],
    ctaKey: 'services.ctaScale',
  },
]

export const integrateModules: IntegrateModule[] = [
  {
    id: 'chatbot',
    name: 'AI Chatbot',
    description: {
      id: 'Setup + training pada produk & FAQ. CS 24/7 tanpa nambah orang.',
      en: 'Setup + training on your products & FAQ. 24/7 CS without hiring.',
    },
    priceIdr: 'Rp 8–15 juta',
    priceUsd: '$1,200–$2,500',
  },
  {
    id: 'rag',
    name: 'RAG System',
    description: {
      id: 'Knowledge base dinamis dari catalog produk. Kontekstual, akurat, scale.',
      en: 'Dynamic knowledge base from your product catalog. Contextual, accurate, scalable.',
    },
    priceIdr: 'Rp 10–18 juta',
    priceUsd: '$1,500–$3,000',
  },
  {
    id: 'n8n',
    name: 'n8n Automation',
    description: {
      id: '3–5 workflow custom: order, CRM, email, inventory alerts.',
      en: '3–5 custom workflows: order, CRM, email, inventory alerts.',
    },
    priceIdr: 'Rp 8–15 juta',
    priceUsd: '$1,200–$2,500',
  },
  {
    id: 'full-suite',
    name: 'Full AI Suite',
    description: {
      id: 'Semua modul di atas — bundled. Complete intelligence layer.',
      en: 'All modules above — bundled. The complete intelligence layer.',
    },
    priceIdr: 'Rp 22–40 juta',
    priceUsd: '$3,500–$6,500',
    featured: true,
  },
]
