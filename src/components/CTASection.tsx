import { useRef, useState, useEffect } from 'react'
import { useSplitTextReveal, useStaggerReveal } from '../hooks/useAnime'

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const title1Ref = useRef<HTMLHeadingElement>(null)
  const title2Ref = useRef<HTMLHeadingElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', interest: '' })

  useSplitTextReveal(title1Ref, { scrollTrigger: true, delay: 0 })
  useSplitTextReveal(title2Ref, { scrollTrigger: true, delay: 200 })
  useStaggerReveal(sectionRef, '.cta-fade', { y: 30, delay: 400 })

  const openModal = () => document.getElementById('enquire-modal')?.classList.remove('hidden')
  const closeModal = () => document.getElementById('enquire-modal')?.classList.add('hidden')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section ref={sectionRef} id="cta" className="relative bg-charcoal section-py border-t border-[rgba(154,123,79,0.1)]">
        <div className="container-site text-center max-w-5xl">
          
          <div className="cta-fade flex justify-center mb-10">
            <span className="section-label !mb-0">YOUR NEXT CHAPTER</span>
          </div>
          
          <h2 ref={title1Ref} className="font-serif text-6xl md:text-[5.5rem] lg:text-[7rem] leading-[0.9] text-ivory mb-2">
            <span data-split>COME HOME</span>
          </h2>
          <h2 ref={title2Ref} className="font-serif italic text-6xl md:text-[5.5rem] lg:text-[7rem] leading-[0.9] text-bronze-light mb-12">
            <span data-split>to the Pinnacle.</span>
          </h2>

          <p className="cta-fade font-sans text-[0.95rem] font-light leading-relaxed text-ivory/60 max-w-xl mx-auto mb-16">
            Begin your journey to an extraordinary life above the city. 
            Speak with our residences specialists today.
          </p>

          <div className="cta-fade flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button onClick={openModal} className="btn-bronze w-full sm:w-auto justify-center" data-magnetic>
              BOOK A PRIVATE VIEWING
            </button>
            <button onClick={openModal} className="btn-outline w-full sm:w-auto justify-center" data-magnetic>
              DOWNLOAD BROCHURE
            </button>
          </div>

          <div className="cta-fade mt-16">
            <a href="tel:7304001234" className="font-sans text-xs tracking-[0.2em] text-ivory/40 hover:text-bronze-light transition-colors">
              OR CALL 73040 01234
            </a>
          </div>
        </div>
      </section>

      {/* Enquiry Modal — Translucent backdrop showing the background luxury page */}
      <div 
        id="enquire-modal" 
        className="fixed inset-0 z-[9999] hidden flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md transition-all duration-300"
        onClick={(e) => e.target === e.currentTarget && closeModal()}
      >
        <div className="relative w-full max-w-lg bg-[#161614]/92 backdrop-blur-2xl border border-[rgba(201,169,110,0.3)] p-8 sm:p-10 lg:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(154,123,79,0.12)] rounded-sm overflow-hidden text-ivory animate-modal-in">
          
          {/* Top golden accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-bronze-light to-transparent" />
          
          {/* Ambient lighting glows */}
          <div className="absolute -top-24 -right-24 w-56 h-56 bg-bronze/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-bronze/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close button with circular hover */}
          <button 
            onClick={closeModal}
            aria-label="Close modal"
            className="absolute top-5 right-5 sm:top-6 sm:right-6 w-10 h-10 rounded-full flex items-center justify-center text-ivory/50 hover:text-bronze-light hover:bg-white/[0.06] border border-transparent hover:border-bronze/30 transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M1 1l18 18M19 1L1 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {submitted ? (
            <div className="text-center py-12">
              <div className="w-12 h-px bg-bronze mx-auto mb-6" />
              <h3 className="font-serif text-3xl text-ivory mb-3">Thank you.</h3>
              <p className="font-sans text-sm text-ivory/60 font-light leading-relaxed max-w-xs mx-auto">
                Our residential concierge specialist will contact you shortly to arrange your private viewing.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <span className="font-sans text-[9px] tracking-[0.35em] text-bronze-light uppercase block mb-2 font-medium">
                  JAYABHERI THE PINNACLE
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-normal leading-tight">
                  Private Consultation
                </h3>
                <p className="font-sans text-xs text-ivory/50 font-light mt-1.5">
                  Request pricing, bespoke floor plans, and VIP site tour.
                </p>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="font-sans text-[10px] tracking-[0.2em] text-bronze-light/80 uppercase font-medium">
                  FULL NAME
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your Full Name"
                  className="w-full bg-white/[0.04] border-b border-ivory/20 px-3.5 py-2.5 text-ivory text-sm outline-none focus:border-bronze-light focus:bg-white/[0.08] transition-all duration-300 placeholder:text-ivory/25 rounded-t-sm"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="font-sans text-[10px] tracking-[0.2em] text-bronze-light/80 uppercase font-medium">
                  EMAIL ADDRESS
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="name@company.com"
                  className="w-full bg-white/[0.04] border-b border-ivory/20 px-3.5 py-2.5 text-ivory text-sm outline-none focus:border-bronze-light focus:bg-white/[0.08] transition-all duration-300 placeholder:text-ivory/25 rounded-t-sm"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="font-sans text-[10px] tracking-[0.2em] text-bronze-light/80 uppercase font-medium">
                  PHONE NUMBER
                </label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                  className="w-full bg-white/[0.04] border-b border-ivory/20 px-3.5 py-2.5 text-ivory text-sm outline-none focus:border-bronze-light focus:bg-white/[0.08] transition-all duration-300 placeholder:text-ivory/25 rounded-t-sm"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="font-sans text-[10px] tracking-[0.2em] text-bronze-light/80 uppercase font-medium">
                  INTERESTED CONFIGURATION
                </label>
                <div className="relative">
                  <select
                    required
                    value={formData.interest}
                    onChange={(e) => setFormData(prev => ({ ...prev, interest: e.target.value }))}
                    className="w-full bg-white/[0.04] border-b border-ivory/20 px-3.5 py-2.5 text-ivory text-sm outline-none focus:border-bronze-light focus:bg-white/[0.08] transition-all duration-300 [&>option]:bg-[#181816] rounded-t-sm appearance-none cursor-pointer"
                  >
                    <option value="">Select Configuration</option>
                    <option value="2BHK">2 BHK — 2,692 sq ft</option>
                    <option value="3.5BHK">3.5 BHK — 3,587–3,678 sq ft</option>
                    <option value="4.5BHK">4.5 BHK — 4,545–4,622 sq ft</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-bronze-light/60">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="btn-bronze justify-center w-full !py-4 !text-xs tracking-[0.25em] shadow-[0_4px_25px_rgba(154,123,79,0.3)] hover:shadow-[0_4px_35px_rgba(201,169,110,0.5)] transition-all duration-300 mt-2 cursor-pointer"
                data-magnetic
              >
                SUBMIT PRIVATE ENQUIRY
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
