export type ProductCategory =
  | "Organic Manure & Bio-Fertilizer"
  | "Bio-Stimulant Granule"
  | "Water Soluble Fertilizer"
  | "Bio-Fertilizer & Organics"
  | "Micronutrient Complex"
  | "Soil Conditioner & Humic"
  | "Crop Growth Enhancer"
  | "NPK Specialty Blend";

export interface ProductTrackingConfig {
  metaPixelId?: string;
  googleAdsConversionId?: string;
  googleAdsConversionLabel?: string;
  customEventName?: string;
}

export interface Product {
  _id?: string;
  id: string; // e.g. "topferty-cotton"
  name: string;
  slug: string;
  category: ProductCategory;
  image: string;
  description: string;
  benefits: string[];
  composition?: string;
  targetCrops?: string[];
  dosage?: string;
  packagingSizes?: string[];
  active: boolean;
  campaignIds?: string[];
  trackingConfig?: ProductTrackingConfig;
}

export type CampaignSeason =
  | "JULY_SEPTEMBER"
  | "OCTOBER_DECEMBER"
  | "JANUARY_MARCH"
  | "APRIL_JUNE"
  | "JUNE_AUGUST"
  | "SEPTEMBER_NOVEMBER"
  | "DECEMBER_FEBRUARY"
  | "MARCH_MAY";

export interface Campaign {
  _id?: string;
  campaignId: string;
  name: string;
  season: CampaignSeason;
  startMonth: number; // 1-12
  endMonth: number; // 1-12
  headline: string;
  subheadline: string;
  description: string;
  ctaText: string;
  featuredProductId: string;
  productIds: string[];
  badge: string;
  advisoryText: string;
  active: boolean;
}

export interface LeadSubmission {
  name: string;
  phone: string;
  email: string;
  state: string;
  district: string;
  crop: string;
  productId: string;
  productName: string;
  message?: string;
  consent: boolean;
  consentVersion: string;
  pageUrl?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  ipHash?: string;
  honeypot?: string; // Anti-spam trap field
}

export interface ConsentPreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
}

export type TrackingEventType =
  | "page_view"
  | "product_view"
  | "product_click"
  | "cta_click"
  | "form_view"
  | "form_start"
  | "form_submit"
  | "lead";

export interface TrackingPayload {
  event: TrackingEventType;
  productId?: string;
  productName?: string;
  productCategory?: string;
  campaignId?: string;
  campaignSeason?: string;
  ctaName?: string;
  formType?: "inline" | "popup" | "modal";
  leadId?: string;
  utmSource?: string;
  utmCampaign?: string;
  pageUrl?: string;
  timestamp?: string;
}
