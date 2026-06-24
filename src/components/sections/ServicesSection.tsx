import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, ArrowRight } from '@/components/icons'
import { buildTiers, integrateModules } from '@/data/services'
import { WHATSAPP_LINK } from '@/lib/whatsapp'
import { useScrollReveal } from '@/lib/useScrollReveal'
import { cn } from '@/lib/utils'

type Tab = 'build' | 'integrate'

export function ServicesSection() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<Tab>('build')
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="services" className="bg-[var(--color-surface-soft)] border-y border-[var(--color-hairline)] section-padding">
      <div className="container flex flex-col gap-16">
        {/* Dark premium hook card */}
        <div className="reveal rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--color-surface-dark)] to-[var(--color-surface-dark-elevated)] border border-[var(--color-hairline-dark)] px-6 py-12 md:px-12 md:py-16 text-[var(--color-on-dark)] relative overflow-hidden">
          {/* Intelligence Grid Pattern */}
          <div className="intelligence-grid-dark opacity-15" aria-hidden="true" />
          
          <div className="relative z-10 text-center flex flex-col items-center">
            <p className="text-caption !text-[var(--color-signature-peach)] font-semibold tracking-wider mb-4">{t('services.hookLabel')}</p>
            <h2 className="text-display-md text-gradient-light !text-transparent mb-8 max-w-2xl">{t('services.hookTitle')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <div className="p-6 rounded-[var(--radius-md)] bg-white/[0.02] border border-white/[0.04] flex flex-col items-center text-center">
                <h3 className="text-title-md !text-[var(--color-on-dark)] mb-3">{t('services.hookBuildTitle')}</h3>
                <p className="text-body !text-[var(--color-muted-on-dark)] leading-relaxed mb-6">
                  {t('services.hookBuildDesc')}
                </p>
                <button
                  type="button"
                  onClick={() => setTab('build')}
                  className={cn(
                    "px-4 py-2 text-xs font-semibold rounded-[var(--radius-md)] transition-all duration-200 cursor-pointer focus:outline-none",
                    tab === 'build'
                      ? "bg-[var(--color-signature-coral)] text-white shadow-sm"
                      : "bg-white/5 text-[var(--color-muted-on-dark)] border border-white/10 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {t('services.exploreBuild')}
                </button>
              </div>
              <div className="p-6 rounded-[var(--radius-md)] bg-white/[0.02] border border-white/[0.04] flex flex-col items-center text-center">
                <h3 className="text-title-md !text-[var(--color-on-dark)] mb-3">{t('services.hookIntegrateTitle')}</h3>
                <p className="text-body !text-[var(--color-muted-on-dark)] leading-relaxed mb-6">
                  {t('services.hookIntegrateDesc')}
                </p>
                <button
                  type="button"
                  onClick={() => setTab('integrate')}
                  className={cn(
                    "px-4 py-2 text-xs font-semibold rounded-[var(--radius-md)] transition-all duration-200 cursor-pointer focus:outline-none",
                    tab === 'integrate'
                      ? "bg-[var(--color-signature-coral)] text-white shadow-sm"
                      : "bg-white/5 text-[var(--color-muted-on-dark)] border border-white/10 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {t('services.exploreIntegrate')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing sub-system */}
        <div className="reveal">
          {/* Tab switch — pricing pill buttons */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-1 rounded-[var(--radius-pill)] border border-[var(--color-hairline)] p-1 bg-[var(--color-canvas)]">
              {(['build', 'integrate'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTab(value)}
                  className={cn(
                    'px-6 py-2 text-[14px] font-medium rounded-[var(--radius-pill)] transition-colors duration-150 cursor-pointer focus:outline-none',
                    tab === value
                      ? 'bg-[var(--color-ink)] text-[var(--color-on-primary)]'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]',
                  )}
                >
                  {t(`services.tab${value.charAt(0).toUpperCase()}${value.slice(1)}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Build tiers */}
          {tab === 'build' && (
            <div key="build" className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch animate-fade-in">
              {buildTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={cn(
                    'reveal flex flex-col rounded-[var(--radius-md)] border p-8 transition-shadow card-hover',
                    tier.featured
                      ? 'bg-[var(--color-surface-soft)] border-[var(--color-hairline)] shadow-[0_4px_24px_rgba(24,29,38,0.06)] lg:scale-[1.02]'
                      : 'bg-[var(--color-canvas)] border-[var(--color-hairline)]',
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-pricing-card-title">{t(tier.nameKey)}</h3>
                    {tier.featured && <Badge variant="featured">{t('services.mostPopular')}</Badge>}
                  </div>
                  <p className="text-body text-[var(--color-muted)] mb-6 min-h-[40px] leading-relaxed">
                    {t(tier.taglineKey)}
                  </p>

                  <div className="mb-1 text-[12px] uppercase tracking-wide text-[var(--color-muted)]">
                    {t('services.startingFrom')}
                  </div>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-pricing-display">{t(tier.priceIdrKey)}</span>
                    <span className="text-[14px] text-[var(--color-muted)]">/ {t(tier.priceUsdKey)}</span>
                  </div>

                  <div className="text-[13px] text-[var(--color-muted)] mb-6 flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-signature-coral)]" />
                    {t(tier.timelineKey)}
                  </div>

                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {tier.featuresKeys.map((featureKey, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[14px] text-[var(--color-body)]">
                        <Check className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-ink)]" />
                        {t(featureKey)}
                      </li>
                    ))}
                  </ul>

                  {tier.noteKey && t(tier.noteKey) && (
                    <p className="text-[13px] text-[var(--color-muted)] italic mb-6">
                      {t(tier.noteKey)}
                    </p>
                  )}

                  <Button
                    asChild
                    variant={tier.featured ? 'primary' : 'pricing'}
                    className="mt-auto"
                  >
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                      {t(tier.ctaKey)}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Integrate modules */}
          {tab === 'integrate' && (
            <div key="integrate" className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              {integrateModules.map((mod) => (
                <div
                  key={mod.id}
                  className={cn(
                    'reveal flex flex-col rounded-[var(--radius-md)] border p-8 card-hover',
                    mod.featured
                      ? 'bg-[var(--color-surface-soft)] border-[var(--color-hairline)] shadow-[0_4px_24px_rgba(24,29,38,0.06)]'
                      : 'bg-[var(--color-canvas)] border-[var(--color-hairline)]',
                  )}
                >
                  {mod.featured && (
                    <Badge variant="featured" className="self-start mb-4">
                      {t('services.mostPopular')}
                    </Badge>
                  )}
                  <h3 className="text-pricing-card-title mb-3">{t(mod.nameKey)}</h3>
                  <p className="text-body text-[var(--color-muted)] mb-6 leading-relaxed flex-1">
                    {t(mod.descriptionKey)}
                  </p>

                  <div className="mb-1 text-[12px] uppercase tracking-wide text-[var(--color-muted)]">
                    {t('services.startingFrom')}
                  </div>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-pricing-display text-[24px]">{t(mod.priceIdrKey)}</span>
                    <span className="text-[14px] text-[var(--color-muted)]">/ {t(mod.priceUsdKey)}</span>
                  </div>

                  <Button asChild variant="pricing" className="mt-auto self-start">
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                      {t('services.ctaModule')}
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          )}

          <p className="text-center text-[14px] text-[var(--color-muted)] mt-10">
            {t('services.retainNote')}
          </p>
        </div>
      </div>
    </section>
  )
}
