import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '@/lib/useScrollReveal'

type Stat = {
  value: number
  suffix: string
  labelKey: string
}

const STATS: Stat[] = [
  { value: 6, suffix: '+', labelKey: 'stats.projects' },
  { value: 98, suffix: '%', labelKey: 'stats.uptime' },
  { value: 3, suffix: 's', labelKey: 'stats.loadTime' },
  { value: 24, suffix: 'h', labelKey: 'stats.response' },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          const duration = 1600
          const startTime = performance.now()

          const animate = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * value))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className="text-pricing-display text-[var(--color-ink)]">
      {count}
      <span className="text-[var(--color-signature-coral)]">{suffix}</span>
    </span>
  )
}

export function StatsSection() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className="bg-[var(--color-surface-soft)] border-y border-[var(--color-hairline)] py-16 md:py-20">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-y-0 md:divide-x divide-[var(--color-hairline)]">
          {STATS.map((stat, i) => (
            <div key={i} className="reveal text-center md:px-6">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-[13px] text-[var(--color-muted)] mt-2 uppercase tracking-wide font-medium">
                {t(stat.labelKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
