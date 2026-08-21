"use client";

import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { ConsentPreferences } from "@/types";

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConsent: ConsentPreferences | null;
  onSave: (preferences: ConsentPreferences) => void;
}

export function CookieSettingsModal({
  isOpen,
  onClose,
  currentConsent,
  onSave,
}: CookieSettingsModalProps) {
  const [analytics, setAnalytics] = useState(currentConsent?.analytics ?? false);
  const [marketing, setMarketing] = useState(currentConsent?.marketing ?? false);

  if (!isOpen) return null;

  const handleSaveCustom = () => {
    onSave({
      essential: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
      version: "v1.0",
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-settings-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn"
    >
      <div className="relative w-full max-w-lg bg-white border-2 border-stone-300 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-stone-50 text-stone-900 px-6 py-3.5 flex items-center justify-between border-b border-stone-200">
          <h3 id="cookie-settings-title" className="text-base font-bold tracking-tight">
            Cookie & Privacy Preferences
          </h3>
          <button
            onClick={onClose}
            aria-label="Close preferences"
            className="p-1 text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3.5 max-h-[70vh] overflow-y-auto text-sm text-stone-700">
          <p className="text-xs text-stone-600 leading-relaxed">
            Manage your consent preferences for how information is processed.
          </p>

          {/* Category 1: Essential */}
          <div className="p-3.5 bg-stone-50 border border-stone-200 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-stone-900">Essential (Strictly Necessary)</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-stone-200 text-stone-700">
                  Active
                </span>
              </div>
              <p className="text-xs text-stone-500 leading-normal">
                Required for core operations, form submissions, and security.
              </p>
            </div>
            <input
              type="checkbox"
              checked={true}
              disabled
              className="mt-1 w-4 h-4 text-[#659a19] rounded-none cursor-not-allowed opacity-75"
            />
          </div>

          {/* Category 2: Analytics */}
          <div className="p-3.5 bg-stone-50 border border-stone-200 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold text-xs text-stone-900">Analytics & Performance</span>
              <p className="text-xs text-stone-500 leading-normal">
                Helps us measure page speed and navigation flow to improve experience.
              </p>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-1 w-4 h-4 text-[#659a19] border-stone-300 rounded-none cursor-pointer"
            />
          </div>

          {/* Category 3: Marketing */}
          <div className="p-3.5 bg-stone-50 border border-stone-200 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold text-xs text-stone-900">Marketing & Campaign Conversion</span>
              <p className="text-xs text-stone-500 leading-normal">
                Enables Meta Pixel and Google Ads to measure campaign effectiveness.
              </p>
            </div>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="mt-1 w-4 h-4 text-[#659a19] border-stone-300 rounded-none cursor-pointer"
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-stone-50 px-6 py-3.5 flex items-center justify-end space-x-2.5 border-t border-stone-200">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveCustom}
            className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-bold text-white bg-[#659a19] hover:bg-[#4d7712] border border-[#4d7712] transition"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" /> Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
