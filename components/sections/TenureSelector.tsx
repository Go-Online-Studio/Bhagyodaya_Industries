"use client";

import React, { useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { CampaignSeason } from "@/types";
import { DEFAULT_CAMPAIGNS } from "@/lib/default-data";

interface TenureSelectorProps {
  initialSeason?: CampaignSeason;
}

export function TenureSelector({ initialSeason = "JULY_SEPTEMBER" }: TenureSelectorProps) {
  const [selectedSeason, setSelectedSeason] = useState<CampaignSeason>(initialSeason);
  
  const currentCampaign =
    DEFAULT_CAMPAIGNS.find((c) => c.season === selectedSeason) || DEFAULT_CAMPAIGNS[0];

  const seasons: {
    id: CampaignSeason;
    label: string;
    sub: string;
    cropFocus: string;
    activeNow: boolean;
  }[] = [
    {
      id: "JULY_SEPTEMBER",
      label: "Jul – Sept",
      sub: "Kharif Peak & Monsoon",
      cropFocus: "Cotton, Soyabean & Paddy",
      activeNow: true,
    },
    {
      id: "OCTOBER_DECEMBER",
      label: "Oct – Dec",
      sub: "Rabi Early Sowing",
      cropFocus: "Wheat, Gram & Mustard",
      activeNow: false,
    },
    {
      id: "JANUARY_MARCH",
      label: "Jan – Mar",
      sub: "Winter Resistance",
      cropFocus: "Onion, Sugarcane & Garlic",
      activeNow: false,
    },
    {
      id: "APRIL_JUNE",
      label: "Apr – June",
      sub: "Pre-Kharif Soil Carbon",
      cropFocus: "Banana, Turmeric & Orchard",
      activeNow: false,
    },
  ];

  const handleScrollToForm = () => {
    const target = document.getElementById("lead-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="seasons" className="py-10 bg-[#fbfbf9] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1e4620]">
              Agricultural Tenure System
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
              Select Your Crop Season
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            Active Cycle: <strong className="text-stone-900">July – September (Kharif)</strong>
          </span>
        </div>

        {/* 4 Clean Season Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {seasons.map((s) => {
            const isSelected = selectedSeason === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSeason(s.id)}
                className={`p-4 rounded-lg text-left transition border cursor-pointer ${
                  isSelected
                    ? "bg-white border-[#1e4620] shadow-xs"
                    : "bg-[#f4f6f0] border-stone-200 hover:border-stone-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-stone-900">{s.label}</span>
                  {s.activeNow && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#1e4620] text-white">
                      Active
                    </span>
                  )}
                </div>
                
                <span className="text-xs text-stone-600 block">
                  {s.sub}
                </span>

                <div className="mt-2.5 pt-2 border-t border-stone-200 text-[11px] font-semibold text-[#1e4620]">
                  <span>Focus: {s.cropFocus}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Advisory Box */}
        <div className="mt-4 p-4 rounded-lg bg-white border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <span className="p-1.5 rounded bg-[#f4f6f0] text-[#1e4620] shrink-0 mt-0.5">
              <Calendar className="w-4 h-4" />
            </span>
            <div className="text-xs text-stone-700">
              <strong className="text-stone-900 font-semibold">{currentCampaign.name}: </strong>
              <span>{currentCampaign.advisoryText}</span>
            </div>
          </div>

          <button
            onClick={handleScrollToForm}
            className="text-xs font-semibold text-[#1e4620] hover:underline inline-flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>Request Schedule</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
