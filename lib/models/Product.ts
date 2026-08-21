import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProductDocument extends Document {
  id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  benefits: string[];
  composition?: string;
  targetCrops?: string[];
  dosage?: string;
  packagingSizes?: string[];
  active: boolean;
  campaignIds?: string[];
  trackingConfig?: {
    metaPixelId?: string;
    googleAdsConversionId?: string;
    googleAdsConversionLabel?: string;
    customEventName?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProductDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    benefits: [{ type: String }],
    composition: { type: String },
    targetCrops: [{ type: String }],
    dosage: { type: String },
    packagingSizes: [{ type: String }],
    active: { type: Boolean, default: true },
    campaignIds: [{ type: String }],
    trackingConfig: {
      metaPixelId: { type: String },
      googleAdsConversionId: { type: String },
      googleAdsConversionLabel: { type: String },
      customEventName: { type: String },
    },
  },
  { timestamps: true }
);

export const ProductModel: Model<IProductDocument> =
  mongoose.models.Product || mongoose.model<IProductDocument>("Product", ProductSchema);
