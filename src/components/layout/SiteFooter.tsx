import { useTranslation } from 'react-i18next'
import { Mail, Globe, MapPin } from '@/components/icons'

const QUICK_LINKS = [
  { key: 'nav.why', href: '#why' },
  { key: 'nav.services', href: '#services' },
  { key: 'nav.work', href: '#work' },
  { key: 'nav.faq', href: '#faq' },
] as const

export function SiteFooter() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-canvas)] border-t border-[var(--color-hairline)]">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p className="font-[var(--font-display)] font-semibold text-[18px] tracking-[-0.02em] text-[var(--color-ink)]">
              Wee<span className="text-[var(--color-signature-coral)]">·</span>Commerce
            </p>
            <p className="mt-3 text-[14px] text-[var(--color-muted)] max-w-xs leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-[14px] font-medium text-[var(--color-ink)] mb-4">
              {t('footer.quickLinks')}
            </p>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[14px] text-[var(--color-body)] hover:text-[var(--color-ink)] transition-colors"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[14px] font-medium text-[var(--color-ink)] mb-4">
              {t('footer.contactTitle')}
            </p>
            <ul className="flex flex-col gap-3 text-[14px] text-[var(--color-body)]">
              <li>
                <a
                  href="mailto:alifnugraha.studio@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-[var(--color-ink)] transition-colors"
                >
                  <Mail className="h-4 w-4 text-[var(--color-muted)]" />
                  alifnugraha.studio@gmail.com
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <Globe className="h-4 w-4 text-[var(--color-muted)]" />
                weecommerce.id
              </li>
              <li className="inline-flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-muted)]" />
                <span>{t('footer.locationValue')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--color-hairline)]">
          <p className="text-[13px] text-[var(--color-muted)]">
            © {year} WeeCommerce. {t('footer.copyright').replace('© 2026 WeeCommerce. ', '')}
          </p>
        </div>
      </div>
    </footer>
  )
}
