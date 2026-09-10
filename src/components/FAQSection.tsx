import { useState, useRef } from 'react'
import { useSplitTextReveal, useStaggerReveal } from '../hooks/useAnime'

const faqs = [
  {
    q: 'Where is Jayabheri The Pinnacle located?',
    a: 'Jayabheri The Pinnacle is located in Kokapet, Hyderabad — minutes from the Financial District and Nanakramguda, with direct access to the Outer Ring Road (ORR).',
  },
  {
    q: 'What types of flats are available?',
    a: 'The project offers premium 3.5 & 4.5 BHK residences (with select 2 BHK homes), each thoughtfully designed with large living spaces and separate domestic help’s quarters.',
  },
  {
    q: 'What is the possession date?',
    a: 'The Pinnacle is a RERA-registered, under-construction development (TG RERA No. P02400006797). Construction is progressing steadily — please enquire for the latest possession timeline.',
  },
  {
    q: 'How far is it from major IT hubs like Gachibowli and the Financial District?',
    a: 'The Financial District is about 9 minutes away and Gachibowli about 14 minutes, with Hitech City roughly 20 minutes by road.',
  },
  {
    q: 'What amenities are available?',
    a: 'Residents enjoy a seven-level clubhouse — infinity pool, spa, gym, yoga studio, mini theatre, indoor games and party areas — plus tower-level community spaces such as a coworking hub, toddler space and study rooms.',
  },
  {
    q: 'What is the size range of flats?',
    a: '3.5 BHK homes range from approximately 3,587–3,678 sq ft, while 4.5 BHK homes span about 4,545–4,622 sq ft of super built-up area.',
  },
  {
    q: 'Why is Kokapet a popular location for apartments in Hyderabad?',
    a: 'Kokapet is one of Hyderabad’s fastest-appreciating micro-markets — adjacent to the Financial District, exceptionally well connected via the ORR, and surrounded by premium schools, hospitals and workplaces.',
  },
  {
    q: 'What are the location highlights of Jayabheri The Pinnacle?',
    a: 'Set amid 79% open space, the towers offer unobstructed ORR views while keeping the Financial District, leading hospitals, international schools and the airport (~30 min) within easy reach.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useSplitTextReveal(titleRef, { scrollTrigger: true })
  useStaggerReveal(sectionRef, '.faq-item', { y: 20, stagger: 50 })

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="bg-charcoal section-py border-t border-[rgba(154,123,79,0.1)]"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="section-label">NEED TO KNOW</span>
            <h2
              ref={titleRef}
              className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] text-ivory"
            >
              <span data-split>Frequently</span>{' '}
              <span data-split className="italic text-bronze-light">Asked</span>
            </h2>
            <p className="font-sans text-sm font-light text-ivory/55 mt-6 leading-relaxed max-w-xs">
              Everything you need to know about life at The Pinnacle. Still curious?{' '}
              <button
                onClick={() => document.getElementById('enquire-modal')?.classList.remove('hidden')}
                className="text-bronze-light underline underline-offset-4 hover:text-bronze cursor-pointer"
                data-magnetic
              >
                Talk to us
              </button>
              .
            </p>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-8">
            <ul className="flex flex-col">
              {faqs.map((item, i) => {
                const open = openIndex === i
                return (
                  <li
                    key={i}
                    className="faq-item border-b border-[rgba(154,123,79,0.15)] first:border-t"
                  >
                    <button
                      onClick={() => setOpenIndex(open ? null : i)}
                      aria-expanded={open}
                      className="w-full flex items-start justify-between gap-6 text-left py-6 lg:py-7 cursor-pointer group"
                    >
                      <span
                        className={`font-serif text-xl lg:text-2xl transition-colors duration-300 ${
                          open ? 'text-bronze-light' : 'text-ivory/85 group-hover:text-ivory'
                        }`}
                      >
                        {item.q}
                      </span>
                      <span
                        className={`relative mt-2 w-4 h-4 flex-shrink-0 transition-transform duration-500 ${
                          open ? 'rotate-45' : ''
                        }`}
                        aria-hidden
                      >
                        <span className="absolute top-1/2 left-0 w-full h-px bg-bronze-light -translate-y-1/2" />
                        <span className="absolute left-1/2 top-0 h-full w-px bg-bronze-light -translate-x-1/2" />
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="font-sans text-sm lg:text-[0.95rem] font-light leading-relaxed text-ivory/60 pb-7 max-w-2xl pr-8">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
