// Lightweight, provider-agnostic event tracking.
// Pushes to GTM's dataLayer and calls gtag when present; a safe no-op otherwise.
// Wire up GA4/GTM in index.html and these events become conversions.

type Params = Record<string, unknown>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(event: string, params: Params = {}): void {
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...params })
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, params)
    }
    if (import.meta.env.DEV) console.debug('[track]', event, params)
  } catch {
    /* analytics must never break the page */
  }
}
