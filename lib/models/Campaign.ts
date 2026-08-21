import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICampaignDocument extends Document {
  campaignId: string;
  name: string;
  season: string;
  startMonth: number;
  endMonth: number;
  headline: string;
  subheadline: string;
  description: string;
  ctaText: string;
  featuredProductId: string;
  productIds: string[];
  badge: string;
  advisoryText: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CampaignSchema = new Schema<ICampaignDocument>(
  {
    campaignId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    season: { type: String, required: true },
    startMonth: { type: Number, required: true },
    endMonth: { type: Number, required: true },
    headline: { type: String, required: true },
    subheadline: { type: String, required: true },
    description: { type: String, required: true },
    ctaText: { type: String, default: "Get Field-Tested Recommendation" },
    featuredProductId: { type: String, required: true },
    productIds: [{ type: String }],
    badge: { type: String, default: "Active Seasonal Recommendation" },
    advisoryText: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const CampaignModel: Model<ICampaignDocument> =
  mongoose.models.Campaign || mongoose.model<ICampaignDocument>("Campaign", CampaignSchema);
