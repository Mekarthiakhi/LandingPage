import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSplitTextReveal, useStaggerReveal } from '../hooks/useAnime'

gsap.registerPlugin(ScrollTrigger)

const locationGroups = [
  {
    title: 'Access & Connectivity',
    places: [
      { name: 'Narsingi', time: '9 min' },
      { name: 'Financial District', time: '9 min' },
      { name: 'Nanakramguda', time: '10 min' },
      { name: 'Gachibowli', time: '14 min' },
      { name: 'Hitech City', time: '20 min' },
      { name: 'Airport', time: '30 min' },
    ],
  },
  {
    title: 'IT Hubs & Corporates',
    places: [
      { name: 'TCS', time: '18 min' },
      { name: 'Wipro Corporate Office', time: '20 min' },
      { name: 'WaveRock IT Park', time: '20 min' },
      { name: 'Infosys Campus', time: '25 min' },
      { name: 'Microsoft IDC', time: '25 min' },
    ],
  },
  {
    title: 'Healthcare',
    places: [
      { name: 'Sankara Eye Hospital', time: '4 min' },
      { name: 'Continental Hospitals', time: '10 min' },
      { name: 'Star & Rainbow Hospitals', time: '10 min' },
      { name: 'Ankura Hospitals', time: '12 min' },
      { name: 'CARE Hospitals', time: '15 min' },
    ],
  },
  {
    title: 'Education',
    places: [
      { name: 'Sattva Academy', time: '2 min' },
      { name: 'Phoenix Greens', time: '5 min' },
      { name: 'Global Edge School', time: '6 min' },
      { name: 'Rockwell International', time: '7 min' },
      { name: 'DPS & Oakridge Intl.', time: '15 min' },
    ],
  },
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
        {/* Header */}
        <div className="mb-14 lg:mb-20 max-w-2xl">
          <span className="section-label">THE LOCATION</span>
          <h2 ref={titleRef} className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-ivory">
            <span data-split>The Center</span>{' '}
            <span data-split className="italic text-bronze-light">of it All</span>
          </h2>
          <p className="font-sans text-sm lg:text-base font-light text-ivory/55 mt-6 leading-relaxed">
            Set in the heart of Kokapet, moments from the Financial District and the Outer Ring Road —
            the city's business, wellness and learning hubs are all within easy reach.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">

          {/* Map / Illustration */}
          <div className="lg:col-span-5 loc-item lg:sticky lg:top-28">
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square border border-[rgba(154,123,79,0.15)] bg-charcoal-light flex items-center justify-center p-8 lg:p-10">
              
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

              <span className="absolute bottom-5 left-6 font-sans text-[10px] tracking-[0.25em] text-ivory/40 uppercase">
                Kokapet · Hyderabad
              </span>
            </div>
          </div>

          {/* Connectivity categories */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 lg:gap-y-12">
              {locationGroups.map(group => (
                <div key={group.title} className="loc-item">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-6 h-px bg-bronze" />
                    <h3 className="font-sans text-[11px] tracking-[0.25em] text-bronze-light uppercase font-medium">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {group.places.map(place => (
                      <li
                        key={place.name}
                        className="flex items-baseline justify-between gap-4 border-b border-[rgba(154,123,79,0.12)] pb-3"
                      >
                        <span className="font-serif text-lg text-ivory/85">{place.name}</span>
                        <span className="font-sans text-[10px] tracking-[0.18em] text-bronze-light/90 whitespace-nowrap">
                          {place.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
