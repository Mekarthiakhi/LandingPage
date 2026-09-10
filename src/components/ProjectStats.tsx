import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStaggerReveal } from '../hooks/useAnime'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { label: 'ACRES OF LUXURY', value: 4.75, suffix: '' },
  { label: 'SOARING TOWERS', value: 2, suffix: '' },
  { label: 'FLOORS', value: 55, suffix: '' },
  { label: 'FLATS PER FLOOR', value: 4, suffix: '' },
  { label: 'EXCLUSIVE RESIDENCES', value: 425, suffix: '' },
  { label: 'OPEN SPACE', value: 79, suffix: '%' },
]

export default function ProjectStats() {
  const sectionRef = useRef<HTMLElement>(null)
  
  // Animate items fading/sliding in
  useStaggerReveal(sectionRef, '.stat-item', { y: 40 })

  // Animate the numbers counting up
  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = document.querySelectorAll('.stat-number')
      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target') || '0')
        const isDecimal = target % 1 !== 0
        
        gsap.to(counter, {
          innerHTML: target,
          duration: 2.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
          snap: { innerHTML: isDecimal ? 0.01 : 1 },
          onUpdate: function () {
            if (isDecimal) {
              counter.innerHTML = Number(this.targets()[0].innerHTML).toFixed(2)
            }
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="stats" 
      ref={sectionRef} 
      className="bg-charcoal section-py border-b border-[rgba(154,123,79,0.1)]"
    >
      <div className="container-site">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item flex flex-col gap-4">
              <div className="h-px w-8 bg-bronze/40 mb-2" />
              <div className="flex items-baseline gap-1" style={{ color: 'var(--color-ivory)' }}>
                <span 
                  className="stat-number font-serif text-5xl lg:text-6xl"
                  data-target={stat.value}
                >
                  0
                </span>
                {stat.suffix && (
                  <span className="font-serif text-3xl lg:text-4xl text-bronze-light">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="font-sans text-[9px] md:text-[10px] tracking-[0.2em] text-[rgba(242,237,228,0.5)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
