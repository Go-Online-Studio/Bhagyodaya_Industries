"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "What is the recommended application dosage per acre?",
    a: "For broadacre cash crops (Cotton, Soyabean, Paddy, Sugarcane), the standard dosage is 50 kg to 100 kg per acre as a basal dose or first top-dressing. For horticulture (Banana, Turmeric, Onion), consult our technical agronomist desk for stage-specific fertigation programs.",
  },
  {
    q: "How fast is factory dispatch to Maharashtra and Gujarat?",
    a: "Direct bulk and distributor orders are dispatched from our Waghodia, Vadodara manufacturing plant within 24 to 48 business hours with complete regional logistics tracking.",
  },
  {
    q: "Are Bhagyodaya products certified under FCO 1985 & ISO 9001:2015?",
    a: "Yes. All Topferty organic manures, bio-stimulants, and micro-nutrient formulations comply with the Fertilizer (Control) Order 1985 and are produced under ISO 9001:2015 certified quality management controls.",
  },
];

export function QuickFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <section className="py-12 bg-[#fbfbf9] border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1e4620]">
            Farmer Questions
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-lg border border-stone-200 bg-white overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-stone-900 font-semibold text-sm hover:bg-stone-50 transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#1e4620] shrink-0" />
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-stone-600 border-t border-stone-100 leading-relaxed bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
