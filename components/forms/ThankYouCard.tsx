"use client";

import React from "react";
import { Check, PhoneCall, ShieldCheck } from "lucide-react";

interface ThankYouCardProps {
  productName?: string;
  leadName?: string;
  onReset?: () => void;
}

export function ThankYouCard({ productName, leadName }: ThankYouCardProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="p-8 text-center bg-white border-2 border-stone-200 animate-fadeIn"
    >
      <div className="w-14 h-14 bg-[#f4f9ed] text-[#659a19] border border-[#d8ecc1] flex items-center justify-center mx-auto mb-4">
        <Check className="w-8 h-8 stroke-[3]" />
      </div>

      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#f4f9ed] border border-[#d8ecc1] text-[#39580d] text-xs font-bold mb-2">
        Enquiry Received
      </div>

      <h3 className="text-2xl font-bold text-stone-900 tracking-tight">
        {leadName ? `Thank You, ${leadName}!` : "Enquiry Received Successfully!"}
      </h3>

      <p className="mt-2 text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
        Our technical officer has received your enquiry for{" "}
        <strong className="text-stone-900">{productName || "Topferty organic products"}</strong>.
        You will receive recommended field dosages and factory pricing shortly.
      </p>

      <div className="mt-6 p-4 bg-stone-50 border border-stone-200 text-left max-w-md mx-auto space-y-2 text-xs text-stone-600">
        <div className="flex items-center gap-2 font-bold text-stone-800">
          <PhoneCall className="w-4 h-4 text-[#659a19]" />
          <span>Customer Care: +91 88666 03456 (Bhagyodaya Plant Desk)</span>
        </div>
        <div className="flex items-center gap-2 text-stone-500">
          <ShieldCheck className="w-4 h-4 text-[#659a19]" />
          <span>Your information is protected under our privacy policy.</span>
        </div>
      </div>
    </div>
  );
}
