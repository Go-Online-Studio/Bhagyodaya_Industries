"use client";

import React from "react";
import { Campaign } from "@/types";
import { useTracking } from "@/components/tracking/TrackingProvider";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Leaf,
  Phone,
  CheckCircle,
} from "lucide-react";

interface HeroSectionProps {
  campaign: Campaign;
}

export function HeroSection({ campaign }: HeroSectionProps) {
  const { track } = useTracking();

  const handlePrimaryCta = () => {
    track("cta_click", {
      ctaName: "hero_primary_cta",
    });
    const target = document.getElementById("lead-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSecondaryCta = () => {
    track("cta_click", { ctaName: "hero_browse_products" });
    const target = document.getElementById("products");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white border-b border-stone-200 py-14 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f6f0] border border-stone-200 text-[#1e4620] text-xs font-semibold">
          <Leaf className="w-3.5 h-3.5 text-[#1e4620]" />
          <span>Bhagyodaya Industries • Topferty Organic Nutrition</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
          Certified Organic Manures & Bio-Stimulants for Indian Soils.
        </h1>

        {/* Concise Description */}
        <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
          Manufactured at our Waghodia, Vadodara industrial plant under strict ISO 9001:2015 & FCO standards to restore soil organic carbon and maximize crop harvest yields.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            onClick={handlePrimaryCta}
            id="hero-cta-primary"
            className="w-full sm:w-auto px-7 py-3 rounded font-semibold text-sm text-white bg-[#1e4620] hover:bg-[#153416] transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Request Factory Price Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleSecondaryCta}
            id="hero-cta-secondary"
            className="w-full sm:w-auto px-6 py-3 rounded font-semibold text-sm text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Product Catalog</span>
          </button>
        </div>

        {/* Clean, Grounded Highlights Strip */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-stone-200 text-left">
          <div className="flex items-start gap-2.5 p-3 rounded bg-[#fbfbf9] border border-stone-200">
            <ShieldCheck className="w-4 h-4 text-[#1e4620] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-stone-900 block">ISO 9001:2015 Plant</span>
              <span className="text-[11px] text-stone-500">Waghodia, Vadodara</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded bg-[#fbfbf9] border border-stone-200">
            <CheckCircle className="w-4 h-4 text-[#1e4620] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-stone-900 block">FCO Approved</span>
              <span className="text-[11px] text-stone-500">Government tested quality</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded bg-[#fbfbf9] border border-stone-200">
            <Award className="w-4 h-4 text-[#1e4620] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-stone-900 block">350,000+ Acres</span>
              <span className="text-[11px] text-stone-500">Field tested across crops</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
