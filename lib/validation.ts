import { z } from "zod";

export const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(100, { message: "Name is too long" })
    .regex(/^[a-zA-Z\s.'-]+$/, { message: "Name contains invalid characters" }),
  phone: z
    .string()
    .min(10, { message: "Please enter a valid phone number (min 10 digits)" })
    .max(15, { message: "Phone number is too long" })
    .regex(phoneRegex, { message: "Please enter a valid phone number" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  state: z
    .string()
    .min(2, { message: "Please enter your state/province" }),
  district: z
    .string()
    .min(2, { message: "Please enter your district/region" }),
  crop: z
    .string()
    .min(2, { message: "Please select or specify your primary crop" }),
  productId: z
    .string()
    .min(1, { message: "Please select a product of interest" }),
  productName: z
    .string()
    .min(1, { message: "Product name is required" }),
  message: z
    .string()
    .max(1000, { message: "Message cannot exceed 1000 characters" })
    .optional(),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the terms to request product guidance",
    }),
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
