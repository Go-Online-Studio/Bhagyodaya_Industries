"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Award, Cookie, ShieldCheck, Heart } from "lucide-react";
import { CookieSettingsModal } from "@/components/consent/CookieSettingsModal";
import { useTracking } from "@/components/tracking/TrackingProvider";

export function Footer() {
  const [showCookieModal, setShowCookieModal] = useState(false);
  const { consent, setConsent } = useTracking();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Bhagyodaya Industries"
                className="h-12 w-auto object-contain rounded-xl border border-emerald-500/40 shadow-xs bg-white p-1"
              />
              <div>
                <span className="text-xl font-black text-white tracking-tight block">
                  Bhagyodaya <span className="text-emerald-400">Industries</span>
                </span>
                <span className="text-[11px] text-slate-400 font-semibold tracking-wide">
                  Topferty Organic Manure & Bio-Stimulants
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering progressive farmers with ISO 9001:2015 certified organic manures and FCO-registered bio-stimulants for maximum harvest yields and sustainable soil health.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 flex items-center gap-1.5 text-xs font-bold">
                <Award className="w-3.5 h-3.5 text-amber-400" /> ISO 9001:2015
              </div>
              <div className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 flex items-center gap-1.5 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> FCO 1985 Standard
              </div>
            </div>
          </div>

          {/* Col 3: Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <a href="#products" className="hover:text-emerald-300 transition">
                  Topferty Cotton Special (कापूस)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-emerald-300 transition">
                  Topferty Soyabean Special (सोयाबीन)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-emerald-300 transition">
                  Topferty Paddy Special (भात)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-emerald-300 transition">
                  Topferty Banana & Turmeric
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-emerald-300 transition">
                  Fast Target Granule
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-emerald-300 transition">
                  Microzyme Crop+ Seaweed
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Seasonal Tenures */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
              Seasonal Tenures
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <a href="#seasons" className="hover:text-amber-300 transition">
                  July – Sept (Kharif Peak)
                </a>
              </li>
              <li>
                <a href="#seasons" className="hover:text-amber-300 transition">
                  Oct – Dec (Rabi Early Sowing)
                </a>
              </li>
              <li>
                <a href="#seasons" className="hover:text-amber-300 transition">
                  Jan – Mar (Winter Frost Defense)
                </a>
              </li>
              <li>
                <a href="#seasons" className="hover:text-amber-300 transition">
                  Apr – June (Pre-Kharif Basal)
                </a>
              </li>
              <li>
                <a href="#lead-section" className="hover:text-amber-300 transition">
                  Soil Carbon Correction
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Desk */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400">
              Manufacturer Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <p className="flex items-center gap-2 text-white font-bold">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 88666 03456</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>info@bhagyodaya.co.in</span>
              </p>
              <p className="flex items-start gap-2 text-xs text-slate-400">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>344, G.I.D.C Waghodia, Dist. Vadodara, Gujarat - 391760</span>
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                Marketed in Maharashtra by: <strong className="text-slate-300">Bhagyodaya Trading Company</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Bhagyodaya Industries. All rights reserved. ISO 9001:2015 Certified.</p>
          <div className="flex items-center space-x-4 font-medium">
            <button
              onClick={() => setShowCookieModal(true)}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition cursor-pointer"
            >
              <Cookie className="w-3.5 h-3.5 text-emerald-400" /> Cookie Preferences
            </button>
            <span>•</span>
            <a href="#lead-section" className="hover:text-emerald-300 transition">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#lead-section" className="hover:text-emerald-300 transition">
              Terms of Supply
            </a>
          </div>
        </div>
      </div>

      <CookieSettingsModal
        isOpen={showCookieModal}
        onClose={() => setShowCookieModal(false)}
        currentConsent={consent}
        onSave={(newConsent) => setConsent(newConsent)}
      />
    </footer>
  );
}
