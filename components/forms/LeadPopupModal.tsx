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
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-stone-200 overflow-hidden max-h-[88vh] sm:max-h-[90vh] flex flex-col shadow-2xl">
        {/* Top ribbon */}
        <div className="bg-[#fbfbf9] text-stone-900 px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-stone-200 shrink-0">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1e4620] block">
              {activeCampaign?.name || "Seasonal Crop Support"}
            </span>
            <h3 id="popup-modal-title" className="text-sm sm:text-base font-bold text-stone-900 leading-tight">
              Get Agronomic Dosage &amp; Factory Quote
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200">
              <Clock className="w-3.5 h-3.5 text-[#1e4620]" /> Online
            </span>
            <button
              onClick={handleClose}
              aria-label="Close enquiry popup"
              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded-md transition cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain">
          <LeadForm
            formType="popup"
            availableProducts={availableProducts}
            title={`Field Dosage: ${activeProduct?.name || "Topferty Products"}`}
            subtitle="Connect with certified agronomists for customized soil health and yield recommendations."
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </div>
  );
}
