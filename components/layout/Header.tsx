"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Menu, X, ShieldCheck } from "lucide-react";
import { useTracking } from "@/components/tracking/TrackingProvider";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { track } = useTracking();

  const handleNavClick = (sectionName: string) => {
    track("cta_click", { ctaName: `nav_${sectionName.toLowerCase()}` });
    setMobileMenuOpen(false);
  };

  const handleEnquireClick = () => {
    track("cta_click", { ctaName: "header_enquire_now" });
    const target = document.getElementById("lead-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-xs">
      {/* Top Advisory Bar */}
      <div className="bg-[#1e4620] text-stone-100 py-1.5 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col xs:flex-row items-center justify-between gap-1 text-[11px]">
          <div className="flex items-center gap-1.5 text-stone-200 text-center xs:text-left font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span className="truncate">ISO 9001:2015 Certified • FCO Approved Formulations</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+918866603456"
              className="flex items-center gap-1 text-emerald-200 hover:text-white font-semibold transition"
            >
              <Phone className="w-3 h-3 text-emerald-300" />
              <span>Plant Helpline: +91 88666 03456</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Company Name */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 min-w-0"
            onClick={() => handleNavClick("logo")}
          >
            <img
              src="/logo.png"
              alt="Bhagyodaya Industries Logo"
              className="h-9 sm:h-11 w-auto object-contain border border-stone-200 rounded p-0.5 shrink-0 bg-white"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-stone-900 leading-tight truncate">
                Bhagyodaya <span className="text-[#1e4620]">Industries</span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-stone-500 font-medium truncate hidden min-[400px]:block">
                Topferty Organic Manure & Agri Solutions
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7 text-sm font-semibold text-stone-700">
            <a
              href="#products"
              onClick={() => handleNavClick("products")}
              className="hover:text-[#1e4620] transition py-1"
            >
              उत्पादने (Products)
            </a>
            <a
              href="#seasons"
              onClick={() => handleNavClick("seasons")}
              className="hover:text-[#1e4620] transition py-1"
            >
              हंगाम वेळापत्रक (Schedule)
            </a>
            <a
              href="#trust"
              onClick={() => handleNavClick("trust")}
              className="hover:text-[#1e4620] transition py-1"
            >
              गुणवत्ता (Quality &amp; R&amp;D)
            </a>
            <a
              href="#lead-section"
              onClick={() => handleNavClick("contact")}
              className="hover:text-[#1e4620] transition py-1"
            >
              दर विचारा (Enquiry)
            </a>
          </nav>

          {/* Action CTAs Desktop */}
          <div className="hidden lg:flex items-center space-x-3 shrink-0">
            <a
              href="tel:+918866603456"
              className="px-3.5 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 border border-stone-300 rounded hover:bg-stone-50 transition flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#1e4620]" />
              <span>Call Us</span>
            </a>
            <button
              onClick={handleEnquireClick}
              id="header-cta-enquire"
              className="px-5 py-2 rounded font-semibold text-xs text-white bg-[#1e4620] hover:bg-[#153416] transition cursor-pointer shadow-xs"
            >
              Get Price Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={handleEnquireClick}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#1e4620] hover:bg-[#153416] rounded shadow-xs active:scale-95 transition"
            >
              दर विचारा
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-900 border border-stone-200 rounded active:bg-stone-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-3 shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-1 text-sm font-semibold text-stone-800">
            <a
              href="#products"
              onClick={() => handleNavClick("products")}
              className="px-3 py-2.5 hover:bg-stone-50 rounded transition"
            >
              उत्पादने कॅटलॉग (Products Catalog)
            </a>
            <a
              href="#seasons"
              onClick={() => handleNavClick("seasons")}
              className="px-3 py-2.5 hover:bg-stone-50 rounded transition"
            >
              हंगाम वेळापत्रक (Seasonal Schedule)
            </a>
            <a
              href="#trust"
              onClick={() => handleNavClick("trust")}
              className="px-3 py-2.5 hover:bg-stone-50 rounded transition"
            >
              फॅक्टरी व गुणवत्ता (Quality Standards)
            </a>
            <a
              href="#lead-section"
              onClick={() => handleNavClick("contact")}
              className="px-3 py-2.5 hover:bg-stone-50 rounded transition"
            >
              थेट फॅक्टरी दर विचारा (Get Factory Quote)
            </a>
          </nav>
          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <a
              href="tel:+918866603456"
              className="w-full py-2.5 rounded font-semibold text-xs text-center text-stone-800 border border-stone-300 hover:bg-stone-50 flex items-center justify-center gap-1.5 transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#1e4620]" />
              <span>Call Helpline: +91 88666 03456</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleEnquireClick();
              }}
              className="w-full py-2.5 rounded font-semibold text-xs text-center text-white bg-[#1e4620] hover:bg-[#153416] transition shadow-xs"
            >
              Get Factory Price Quote Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
