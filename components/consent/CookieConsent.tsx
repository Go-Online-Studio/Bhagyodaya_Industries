"use client";

import React, { useState, useEffect } from "react";
import { Settings2, Check, X } from "lucide-react";
import { useTracking } from "@/components/tracking/TrackingProvider";
import { CookieSettingsModal } from "./CookieSettingsModal";
import { ConsentPreferences } from "@/types";

export function CookieConsent() {
  const { consent, setConsent } = useTracking();
  const [mounted, setMounted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (consent !== null) {
    return (
      <CookieSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        currentConsent={consent}
        onSave={handleSaveCustom}
      />
    );
  }

  const handleAcceptAll = () => {
    const preferences: ConsentPreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
      version: "v1.0",
    };
    setConsent(preferences);
    logConsent(preferences);
  };

  const handleEssentialOnly = () => {
    const preferences: ConsentPreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
      version: "v1.0",
    };
    setConsent(preferences);
    logConsent(preferences);
  };

  const handleReject = () => {
    const preferences: ConsentPreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
      version: "v1.0",
    };
    setConsent(preferences);
    logConsent(preferences);
  };

  function handleSaveCustom(preferences: ConsentPreferences) {
    setConsent(preferences);
    logConsent(preferences);
  }

  function logConsent(preferences: ConsentPreferences) {
    try {
      fetch("/api/tracking/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "cta_click",
          ctaName: `consent_${preferences.marketing ? "accept_all" : preferences.analytics ? "analytics_only" : "essential_only"}`,
        }),
      }).catch(() => {});
    } catch {
      // Non-blocking
    }
  }

  return (
    <>
      <aside
        aria-label="Cookie consent banner"
        role="region"
        className="fixed bottom-0 inset-x-0 z-40 p-4 bg-white text-stone-900 border-t-2 border-[#659a19] shadow-2xl transition-all"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="max-w-4xl">
            <h4 className="text-xs font-bold text-stone-900 tracking-wide uppercase">
              Privacy & Cookies
            </h4>
            <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
              We use necessary cookies for site function. You may choose to enable analytics and marketing preferences below.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto shrink-0">
            <button
              type="button"
              id="cookie-btn-settings"
              onClick={() => setShowSettings(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 transition"
            >
              <Settings2 className="w-3.5 h-3.5" />
              Settings
            </button>

            <button
              type="button"
              id="cookie-btn-reject"
              onClick={handleReject}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 transition"
            >
              <X className="w-3.5 h-3.5 text-stone-500" />
              Reject Non-Essential
            </button>

            <button
              type="button"
              id="cookie-btn-essential"
              onClick={handleEssentialOnly}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 transition"
            >
              Essential Only
            </button>

            <button
              type="button"
              id="cookie-btn-accept-all"
              onClick={handleAcceptAll}
              className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-bold text-white bg-[#659a19] hover:bg-[#4d7712] border border-[#4d7712] transition"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              Accept All
            </button>
          </div>
        </div>
      </aside>

      <CookieSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        currentConsent={consent}
        onSave={handleSaveCustom}
      />
    </>
  );
}
