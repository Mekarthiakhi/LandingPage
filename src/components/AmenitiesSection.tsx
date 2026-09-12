import { useState, useRef } from 'react'
import { useSplitTextReveal, useStaggerReveal } from '../hooks/useAnime'

// Real amenities from Jayabheri The Pinnacle — a 7-level clubhouse plus
// tower-level community spaces.
const amenitiesList = [
  { name: 'INFINITY POOL', category: 'THE CLUB', image: '/pool.png' },
  { name: 'SPA', category: 'THE CLUB', image: '/interior.png' },
  { name: 'GYMNASIUM', category: 'THE CLUB', image: '/interior.png' },
  { name: 'YOGA STUDIO', category: 'THE CLUB', image: '/greens.png' },
  { name: 'MINI THEATRE', category: 'THE CLUB', image: '/interior.png' },
  { name: 'INDOOR GAMES', category: 'THE CLUB', image: '/interior.png' },
  { name: 'SPORTS ZONE', category: 'THE CLUB', image: '/interior.png' },
  { name: 'PARTY AREA', category: 'THE CLUB', image: '/balcony.png' },
  { name: 'CAFETERIA & LOUNGE', category: 'THE CLUB', image: '/interior.png' },
  { name: 'GUEST ROOMS', category: 'THE CLUB', image: '/interior.png' },
  { name: 'COWORKING SPACE', category: 'TOWER', image: '/interior.png' },
  { name: 'CONFERENCE & HUDDLE ROOM', category: 'TOWER', image: '/interior.png' },
  { name: 'HOBBY ROOM', category: 'TOWER', image: '/balcony.png' },
  { name: 'TODDLER SPACE', category: 'TOWER', image: '/greens.png' },
  { name: 'STUDY & TUITION ROOM', category: 'TOWER', image: '/interior.png' },
  { name: 'ELDERS MEETING SPACE', category: 'TOWER', image: '/balcony.png' },
  { name: 'COMMUNITY PLAZA', category: 'TOWER', image: '/greens.png' },
]

export default function AmenitiesSection() {
  const [hoverIndex, setHoverIndex] = useState(0)
  
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useSplitTextReveal(titleRef, { scrollTrigger: true })
  useStaggerReveal(sectionRef, '.amenity-item', { y: 20, stagger: 40 })

  const currentImage = amenitiesList[hoverIndex]?.image || '/interior.png'

  return (
    <section id="amenities" ref={sectionRef} className="relative bg-charcoal py-20 lg:py-28 border-t border-[rgba(154,123,79,0.1)]">
      
      {/* Background Image (Crossfades based on hover) */}
      <div className="absolute inset-0 w-full h-full opacity-30 lg:opacity-50 pointer-events-none transition-all duration-700">
        <img
          key={currentImage}
          src={currentImage}
          alt="Amenity background"
          className="w-full h-full object-cover transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-charcoal/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-transparent" />
      </div>

      <div className="container-site relative z-10">
        
        {/* Header */}
        <div className="mb-10 lg:mb-14 max-w-2xl">
          <span className="section-label">THE CLUBHOUSE</span>
          <h2 ref={titleRef} className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory">
            <span data-split>World-Class</span><br/>
            <span data-split className="italic text-bronze-light">Amenities</span>
          </h2>
          <p className="font-sans text-sm lg:text-base font-light text-ivory/55 mt-6 leading-relaxed">
            A grand clubhouse configured over seven levels, wrapped in planned greenery and water
            features — complemented by dedicated community spaces at the tower level.
          </p>
        </div>

        {/* 2-Column Amenities Layout (Cuts vertical space by over 60%) */}
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-16 gap-y-10">
            
            {/* Column 1: The Clubhouse (7 Levels) */}
            <div>
              <div className="flex items-center gap-3 pb-4 mb-2 border-b border-bronze/30">
                <span className="w-2 h-2 rounded-full bg-bronze-light" />
                <h3 className="font-sans text-[11px] tracking-[0.3em] font-medium text-bronze-light uppercase">
                  Clubhouse Amenities (7 Levels)
                </h3>
              </div>
              <ul className="flex flex-col">
                {amenitiesList.filter(item => item.category === 'THE CLUB').map((item) => {
                  const globalIndex = amenitiesList.findIndex(a => a.name === item.name)
                  const isHovered = hoverIndex === globalIndex
                  return (
                    <li
                      key={item.name}
                      className="amenity-item group border-b border-[rgba(154,123,79,0.12)] last:border-0"
                      onMouseEnter={() => setHoverIndex(globalIndex)}
                    >
                      <div className={`py-3.5 lg:py-4 flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 px-3 -mx-3 rounded-md ${
                        isHovered ? 'bg-[rgba(154,123,79,0.12)] pl-4' : 'hover:bg-[rgba(154,123,79,0.04)]'
                      }`}>
                        <div className="flex items-center gap-4">
                          <span className={`font-sans text-[11px] w-6 transition-colors duration-300 ${
                            isHovered ? 'text-bronze-light font-semibold' : 'text-bronze-light/50'
                          }`}>
                            {String(globalIndex + 1).padStart(2, '0')}
                          </span>
                          <h4 className={`font-serif text-lg lg:text-xl transition-colors duration-300 ${
                            isHovered ? 'text-bronze-light' : 'text-ivory/85 group-hover:text-bronze-light'
                          }`}>
                            {item.name}
                          </h4>
                        </div>
                        <span className="font-sans text-[9px] tracking-[0.25em] text-ivory/30 group-hover:text-ivory/60 transition-colors shrink-0">
                          {item.category}
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Column 2: Tower-Level Spaces */}
            <div>
              <div className="flex items-center gap-3 pb-4 mb-2 border-b border-bronze/30">
                <span className="w-2 h-2 rounded-full bg-bronze-light" />
                <h3 className="font-sans text-[11px] tracking-[0.3em] font-medium text-bronze-light uppercase">
                  Tower Community Spaces
                </h3>
              </div>
              <ul className="flex flex-col">
                {amenitiesList.filter(item => item.category === 'TOWER').map((item) => {
                  const globalIndex = amenitiesList.findIndex(a => a.name === item.name)
                  const isHovered = hoverIndex === globalIndex
                  return (
                    <li
                      key={item.name}
                      className="amenity-item group border-b border-[rgba(154,123,79,0.12)] last:border-0"
                      onMouseEnter={() => setHoverIndex(globalIndex)}
                    >
                      <div className={`py-3.5 lg:py-4 flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 px-3 -mx-3 rounded-md ${
                        isHovered ? 'bg-[rgba(154,123,79,0.12)] pl-4' : 'hover:bg-[rgba(154,123,79,0.04)]'
                      }`}>
                        <div className="flex items-center gap-4">
                          <span className={`font-sans text-[11px] w-6 transition-colors duration-300 ${
                            isHovered ? 'text-bronze-light font-semibold' : 'text-bronze-light/50'
                          }`}>
                            {String(globalIndex + 1).padStart(2, '0')}
                          </span>
                          <h4 className={`font-serif text-lg lg:text-xl transition-colors duration-300 ${
                            isHovered ? 'text-bronze-light' : 'text-ivory/85 group-hover:text-bronze-light'
                          }`}>
                            {item.name}
                          </h4>
                        </div>
                        <span className="font-sans text-[9px] tracking-[0.25em] text-ivory/30 group-hover:text-ivory/60 transition-colors shrink-0">
                          {item.category}
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  )
}
