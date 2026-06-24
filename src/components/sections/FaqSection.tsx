import { useTranslation } from 'react-i18next'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { faqItems } from '@/data/faq'
import { pickLocalized, type Lang } from '@/lib/localized'
import { useScrollReveal } from '@/lib/useScrollReveal'

export function FaqSection() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language?.startsWith('en') ? 'en' : 'id') as Lang
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="faq" className="bg-[var(--color-surface-soft)] border-t border-[var(--color-hairline)] section-padding">
      <div className="container max-w-3xl">
        <div className="reveal text-center mb-12">
          <p className="text-caption font-semibold text-[var(--color-signature-coral)] tracking-wider mb-4">{t('faq.label')}</p>
          <h2 className="text-display-md text-gradient-dark">{t('faq.title')}</h2>
        </div>

        <div className="reveal rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-canvas)] px-6 md:px-10 shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>
                  {pickLocalized(item.question, lang)}
                </AccordionTrigger>
                <AccordionContent>
                  {pickLocalized(item.answer, lang)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
