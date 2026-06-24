import { useTranslation } from 'react-i18next'
import { whyPoints } from '@/data/features'
import { pickLocalized } from '@/lib/localized'
import { useScrollReveal } from '@/lib/useScrollReveal'

export function WhySection() {
  const { t } = useTranslation()
  const { i18n } = useTranslation()
  const lang = (i18n.language?.startsWith('en') ? 'en' : 'id') as 'id' | 'en'
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="why" className="relative bg-[var(--color-surface-dark)] section-padding overflow-hidden">
      {/* Intelligence Grid Pattern Dark */}
      <div className="intelligence-grid-dark" aria-hidden="true" />

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-caption !text-[var(--color-signature-peach)] mb-4 tracking-wider font-semibold">
            {t('why.label')}
          </p>
          <h2 className="text-display-md !text-white font-medium mb-4">
            {t('why.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {whyPoints.map((point) => (
            <div key={point.id} className="reveal group text-left">
              <p className="text-mono !text-[var(--color-signature-yellow)] mb-3 text-[18px] font-semibold transition-transform duration-300 group-hover:translate-x-1">
                {point.number}
              </p>
              <h3 className="text-title-md !text-white font-bold mb-3">
                {point.title}
              </h3>
              <p className="text-body !text-white leading-relaxed">
                {pickLocalized(point.description, lang)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
