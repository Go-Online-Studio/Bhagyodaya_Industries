"use client";

import React from "react";
import { Check } from "lucide-react";

export function ThreeStepProcess() {
  const steps = [
    {
      num: "1",
      title: "Soil & Root Activation",
      timing: "Sowing / Basal Application",
      desc: "Topferty organic carbon and bio-humates condition the soil and initiate early feeder root development.",
    },
    {
      num: "2",
      title: "Vegetative Growth & Canopy",
      timing: "20 - 45 Days After Sowing",
      desc: "Stimulates chlorophyll synthesis, sturdy stalk growth, and heavy branching/tillering.",
    },
    {
      num: "3",
      title: "Yield & Boll Retention",
      timing: "Flowering to Harvest",
      desc: "Prevents square & flower dropping, maximizes boll weight, grain test weight, and crop uniformity.",
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1e4620]">
            Application Protocol
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
            3-Step Crop Nutrition Program
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-5 rounded-lg bg-[#fbfbf9] border border-stone-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded bg-[#1e4620] text-white font-bold text-sm flex items-center justify-center">
                    {step.num}
                  </span>
                  <span className="text-[11px] font-medium text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200">
                    {step.timing}
                  </span>
                </div>

                <h3 className="text-base font-bold text-stone-900 mb-1.5">
                  {step.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-stone-200 flex items-center gap-1.5 text-xs text-[#1e4620] font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>Field Verified Application</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
