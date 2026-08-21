"use client";

import React from "react";
import { Product, Campaign } from "@/types";
import { LeadForm } from "@/components/forms/LeadForm";
import { PhoneCall, FileSpreadsheet, Award, ShieldCheck } from "lucide-react";

interface LeadSectionProps {
  products: Product[];
  campaign: Campaign;
}

export function LeadSection({ products, campaign }: LeadSectionProps) {
  return (
    <section
      id="lead-section"
      className="py-14 bg-white relative border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Advisory Desk */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#f4f6f0] text-[#1e4620] text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1e4620]" />
              <span>Technical Desk</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-tight">
              Request Your Customized Crop Nutrition & Factory Quote
            </h2>

            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Connect directly with Bhagyodaya Industries fertilizer specialists for custom organic dosages tailored to your farm soil type.
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="p-3.5 rounded-lg bg-[#fbfbf9] border border-stone-200 flex items-start space-x-3">
                <div className="p-2 rounded bg-white text-[#1e4620] border border-stone-200 shrink-0">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    Crop Stage Dosage Schedule
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Clear guidance for basal, tillering, pre-flowering, and final grain filling.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#fbfbf9] border border-stone-200 flex items-start space-x-3">
                <div className="p-2 rounded bg-white text-[#1e4620] border border-stone-200 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    Direct Factory-Gate Rates
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Direct manufacturer pricing for 5kg, 10kg, and 50kg bulk HDPE bags.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#fbfbf9] border border-stone-200 flex items-start space-x-3">
                <div className="p-2 rounded bg-white text-[#1e4620] border border-stone-200 shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    Direct Agronomist Support
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Phone consultation with soil experts to solve yellowing and flower dropping.
                  </p>
                </div>
              </div>
            </div>

            {/* Helpline Box */}
            <div className="p-4 rounded-lg bg-[#1e4620] text-white flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-white text-[#1e4620]">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-emerald-200 block">
                    Plant Helpline & Orders:
                  </span>
                  <span className="text-sm font-bold text-white">
                    +91 88666 03456
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#153416] text-emerald-200 border border-emerald-800">
                Vadodara Plant
              </span>
            </div>
          </div>

          {/* Right Column: Grounded Lead Form */}
          <div className="lg:col-span-7">
            <LeadForm
              formType="inline"
              availableProducts={products}
              title="Request Product Quotation"
              subtitle="Fill in your farm details below for direct manufacturer pricing and agronomic dosage charts."
            />
          </div>

        </div>
      </div>
    </section>
  );
}
