import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from '@/components/icons'
import { nexaFeatures, demoCards } from '@/data/features'
import { pickLocalized, type Lang } from '@/lib/localized'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { useScrollReveal } from '@/lib/useScrollReveal'
import { cn } from '@/lib/utils'

const SURFACE_CLASS: Record<string, string> = {
  cream: 'bg-[var(--color-signature-cream)]',
  peach: 'bg-[var(--color-signature-peach)]',
  mint: 'bg-[var(--color-signature-mint)]',
  yellow: 'bg-[var(--color-signature-yellow)]',
}

export function WorkSection() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language?.startsWith('en') ? 'en' : 'id') as Lang
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="work" className="bg-[var(--color-canvas)] section-padding">
      <div className="container flex flex-col gap-16">
        {/* Premium Forest showcase card */}
        <div className="reveal rounded-[var(--radius-lg)] bg-gradient-to-br from-[#0c2415] to-[#04120a] border border-[#163a22] px-6 py-12 md:px-12 md:py-16 relative overflow-hidden">
          {/* Intelligence Grid Pattern */}
          <div className="intelligence-grid-dark opacity-10" aria-hidden="true" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Badge variant="onDark">{t('work.label')}</Badge>
              <Badge variant="onDark">{t('work.demoLabel')}</Badge>
            </div>
            <h2 className="text-display-md !text-white mb-4">
              {t('work.title')}
            </h2>
            <p className="text-body !text-white/80 leading-relaxed">
              {t('work.subtitle')}
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mb-12 max-w-4xl mx-auto">
            {nexaFeatures.map((feature) => (
              <div key={feature.id} className="flex flex-col items-center text-center">
                <p className="text-mono !text-[var(--color-signature-yellow)] mb-2 font-semibold">
                  {feature.label}
                </p>
                <h3 className="text-title-sm !text-white font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-body !text-white/80 leading-relaxed">
                  {pickLocalized(feature.description, lang)}
                </p>
              </div>
            ))}
          </div>

          <div className="relative z-10 flex justify-center">
            <Button asChild variant="secondaryOnDark">
              <a
                href={buildWhatsAppUrl({
                  text: lang === 'en'
                    ? "Hello WeeCommerce, I'm interested in NexaMart and would like to request a Live Demo."
                    : "Halo WeeCommerce, saya tertarik dengan NexaMart dan ingin meminta Live Demo."
                })}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('work.cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Demo-grid cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {demoCards.map((card, idx) => (
            <div
              key={card.id}
              className={cn(
                'reveal rounded-[var(--radius-md)] p-6 flex flex-col card-hover',
                SURFACE_CLASS[card.surface],
                // Deliberately uneven heights to dodge "spec sheet" feel
                idx === 1 && 'lg:mt-8',
                idx === 3 && 'lg:-mt-8',
              )}
            >
              <p className="text-mono text-[var(--color-ink)]/60 mb-3 text-[12px]">
                {card.label}
              </p>
              <h3 className="text-title-sm text-[var(--color-ink)] mb-2">
                {card.title}
              </h3>
              <p className="text-[13px] text-[var(--color-ink)]/70 leading-relaxed">
                {pickLocalized(card.description, lang)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
