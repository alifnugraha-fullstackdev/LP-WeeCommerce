import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { registerGsap, prefersReducedMotion } from '@/lib/gsap'

/**
 * Hook that fades up elements with class `.reveal` when they enter the viewport.
 * Returns a ref to attach to the section container.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return

    registerGsap()

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.reveal')
      if (!items.length) return

      items.forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            once: true,
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}

/**
 * Staggered entrance animation for hero elements (`.hero-line`).
 * Runs on mount, no scroll trigger.
 */
export function useHeroEntrance<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return

    registerGsap()

    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        y: 32,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}
