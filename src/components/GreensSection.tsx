import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSplitTextReveal } from '../hooks/useAnime'

gsap.registerPlugin(ScrollTrigger)

export default function GreensSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const bigTextRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useSplitTextReveal(titleRef, { scrollTrigger: true, delay: 100 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax image
      gsap.fromTo(imgRef.current,
        { y: -50, scale: 1.1 },
        {
          y: 50, scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      )

      // Big text parallax (moves opposite to image)
      gsap.fromTo(bigTextRef.current,
        { y: 100 },
        {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal">
      
      {/* Parallax Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          ref={imgRef}
          src="/greens.png"
          alt="Lush green landscaped podium and gardens"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/70" />
      </div>

      {/* Giant Background Typography */}
      <div 
        ref={bigTextRef}
        className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none overflow-hidden"
      >
        <span className="font-serif font-bold text-ivory whitespace-nowrap" style={{ fontSize: 'clamp(20rem, 40vw, 45rem)', lineHeight: 0.8 }}>
          79%
        </span>
      </div>

      {/* Content */}
      <div className="container-site relative z-10 text-center py-32">
        <div className="flex justify-center mb-8">
          <span className="section-label !mb-0 text-bronze-light">NATURE & SERENITY</span>
        </div>
        
        <h2 ref={titleRef} className="font-serif text-5xl lg:text-7xl mb-10 text-ivory max-w-4xl mx-auto">
          <span data-split>Breathe in</span><br />
          <span data-split className="italic text-bronze-light">79% Open Space</span>
        </h2>
        
        <p className="font-sans text-[0.95rem] font-light leading-relaxed text-ivory/70 max-w-xl mx-auto mb-12">
          Escape the urban rush. With nearly 4 acres of manicured landscapes, water features, and shaded walkways, The Pinnacle offers a serene micro-climate right at your doorstep.
        </p>
        
        <button className="btn-outline group">
          EXPLORE THE GROUNDS
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M1 7h12M9 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

    </section>
  )
}
