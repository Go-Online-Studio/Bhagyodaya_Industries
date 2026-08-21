"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Product } from "@/types";
import { useTracking } from "@/components/tracking/TrackingProvider";
import { ProductDetailsModal } from "./ProductDetailsModal";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Info,
  Package,
} from "lucide-react";

interface ProductSliderProps {
  products: Product[];
}

export function ProductSlider({ products }: ProductSliderProps) {
  const { track, setActiveProduct } = useTracking();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductCardClick = (product: Product) => {
    setActiveProduct(product);
    setSelectedProduct(product);
    track("product_click", {
      productId: product.id,
      productName: product.name,
      productCategory: product.category,
    });
  };

  const handleEnquireClick = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveProduct(product);
    track("cta_click", {
      ctaName: "product_card_enquire",
      productId: product.id,
      productName: product.name,
    });
    const target = document.getElementById("lead-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="products" className="py-10 sm:py-14 bg-[#fbfbf9] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1e4620]">
              Product Lineup
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
              Topferty Organic &amp; Bio-Nutrients
            </h2>
            <p className="mt-1 text-stone-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
              High bioactive carbon and chelated nutrient compounds formulated for rapid plant uptake and soil vitality.
            </p>
          </div>

          {/* Carousel Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              id="swiper-prev-btn"
              aria-label="Previous product"
              className="p-2 sm:p-2.5 rounded bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 shadow-2xs transition cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="swiper-next-btn"
              aria-label="Next product"
              className="p-2 sm:p-2.5 rounded bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 shadow-2xs transition cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: "#swiper-prev-btn",
              nextEl: "#swiper-next-btn",
            }}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            className="pb-10 !overflow-visible"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="h-auto">
                <div
                  onClick={() => handleProductCardClick(product)}
                  className="h-full flex flex-col justify-between rounded-lg bg-white border border-stone-200 hover:border-[#1e4620] shadow-2xs transition duration-200 overflow-hidden cursor-pointer group"
                >
                  {/* Category & ID */}
                  <div className="p-4 pb-2 border-b border-stone-100">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#1e4620] truncate">
                        {product.category}
                      </span>
                      <span className="text-[11px] font-medium text-stone-500 shrink-0">
                        {product.packagingSizes?.[0] || "50.00 Kg Bag"}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 group-hover:text-[#1e4620] transition line-clamp-1">
                      {product.name}
                    </h3>
                  </div>

                  {/* Product Image Frame */}
                  <div className="p-4 bg-[#fbfbf9] border-b border-stone-100 flex items-center justify-center h-40 sm:h-48">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <Package className="w-12 h-12 text-stone-400" />
                    )}
                  </div>

                  {/* Description & 2 Key Benefits */}
                  <div className="p-4 space-y-2.5 flex-1">
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="space-y-1 pt-1">
                      {product.benefits.slice(0, 2).map((benefit, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-1.5 text-xs text-stone-700"
                        >
                          <Check className="w-3.5 h-3.5 text-[#1e4620] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="p-3 bg-[#fbfbf9] border-t border-stone-200 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductCardClick(product);
                      }}
                      className="flex-1 py-2.5 rounded text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 transition flex items-center justify-center gap-1 cursor-pointer min-h-[38px] active:scale-95"
                    >
                      <Info className="w-3.5 h-3.5 text-stone-500" />
                      <span>Details</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleEnquireClick(product, e)}
                      className="flex-1 py-2.5 rounded text-xs font-semibold text-white bg-[#1e4620] hover:bg-[#153416] transition flex items-center justify-center gap-1 cursor-pointer shadow-2xs min-h-[38px] active:scale-95"
                    >
                      <span>Enquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onEnquire={(p) => {
          const target = document.getElementById("lead-section");
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />
    </section>
  );
}
