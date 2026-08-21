export interface UtmParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  pageUrl?: string;
  referrer?: string;
}

const UTM_STORAGE_KEY = "agri_marketing_utm_v1";

/**
 * Parses URL search query and captures UTM parameters, storing them in sessionStorage
 */
export function captureUtmParameters(): UtmParams {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const existingRaw = sessionStorage.getItem(UTM_STORAGE_KEY);
    const existing: UtmParams = existingRaw ? JSON.parse(existingRaw) : {};

    const utmSource = urlParams.get("utm_source") || existing.utmSource || "";
    const utmMedium = urlParams.get("utm_medium") || existing.utmMedium || "";
    const utmCampaign = urlParams.get("utm_campaign") || existing.utmCampaign || "";
    const utmContent = urlParams.get("utm_content") || existing.utmContent || "";
    const utmTerm = urlParams.get("utm_term") || existing.utmTerm || "";
    const pageUrl = window.location.href;
    const referrer = document.referrer || existing.referrer || "";

    const captured: UtmParams = {
      utmSource: utmSource || undefined,
      utmMedium: utmMedium || undefined,
      utmCampaign: utmCampaign || undefined,
      utmContent: utmContent || undefined,
      utmTerm: utmTerm || undefined,
      pageUrl,
      referrer: referrer || undefined,
    };

    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(captured));
    return captured;
  } catch (err) {
    console.error("Error capturing UTM parameters:", err);
    return {};
  }
}

/**
 * Retrieves captured UTM parameters from sessionStorage
 */
export function getStoredUtmParameters(): UtmParams {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
