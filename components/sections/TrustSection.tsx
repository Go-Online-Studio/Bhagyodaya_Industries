"use client";

import React from "react";
import {
  Award,
  FlaskConical,
  Users,
  ShieldCheck,
  MapPin,
  Check,
} from "lucide-react";

export function TrustSection() {
  const stats = [
    { value: "350,000+", label: "Acres Fortified", sub: "Commercial field trials" },
    { value: "ISO 9001", label: "Quality Certified", sub: "2015 Manufacturing standards" },
    { value: "100%", label: "FCO Compliant", sub: "Govt. registered formulations" },
    { value: "+28%", label: "Average Yield Growth", sub: "Documented in harvest trials" },
  ];

  const pillars = [
    {
      icon: FlaskConical,
      title: "Lab Quality Assurance",
      text: "Every batch is tested for organic carbon percentages, nutrient equilibrium, and heavy metal limits to guarantee pure nutrition.",
    },
    {
      icon: Award,
      title: "Certified Manufacturing",
      text: "Manufactured at our dedicated Waghodia, Vadodara industrial plant under ISO 9001:2015 certified quality controls.",
    },
    {
      icon: Users,
      title: "Farmer Advisory Desk",
      text: "Customized crop-stage nutrition calendars and soil-test-based guidance provided directly to growers.",
    },
    {
      icon: ShieldCheck,
      title: "Bio-Active Potency",
      text: "Enriched with active humate complexes and mycorrhizal spores that rapidly revitalize soil microbiological life.",
    },
  ];

  return (
    <section id="trust" className="py-10 sm:py-14 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1e4620]">
            Manufacturing Credibility &amp; Science
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            Trusted by Progressive Growers &amp; Soil Scientists
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Backed by rigorous field trials and certified manufacturing at our Waghodia, Vadodara industrial facility.
          </p>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-8 sm:mb-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-3 sm:p-4 rounded-lg bg-[#fbfbf9] border border-stone-200 text-center flex flex-col items-center justify-center space-y-1"
            >
              <span className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#1e4620]">
                {stat.value}
              </span>
              <span className="text-xs font-bold text-stone-900 leading-tight">
                {stat.label}
              </span>
              <span className="text-[10px] sm:text-[11px] text-stone-500 font-medium">{stat.sub}</span>
            </div>
          ))}
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-lg bg-[#fbfbf9] border border-stone-200 hover:border-[#1e4620] transition flex items-start space-x-3 sm:space-x-3.5"
              >
                <div className="p-2 sm:p-2.5 rounded bg-white text-[#1e4620] border border-stone-200 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-stone-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Farmer Testimonial Quote Banner */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-lg bg-[#1e4620] text-stone-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-5">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Check className="w-3.5 h-3.5" /> Commercial Farmer Field Trial Result
            </div>
            <blockquote className="text-xs sm:text-sm font-medium text-stone-200 italic leading-relaxed">
              &ldquo;Switching to Topferty Cotton Special and Fast Target bio-stimulant increased our cotton boll retention significantly during dry spells. Root growth was deep with excellent soil moisture retention.&rdquo;
            </blockquote>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-300 pt-0.5">
              <span className="text-white font-semibold">Ramesh Patel</span>
              <span>— 80-Acre Cotton &amp; Soyabean Grower</span>
              <span className="flex items-center gap-1 text-emerald-300">
                <MapPin className="w-3 h-3" /> Gujarat &amp; Maharashtra Belt
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto text-left md:text-right">
            <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-white text-[#1e4620] font-bold text-xs uppercase tracking-wide">
              +32% Boll Retention Verified
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
