export type BuildTier = {
  id: 'launch' | 'convert' | 'scale'
  nameKey: string
  taglineKey: string
  priceIdrKey: string
  priceUsdKey: string
  timelineKey: string
  featuresKeys: string[]
  noteKey?: string
  featured?: boolean
  ctaKey: string
}

export type IntegrateModule = {
  id: string
  nameKey: string
  descriptionKey: string
  priceIdrKey: string
  priceUsdKey: string
  featured?: boolean
}

export const buildTiers: BuildTier[] = [
  {
    id: 'launch',
    nameKey: 'services.tiers.launch.name',
    taglineKey: 'services.tiers.launch.tagline',
    priceIdrKey: 'services.tiers.launch.priceIdr',
    priceUsdKey: 'services.tiers.launch.priceUsd',
    timelineKey: 'services.tiers.launch.timeline',
    featuresKeys: [
      'services.tiers.launch.f1',
      'services.tiers.launch.f2',
      'services.tiers.launch.f3',
      'services.tiers.launch.f4',
    ],
    noteKey: 'services.tiers.launch.note',
    ctaKey: 'services.ctaLaunch',
  },
  {
    id: 'convert',
    nameKey: 'services.tiers.convert.name',
    taglineKey: 'services.tiers.convert.tagline',
    priceIdrKey: 'services.tiers.convert.priceIdr',
    priceUsdKey: 'services.tiers.convert.priceUsd',
    timelineKey: 'services.tiers.convert.timeline',
    featuresKeys: [
      'services.tiers.convert.f1',
      'services.tiers.convert.f2',
      'services.tiers.convert.f3',
      'services.tiers.convert.f4',
    ],
    noteKey: 'services.tiers.convert.note',
    featured: true,
    ctaKey: 'services.ctaConvert',
  },
  {
    id: 'scale',
    nameKey: 'services.tiers.scale.name',
    taglineKey: 'services.tiers.scale.tagline',
    priceIdrKey: 'services.tiers.scale.priceIdr',
    priceUsdKey: 'services.tiers.scale.priceUsd',
    timelineKey: 'services.tiers.scale.timeline',
    featuresKeys: [
      'services.tiers.scale.f1',
      'services.tiers.scale.f2',
      'services.tiers.scale.f3',
      'services.tiers.scale.f4',
    ],
    noteKey: 'services.tiers.scale.note',
    ctaKey: 'services.ctaScale',
  },
]

export const integrateModules: IntegrateModule[] = [
  {
    id: 'chatbot',
    nameKey: 'services.modules.chatbot.name',
    descriptionKey: 'services.modules.chatbot.description',
    priceIdrKey: 'services.modules.chatbot.priceIdr',
    priceUsdKey: 'services.modules.chatbot.priceUsd',
  },
  {
    id: 'rag',
    nameKey: 'services.modules.rag.name',
    descriptionKey: 'services.modules.rag.description',
    priceIdrKey: 'services.modules.rag.priceIdr',
    priceUsdKey: 'services.modules.rag.priceUsd',
  },
  {
    id: 'n8n',
    nameKey: 'services.modules.n8n.name',
    descriptionKey: 'services.modules.n8n.description',
    priceIdrKey: 'services.modules.n8n.priceIdr',
    priceUsdKey: 'services.modules.n8n.priceUsd',
  },
  {
    id: 'full-suite',
    nameKey: 'services.modules.fullSuite.name',
    descriptionKey: 'services.modules.fullSuite.description',
    priceIdrKey: 'services.modules.fullSuite.priceIdr',
    priceUsdKey: 'services.modules.fullSuite.priceUsd',
    featured: true,
  },
]
