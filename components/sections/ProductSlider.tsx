"use client";

import React, { useState, useMemo } from "react";
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
  Layers,
  Sparkles,
} from "lucide-react";

interface ProductSliderProps {
  products: Product[];
}

const CATEGORY_TABS = [
  { id: "all", label: "सर्व उत्पादने (All)", filter: () => true },
  {
    id: "topferty",
    label: "टॉपफर्टी विशेष खते (Topferty Specials)",
    filter: (p: Product) => p.category.includes("Organic Manure"),
  },
  {
    id: "bio",
    label: "मायको & बायो-स्टिम्युलंट्स (Bio-Stimulants)",
    filter: (p: Product) =>
      p.category.includes("Bio") || p.category.includes("Humate"),
  },
  {
    id: "micronutrients",
    label: "मायक्रोन्यूट्रियंट्स (Micronutrients)",
    filter: (p: Product) => p.category.includes("Micronutrient"),
  },
];

export function ProductSlider({ products }: ProductSliderProps) {
  const { track, setActiveProduct } = useTracking();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const filteredProducts = useMemo(() => {
    const currentTab = CATEGORY_TABS.find((t) => t.id === activeTab);
    if (!currentTab || currentTab.id === "all") return products;
    return products.filter(currentTab.filter);
  }, [products, activeTab]);

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
    <section id="products" className="py-10 sm:py-16 bg-[#fbfbf9] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#1e4620]/10 text-[#1e4620] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>उत्पादन श्रेणी • Product Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Topferty सेंद्रिय खते व बायो-स्टिम्युलंट्स
            </h2>
            <p className="mt-1.5 text-stone-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
              जमिनीचा सेंद्रिय कर्ब वाढवून पिकाची मुळे मजबूत करणारी आणि विक्रमी उत्पादन देणारी ISO व FCO प्रमाणित उत्पादने.
            </p>
          </div>

          {/* Carousel Buttons */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <button
              id="swiper-prev-btn"
              aria-label="Previous product"
              className="p-2 sm:p-2.5 rounded-lg bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 shadow-2xs transition cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="swiper-next-btn"
              aria-label="Next product"
              className="p-2 sm:p-2.5 rounded-lg bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 shadow-2xs transition cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Farmer-Friendly Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer shrink-0 min-h-[38px] flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#1e4620] text-white shadow-xs"
                    : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-300"
                }`}
              >
                <Layers className="w-3.5 h-3.5 opacity-80" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            key={activeTab}
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: "#swiper-prev-btn",
              nextEl: "#swiper-next-btn",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={14}
            slidesPerView={1}
            breakpoints={{
              540: {
                slidesPerView: 2,
                spaceBetween: 14,
              },
              840: {
                slidesPerView: 2.5,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            className="pb-12 !overflow-visible"
          >
            {filteredProducts.map((product) => (
              <SwiperSlide key={product.id} className="h-auto">
                <div
                  onClick={() => handleProductCardClick(product)}
                  className="h-full flex flex-col justify-between rounded-xl bg-white border border-stone-200 hover:border-[#1e4620] shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer group"
                >
                  {/* Category & Pack Size Badge */}
                  <div className="p-3.5 pb-2.5 border-b border-stone-100">
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <span className="text-[11px] font-bold text-[#1e4620] uppercase tracking-wider truncate">
                        {product.category}
                      </span>
                      <span className="text-[11px] font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200 shrink-0">
                        {product.packagingSizes?.[0] || "50 Kg Bag"}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-[#1e4620] transition line-clamp-2 min-h-[2.5rem] leading-snug">
                      {product.name}
                    </h3>
                  </div>

                  {/* Product Image Frame */}
                  <div className="p-3 sm:p-4 bg-[#fbfbf9] border-b border-stone-100 flex items-center justify-center h-44 sm:h-52 relative">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <Package className="w-12 h-12 text-stone-400" />
                    )}

                    {/* Sowing / Dose Tag */}
                    {product.dosage && (
                      <div className="absolute bottom-2 left-2 right-2 bg-stone-900/85 backdrop-blur-xs text-white text-[10px] sm:text-[11px] px-2 py-1 rounded truncate">
                        <span className="font-semibold text-emerald-300">मात्रा: </span>
                        {product.dosage.split("|")[0]}
                      </div>
                    )}
                  </div>

                  {/* Description & 2 Key Benefits */}
                  <div className="p-3.5 space-y-2.5 flex-1">
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      {product.benefits.slice(0, 2).map((benefit, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-1.5 text-xs text-stone-800"
                        >
                          <Check className="w-3.5 h-3.5 text-[#1e4620] shrink-0 mt-0.5 font-bold" />
                          <span className="line-clamp-1 font-medium">{benefit}</span>
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
                      className="px-3 py-2.5 rounded-lg text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 transition flex items-center justify-center gap-1 cursor-pointer min-h-[40px] active:scale-95"
                    >
                      <Info className="w-3.5 h-3.5 text-stone-500" />
                      <span>माहिती</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleEnquireClick(product, e)}
                      className="flex-1 py-2.5 rounded-lg text-xs font-bold text-white bg-[#1e4620] hover:bg-[#153416] transition flex items-center justify-center gap-1 cursor-pointer shadow-xs min-h-[40px] active:scale-95"
                    >
                      <span>थेट फॅक्टरी दर मिळवा</span>
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
