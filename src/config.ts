// ── Central contact + tracking config — edit these in ONE place ──

// Primary phone / WhatsApp number (10-digit Indian mobile).
// Change this one value and every link (call, WhatsApp, footer, schema)
// updates automatically.
export const PHONE_LOCAL = '7347234445'
export const COUNTRY_CODE = '91' // India

export const PHONE_DISPLAY = `+${COUNTRY_CODE} ${PHONE_LOCAL}`
export const PHONE_TEL = `+${COUNTRY_CODE}${PHONE_LOCAL}`
export const WHATSAPP_NUMBER = `${COUNTRY_CODE}${PHONE_LOCAL}` // international, no '+'

/** Build a wa.me deep link with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

// Default message used by the "quick contact" buttons (call/WhatsApp bar).
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi, I'm interested in Jayabheri The Pinnacle. Please share pricing and details."

// GA4 Measurement ID — replace with your real ID (e.g. 'G-XXXXXXXXXX') in
// index.html to enable analytics. Events also flow to GTM's dataLayer, so a
// GTM container works without changing anything here.
