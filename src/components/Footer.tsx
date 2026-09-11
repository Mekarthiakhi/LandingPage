import { PHONE_DISPLAY, PHONE_TEL, whatsappLink, WHATSAPP_DEFAULT_MESSAGE, EMAIL_ADDRESS, EMAIL_DISPLAY } from '../config'
import { trackEvent } from '../lib/analytics'

const footerLinks = [
  { label: 'The Pinnacle', href: '#story' },
  { label: 'Residences', href: '#residences' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Location', href: '#location' },
  { label: 'FAQ', href: '#faq' },
]

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-charcoal border-t border-[rgba(154,123,79,0.12)]">
      <div className="container-site py-20 lg:py-28">

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">

          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-serif text-3xl lg:text-4xl tracking-[0.15em] mb-3 text-bronze-light">
              JAYABHERI
            </p>
            <p className="font-sans text-[10px] tracking-[0.4em] font-light text-ivory/40">
              THE PINNACLE · KOKAPET
            </p>
            <div className="mt-8 h-px w-16 bg-bronze/30" />
          </div>

          {/* Navigation */}
          <div>
            <p className="font-sans text-[9px] tracking-[0.35em] mb-6 text-bronze">NAVIGATE</p>
            <ul className="flex flex-col gap-4">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-sans text-sm font-light text-ivory/50 hover:text-ivory transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-[9px] tracking-[0.35em] mb-6 text-bronze">CONTACT</p>
            <div className="flex flex-col gap-4">
              <a
                href={`tel:${PHONE_TEL}`}
                onClick={() => trackEvent('contact_call', { location: 'footer' })}
                className="font-sans text-sm font-light text-ivory/50 hover:text-ivory transition-colors"
              >
                {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                onClick={() => trackEvent('contact_email', { location: 'footer' })}
                className="font-sans text-sm font-light text-ivory/50 hover:text-bronze-light transition-colors break-all flex items-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                {EMAIL_DISPLAY}
              </a>
              <a
                href={whatsappLink(WHATSAPP_DEFAULT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('contact_whatsapp', { location: 'footer' })}
                className="font-sans text-sm font-light text-ivory/50 hover:text-ivory transition-colors"
              >
                Chat on WhatsApp
              </a>
              <p className="font-sans text-sm font-light leading-relaxed text-ivory/35">
                Kokapet, Hyderabad<br />
                Telangana — 500075
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-10 bg-bronze/10" />

        {/* Bottom row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-sans text-[9px] tracking-[0.2em] text-ivory/25">
              TG RERA: P02400006797
            </p>
            <p className="font-sans text-[9px] tracking-[0.15em] text-ivory/20">
              Permit No: 001689/BP/HMDA/0359/SKP/2023
            </p>
          </div>

          <p className="font-sans text-[9px] tracking-[0.15em] text-ivory/20">
            © {new Date().getFullYear()} Jayabheri Group. All rights reserved.
          </p>
        </div>

        {/* Disclaimer */}
        <p className="font-sans text-[9px] leading-relaxed mt-10 text-ivory/15 max-w-4xl">
          *Prices, specifications and amenities are subject to change without notice. Images are for representational purposes only. This is not a legal document. Please refer to the RERA page for official details.
        </p>
      </div>
    </footer>
  )
}
