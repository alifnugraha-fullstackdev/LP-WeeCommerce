import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { faqItems } from '@/data/faq'
import { pickLocalized, type Lang } from '@/lib/localized'

export function SeoHead() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language?.startsWith('en') ? 'en' : 'id') as Lang

  // Keep <html lang> in sync with i18n
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <Helmet>
      <title>{t('seo.title')}</title>
      <meta name="description" content={t('seo.description')} />
      <meta property="og:title" content={t('seo.title')} />
      <meta property="og:description" content={t('seo.description')} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://weecommerce.weecommers.workers.dev" />
      <link rel="canonical" href="https://weecommerce.weecommers.workers.dev" />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              name: 'WeeCommerce',
              url: 'https://weecommerce.weecommers.workers.dev',
              email: 'alifnugraha.studio@gmail.com',
              description: 'E-Commerce Systems, Powered by AI',
              areaServed: 'Worldwide',
              knowsAbout: ['E-commerce', 'AI Chatbot', 'RAG', 'n8n Automation'],
            },
            {
              '@type': 'WebSite',
              name: 'WeeCommerce',
              url: 'https://weecommerce.weecommers.workers.dev',
            },
            {
              '@type': 'FAQPage',
              mainEntity: faqItems.map((item) => ({
                '@type': 'Question',
                name: pickLocalized(item.question, lang),
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: pickLocalized(item.answer, lang),
                },
              })),
            },
          ],
        })}
      </script>
    </Helmet>
  )
}

