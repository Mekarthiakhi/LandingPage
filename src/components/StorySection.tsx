import { useRef } from 'react'
import { useSplitTextReveal, useStaggerReveal } from '../hooks/useAnime'

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  // Use anime.js letter reveal on scroll
  useSplitTextReveal(titleRef, { scrollTrigger: true, delay: 100 })
  useStaggerReveal(sectionRef, '.story-elem', { y: 50, stagger: 150 })

  return (
    <section 
      id="story" 
      ref={sectionRef} 
      className="bg-charcoal section-py"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="story-elem">
              <span className="section-label">THE VISION</span>
            </div>
            
            <h2 
              ref={titleRef}
              className="font-serif text-4xl md:text-5xl lg:text-[4rem] leading-[1.1] mb-10 text-ivory"
            >
              <span data-split>An elevated</span><br />
              <span data-split className="italic text-bronze-light">sanctuary</span><br />
              <span data-split>above it all.</span>
            </h2>

            <div className="story-elem space-y-6 font-sans font-light text-[0.95rem] leading-relaxed text-[rgba(242,237,228,0.7)] mb-12">
              <p>
                Jayabheri The Pinnacle represents a paradigm shift in luxury living. 
                Rising 55 floors above Kokapet, it offers an unprecedented lifestyle 
                for those who seek the extraordinary.
              </p>
              <p>
                Every residence is thoughtfully curated to blur the lines between 
                indoor elegance and panoramic outdoor grandeur. This is not just a home; 
                it is a cocoon in the sky.
              </p>
            </div>

            <div className="story-elem">
              <button className="btn-outline group" data-magnetic>
                DISCOVER THE STORY
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M1 7h12M9 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Image Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 story-elem">
            <div className="relative w-full aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-sm group">
              <img 
                src="/interior.png" 
                alt="Luxurious interior living space at The Pinnacle"
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                loading="lazy"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-charcoal/10 pointer-events-none" />
            </div>
            <p className="mt-4 font-sans text-[10px] tracking-widest text-[rgba(242,237,228,0.4)] text-right">
              ARTIST'S IMPRESSION
            </p>
          </div>
          
        </div>
      </div>
    </section>
  )
}
