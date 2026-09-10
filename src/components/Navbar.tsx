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
  ]

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-charcoal/95 backdrop-blur-md py-4 border-[rgba(154,123,79,0.1)]'
          : 'bg-transparent py-8 lg:py-10 border-transparent'
      }`}
    >
      <div className="container-site flex items-center justify-between">
        
        {/* Brand */}
        <div 
          className="cursor-pointer group flex flex-col"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          data-magnetic
        >
          <span className="font-serif text-2xl lg:text-3xl tracking-[0.15em] text-ivory transition-colors group-hover:text-bronze-light">
            JAYABHERI
          </span>
          <span className={`font-sans text-[8px] tracking-[0.4em] transition-opacity duration-300 ${scrolled ? 'opacity-0 h-0' : 'opacity-100 text-ivory/60 mt-1'}`}>
            THE PINNACLE
          </span>
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

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-charcoal z-40 transition-transform duration-500 flex flex-col justify-center items-center gap-8 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden`}
      >
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
    </header>
  )
}
