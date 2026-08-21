import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { DEFAULT_PRODUCTS } from "@/lib/default-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const campaignId = searchParams.get("campaignId");

    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      const query: Record<string, unknown> = { active: true };
      if (category) query.category = category;
      if (campaignId) query.campaignIds = campaignId;

      const dbProducts = await ProductModel.find(query).lean();
      if (dbProducts && dbProducts.length > 0) {
        return NextResponse.json({
          success: true,
          products: dbProducts,
          total: dbProducts.length,
        });
      }
    }

    // Default fallback dataset
    let filtered = DEFAULT_PRODUCTS.filter((p) => p.active);
    if (category) {
      filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    if (campaignId) {
      filtered = filtered.filter((p) => p.campaignIds?.includes(campaignId));
    }

    return NextResponse.json({
      success: true,
      products: filtered,
      total: filtered.length,
    });
  } catch (error) {
    console.error("Error fetching products in /api/products:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve products catalog",
        products: DEFAULT_PRODUCTS,
      },
      { status: 500 }
    );
  }
}
