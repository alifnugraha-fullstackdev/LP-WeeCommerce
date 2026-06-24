import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { ArrowRight } from '@/components/icons'
import { WHATSAPP_LINK } from '@/lib/whatsapp'
import { useHeroEntrance } from '@/lib/useScrollReveal'

export function HeroSection() {
  const { t } = useTranslation()
  const ref = useHeroEntrance<HTMLElement>()

  return (
    <section
      ref={ref}
      id="top"
      className="relative bg-[var(--color-canvas)] overflow-hidden"
      style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center' }}
    >
      {/* Intelligence Grid Pattern */}
      <div className="intelligence-grid" aria-hidden="true" />

      <div className="container relative z-10 py-24 md:py-32">
        <div className="max-w-[800px] mx-auto text-center">
          {/* Coral accent line */}
          <div className="hero-line flex justify-center mb-8">
            <span className="block w-12 h-[3px] rounded-full bg-[var(--color-signature-coral)]" />
          </div>

          <p className="hero-line text-caption font-semibold text-[var(--color-signature-coral)] tracking-wider mb-6">
            {t('hero.eyebrow')}
          </p>

          <h1 className="hero-line text-display-xl mb-8 text-gradient-dark">
            {t('hero.title')}
          </h1>

          <p className="hero-line text-body text-[18px] leading-relaxed text-[var(--color-body)] max-w-[640px] mx-auto mb-12">
            {t('hero.subtitle')}
          </p>

          <div className="hero-line flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button asChild size="lg">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                {t('hero.ctaPrimary')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#work">{t('hero.ctaSecondary')}</a>
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="hero-line mt-16 flex flex-col items-center gap-2 opacity-40">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
              Scroll
            </span>
            <span className="block w-px h-8 bg-[var(--color-hairline)] animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
