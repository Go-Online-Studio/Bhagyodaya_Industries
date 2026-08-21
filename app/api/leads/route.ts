import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { LeadModel } from "@/lib/models/Lead";
import { leadFormSchema } from "@/lib/validation";
import { getClientIp, hashIpForPrivacy } from "@/lib/ip";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // 1. IP extraction & Privacy Hashing
    const clientIp = getClientIp(request);
    const ipHash = hashIpForPrivacy(clientIp);

    // 2. Rate Limiting Check (5 submissions per 10 minutes per hashed IP)
    const rateLimit = checkRateLimit(ipHash, 5, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many submissions from this connection. Please wait ${rateLimit.resetSeconds} seconds before trying again or call our toll-free farmer desk.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.resetSeconds.toString(),
          },
        }
      );
    }

    // 3. Parse and Validate Payload
    const rawBody = await request.json();

    // Honeypot spam trap
    if (rawBody.honeypot && rawBody.honeypot.trim().length > 0) {
      console.warn("Spam honeypot triggered from IP Hash:", ipHash);
      // Silently accept without saving to mislead bot
      return NextResponse.json({
        success: true,
        message: "Enquiry received successfully",
        leadId: "lead_verified",
      });
    }

    const validationResult = leadFormSchema.safeParse(rawBody);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please correct highlighted fields.",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 4. Sanitize strings
    const sanitizedData = {
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email.trim().toLowerCase(),
      state: data.state.trim(),
      district: data.district.trim(),
      crop: data.crop.trim(),
      productId: data.productId.trim(),
      productName: data.productName.trim(),
      message: (data.message || "").trim(),
      consent: data.consent,
      consentVersion: data.consentVersion || "v1.0",
      pageUrl: data.pageUrl || "",
      referrer: data.referrer || "",
      utmSource: data.utmSource || "",
      utmMedium: data.utmMedium || "",
      utmCampaign: data.utmCampaign || "",
      utmContent: data.utmContent || "",
      utmTerm: data.utmTerm || "",
      ipHash,
    };

    // 5. Connect and Save to MongoDB Atlas (or data/leads.json)
    let leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      const newLead = await LeadModel.create({
        ...sanitizedData,
        status: "new",
      });
      leadId = newLead._id.toString();
    } else {
      // Save directly to local JSON file data/leads.json
      const { saveJsonLead } = await import("@/lib/data-store");
      leadId = await saveJsonLead(sanitizedData);
      console.log("📝 Lead stored to data/leads.json (Local Mode):", leadId, sanitizedData.name);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your agricultural enquiry has been submitted successfully.",
        leadId,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error saving lead in /api/leads:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal error occurred while processing your enquiry.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      const dbLeads = await LeadModel.find().sort({ createdAt: -1 }).limit(100).lean();
      return NextResponse.json({ success: true, source: "mongodb", leads: dbLeads });
    }

    const { getJsonLeads } = await import("@/lib/data-store");
    const jsonLeads = await getJsonLeads();
    return NextResponse.json({ success: true, source: "json", leads: jsonLeads });
  } catch (error) {
    console.error("Error retrieving leads:", error);
    return NextResponse.json({ success: false, message: "Failed to read leads" }, { status: 500 });
  }
}

