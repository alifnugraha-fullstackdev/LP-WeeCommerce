import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { WhatsApp } from '@/components/icons'
import { WHATSAPP_LINK } from '@/lib/whatsapp'
import { ContactForm } from './ContactForm'
import { useScrollReveal } from '@/lib/useScrollReveal'

export function CtaSection() {
  const { t } = useTranslation()
  const [formOpen, setFormOpen] = useState(false)
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="contact" className="bg-[var(--color-canvas)] section-padding">
      <div className="container max-w-4xl">
        <div className="reveal rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--color-surface-dark)] to-[var(--color-surface-dark-elevated)] border border-[var(--color-hairline-dark)] px-6 py-12 md:px-12 md:py-16 text-center relative overflow-hidden">
          {/* Intelligence Grid Pattern */}
          <div className="intelligence-grid-dark opacity-15" aria-hidden="true" />

          <div className="relative z-10">
            <p className="text-caption font-semibold !text-[var(--color-signature-peach)] tracking-wider mb-4">{t('cta.label')}</p>
            <h2 className="text-display-md text-gradient-light !text-transparent mb-5 max-w-2xl mx-auto">
              {t('cta.title')}
            </h2>
            <p className="text-body !text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">
              {t('cta.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button asChild variant="whatsapp" size="lg" className="w-full sm:w-auto">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <WhatsApp className="mr-2 h-5 w-5 animate-pulse" />
                  {t('cta.primary')}
                </a>
              </Button>
              <Button
                variant="secondaryOnDark"
                size="lg"
                onClick={() => setFormOpen((v) => !v)}
                aria-expanded={formOpen}
                className="w-full sm:w-auto"
              >
                {t('cta.secondary')}
              </Button>
            </div>
          </div>
        </div>

        <ContactForm open={formOpen} />
      </div>
    </section>
  )
}
