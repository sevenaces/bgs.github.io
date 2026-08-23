// Google Analytics 4 (gtag.js) setup and custom event helpers

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

let isInitialized = false;

/**
 * Initializes Google Analytics with the given Measurement ID (e.g., G-XXXXXXXXXX)
 * If no ID is passed, it checks import.meta.env.VITE_GA_MEASUREMENT_ID
 */
export function initGA(measurementId?: string) {
  if (typeof window === 'undefined') return;

  const targetId =
    measurementId ||
    ((import.meta as any).env?.VITE_GA_MEASUREMENT_ID as string | undefined);

  if (!targetId || targetId.trim() === '' || targetId === 'G-XXXXXXXXXX') {
    return;
  }

  if (isInitialized) return;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', targetId, {
    send_page_view: true,
  });

  // Inject gtag.js script if not already present
  const existingScript = document.getElementById('google-analytics-script');
  if (!existingScript) {
    const script = document.createElement('script');
    script.id = 'google-analytics-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${targetId}`;
    document.head.appendChild(script);
  }

  isInitialized = true;
}

/**
 * Tracks custom events (e.g. Find Players clicked, search performed, view toggled)
 */
export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
}

/**
 * Tracks virtual page / tab views
 */
export function trackPageView(pagePath: string, pageTitle: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
}
