import type { Metadata } from "next";
import "./globals.css";
import { TrackingProvider } from "@/components/tracking/TrackingProvider";
import { PixelManager } from "@/components/tracking/PixelManager";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { StickyMobileCta } from "@/components/ui/StickyMobileCta";
import { LeadPopupModal } from "@/components/forms/LeadPopupModal";
import { getActiveCampaign } from "@/lib/campaign-rotation";
import { DEFAULT_PRODUCTS } from "@/lib/default-data";

export const metadata: Metadata = {
  title: "Bhagyodaya Industries | Topferty Organic Manure & Agri Solutions",
  description:
    "ISO 9001:2015 certified organic manure, bio-stimulants, and crop-specific fertilizers manufactured by Bhagyodaya Industries for Cotton, Soyabean, Paddy, Sugarcane, Turmeric, and Onion.",
  keywords: [
    "Bhagyodaya Industries",
    "Topferty",
    "Topferty Cotton Special",
    "Topferty Soyabean Special",
    "Topferty Paddy Special",
    "Topferty Onion Special",
    "A1 Myco Biofertiliser",
    "Hum Up Potassium Humate",
    "Nutriesol Micronutrient Fertilizer",
    "Fast Target Bio Stimulant",
    "Microzyme Crop Plus",
    "Organic Manure Maharashtra Gujarat",
    "FCO Registered Organic Fertilizer",
  ],
  authors: [{ name: "Bhagyodaya Industries Technical Division" }],
  openGraph: {
    title: "Bhagyodaya Industries | Topferty Organic Manure & Agri Solutions",
    description:
      "Boost crop yields and enhance soil organic carbon with ISO 9001:2015 certified Topferty organic manures.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const activeCampaign = getActiveCampaign(new Date());

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#fbfbf9] text-[#1c1917] antialiased flex flex-col selection:bg-[#1e4620] selection:text-white"
      >
        <TrackingProvider campaign={activeCampaign} initialProducts={DEFAULT_PRODUCTS}>
          <PixelManager />
          <div className="flex-1 flex flex-col">{children}</div>
          <CookieConsent />
          <LeadPopupModal availableProducts={DEFAULT_PRODUCTS} />
          <StickyMobileCta />
        </TrackingProvider>
      </body>
    </html>
  );
}