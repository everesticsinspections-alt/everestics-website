import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "No token provided." }, { status: 400 });
  }

  const secret = process.env.ADMIN_SESSION_TOKEN;
  if (!secret) {
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  const dotIdx = token.lastIndexOf(".");
  if (dotIdx === -1) {
    return NextResponse.json({ error: "Invalid token format." }, { status: 400 });
  }

  const payload = token.slice(0, dotIdx);
  const sig = token.slice(dotIdx + 1);

  // Verify HMAC signature using constant-time comparison
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  try {
    const sigBuf = Buffer.from(sig, "base64url");
    const expBuf = Buffer.from(expected, "base64url");
    if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
      return NextResponse.json({ error: "Invalid or tampered token." }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid token." }, { status: 401 });
  }

  // Decode payload
  let data: { name: string; email: string; service: string; amountCents: number; exp: number };
  try {
    data = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"));
  } catch {
    return NextResponse.json({ error: "Could not decode token." }, { status: 400 });
  }

  // Check expiry
  if (Math.floor(Date.now() / 1000) > data.exp) {
    return NextResponse.json({ error: "This quote link has expired. Contact us for a new quote." }, { status: 410 });
  }

  return NextResponse.json({
    name: data.name,
    email: data.email,
    service: data.service,
    amountAud: data.amountCents / 100,
  });
}
