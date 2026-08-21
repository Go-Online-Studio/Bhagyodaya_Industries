"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, Clock } from "lucide-react";
import { useTracking } from "@/components/tracking/TrackingProvider";
import { Product } from "@/types";
import { LeadForm } from "./LeadForm";

interface LeadPopupModalProps {
  availableProducts: Product[];
}

export function LeadPopupModal({ availableProducts }: LeadPopupModalProps) {
  const { formSubmitted, activeProduct, activeCampaign } = useTracking();
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (!formSubmitted) {
      timerRef.current = setTimeout(() => {
        setIsOpen(true);
      }, 30000); // 30s
    }
  }, [formSubmitted]);

  useEffect(() => {
    if (formSubmitted) {
      setIsOpen(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      return;
    }

    startTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [formSubmitted, startTimer]);

  const handleClose = () => {
    setIsOpen(false);
    startTimer();
  };

  const handleSuccess = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 1500);
  };

  if (!isOpen || formSubmitted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn"
    >
      <div className="relative w-full max-w-xl bg-white border-2 border-stone-300 overflow-hidden max-h-[95vh] flex flex-col shadow-2xl">
        {/* Top ribbon */}
        <div className="bg-stone-50 text-stone-900 px-6 py-3 flex items-center justify-between border-b border-stone-200">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4d7712]">
              {activeCampaign?.name || "Seasonal Crop Support"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1 text-[11px] text-stone-600">
              <Clock className="w-3.5 h-3.5 text-[#659a19]" /> Agronomists Online
            </span>
            <button
              onClick={handleClose}
              aria-label="Close enquiry popup"
              className="p-1 text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          <LeadForm
            formType="popup"
            availableProducts={availableProducts}
            title={`Get Field Dosage: ${activeProduct?.name || "Topferty Products"}`}
            subtitle="Connect with certified agronomists for customized soil health and yield recommendations."
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </div>
  );
}
