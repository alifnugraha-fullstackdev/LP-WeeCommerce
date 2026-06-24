import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { WhySection } from '@/components/sections/WhySection'
import { HowWeWorkSection } from '@/components/sections/HowWeWorkSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { WorkSection } from '@/components/sections/WorkSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { WhatsAppBubble } from '@/components/brand/WhatsAppBubble'
import { registerGsap, prefersReducedMotion } from '@/lib/gsap'

export function HomePage() {
  const wrapRef = useRef<HTMLDivElement>(null)

  // Refresh ScrollTrigger after all sections mount + fonts load
  useEffect(() => {
    if (prefersReducedMotion()) return
    registerGsap()
    const refresh = () => gsap.ticker.lagSmoothing(0)
    const t = window.setTimeout(refresh, 200)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <div ref={wrapRef} className="min-h-screen bg-[var(--color-canvas)]">
      <SiteHeader />
      <main>
        <HeroSection />
        <StatsSection />
        <WhySection />
        <HowWeWorkSection />
        <ServicesSection />
        <WorkSection />
        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
      <WhatsAppBubble />
    </div>
  )
}
