import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILeadDocument extends Document {
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
  status: "new" | "contacted" | "qualified" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILeadDocument>(
  {
    name: { type: String, trim: true, default: "" },
    phone: { type: String, required: true, index: true },
    email: { type: String, lowercase: true, trim: true, default: "" },
    state: { type: String, default: "" },
    district: { type: String, default: "" },
    crop: { type: String, default: "" },
    productId: { type: String, index: true, default: "topferty-cotton" },
    productName: { type: String, default: "Topferty Cotton Special" },
    message: { type: String, default: "" },
    consent: { type: Boolean, default: true },
    consentVersion: { type: String, default: "v1.0" },
    pageUrl: { type: String },
    referrer: { type: String },
    utmSource: { type: String },
    utmMedium: { type: String },
    utmCampaign: { type: String },
    utmContent: { type: String },
    utmTerm: { type: String },
    ipHash: { type: String },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export const LeadModel: Model<ILeadDocument> =
  mongoose.models.Lead || mongoose.model<ILeadDocument>("Lead", LeadSchema);
