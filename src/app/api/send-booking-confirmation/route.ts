import { NextRequest, NextResponse } from "next/server";
import { sendBookingEmails } from "@/lib/emails";

// This endpoint is internal-only — called server-to-server.
// It requires the ADMIN_SESSION_TOKEN as a Bearer token to prevent
// external actors from triggering arbitrary booking emails.
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const internalToken = process.env.ADMIN_SESSION_TOKEN;

  if (!internalToken || authHeader !== `Bearer ${internalToken}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, email, phone, service, address, propertyType, date, amountAud } = body;

    if (!name || !email || !service || !address || !amountAud) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    await sendBookingEmails({ name, email, phone, service, address, propertyType, date, amountAud: Number(amountAud) });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    console.error("[send-booking-confirmation]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
