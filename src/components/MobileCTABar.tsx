import { PHONE_TEL, whatsappLink, WHATSAPP_DEFAULT_MESSAGE } from '../config'
import { trackEvent } from '../lib/analytics'

/**
 * Sticky bottom action bar shown on phones/tablets only (lg:hidden).
 * The single biggest conversion lever for a paid-traffic real-estate LP.
 */
export default function MobileCTABar() {
  return (
    <>
      {/* Spacer so page content is never hidden behind the fixed bar */}
      <div className="h-16 lg:hidden" aria-hidden />

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-stretch h-16 border-t border-bronze/25 bg-charcoal/95 backdrop-blur-md">
        <a
          href={`tel:${PHONE_TEL}`}
          onClick={() => trackEvent('contact_call', { location: 'mobile_bar' })}
          className="flex-1 flex items-center justify-center gap-2 font-sans text-[11px] tracking-[0.22em] uppercase text-ivory/85 hover:text-bronze-light transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Call
        </a>

        <a
          href={whatsappLink(WHATSAPP_DEFAULT_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('contact_whatsapp', { location: 'mobile_bar' })}
          className="flex-1 flex items-center justify-center gap-2 font-sans text-[11px] tracking-[0.22em] uppercase text-charcoal font-medium bg-bronze hover:bg-bronze-light transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2zm5.8 14.08c-.24.68-1.42 1.32-1.95 1.36-.5.05-1.13.24-3.66-.77-3.08-1.21-5.05-4.34-5.2-4.55-.15-.2-1.24-1.66-1.24-3.16 0-1.5.79-2.24 1.07-2.55.28-.3.61-.38.81-.38.2 0 .41 0 .58.01.19.01.44-.07.69.53.24.6.83 2.07.9 2.22.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.07 1.31 2.37 1.46.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.28.1 1.76.83 2.06.98.3.15.5.22.58.35.07.13.07.73-.17 1.41z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </>
  )
}
