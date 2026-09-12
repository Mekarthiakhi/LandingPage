import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'The Pinnacle', href: '#story' },
    { label: 'Residences', href: '#residences' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Location', href: '#location' },
    { label: 'FAQ', href: '#faq' },
  ]

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-charcoal/95 backdrop-blur-md py-4 border-[rgba(154,123,79,0.1)] shadow-xl'
          : 'bg-gradient-to-b from-charcoal/90 via-charcoal/50 to-transparent backdrop-blur-[2px] py-4 lg:py-4 border-transparent'
      }`}
    >
      <div className="container-site flex items-center justify-between">
        
        {/* Brand */}
        <div 
          className="cursor-pointer group flex items-center gap-3.5"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          data-magnetic
        >
          <img 
            src="/favicon.svg" 
            alt="Jayabheri The Pinnacle Logo" 
            className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-serif text-2xl lg:text-3xl tracking-[0.15em] text-ivory transition-colors group-hover:text-bronze-light">
              JAYABHERI
            </span>
            <span className={`font-sans text-[8px] tracking-[0.4em] transition-all duration-300 ${scrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 text-ivory/60 mt-0.5'}`}>
              THE PINNACLE
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-sans text-[10px] tracking-[0.25em] text-ivory/70 hover:text-bronze-light transition-colors uppercase"
            >
              {link.label}
            </button>
          ))}
          <button 
            className="btn-outline !py-3 !px-6 !text-[9px]"
            onClick={() => document.getElementById('enquire-modal')?.classList.remove('hidden')}
            data-magnetic
          >
            ENQUIRE
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-px bg-ivory transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-ivory transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-ivory transition-transform ${menuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
        </button>

      </div>
    </header>

    {/* Mobile Menu — kept as a sibling of <header> so the header's
        backdrop-filter (applied when scrolled) doesn't trap this fixed
        overlay inside the top bar and let the page bleed through. */}
    <div
      className={`fixed inset-0 bg-charcoal z-[60] transition-transform duration-500 flex flex-col justify-center items-center gap-8 ${
        menuOpen ? 'translate-x-0' : 'translate-x-full'
      } lg:hidden`}
    >
      {/* Close */}
      <button
        onClick={() => setMenuOpen(false)}
        aria-label="Close menu"
        className="absolute top-8 right-6 w-10 h-10 flex items-center justify-center text-ivory/60 hover:text-bronze-light transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M1 1l18 18M19 1L1 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {navLinks.map((link) => (
        <button
          key={link.href}
          onClick={() => scrollTo(link.href)}
          className="font-serif text-3xl text-ivory hover:text-bronze-light transition-colors"
        >
          {link.label}
        </button>
      ))}
      <div className="w-12 h-px bg-bronze/30 my-4" />
      <button
        className="btn-bronze"
        onClick={() => {
          setMenuOpen(false)
          document.getElementById('enquire-modal')?.classList.remove('hidden')
        }}
      >
        ENQUIRE NOW
      </button>
    </div>
    </>
  )
}
