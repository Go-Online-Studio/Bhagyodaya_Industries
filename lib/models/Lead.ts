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
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, index: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    crop: { type: String, required: true },
    productId: { type: String, required: true, index: true },
    productName: { type: String, required: true },
    message: { type: String, default: "" },
    consent: { type: Boolean, required: true },
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
