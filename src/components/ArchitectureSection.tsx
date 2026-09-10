import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSplitTextReveal } from '../hooks/useAnime'

gsap.registerPlugin(ScrollTrigger)

export default function ArchitectureSection() {
  const containerRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const tower1Ref = useRef<HTMLImageElement>(null)
  const tower2Ref = useRef<HTMLImageElement>(null)
  const text1Ref = useRef<HTMLDivElement>(null)
  const text2Ref = useRef<HTMLDivElement>(null)
  const title1Ref = useRef<HTMLHeadingElement>(null)
  const title2Ref = useRef<HTMLHeadingElement>(null)

  // Use anime.js letter reveal for the titles on scroll
  useSplitTextReveal(title1Ref, { scrollTrigger: true, delay: 0 })
  useSplitTextReveal(title2Ref, { scrollTrigger: true, delay: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1,
        },
      })

      tl.to(tower1Ref.current, { opacity: 0, scale: 1.1, duration: 1 }, 0)
        .fromTo(tower2Ref.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 }, 0)
        .to(text1Ref.current, { y: -50, opacity: 0, duration: 0.5 }, 0)
        .fromTo(text2Ref.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.5)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative bg-charcoal" id="architecture">
      <div ref={pinRef} className="h-screen w-full relative overflow-hidden flex items-center">
        
        {/* Background Towers */}
        <div className="absolute inset-0 w-full h-full">
          <img
            ref={tower1Ref}
            src="/hero.png"
            alt="Tower A exterior"
            className="absolute inset-0 w-full h-full object-cover origin-bottom"
          />
          <img
            ref={tower2Ref}
            src="/cta-bg.png"
            alt="Tower B exterior"
            className="absolute inset-0 w-full h-full object-cover origin-bottom opacity-0"
          />
          <div className="absolute inset-0 bg-charcoal/60" />
        </div>

        {/* Foreground Content */}
        <div className="container-site relative z-10 w-full">
          
          <div ref={text1Ref} className="absolute inset-x-0 lg:w-1/2 top-1/2 -translate-y-1/2 px-4 lg:px-9">
            <span className="section-label" style={{ color: 'var(--color-ivory)' }}>TOWER A</span>
            <h2 ref={title1Ref} className="font-serif text-5xl lg:text-7xl mb-6 text-ivory">
              <span data-split>Timeless</span><br />
              <span data-split className="italic text-bronze-light">Elegance</span>
            </h2>
            <p className="font-sans text-sm font-light text-ivory/70 max-w-md leading-relaxed">
              Ascending gracefully with a seamless glass facade, Tower A is a beacon of modern architectural mastery, housing our signature 3.5 and 4.5 BHK residences.
            </p>
          </div>

          <div ref={text2Ref} className="absolute inset-x-0 lg:left-1/2 lg:w-1/2 top-1/2 -translate-y-1/2 px-4 lg:px-9 opacity-0">
            <span className="section-label" style={{ color: 'var(--color-ivory)' }}>TOWER B</span>
            <h2 ref={title2Ref} className="font-serif text-5xl lg:text-7xl mb-6 text-ivory">
              <span data-split>Unmatched</span><br />
              <span data-split className="italic text-bronze-light">Views</span>
            </h2>
            <p className="font-sans text-sm font-light text-ivory/70 max-w-md leading-relaxed">
              Positioned to maximize panoramic vistas of Kokapet, Tower B brings expansive outdoor living indoors, offering an unrivaled daily spectacle.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  )
}
