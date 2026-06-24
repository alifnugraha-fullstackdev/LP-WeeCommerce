import type { LocalizedString } from '@/lib/localized'

export type ProcessStep = {
  id: string
  number: string
  title: string
  description: LocalizedString
}

export const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Discovery',
    description: {
      id: 'Kami luangkan waktu memahami model bisnis lo, customer journey, pain points, dan growth goals \u2014 sebelum propose apapun.',
      en: 'We spend time understanding your business model, customer journey, pain points, and growth goals \u2014 before proposing anything.',
    },
  },
  {
    id: 'proposal',
    number: '02',
    title: 'Proposal',
    description: {
      id: 'Kami define scope, timeline, dan investment yang tepat untuk situasi lo. Full transparansi: apa yang termasuk, apa yang tidak.',
      en: "We define the right scope, timeline, and investment. Full transparency: what's included, what's not, and why.",
    },
  },
  {
    id: 'design-build',
    number: '03',
    title: 'Design & Build',
    description: {
      id: 'UI/UX design lalu full-stack development. Lo dapat regular staging preview. Feedback loop terstruktur \u2014 bukan black-box delivery.',
      en: 'UI/UX design followed by full-stack development. Regular staging previews. Structured feedback loops \u2014 no black-box delivery.',
    },
  },
  {
    id: 'ai-integration',
    number: '04',
    title: 'AI Integration',
    description: {
      id: 'Chatbot training pada data produk lo, konfigurasi RAG system, dan setup automation workflow. Kami test against real-world queries.',
      en: 'Chatbot training on your product data, RAG system configuration, and automation workflow setup. Tested against real-world queries.',
    },
  },
  {
    id: 'launch',
    number: '05',
    title: 'Launch',
    description: {
      id: 'Staging review, QA testing, performance check, dan go-live. Kami handle deployment \u2014 lo approve sebelum go public.',
      en: 'Staging review, QA testing, performance checks, and go-live. We handle deployment \u2014 you approve before anything goes public.',
    },
  },
  {
    id: 'retain',
    number: '06',
    title: 'Retain',
    description: {
      id: 'Support berkelanjutan opsional: maintenance bulanan, AI model updates seiring catalog berkembang, adjustment workflow.',
      en: 'Optional ongoing support: monthly maintenance, AI model updates as your catalog grows, workflow adjustments.',
    },
  },
]
