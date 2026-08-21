import mongoose, { Schema, Document, Model } from "mongoose";

export interface IConsentEventDocument extends Document {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  version: string;
  ipHash?: string;
  userAgent?: string;
  timestamp: Date;
}

const ConsentEventSchema = new Schema<IConsentEventDocument>(
  {
    essential: { type: Boolean, default: true },
    analytics: { type: Boolean, default: false },
    marketing: { type: Boolean, default: false },
    version: { type: String, default: "v1.0" },
    ipHash: { type: String },
    userAgent: { type: String },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const ConsentEventModel: Model<IConsentEventDocument> =
  mongoose.models.ConsentEvent ||
  mongoose.model<IConsentEventDocument>("ConsentEvent", ConsentEventSchema);
