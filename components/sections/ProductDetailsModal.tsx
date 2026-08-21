"use client";

import React from "react";
import { Product } from "@/types";
import { useTracking } from "@/components/tracking/TrackingProvider";
import {
  X,
  Check,
  FlaskConical,
  Layers,
  Send,
  Package,
} from "lucide-react";

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onEnquire: (product: Product) => void;
}

export function ProductDetailsModal({
  product,
  onClose,
  onEnquire,
}: ProductDetailsModalProps) {
  const { track } = useTracking();

  if (!product) return null;

  const handleEnquire = () => {
    track("cta_click", {
      ctaName: "product_modal_enquire",
      productId: product.id,
      productName: product.name,
    });
    onEnquire(product);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-xl border border-stone-300 overflow-hidden max-h-[90vh] flex flex-col shadow-xl">
        
        {/* Header Ribbon */}
        <div className="bg-[#fbfbf9] text-stone-900 px-6 py-3.5 flex items-center justify-between border-b border-stone-200 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1e4620]">
            {product.category}
          </span>

          <button
            onClick={onClose}
            aria-label="Close product details"
            className="p-1 rounded text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Title, Product Image & ID */}
          <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
            {product.image && (
              <div className="w-36 h-40 shrink-0 bg-[#fbfbf9] rounded border border-stone-200 p-2 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-between gap-2 flex-wrap mb-1">
                <h3 id="product-detail-title" className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                  {product.name}
                </h3>
                <span className="text-xs font-mono font-semibold text-stone-500 bg-[#fbfbf9] px-2 py-0.5 rounded border border-stone-200">
                  {product.id}
                </span>
              </div>
              <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Composition & Dosage Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.composition && (
              <div className="p-3 bg-[#fbfbf9] rounded border border-stone-200">
                <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900 uppercase tracking-wide mb-1">
                  <FlaskConical className="w-3.5 h-3.5 text-[#1e4620]" />
                  <span>Composition</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {product.composition}
                </p>
              </div>
            )}

            {product.dosage && (
              <div className="p-3 bg-[#fbfbf9] rounded border border-stone-200">
                <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900 uppercase tracking-wide mb-1">
                  <Layers className="w-3.5 h-3.5 text-[#1e4620]" />
                  <span>Recommended Dosage</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {product.dosage}
                </p>
              </div>
            )}
          </div>

          {/* Key Benefits */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2">
              Verified Agronomic Benefits
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
              {product.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 p-2.5 rounded bg-[#fbfbf9] border border-stone-200 text-xs text-stone-800"
                >
                  <Check className="w-3.5 h-3.5 text-[#1e4620] shrink-0 mt-0.5" />
                  <span className="leading-snug">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Crops & Packaging */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-200">
            {product.targetCrops && (
              <div>
                <span className="text-xs font-bold text-stone-700 block mb-1">
                  Target Crops:
                </span>
                <div className="flex flex-wrap gap-1">
                  {product.targetCrops.map((crop) => (
                    <span
                      key={crop}
                      className="px-2 py-0.5 rounded bg-[#fbfbf9] border border-stone-200 text-stone-800 text-[11px]"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.packagingSizes && (
              <div>
                <span className="text-xs font-bold text-stone-700 block mb-1 flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-stone-500" /> Available Pack Sizes:
                </span>
                <div className="flex flex-wrap gap-1">
                  {product.packagingSizes.map((size) => (
                    <span
                      key={size}
                      className="px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-800 text-[11px] font-semibold"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Action */}
        <div className="bg-[#fbfbf9] px-6 py-3 flex items-center justify-between border-t border-stone-200 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleEnquire}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded font-semibold text-xs text-white bg-[#1e4620] hover:bg-[#153416] transition cursor-pointer shadow-2xs"
          >
            <Send className="w-3.5 h-3.5" /> Enquire For This Product
          </button>
        </div>

      </div>
    </div>
  );
}
