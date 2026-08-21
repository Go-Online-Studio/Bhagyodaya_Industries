"use client";

import React from "react";
import { Campaign } from "@/types";
import { ArrowRight, Calendar } from "lucide-react";
import { useTracking } from "@/components/tracking/TrackingProvider";

export function SeasonalBanner({ campaign }: { campaign: Campaign }) {
  const { track } = useTracking();

  const handleBannerAction = () => {
    track("cta_click", { ctaName: `seasonal_banner_${campaign.campaignId}` });
    const target = document.getElementById("lead-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section aria-label="Seasonal crop advisory banner" className="bg-[#f4f6f0] border-b border-stone-200 text-stone-900 py-2.5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#1e4620] text-white font-bold text-[11px] uppercase tracking-wider shrink-0">
            <Calendar className="w-3 h-3" />
            {campaign.badge}
          </span>
          <p className="text-stone-700 leading-snug">
            <strong className="text-stone-900 font-semibold">{campaign.name}:</strong>{" "}
            {campaign.advisoryText}
          </p>
        </div>

        <button
          onClick={handleBannerAction}
          className="inline-flex items-center gap-1 font-semibold text-[#1e4620] hover:underline shrink-0 cursor-pointer"
        >
          <span>Get Dosage Schedule</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </section>
  );
}
