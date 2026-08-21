"use client";

import React, { useState, useEffect } from "react";
import { PhoneCall, Send, Sparkles } from "lucide-react";
import { useTracking } from "@/components/tracking/TrackingProvider";

export function StickyMobileCta() {
  const { track, formSubmitted } = useTracking();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible || formSubmitted) return null;

  const handleEnquire = () => {
    track("cta_click", { ctaName: "sticky_mobile_enquire" });
    const target = document.getElementById("lead-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-30 p-2.5 bg-white/95 backdrop-blur-md border-t border-emerald-200 shadow-2xl flex items-center gap-2">
      <a
        href="tel:+918866603456"
        onClick={() => track("cta_click", { ctaName: "sticky_mobile_call" })}
        className="py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center justify-center gap-1.5 text-xs font-bold shrink-0 hover:bg-emerald-100 transition"
      >
        <PhoneCall className="w-4 h-4 text-emerald-700" />
        <span>Call</span>
      </a>

      <button
        onClick={handleEnquire}
        className="flex-1 py-2.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 hover:from-emerald-700 hover:to-green-800 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>Get Crop Advisory</span>
      </button>
    </div>
  );
}
