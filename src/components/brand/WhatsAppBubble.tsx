import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { WhatsApp } from '@/components/icons'
import { WHATSAPP_LINK } from '@/lib/whatsapp'
import { prefersReducedMotion } from '@/lib/gsap'

export function WhatsAppBubble() {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return

    // One-time entrance + subtle pulse
    const tl = gsap.timeline()
    tl.from(el, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
      delay: 1,
    }).to(el, {
      scale: 1.1,
      duration: 0.9,
      repeat: 1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <a
      ref={ref}
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-[var(--radius-full)] bg-[var(--color-whatsapp)] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:brightness-95 transition-all"
    >
      <WhatsApp className="h-7 w-7" />
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-[var(--radius-full)] bg-[var(--color-whatsapp)] opacity-40 animate-ping" style={{ animationDuration: '2.5s' }} />
    </a>
  )
}
