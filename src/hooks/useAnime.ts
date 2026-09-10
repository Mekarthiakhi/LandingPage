import { useEffect, useRef } from 'react'
import { animate, stagger, cubicBezier } from 'animejs'
import { useReducedMotion } from './useReducedMotion'

/**
 * Splits text into individual letter spans and animates them in
 * with an anime.js stagger — inspired by animejs.com typography animations.
 */
export function useSplitTextReveal(
  containerRef: React.RefObject<HTMLElement | null>,
  options?: {
    delay?: number
    stagger?: number
    duration?: number
    scrollTrigger?: boolean
    triggerOffset?: string
  }
) {
  const prefersReduced = useReducedMotion()
  const observed = useRef(false)
  const delay = options?.delay ?? 0
  const staggerVal = options?.stagger ?? 28
  const duration = options?.duration ?? 900
  const scrollTrigger = options?.scrollTrigger ?? false
  const triggerOffset = options?.triggerOffset ?? '0px 0px -80px 0px'

  useEffect(() => {
    const container = containerRef.current
    if (!container || observed.current) return

    // Wrap each letter in a span
    const elements = container.querySelectorAll<HTMLElement>('[data-split]')
    elements.forEach(el => {
      const text = el.textContent ?? ''
      el.innerHTML = text
        .split('')
        .map(char =>
          char === ' '
            ? `<span class="split-char" style="display:inline-block; white-space:pre"> </span>`
            : `<span class="split-char" style="display:inline-block; opacity:0; transform:translateY(60px)">${char}</span>`
        )
        .join('')
    })

    const chars = container.querySelectorAll<HTMLElement>('.split-char')

    const runAnimation = () => {
      if (prefersReduced) {
        chars.forEach(c => {
          c.style.opacity = '1'
          c.style.transform = 'none'
        })
        return
      }

      animate(chars, {
        opacity: [0, 1],
        translateY: [60, 0],
        ease: cubicBezier(0.16, 1, 0.3, 1),
        duration,
        delay: stagger(staggerVal, { start: delay }),
      })
    }

    if (!scrollTrigger) {
      runAnimation()
    } else {
      observed.current = true
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            runAnimation()
            observer.disconnect()
          }
        },
        { threshold: 0.1, rootMargin: triggerOffset }
      )
      observer.observe(container)
      return () => observer.disconnect()
    }
  }, [containerRef, prefersReduced, delay, staggerVal, duration, scrollTrigger, triggerOffset])
}

/**
 * Animate a list of elements in with stagger (for cards, stats, etc.)
 */
export function useStaggerReveal(
  containerRef: React.RefObject<HTMLElement | null>,
  selector: string,
  options?: { delay?: number; stagger?: number; y?: number }
) {
  const prefersReduced = useReducedMotion()
  const delay = options?.delay ?? 0
  const staggerVal = options?.stagger ?? 80
  const y = options?.y ?? 50

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll<HTMLElement>(selector)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (prefersReduced) {
            elements.forEach(el => {
              el.style.opacity = '1'
              el.style.transform = 'none'
            })
          } else {
            animate(elements, {
              opacity: [0, 1],
              translateY: [y, 0],
              ease: cubicBezier(0.16, 1, 0.3, 1),
              duration: 800,
              delay: stagger(staggerVal, { start: delay }),
            })
          }
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [containerRef, selector, prefersReduced, delay, staggerVal, y])
}
