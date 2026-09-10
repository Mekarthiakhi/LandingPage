import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSplitTextReveal, useStaggerReveal } from '../hooks/useAnime'

gsap.registerPlugin(ScrollTrigger)

const landmarks = [
  { name: 'Financial District', time: '5 MINS', desc: 'Major IT hubs and corporate offices' },
  { name: 'Neopolis', time: '2 MINS', desc: 'Upcoming commercial center' },
  { name: 'ORR Entry', time: '3 MINS', desc: 'Seamless connectivity across city' },
  { name: 'Airport', time: '30 MINS', desc: 'Rajiv Gandhi International Airport' },
  { name: 'Gachibowli', time: '15 MINS', desc: 'Premium lifestyle and retail' },
]

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useSplitTextReveal(titleRef, { scrollTrigger: true })
  useStaggerReveal(sectionRef, '.loc-item', { y: 20 })

  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const length = path.getTotalLength()
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: svgRef.current,
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: true,
      }
    })
  }, [])

  return (
    <section id="location" ref={sectionRef} className="bg-charcoal section-py">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-5">
            <span className="section-label">THE LOCATION</span>
            <h2 ref={titleRef} className="font-serif text-5xl lg:text-[4rem] leading-[1.1] text-ivory mb-12">
              <span data-split>The Center</span><br />
              <span data-split className="italic text-bronze-light">of it All</span>
            </h2>

            <div className="flex flex-col gap-8">
              {landmarks.map((mark, i) => (
                <div key={i} className="loc-item flex items-start justify-between border-b border-[rgba(154,123,79,0.15)] pb-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-serif text-2xl text-ivory/90">{mark.name}</span>
                    <span className="font-sans text-[11px] text-ivory/50 font-light">{mark.desc}</span>
                  </div>
                  <span className="font-sans text-[10px] tracking-[0.2em] text-bronze-light mt-1">
                    {mark.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Map / Illustration */}
          <div className="lg:col-span-7 loc-item">
            <div className="relative w-full aspect-square md:aspect-[4/3] border border-[rgba(154,123,79,0.15)] bg-charcoal-light flex items-center justify-center p-8 lg:p-12">
              
              <svg ref={svgRef} viewBox="0 0 400 400" className="w-full h-full max-w-[400px]" fill="none">
                {/* Background grid/map lines */}
                <path d="M0 100h400M0 200h400M0 300h400M100 0v400M200 0v400M300 0v400" stroke="rgba(242,237,228,0.03)" strokeWidth="1"/>
                
                {/* The animated route path */}
                <path 
                  ref={pathRef}
                  d="M50 350 C 100 350, 150 250, 200 200 S 300 150, 350 50" 
                  stroke="var(--color-bronze-light)" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_8px_rgba(201,169,110,0.4)]"
                />

                {/* Nodes */}
                <circle cx="50" cy="350" r="4" fill="var(--color-bronze)" />
                <circle cx="200" cy="200" r="6" fill="var(--color-ivory)" className="drop-shadow-[0_0_12px_rgba(242,237,228,0.5)]" />
                <circle cx="350" cy="50" r="4" fill="var(--color-bronze)" />

                {/* Labels */}
                <text x="60" y="365" fill="rgba(242,237,228,0.5)" fontSize="10" fontFamily="DM Sans" letterSpacing="0.1em">ORR / AIRPORT</text>
                <text x="215" y="195" fill="var(--color-ivory)" fontSize="12" fontFamily="DM Sans" letterSpacing="0.1em" fontWeight="300">THE PINNACLE</text>
                <text x="260" y="45" fill="rgba(242,237,228,0.5)" fontSize="10" fontFamily="DM Sans" letterSpacing="0.1em">FINANCIAL DIST.</text>
              </svg>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
