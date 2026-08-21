import { NextRequest, NextResponse } from "next/server";
import { getActiveCampaign } from "@/lib/campaign-rotation";
import { connectToDatabase } from "@/lib/db";
import { CampaignModel } from "@/lib/models/Campaign";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const overrideSeason = searchParams.get("season");

    const calculatedCampaign = getActiveCampaign(new Date(), overrideSeason);

    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      const dbCampaign = await CampaignModel.findOne({
        season: calculatedCampaign.season,
        active: true,
      }).lean();

      if (dbCampaign) {
        return NextResponse.json({
          success: true,
          campaign: dbCampaign,
          currentMonth: new Date().getMonth() + 1,
        });
      }
    }

    return NextResponse.json({
      success: true,
      campaign: calculatedCampaign,
      currentMonth: new Date().getMonth() + 1,
    });
  } catch (error) {
    console.error("Error in GET /api/campaign:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to resolve active campaign",
        campaign: getActiveCampaign(),
      },
      { status: 500 }
    );
  }
}
