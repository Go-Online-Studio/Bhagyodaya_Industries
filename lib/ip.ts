import { NextRequest } from "next/server";
import crypto from "crypto";

/**
 * Extracts client IP from Next.js server request with fallbacks across common proxy headers.
 */
export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ips = forwardedFor.split(",").map((ip) => ip.trim());
    if (ips[0]) return ips[0];
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  return "127.0.0.1";
}

/**
 * Creates a one-way pseudorandom SHA-256 hash with an application secret salt for privacy-compliant rate limiting and anti-spam audit.
 * Raw IP is never stored directly or exposed to client-side pixels.
 */
export function hashIpForPrivacy(ip: string): string {
  const salt = process.env.IP_PRIVACY_SALT || "agri-secure-lead-salt-2026";
  return crypto.createHash("sha256").update(`${ip}:${salt}`).digest("hex").substring(0, 24);
}
