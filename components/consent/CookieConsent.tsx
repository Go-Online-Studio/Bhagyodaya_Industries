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
        className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white/98 backdrop-blur-md text-stone-900 border-t-2 border-[#1e4620] shadow-2xl transition-all"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
          <div className="max-w-3xl">
            <h4 className="text-xs font-bold text-stone-900 tracking-wide uppercase">
              Cookie &amp; Privacy Preferences
            </h4>
            <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
              We use cookies to improve your experience and deliver relevant agricultural advice and factory updates.
            </p>
          </div>

          {/* Buttons: Clean 2-3 button layout on mobile, full on desktop */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto shrink-0">
            <button
              type="button"
              id="cookie-btn-settings"
              onClick={() => setShowSettings(true)}
              className="px-3 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 transition min-h-[38px] rounded flex-1 sm:flex-initial flex items-center justify-center gap-1 cursor-pointer"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Preferences</span>
            </button>

            <button
              type="button"
              id="cookie-btn-reject"
              onClick={handleReject}
              className="px-3 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 transition min-h-[38px] rounded flex-1 sm:flex-initial flex items-center justify-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5 text-stone-500" />
              <span>Reject</span>
            </button>

            <button
              type="button"
              id="cookie-btn-accept-all"
              onClick={handleAcceptAll}
              className="px-4 py-2 text-xs font-bold text-white bg-[#1e4620] hover:bg-[#153416] border border-[#1e4620] transition min-h-[38px] rounded shadow-xs w-full sm:w-auto flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Accept All</span>
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
