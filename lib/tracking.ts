import { TrackingPayload, ConsentPreferences, Product } from "@/types";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Dispatches tracking events to active and consented channels:
 * 1. Meta Pixel (fbq) - only if marketing consent is granted
 * 2. Google Ads / GA4 (gtag) - only if marketing/analytics consent is granted
 * 3. Server-side event route (/api/tracking/events) - for verification & analytics
 */
export async function trackEvent(
  payload: TrackingPayload,
  consent: ConsentPreferences | null,
  productContext?: Product | null
) {
  if (typeof window === "undefined") return;

  const eventData = {
    ...payload,
    timestamp: payload.timestamp || new Date().toISOString(),
    pageUrl: payload.pageUrl || window.location.href,
  };

  // 1. Meta Pixel Tracking (Marketing Consent Required)
  if (consent?.marketing && typeof window.fbq === "function") {
    try {
      switch (payload.event) {
        case "page_view":
          window.fbq("track", "PageView");
          break;
        case "product_view":
          window.fbq("track", "ViewContent", {
            content_ids: payload.productId ? [payload.productId] : [],
            content_name: payload.productName,
            content_category: payload.productCategory || "Fertilizer",
            content_type: "product",
          });
          break;
        case "product_click":
          window.fbq("trackCustom", "ProductClick", {
            content_ids: payload.productId ? [payload.productId] : [],
            content_name: payload.productName,
          });
          break;
        case "cta_click":
          window.fbq("trackCustom", "CtaClick", {
            cta_name: payload.ctaName,
            product_id: payload.productId,
          });
          break;
        case "form_view":
          window.fbq("trackCustom", "LeadFormView", {
            form_type: payload.formType,
            product_id: payload.productId,
          });
          break;
        case "form_start":
          window.fbq("trackCustom", "LeadFormStart", {
            form_type: payload.formType,
            product_id: payload.productId,
          });
          break;
        case "form_submit":
          window.fbq("trackCustom", "LeadFormSubmit", {
            form_type: payload.formType,
            product_id: payload.productId,
          });
          break;
        case "lead":
          window.fbq("track", "Lead", {
            content_name: payload.productName,
            content_category: payload.productCategory || "Fertilizer",
            value: 0,
            currency: "USD",
          });

          // Product-specific custom event if configured
          if (productContext?.trackingConfig?.customEventName) {
            window.fbq("trackCustom", productContext.trackingConfig.customEventName, {
              product_id: payload.productId,
              product_name: payload.productName,
            });
          }
          break;
      }
    } catch (fbErr) {
      console.warn("Meta Pixel tracking dispatch warning:", fbErr);
    }
  }

  // 2. Google Ads & Analytics Tracking (Analytics / Marketing Consent)
  if ((consent?.marketing || consent?.analytics) && typeof window.gtag === "function") {
    try {
      switch (payload.event) {
        case "page_view":
          window.gtag("event", "page_view", {
            page_location: eventData.pageUrl,
          });
          break;
        case "product_view":
          window.gtag("event", "view_item", {
            items: [
              {
                item_id: payload.productId,
                item_name: payload.productName,
                item_category: payload.productCategory,
              },
            ],
          });
          break;
        case "lead":
          window.gtag("event", "generate_lead", {
            currency: "USD",
            value: 0,
            product_id: payload.productId,
            product_name: payload.productName,
          });

          // Product-specific Google Ads conversion label firing
          if (
            consent?.marketing &&
            productContext?.trackingConfig?.googleAdsConversionId &&
            productContext.trackingConfig.googleAdsConversionLabel
          ) {
            window.gtag("event", "conversion", {
              send_to: `${productContext.trackingConfig.googleAdsConversionId}/${productContext.trackingConfig.googleAdsConversionLabel}`,
            });
          }
          break;
        default:
          window.gtag("event", payload.event, {
            product_id: payload.productId,
            product_name: payload.productName,
          });
      }
    } catch (gtagErr) {
      console.warn("Google Tag tracking dispatch warning:", gtagErr);
    }
  }

  // 3. Dispatch to server-side event pipeline
  try {
    fetch("/api/tracking/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    }).catch(() => {
      // Non-blocking telemetry
    });
  } catch {
    // Suppress network telemetry errors
  }
}
