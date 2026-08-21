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
    <div className="md:hidden fixed bottom-0 inset-x-0 z-30 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] bg-white/98 backdrop-blur-md border-t border-stone-200 shadow-2xl flex items-center gap-2">
      <a
        href="tel:+918866603456"
        onClick={() => track("cta_click", { ctaName: "sticky_mobile_call" })}
        className="py-2.5 px-3.5 rounded-lg bg-stone-100 text-stone-900 border border-stone-300 flex items-center justify-center gap-1.5 text-xs font-bold shrink-0 hover:bg-stone-200 active:scale-95 transition min-h-[44px]"
      >
        <PhoneCall className="w-4 h-4 text-[#1e4620]" />
        <span>कॉल करा</span>
      </a>

      <button
        onClick={handleEnquire}
        className="flex-1 py-2.5 px-3 rounded-lg font-bold text-xs uppercase tracking-wider text-white bg-[#1e4620] hover:bg-[#153416] shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition min-h-[44px]"
      >
        <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
        <span>थेट फॅक्टरी दर मिळवा</span>
      </button>
    </div>
  );
}
