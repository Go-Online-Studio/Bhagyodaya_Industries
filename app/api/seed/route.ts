import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { CampaignModel } from "@/lib/models/Campaign";
import { DEFAULT_PRODUCTS, DEFAULT_CAMPAIGNS } from "@/lib/default-data";

export async function POST() {
  try {
    const mongooseConn = await connectToDatabase();
    if (!mongooseConn) {
      return NextResponse.json({
        success: true,
        message: "Running in in-memory mode. Default catalog is ready.",
        productCount: DEFAULT_PRODUCTS.length,
        campaignCount: DEFAULT_CAMPAIGNS.length,
      });
    }

    // Seed Products
    for (const prod of DEFAULT_PRODUCTS) {
      await ProductModel.findOneAndUpdate({ id: prod.id }, prod, {
        upsert: true,
        new: true,
      });
    }

    // Seed Campaigns
    for (const camp of DEFAULT_CAMPAIGNS) {
      await CampaignModel.findOneAndUpdate({ campaignId: camp.campaignId }, camp, {
        upsert: true,
        new: true,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Database successfully seeded with fertilizer products and seasonal campaigns.",
      productCount: DEFAULT_PRODUCTS.length,
      campaignCount: DEFAULT_CAMPAIGNS.length,
    });
  } catch (error) {
    console.error("Database seed error:", error);
    return NextResponse.json(
      { success: false, message: "Database seeding failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}
