"use client";

import React, { useState, useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema, LeadFormData } from "@/lib/validation";
import { useTracking } from "@/components/tracking/TrackingProvider";
import { Product } from "@/types";
import { getStoredUtmParameters } from "@/lib/utm";
import { ThankYouCard } from "./ThankYouCard";
import {
  Send,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Check,
} from "lucide-react";

interface LeadFormProps {
  formType?: "inline" | "popup" | "modal";
  availableProducts?: Product[];
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
}

const COMMON_CROPS = [
  "Cotton (कापूस)",
  "Soyabean (सोयाबीन)",
  "Paddy / Rice (भात)",
  "Sugarcane (ऊस)",
  "Banana & Turmeric (केळी आणि हळद)",
  "Onion & Garlic (कांदा आणि लसूण)",
  "Wheat & Grains",
  "Pomegranate & Grapes",
  "Chili & Vegetables",
  "Other Horticultural Crop",
];

export function LeadForm({
  formType = "inline",
  availableProducts = [],
  onSuccess,
  title,
  subtitle,
}: LeadFormProps) {
  const { activeProduct, track, setFormSubmitted, formSubmitted } = useTracking();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedLead, setSubmittedLead] = useState<{ name: string; productName: string } | null>(
    null
  );
  const [formStarted, setFormStarted] = useState(false);

  // Generate unique IDs for accessibility
  const idPrefix = useId();
  const nameId = `${idPrefix}-name`;
  const phoneId = `${idPrefix}-phone`;
  const stateId = `${idPrefix}-state`;
  const districtId = `${idPrefix}-district`;
  const productId = `${idPrefix}-product`;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      state: "",
      district: "",
      productId: activeProduct?.id || (availableProducts[0]?.id ?? "topferty-cotton"),
      productName: activeProduct?.name || (availableProducts[0]?.name ?? "Topferty Cotton Special"),
      consent: true,
      consentVersion: "v1.0",
      honeypot: "",
    },
  });

  const watchedProductId = watch("productId");

  useEffect(() => {
    if (activeProduct) {
      setValue("productId", activeProduct.id);
      setValue("productName", activeProduct.name);
    }
  }, [activeProduct, setValue]);

  useEffect(() => {
    const matched = availableProducts.find((p) => p.id === watchedProductId);
    if (matched) {
      setValue("productName", matched.name);
    }
  }, [watchedProductId, availableProducts, setValue]);

  useEffect(() => {
    track("form_view", {
      formType,
      productId: activeProduct?.id,
      productName: activeProduct?.name,
    });
  }, [formType, track, activeProduct]);

  const handleFieldFocus = () => {
    if (!formStarted) {
      setFormStarted(true);
      track("form_start", {
        formType,
        productId: activeProduct?.id,
        productName: activeProduct?.name,
      });
    }
  };

  const onSubmit = async (data: LeadFormData) => {
    setSubmitting(true);
    setServerError(null);

    track("form_submit", {
      formType,
      productId: data.productId,
      productName: data.productName,
    });

    try {
      const utms = getStoredUtmParameters();
      const payload = {
        ...data,
        ...utms,
        pageUrl: window.location.href,
        referrer: document.referrer,
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to submit enquiry. Please try again.");
      }

      setFormSubmitted(true);
      setSubmittedLead({ name: data.name || "Valued Farmer", productName: data.productName || "Product" });

      // Trigger Meta Pixel & Google Analytics Lead Event
      track("lead", {
        productId: data.productId,
        productName: data.productName,
        leadId: json.leadId,
      });

      // Direct Meta Pixel backup dispatch if window.fbq exists
      if (typeof window !== "undefined" && window.fbq) {
        try {
          window.fbq("track", "Lead", {
            content_name: data.productName,
            content_category: "Fertilizer",
            value: 0,
            currency: "INR",
          });
        } catch {
          // Ignored
        }
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("An unexpected error occurred. Please contact customer care.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (formSubmitted && submittedLead) {
    return (
      <ThankYouCard
        leadName={submittedLead.name}
        productName={submittedLead.productName}
      />
    );
  }

  const isPopup = formType === "popup" || formType === "modal";

  return (
    <div className={isPopup ? "w-full" : "bg-[#fbfbf9] rounded-xl p-4 sm:p-7 border border-stone-200 shadow-xs"}>
      {/* Header */}
      {!isPopup && (
        <div className="mb-4 sm:mb-5 pb-3 border-b border-stone-200">
          <h3 className="text-lg sm:text-xl font-bold text-stone-900">
            {title || "Request Product Quotation"}
          </h3>
          <p className="mt-0.5 text-xs text-stone-500">
            {subtitle || "Enter your contact details below for direct manufacturer pricing."}
          </p>
        </div>
      )}

      {serverError && (
        <div
          role="alert"
          className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} onFocus={handleFieldFocus} className="space-y-3.5">
        {/* Anti-spam honeypot */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          {...register("honeypot")}
        />

        {/* Row 1: Name & Mobile Number (Required) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
          <div>
            <label htmlFor={nameId} className="block text-xs font-semibold text-stone-700 mb-1">
              Full Name <span className="text-stone-400 font-normal">(Optional)</span>
            </label>
            <input
              id={nameId}
              type="text"
              placeholder="e.g. Ramesh Patel"
              className={`w-full px-3 py-2.5 text-base sm:text-sm rounded bg-white border ${
                errors.name ? "border-rose-400 bg-rose-50/50" : "border-stone-300"
              } focus:border-[#1e4620] focus:outline-none transition min-h-[42px]`}
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor={phoneId} className="block text-xs font-semibold text-stone-700 mb-1">
              Mobile Number <span className="text-[#1e4620] font-bold">*</span>
            </label>
            <input
              id={phoneId}
              type="tel"
              placeholder="e.g. 9876543210"
              className={`w-full px-3 py-2.5 text-base sm:text-sm rounded bg-white border ${
                errors.phone ? "border-rose-400 bg-rose-50/50" : "border-stone-300"
              } focus:border-[#1e4620] focus:outline-none transition min-h-[42px]`}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-rose-600">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Row 2: Product Required */}
        <div>
          <label htmlFor={productId} className="block text-xs font-semibold text-stone-700 mb-1">
            Product Required
          </label>
          <select
            id={productId}
            className={`w-full px-3 py-2.5 text-base sm:text-sm rounded bg-white border ${
              errors.productId ? "border-rose-400 bg-rose-50/50" : "border-stone-300"
            } focus:border-[#1e4620] focus:outline-none transition min-h-[42px]`}
            {...register("productId")}
          >
            {availableProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.category})
              </option>
            ))}
          </select>
          {errors.productId && (
            <p className="mt-1 text-xs text-rose-600">{errors.productId.message}</p>
          )}

          {/* Active Product Thumbnail Helper */}
          {(() => {
            const selectedProd =
              availableProducts.find((p) => p.id === watchedProductId) || availableProducts[0];
            if (selectedProd?.image) {
              return (
                <div className="mt-2 p-2 rounded bg-white border border-stone-200 flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded bg-[#fbfbf9] p-0.5 border border-stone-200 shrink-0 flex items-center justify-center">
                    <img
                      src={selectedProd.image}
                      alt={selectedProd.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="text-xs min-w-0">
                    <span className="font-semibold text-stone-900 block truncate">
                      {selectedProd.name}
                    </span>
                    <span className="text-stone-500 text-[11px] truncate block">
                      {selectedProd.category} • {selectedProd.packagingSizes?.[0] || "50.00 Kg Bag"}
                    </span>
                  </div>
                </div>
              );
            }
            return null;
          })()}
        </div>

        {/* Row 3: State & District */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
          <div>
            <label htmlFor={stateId} className="block text-xs font-semibold text-stone-700 mb-1">
              State <span className="text-stone-400 font-normal">(Optional)</span>
            </label>
            <input
              id={stateId}
              type="text"
              placeholder="e.g. Maharashtra / Gujarat"
              className={`w-full px-3 py-2.5 text-base sm:text-sm rounded bg-white border ${
                errors.state ? "border-rose-400 bg-rose-50/50" : "border-stone-300"
              } focus:border-[#1e4620] focus:outline-none transition min-h-[42px]`}
              {...register("state")}
            />
            {errors.state && (
              <p className="mt-1 text-xs text-rose-600">{errors.state.message}</p>
            )}
          </div>

          <div>
            <label htmlFor={districtId} className="block text-xs font-semibold text-stone-700 mb-1">
              District <span className="text-stone-400 font-normal">(Optional)</span>
            </label>
            <input
              id={districtId}
              type="text"
              placeholder="e.g. Nagpur / Vadodara"
              className={`w-full px-3 py-2.5 text-base sm:text-sm rounded bg-white border ${
                errors.district ? "border-rose-400 bg-rose-50/50" : "border-stone-300"
              } focus:border-[#1e4620] focus:outline-none transition min-h-[42px]`}
              {...register("district")}
            />
            {errors.district && (
              <p className="mt-1 text-xs text-rose-600">{errors.district.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 px-6 rounded font-semibold text-sm text-white bg-[#1e4620] hover:bg-[#153416] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed shadow-xs min-h-[48px] active:scale-[0.99]"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Submitting Enquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-white" />
              <span>Get Factory Price Quote</span>
            </>
          )}
        </button>

        {/* Trust Footnote */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] text-stone-500 pt-1 border-t border-stone-200 text-center">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1e4620] shrink-0" /> Direct Factory Support
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-[#1e4620] shrink-0" /> ISO 9001:2015 Certified
          </span>
        </div>
      </form>
    </div>
  );
}
