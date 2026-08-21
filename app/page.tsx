import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SeasonalBanner } from "@/components/sections/SeasonalBanner";
import { HeroSection } from "@/components/sections/HeroSection";
import { TenureSelector } from "@/components/sections/TenureSelector";
import { CropsSpectrum } from "@/components/sections/CropsSpectrum";
import { ProductSlider } from "@/components/sections/ProductSlider";
import { ThreeStepProcess } from "@/components/sections/ThreeStepProcess";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { QuickFaq } from "@/components/sections/QuickFaq";
import { LeadSection } from "@/components/sections/LeadSection";
import { getActiveCampaign } from "@/lib/campaign-rotation";
import { DEFAULT_PRODUCTS } from "@/lib/default-data";

export default function LandingPage() {
  const activeCampaign = getActiveCampaign(new Date());

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SeasonalBanner campaign={activeCampaign} />
      <main className="flex-1">
        <HeroSection campaign={activeCampaign} />
        <TenureSelector initialSeason={activeCampaign.season} />
        <CropsSpectrum />
        <ProductSlider products={DEFAULT_PRODUCTS} />
        <ThreeStepProcess />
        <BenefitsSection />
        <TrustSection />
        <QuickFaq />
        <LeadSection products={DEFAULT_PRODUCTS} campaign={activeCampaign} />
      </main>
      <Footer />
    </div>
  );
}
