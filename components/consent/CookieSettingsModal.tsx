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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-stone-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#fbfbf9] text-stone-900 px-5 sm:px-6 py-3.5 flex items-center justify-between border-b border-stone-200 shrink-0">
          <h3 id="cookie-settings-title" className="text-sm sm:text-base font-bold text-stone-900 tracking-tight">
            Cookie &amp; Privacy Preferences
          </h3>
          <button
            onClick={onClose}
            aria-label="Close preferences"
            className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded-md transition cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-3 max-h-[70vh] overflow-y-auto overscroll-contain text-sm text-stone-700">
          <p className="text-xs text-stone-600 leading-relaxed">
            Manage your consent preferences for how information is processed.
          </p>

          {/* Category 1: Essential */}
          <div className="p-3.5 bg-[#fbfbf9] rounded-lg border border-stone-200 flex items-start justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-stone-900">Essential (Strictly Necessary)</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-stone-200 text-stone-700 rounded">
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
              className="mt-1 w-4 h-4 text-[#1e4620] rounded cursor-not-allowed opacity-75 shrink-0"
            />
          </div>

          {/* Category 2: Analytics */}
          <div className="p-3.5 bg-[#fbfbf9] rounded-lg border border-stone-200 flex items-start justify-between gap-4">
            <div className="space-y-0.5">
              <span className="font-bold text-xs text-stone-900">Analytics &amp; Performance</span>
              <p className="text-xs text-stone-500 leading-normal">
                Helps us measure page speed and navigation flow to improve experience.
              </p>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-1 w-4 h-4 text-[#1e4620] border-stone-300 rounded cursor-pointer shrink-0"
            />
          </div>

          {/* Category 3: Marketing */}
          <div className="p-3.5 bg-[#fbfbf9] rounded-lg border border-stone-200 flex items-start justify-between gap-4">
            <div className="space-y-0.5">
              <span className="font-bold text-xs text-stone-900">Marketing &amp; Campaign Conversion</span>
              <p className="text-xs text-stone-500 leading-normal">
                Enables Meta Pixel and Google Ads to measure campaign effectiveness.
              </p>
            </div>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="mt-1 w-4 h-4 text-[#1e4620] border-stone-300 rounded cursor-pointer shrink-0"
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-[#fbfbf9] px-5 sm:px-6 py-3.5 flex items-center justify-end space-x-2.5 border-t border-stone-200 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition cursor-pointer min-h-[38px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveCustom}
            className="inline-flex items-center justify-center gap-1 px-4 py-2 text-xs font-bold text-white bg-[#1e4620] hover:bg-[#153416] border border-[#1e4620] transition rounded shadow-xs cursor-pointer min-h-[38px]"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" /> Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
