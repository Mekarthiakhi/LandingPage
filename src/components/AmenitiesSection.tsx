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
    <section id="amenities" ref={sectionRef} className="relative bg-charcoal section-py border-t border-[rgba(154,123,79,0.1)]">
      
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
        <div className="mb-16 lg:mb-24 max-w-2xl">
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

        {/* List */}
        <div className="max-w-4xl">
          <ul className="flex flex-col">
            {amenitiesList.map((item, i) => (
              <li 
                key={i}
                className="amenity-item group border-b border-[rgba(154,123,79,0.15)] last:border-0"
                onMouseEnter={() => setHoverIndex(i)}
              >
                <div className={`py-6 lg:py-8 flex flex-col md:flex-row md:items-center justify-between gap-2 cursor-pointer transition-colors duration-500 px-4 -mx-4 rounded-sm ${
                  hoverIndex === i ? 'bg-[rgba(154,123,79,0.08)]' : 'hover:bg-[rgba(154,123,79,0.03)]'
                }`}>
                  
                  <div className="flex items-center gap-6">
                    <span className={`font-sans text-[10px] w-6 transition-colors duration-300 ${
                      hoverIndex === i ? 'text-bronze-light font-semibold' : 'text-bronze-light/50'
                    }`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className={`font-serif text-2xl lg:text-3xl transition-colors duration-500 ${
                      hoverIndex === i ? 'text-bronze-light' : 'text-ivory/80 group-hover:text-bronze-light'
                    }`}>
                      {item.name}
                    </h3>
                  </div>

                  <span className="font-sans text-[9px] tracking-[0.3em] text-ivory/30 md:group-hover:text-ivory/60 transition-colors md:ml-0 ml-12">
                    {item.category}
                  </span>
                  
                </div>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </section>
  )
}
