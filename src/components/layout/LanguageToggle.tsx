import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

export function LanguageToggle({ className }: { className?: string }) {
  const { i18n } = useTranslation()
  const current = i18n.language?.startsWith('en') ? 'en' : 'id'

  const change = (lng: 'id' | 'en') => {
    if (lng !== current) i18n.changeLanguage(lng)
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-[var(--radius-pill)] border border-[var(--color-hairline)] p-0.5 bg-[var(--color-canvas)]',
        className,
      )}
      role="group"
      aria-label="Language switcher"
    >
      {(['id', 'en'] as const).map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => change(lng)}
          className={cn(
            'px-3 py-1 text-[12px] font-medium rounded-[var(--radius-pill)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signature-coral)] focus-visible:ring-offset-2',
            current === lng
              ? 'bg-[var(--color-ink)] text-[var(--color-on-primary)]'
              : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]',
          )}
          aria-pressed={current === lng}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
