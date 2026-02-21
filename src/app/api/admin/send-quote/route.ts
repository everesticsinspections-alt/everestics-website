import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createHmac } from "crypto";
import { sendQuoteOffer } from "@/lib/emails";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get("everestics_admin");
  return session?.value === process.env.ADMIN_SESSION_TOKEN;
}

function b64url(str: string): string {
  return Buffer.from(str).toString("base64url");
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, email, service, amountAud } = await req.json();

  if (!name || !email || !service || !amountAud) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const secret = process.env.ADMIN_SESSION_TOKEN;
  if (!secret) {
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  // Build HMAC-signed token (no database needed)
  const amountCents = Math.round(parseFloat(amountAud) * 100);
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 3600; // 7 days
  const payload = b64url(JSON.stringify({ name, email, service, amountCents, exp }));
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  const token = `${payload}.${sig}`;

  const origin = req.headers.get("origin") ?? req.nextUrl.origin;
  const paymentLink = `${origin}/book?quote=${token}`;

  try {
    await sendQuoteOffer({ name, email, service, amountAud: parseFloat(amountAud), paymentLink });
    return NextResponse.json({ ok: true, paymentLink });
  } catch (err) {
    console.error("send-quote email error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
