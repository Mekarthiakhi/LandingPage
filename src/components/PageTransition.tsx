import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function PageTransition() {
  const curtainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const curtain = curtainRef.current
    if (!curtain) return

    const tl = gsap.timeline()
    tl.to(curtain, {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 1.2,
      ease: 'power4.inOut',
      delay: 0.2,
      onComplete: () => {
        curtain.style.display = 'none'
      },
    })
  }, [])

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[10000] origin-top"
      style={{ backgroundColor: 'var(--color-charcoal)' }}
    />
  )
}
