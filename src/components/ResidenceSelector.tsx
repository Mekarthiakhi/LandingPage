import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { useSplitTextReveal, useStaggerReveal } from '../hooks/useAnime'

const residences = [
  {
    id: '2bhk',
    title: '2 BHK Residences',
    area: '2,692 sq ft',
    price: 'Price on Request',
    desc: 'Perfectly proportioned luxury living spaces featuring open-plan layouts, expansive windows, and premium finishes for the discerning urbanite.',
    features: ['Expansive Living', 'Designer Kitchen', 'En-suite Baths', 'Powder Room'],
    image: '/interior.png'
  },
  {
    id: '35bhk',
    title: '3.5 BHK Residences',
    area: '3,587–3,678 sq ft',
    price: '₹5.25 Cr onwards*',
    desc: 'Spacious family homes where every detail has been considered. Featuring a dedicated study, separate domestic help’s quarters, grand living areas, and wrap-around balconies.',
    features: ['Wrap-around Balcony', 'Home Office/Study', 'Help’s Quarters', 'Walk-in Wardrobes'],
    image: '/balcony.png'
  },
  {
    id: '45bhk',
    title: '4.5 BHK Residences',
    area: '4,545–4,622 sq ft',
    price: '₹6.5 Cr onwards*',
    desc: 'The pinnacle of luxury. Palatial dimensions, multiple living zones, separate help’s quarters, and unobstructed panoramic views of the Outer Ring Road.',
    features: ['Private Elevator Lobby', 'Dual Kitchens', 'Home Theatre Room', 'Grand Master Suite'],
    image: '/towers.png'
  }
]

export default function ResidenceSelector() {
  const [activeId, setActiveId] = useState(residences[0].id)
  const activeRes = residences.find(r => r.id === activeId)!
  
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Sliding pill indicator — glides between tabs on selection
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)

  useLayoutEffect(() => {
    const measure = () => {
      const el = btnRefs.current[activeId]
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [activeId])

  // Initial scroll reveal
  useSplitTextReveal(titleRef, { scrollTrigger: true })
  useStaggerReveal(sectionRef, '.res-elem', { y: 30 })

  // Animate content on tab change
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
      gsap.fromTo(imageRef.current,
        { opacity: 0.6, scale: 1.02 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
      )
    })
    return () => ctx.revert()
  }, [activeId])

  return (
    <section id="residences" ref={sectionRef} className="bg-charcoal section-py">
      <div className="container-site">
        
        {/* Header */}
        <div className="res-elem mb-16 lg:mb-24 flex flex-col items-center text-center">
          <span className="section-label">THE RESIDENCES</span>
          <h2 ref={titleRef} className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory">
            <span data-split>Curated</span> <span data-split className="italic text-bronze-light">Living Spaces</span>
          </h2>
        </div>

        {/* Tab Selector — Luxury Pill Bar */}
        <div className="res-elem flex justify-center mb-16 lg:mb-20">
          <div className="relative inline-flex p-1.5 bg-[#1a1a18]/90 border border-bronze/25 rounded-full shadow-xl backdrop-blur-md gap-2">
            {/* Sliding active indicator */}
            <span
              aria-hidden
              className="absolute top-1.5 bottom-1.5 rounded-full bg-bronze shadow-md shadow-bronze/30 transition-[left,width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
              style={
                indicator
                  ? { left: indicator.left, width: indicator.width, opacity: 1 }
                  : { opacity: 0 }
              }
            />
            {residences.map(res => (
              <button
                key={res.id}
                ref={el => { btnRefs.current[res.id] = el }}
                onClick={() => setActiveId(res.id)}
                className={`relative z-10 font-sans text-[11px] lg:text-xs tracking-[0.22em] px-6 py-3 rounded-full transition-colors duration-300 uppercase cursor-pointer ${
                  activeId === res.id
                    ? 'text-charcoal font-medium'
                    : 'text-ivory/60 hover:text-ivory'
                }`}
                data-magnetic
              >
                {res.title.replace(' Residences', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          
          {/* Details */}
          <div ref={contentRef} className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
            
            {/* Area Capsule Badge */}
            <div className="self-start inline-flex items-center gap-2.5 border border-bronze/40 bg-bronze/10 px-5 py-2.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze-light animate-pulse" />
              <span className="font-sans text-[11px] tracking-[0.22em] text-bronze-light uppercase font-medium">
                SUPER BUILT-UP AREA: {activeRes.area}
              </span>
            </div>
            
            {/* Residence Title */}
            <h3 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] text-ivory mb-4 tracking-wide leading-tight">
              {activeRes.title}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-bronze" />
              <span className="font-serif text-2xl lg:text-3xl text-bronze-light">
                {activeRes.price}
              </span>
            </div>

            {/* Description */}
            <p className="font-sans text-base lg:text-[1.05rem] font-light leading-relaxed text-ivory/70 mb-8 max-w-xl">
              {activeRes.desc}
            </p>
            
            {/* Highlights Card */}
            <div className="bg-white/[0.02] border border-bronze/15 p-6 sm:p-7 rounded-sm mb-10 shadow-inner">
              <p className="font-sans text-[9px] tracking-[0.3em] text-bronze uppercase mb-4 font-medium">
                RESIDENCE SPECIFICATIONS
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {activeRes.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 font-sans text-xs sm:text-sm text-ivory/85 tracking-wide">
                    <span className="w-1.5 h-1.5 rotate-45 bg-bronze-light flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <button 
                className="btn-bronze group cursor-pointer"
                onClick={() => document.getElementById('enquire-modal')?.classList.remove('hidden')}
                data-magnetic
              >
                REQUEST FLOOR PLAN
              </button>
              <button 
                className="btn-outline group cursor-pointer"
                onClick={() => document.getElementById('enquire-modal')?.classList.remove('hidden')}
                data-magnetic
              >
                SCHEDULE SITE TOUR
              </button>
            </div>
          </div>

          {/* Image Frame */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] lg:aspect-[16/11] overflow-hidden rounded-sm border border-bronze/25 shadow-[0_25px_60px_rgba(0,0,0,0.65)] group">
              <img
                ref={imageRef}
                src={activeRes.image}
                alt={activeRes.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/20 opacity-50" />
              
              {/* Corner badge on image */}
              <div className="absolute bottom-5 right-5 bg-charcoal/90 backdrop-blur-md border border-bronze/30 px-4 py-2 text-[10px] tracking-[0.25em] text-bronze-light font-sans uppercase">
                {activeRes.area}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
