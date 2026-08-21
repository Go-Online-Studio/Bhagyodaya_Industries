import { NextRequest, NextResponse } from "next/server";
import { trackingEventSchema } from "@/lib/validation";
import { getClientIp, hashIpForPrivacy } from "@/lib/ip";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const ipHash = hashIpForPrivacy(clientIp);

    // Rate limiter for telemetry spam prevention (120 events per 10 min)
    const rateLimit = checkRateLimit(`tracking_${ipHash}`, 120, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false, message: "Rate limited" }, { status: 429 });
    }

    const body = await request.json();
    const validationResult = trackingEventSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const eventData = validationResult.data;

    // Server-side audit event logging with privacy hashed IP
    if (process.env.NODE_ENV === "development") {
      console.log(`📊 [Analytics Event] ${eventData.event.toUpperCase()}:`, {
        product: eventData.productName || eventData.productId,
        campaign: eventData.campaignSeason,
        cta: eventData.ctaName,
        ipHash,
      });
    }

    return NextResponse.json({
      success: true,
      event: eventData.event,
      recordedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in /api/tracking/events:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
