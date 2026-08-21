"use client";

import React from "react";
import {
  Sprout,
  TrendingUp,
  Droplets,
  Layers,
  Sparkles,
  ShieldCheck,
  Check,
} from "lucide-react";

export function BenefitsSection() {
  const benefits = [
    {
      icon: Sprout,
      title: "Better Crop Nutrition",
      description:
        "Bioactive humate complexes ensure nutrients bypass soil lockup and are rapidly absorbed through fine feeder roots.",
      tag: "Uptake Efficiency",
    },
    {
      icon: TrendingUp,
      title: "Vigorous Plant Growth",
      description:
        "Stimulates chlorophyll synthesis, sturdy stalk diameter, and heavy tillering/branching for high-density flowering canopy.",
      tag: "Vegetative Vigor",
    },
    {
      icon: Layers,
      title: "Soil Carbon Regeneration",
      description:
        "Organic compost and bio-stimulants revitalize tired soils, multiplying beneficial microbial colonies and restoring aeration.",
      tag: "Soil Health",
    },
    {
      icon: Sparkles,
      title: "Balanced Trace Minerals",
      description:
        "Scientifically balanced nutrient ratios tailored for critical phonological stages—from sowing to harvest maturity.",
      tag: "Nutrient Balance",
    },
    {
      icon: ShieldCheck,
      title: "Higher Harvest Yields",
      description:
        "Field trials in Maharashtra & Gujarat confirm consistent yield increases, heavier grain weights, and reduced flower dropping.",
      tag: "Harvest Output",
    },
    {
      icon: Droplets,
      title: "Easy Field Application",
      description:
        "Uniform granule size and clean formulation make application effortless as basal dose, top dressing, or broadcasting.",
      tag: "Farmer Friendly",
    },
  ];

  return (
    <section id="benefits" className="py-14 bg-[#fbfbf9] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1e4620]">
            Agronomic Advantages
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            Designed for Soil Health & Crop Productivity
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Our Topferty organic manure portfolio bridges conventional fertilizing with high-efficiency soil biology regeneration.
          </p>
        </div>

        {/* 6 Clean Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-5 rounded-lg bg-white border border-stone-200 hover:border-[#1e4620] transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded bg-[#f4f6f0] text-[#1e4620] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 mb-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-stone-100 flex items-center gap-1 text-xs text-[#1e4620] font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Field Tested & Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
