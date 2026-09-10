import { useEffect, useRef } from 'react'
import { animate, stagger, cubicBezier } from 'animejs'
import { gsap } from 'gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const line3Ref = useRef<HTMLSpanElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const reduce = prefersReduced

    // 1 — Image scale-in
    gsap.fromTo(
      imgRef.current,
      { scale: 1.14 },
      { scale: 1.02, duration: reduce ? 0 : 3, ease: 'power2.out', delay: 0.1 }
    )

    // 2 — Letter-by-letter anime.js animation
    const runText = () => {
      const line1Chars = line1Ref.current?.querySelectorAll<HTMLElement>('.split-char') ?? []
      const line2Chars = line2Ref.current?.querySelectorAll<HTMLElement>('.split-char') ?? []
      const line3Chars = line3Ref.current?.querySelectorAll<HTMLElement>('.split-char') ?? []

      if (reduce) {
        ;[...line1Chars, ...line2Chars, ...line3Chars].forEach(el => {
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
        return
      }

      // JAYABHERI — each letter drops in from above
      animate(line1Chars, {
        opacity: [0, 1],
        translateY: [90, 0],
        ease: cubicBezier(0.16, 1, 0.3, 1),
        duration: 1000,
        delay: stagger(45, { start: 600 }),
      })

      // The Pinnacle — italic, slightly faster, staggered
      animate(line2Chars, {
        opacity: [0, 1],
        translateY: [60, 0],
        ease: cubicBezier(0.16, 1, 0.3, 1),
        duration: 900,
        delay: stagger(35, { start: 1200 }),
      })

      // YOUR COCOON IN THE SKY
      animate(line3Chars, {
        opacity: [0, 1],
        translateY: [40, 0],
        ease: cubicBezier(0.16, 1, 0.3, 1),
        duration: 700,
        delay: stagger(22, { start: 1800 }),
      })
    }

    setTimeout(runText, 300)

    // 3 — Subtitle + CTA fade
    if (!reduce) {
      if (subRef.current) {
        animate(subRef.current, {
          opacity: [0, 1],
          translateY: [20, 0],
          ease: cubicBezier(0.16, 1, 0.3, 1),
          duration: 800,
          delay: 2400,
        })
      }
      if (ctaRef.current) {
        animate(ctaRef.current, {
          opacity: [0, 1],
          translateY: [24, 0],
          ease: cubicBezier(0.16, 1, 0.3, 1),
          duration: 900,
          delay: 2700,
        })
      }
      if (scrollRef.current) {
        animate(scrollRef.current, {
          opacity: [0, 0.7],
          ease: 'linear',
          duration: 600,
          delay: 3200,
        })
      }
    } else {
      [subRef, ctaRef, scrollRef].forEach(r => {
        if (r.current) r.current.style.opacity = '1'
      })
    }
  }, [prefersReduced])

  // Parallax on scroll
  useEffect(() => {
    if (prefersReduced) return
    const img = imgRef.current
    if (!img) return
    const handleScroll = () => {
      img.style.transform = `scale(1.02) translateY(${window.scrollY * 0.28}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReduced])

  const scrollDown = () => document.querySelector('#stats')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[640px] flex flex-col justify-end overflow-hidden"
      aria-label="Jayabheri The Pinnacle — Hero"
    >
      {/* ── Background image ── */}
      <div
        ref={imgRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform', transformOrigin: 'center center' }}
      >
        <img
          src="/hero.png"
          alt="Jayabheri The Pinnacle twin towers at dusk, Kokapet Hyderabad"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        {/* Layered overlays for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(20,20,18,0.18) 0%, rgba(20,20,18,0.05) 30%, rgba(20,20,18,0.55) 72%, rgba(20,20,18,0.95) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(20,20,18,0.62) 0%, rgba(20,20,18,0.08) 55%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Hero text — bottom-left anchored ── */}
      <div className="relative z-10 container-site pb-20 lg:pb-28 xl:pb-32">

        {/* Location chip */}
        <p
          className="font-sans text-[10px] tracking-[0.45em] font-light mb-8 lg:mb-10"
          style={{ color: 'rgba(201,169,110,0.7)', opacity: 0 }}
          ref={subRef}
        >
          KOKAPET &nbsp;&nbsp;·&nbsp;&nbsp; HYDERABAD
        </p>

        {/* Line 1: JAYABHERI */}
        <div className="overflow-hidden mb-2 lg:mb-3 py-1">
          <span
            ref={line1Ref}
            className="font-serif block leading-[0.95]"
            style={{ fontSize: 'clamp(3.8rem, 10vw, 10.5rem)' }}
          >
            {'JAYABHERI'.split('').map((char, i) => (
              <span
                key={i}
                className="split-char"
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  transform: 'translateY(90px)',
                  color: 'var(--color-ivory)',
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </div>

        {/* Line 2: The Pinnacle */}
        <div className="overflow-hidden mb-6 lg:mb-8 py-1">
          <span
            ref={line2Ref}
            className="font-serif italic block leading-[0.98]"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 6rem)', color: 'var(--color-bronze-light)' }}
          >
            {'The Pinnacle'.split('').map((char, i) => (
              <span
                key={i}
                className="split-char"
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  transform: 'translateY(60px)',
                  whiteSpace: char === ' ' ? 'pre' : 'normal',
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </div>

        {/* Line 3: YOUR COCOON IN THE SKY */}
        <div className="overflow-hidden mb-12 lg:mb-16 py-1">
          <span
            ref={line3Ref}
            className="font-sans font-light block tracking-[0.2em]"
            style={{
              fontSize: 'clamp(0.7rem, 1.4vw, 1.25rem)',
              color: 'rgba(242,237,228,0.6)',
            }}
          >
            {'YOUR COCOON IN THE SKY'.split('').map((char, i) => (
              <span
                key={i}
                className="split-char"
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  transform: 'translateY(40px)',
                  whiteSpace: char === ' ' ? 'pre' : 'normal',
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </div>

        {/* CTA Row */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
          style={{ opacity: 0 }}
        >
          <button
            onClick={scrollDown}
            className="btn-bronze group"
            data-magnetic
          >
            EXPLORE THE PINNACLE
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-y-1"
            >
              <path
                d="M7 1v12M3 9l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={() => document.getElementById('enquire-modal')?.classList.remove('hidden')}
            className="btn-outline"
            data-magnetic
          >
            ENQUIRE NOW
          </button>
        </div>
      </div>

      {/* ── Scroll indicator — right edge ── */}
      <div
        ref={scrollRef}
        className="absolute right-8 lg:right-14 bottom-10 flex flex-col items-center gap-3 z-10"
        style={{ opacity: 0 }}
      >
        <span
          className="font-sans text-[8px] tracking-[0.4em] rotate-90 origin-center mb-2"
          style={{ color: 'rgba(242,237,228,0.35)' }}
        >
          SCROLL
        </span>
        <div
          className="w-px overflow-hidden"
          style={{ height: '72px' }}
        >
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(to bottom, transparent, var(--color-bronze-light))',
              animation: 'scrollPulse 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* ── RERA bottom left ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 hidden lg:block">
        <p
          className="font-sans text-[8px] tracking-[0.2em] text-center"
          style={{ color: 'rgba(242,237,228,0.2)' }}
        >
          TG RERA: P02400006797
        </p>
      </div>

      {/* Scroll pulse animation */}
      <style>{`
        @keyframes scrollPulse {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  )
}
