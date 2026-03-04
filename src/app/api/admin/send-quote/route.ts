import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { sendQuoteOffer } from "@/lib/emails";
import { saveQuoteOffer } from "@/lib/quoteStore";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get("everestics_admin");
  return session?.value === process.env.ADMIN_SESSION_TOKEN;
}

/** Generates a human-readable 10-char reference code, e.g. "EVR-AB12CD" */
function generateShortCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I/O/0/1 to avoid confusion
  let code = "EVR-";
  const bytes = randomBytes(6);
  for (let i = 0; i < 6; i++) {
    code += chars[bytes[i] % chars.length];
  }
  return code;
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, email, service, amountAud, quoteId } = await req.json();

  if (!name || !email || !service || !amountAud) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const shortCode = generateShortCode();
  const tokenExpiry = new Date(Date.now() + 7 * 24 * 3600 * 1000); // 7 days from now

  const origin = req.headers.get("origin") ?? req.nextUrl.origin;
  const paymentLink = `${origin}/book?quote=${shortCode}`;

  try {
    await sendQuoteOffer({ name, email, service, amountAud: parseFloat(amountAud), paymentLink });
    if (quoteId) {
      await saveQuoteOffer(quoteId, shortCode, parseFloat(amountAud), tokenExpiry);
    }
    return NextResponse.json({ ok: true, paymentLink });
  } catch (err) {
    console.error("send-quote email error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
