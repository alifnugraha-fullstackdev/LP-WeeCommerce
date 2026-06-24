import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { LanguageToggle } from './LanguageToggle'
import { Menu, X } from '@/components/icons'
import { WHATSAPP_LINK } from '@/lib/whatsapp'

const NAV_LINKS = [
  { key: 'nav.why', href: '#why' },
  { key: 'nav.services', href: '#services' },
  { key: 'nav.work', href: '#work' },
  { key: 'nav.process', href: '#process' },
  { key: 'nav.faq', href: '#faq' },
] as const

function Wordmark() {
  return (
    <a
      href="#top"
      className="font-[var(--font-display)] font-semibold text-[18px] tracking-[-0.02em] text-[var(--color-ink)]"
    >
      Wee<span className="text-[var(--color-signature-coral)]">·</span>Commerce
    </a>
  )
}

export function SiteHeader() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  // Lock scroll when mobile sheet open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 h-16 bg-[var(--color-canvas)]/90 backdrop-blur-md border-b border-[var(--color-hairline)]">
      <div className="container flex h-16 items-center justify-between">
        <Wordmark />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] text-[var(--color-body)] hover:text-[var(--color-ink)] transition-colors"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        {/* Right cluster — desktop */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle />
          <Button asChild size="sm">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              {t('nav.cta')}
            </a>
          </Button>
        </div>

        {/* Mobile trigger */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle />
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-ink)] hover:bg-[var(--color-surface-soft)]"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=open]:animate-[slide-down_0.2s_ease-out]" />
              <Dialog.Content className="fixed inset-x-0 top-0 z-50 bg-[var(--color-canvas)] p-6 shadow-lg data-[state=open]:animate-[slide-down_0.25s_ease-out]">
                <div className="flex items-center justify-between mb-8">
                  <Wordmark />
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-ink)] hover:bg-[var(--color-surface-soft)]"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <Dialog.Close asChild key={link.href}>
                      <a
                        href={link.href}
                        className="py-4 text-[20px] font-medium text-[var(--color-ink)] border-b border-[var(--color-hairline)]"
                      >
                        {t(link.key)}
                      </a>
                    </Dialog.Close>
                  ))}
                </nav>
                <Button asChild className="w-full mt-8">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    {t('nav.cta')}
                  </a>
                </Button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
      <div className="scroll-progress" style={{ width: `${progress * 100}%` }} aria-hidden="true" />
    </header>
  )
}
