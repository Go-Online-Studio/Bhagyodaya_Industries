"use client";

import React from "react";
import { ArrowRight, Leaf } from "lucide-react";
import { useTracking } from "@/components/tracking/TrackingProvider";

const CROPS = [
  {
    name: "Cotton (कापूस)",
    stage: "Squaring & Boll Formation",
    benefit: "Prevents square shedding & maximizes boll weight",
    productId: "topferty-cotton",
  },
  {
    name: "Soyabean (सोयाबीन)",
    stage: "Pod Setting & Grain Filling",
    benefit: "Increases 3-4 seeded pods & grain density",
    productId: "topferty-soyabean",
  },
  {
    name: "Paddy / Rice (भात)",
    stage: "Tillering & Panicle Emergence",
    benefit: "Deep root anchoring & heavy panicle weight",
    productId: "topferty-paddy",
  },
  {
    name: "Banana & Turmeric",
    stage: "Rhizome & Bunch Development",
    benefit: "Uniform finger thickness & rhizome curcumin",
    productId: "topferty-banana-turmeric",
  },
  {
    name: "Sugarcane (ऊस)",
    stage: "Cane Elongation & Internode",
    benefit: "Thicker cane girth & high sucrose brix",
    productId: "topferty-sugarcane",
  },
  {
    name: "Onion & Garlic (कांदा)",
    stage: "Bulb Enlargement",
    benefit: "Solid compactness, uniform color & storability",
    productId: "topferty-onion",
  },
];

export function CropsSpectrum() {
  const { track } = useTracking();

  const handleSelectCrop = (cropName: string) => {
    track("cta_click", { ctaName: `crop_spectrum_${cropName.toLowerCase()}` });
    const target = document.getElementById("lead-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="crops" className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1e4620]">
              Target Crops Matrix
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
              Crop-Specific Formulations
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            Formulations engineered for regional Kharif, Rabi & horticulture
          </span>
        </div>

        {/* 6 Clean Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CROPS.map((crop) => (
            <div
              key={crop.name}
              onClick={() => handleSelectCrop(crop.name)}
              className="p-5 rounded-lg bg-[#fbfbf9] border border-stone-200 hover:border-[#1e4620] transition cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-[#1e4620] transition">
                    {crop.name}
                  </h3>
                  <span className="text-[11px] font-medium text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200">
                    {crop.stage}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {crop.benefit}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs font-semibold text-[#1e4620]">
                <span>Get Dosage Plan</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
