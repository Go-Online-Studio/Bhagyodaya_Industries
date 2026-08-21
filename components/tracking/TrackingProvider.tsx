"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Product, Campaign, ConsentPreferences, TrackingEventType, TrackingPayload } from "@/types";
import { trackEvent } from "@/lib/tracking";
import { captureUtmParameters, getStoredUtmParameters } from "@/lib/utm";

interface TrackingContextType {
  consent: ConsentPreferences | null;
  setConsent: (consent: ConsentPreferences) => void;
  activeProduct: Product | null;
  setActiveProduct: (product: Product | null) => void;
  activeCampaign: Campaign | null;
  track: (
    event: TrackingEventType,
    options?: Partial<Omit<TrackingPayload, "event">>
  ) => void;
  formSubmitted: boolean;
  setFormSubmitted: (submitted: boolean) => void;
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

const CONSENT_STORAGE_KEY = "agri_cookie_consent_v1";
const FORM_SUBMITTED_STORAGE_KEY = "agri_lead_submitted_v1";

export function TrackingProvider({
  children,
  campaign,
  initialProducts = [],
}: {
  children: React.ReactNode;
  campaign: Campaign;
  initialProducts?: Product[];
}) {
  const [consent, setConsentState] = useState<ConsentPreferences | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(
    initialProducts.find((p) => p.id === campaign.featuredProductId) || initialProducts[0] || null
  );
  const [formSubmitted, setFormSubmittedState] = useState<boolean>(false);

  // Initialize consent & submitted status from localStorage on mount
  useEffect(() => {
    captureUtmParameters();

    try {
      const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (storedConsent) {
        setConsentState(JSON.parse(storedConsent));
      }

      const storedSubmitted = sessionStorage.getItem(FORM_SUBMITTED_STORAGE_KEY);
      if (storedSubmitted === "true") {
        setFormSubmittedState(true);
      }
    } catch (e) {
      console.error("Storage access error:", e);
    }
  }, []);

  const setConsent = useCallback((newConsent: ConsentPreferences) => {
    setConsentState(newConsent);
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newConsent));
    } catch (e) {
      console.error("Error saving consent:", e);
    }
  }, []);

  const setFormSubmitted = useCallback((submitted: boolean) => {
    setFormSubmittedState(submitted);
    try {
      if (submitted) {
        sessionStorage.setItem(FORM_SUBMITTED_STORAGE_KEY, "true");
        localStorage.setItem(FORM_SUBMITTED_STORAGE_KEY, "true");
      }
    } catch (e) {
      console.error("Error saving submission state:", e);
    }
  }, []);

  const track = useCallback(
    (event: TrackingEventType, options: Partial<Omit<TrackingPayload, "event">> = {}) => {
      const utms = getStoredUtmParameters();
      const payload: TrackingPayload = {
        event,
        productId: options.productId || activeProduct?.id,
        productName: options.productName || activeProduct?.name,
        productCategory: options.productCategory || activeProduct?.category,
        campaignId: campaign.campaignId,
        campaignSeason: campaign.season,
        utmSource: utms.utmSource,
        utmCampaign: utms.utmCampaign,
        pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
        ...options,
      };

      trackEvent(payload, consent, activeProduct);
    },
    [consent, activeProduct, campaign]
  );

  // Track initial page view when consent state resolves or changes
  useEffect(() => {
    track("page_view");
  }, [track]);

  return (
    <TrackingContext.Provider
      value={{
        consent,
        setConsent,
        activeProduct,
        setActiveProduct,
        activeCampaign: campaign,
        track,
        formSubmitted,
        setFormSubmitted,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
}

export function useTracking() {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error("useTracking must be used within a TrackingProvider");
  }
  return context;
}
