import { z } from "zod";

export const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export const leadFormSchema = z.object({
  name: z.string().max(100, { message: "Name is too long" }).optional(),
  phone: z
    .string()
    .min(10, { message: "Please enter a valid 10-digit mobile number" })
    .max(15, { message: "Phone number is too long" })
    .regex(phoneRegex, { message: "Please enter a valid mobile number" }),
  productId: z.string().min(1, { message: "Please select at least one product" }),
  productName: z.string().min(1, { message: "Product name is required" }),
  selectedProductIds: z.array(z.string()).optional(),
  state: z.string().max(100).optional(),
  district: z.string().max(100).optional(),
  // Optional / metadata fields
  email: z.string().optional(),
  crop: z.string().optional(),
  message: z.string().max(1000).optional(),
  consent: z.boolean().optional(),
  consentVersion: z.string().optional(),
  pageUrl: z.string().optional(),
  referrer: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
  honeypot: z.string().max(0, { message: "Spam detected" }).optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export const consentSchema = z.object({
  essential: z.boolean().default(true),
  analytics: z.boolean().default(false),
  marketing: z.boolean().default(false),
  timestamp: z.string().optional(),
  version: z.string().default("v1.0"),
});

export const trackingEventSchema = z.object({
  event: z.enum([
    "page_view",
    "product_view",
    "product_click",
    "cta_click",
    "form_view",
    "form_start",
    "form_submit",
    "lead",
  ]),
  productId: z.string().optional(),
  productName: z.string().optional(),
  productCategory: z.string().optional(),
  campaignId: z.string().optional(),
  campaignSeason: z.string().optional(),
  ctaName: z.string().optional(),
  formType: z.enum(["inline", "popup", "modal"]).optional(),
  leadId: z.string().optional(),
  utmSource: z.string().optional(),
  utmCampaign: z.string().optional(),
  pageUrl: z.string().optional(),
  timestamp: z.string().optional(),
});
