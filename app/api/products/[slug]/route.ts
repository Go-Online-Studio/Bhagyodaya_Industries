import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { DEFAULT_PRODUCTS } from "@/lib/default-data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      const dbProduct = await ProductModel.findOne({ slug, active: true }).lean();
      if (dbProduct) {
        return NextResponse.json({
          success: true,
          product: dbProduct,
        });
      }
    }

    const matched = DEFAULT_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
    if (!matched) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product: matched,
    });
  } catch (error) {
    console.error("Error in GET /api/products/[slug]:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
