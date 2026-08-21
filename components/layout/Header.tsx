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
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200">
      {/* Top Advisory Bar */}
      <div className="bg-[#1e4620] text-stone-100 text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-2 text-[11px] font-medium text-stone-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Bhagyodaya Industries • ISO 9001:2015 Certified • FCO Approved Formulations</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="tel:+918866603456"
              className="flex items-center gap-1.5 text-emerald-200 hover:text-white font-semibold transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Plant Helpline: +91 88666 03456</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Company Name */}
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => handleNavClick("logo")}
          >
            <img
              src="/logo.png"
              alt="Bhagyodaya Industries Logo"
              className="h-11 w-auto object-contain border border-stone-200 rounded"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 leading-tight">
                Bhagyodaya <span className="text-[#1e4620]">Industries</span>
              </span>
              <span className="text-[11px] text-stone-500 font-medium">
                Topferty Organic Manure & Agri Solutions
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-semibold text-stone-700">
            <a
              href="#products"
              onClick={() => handleNavClick("products")}
              className="hover:text-[#1e4620] transition py-1"
            >
              Products
            </a>
            <a
              href="#crops"
              onClick={() => handleNavClick("crops")}
              className="hover:text-[#1e4620] transition py-1"
            >
              Crops
            </a>
            <a
              href="#seasons"
              onClick={() => handleNavClick("seasons")}
              className="hover:text-[#1e4620] transition py-1"
            >
              Seasonal Tenure
            </a>
            <a
              href="#trust"
              onClick={() => handleNavClick("trust")}
              className="hover:text-[#1e4620] transition py-1"
            >
              Quality & R&D
            </a>
            <a
              href="#lead-section"
              onClick={() => handleNavClick("contact")}
              className="hover:text-[#1e4620] transition py-1"
            >
              Farmer Enquiry
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-3">
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
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={handleEnquireClick}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#1e4620] rounded"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-900 border border-stone-200 rounded"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-3 shadow-md">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-stone-800">
            <a
              href="#products"
              onClick={() => handleNavClick("products")}
              className="px-3 py-2 hover:bg-stone-50 rounded"
            >
              Products Catalog
            </a>
            <a
              href="#crops"
              onClick={() => handleNavClick("crops")}
              className="px-3 py-2 hover:bg-stone-50 rounded"
            >
              Target Crops
            </a>
            <a
              href="#seasons"
              onClick={() => handleNavClick("seasons")}
              className="px-3 py-2 hover:bg-stone-50 rounded"
            >
              Seasonal Tenures
            </a>
            <a
              href="#trust"
              onClick={() => handleNavClick("trust")}
              className="px-3 py-2 hover:bg-stone-50 rounded"
            >
              About & Quality Standards
            </a>
            <a
              href="#lead-section"
              onClick={() => handleNavClick("contact")}
              className="px-3 py-2 hover:bg-stone-50 rounded"
            >
              Farmer Advisory Form
            </a>
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleEnquireClick();
              }}
              className="w-full py-2.5 rounded font-semibold text-center text-white bg-[#1e4620]"
            >
              Get Price Quote Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
