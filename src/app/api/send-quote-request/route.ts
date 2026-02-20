import { NextRequest, NextResponse } from "next/server";
import { sendQuoteEmails } from "@/lib/emails";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, address, propertyType, message, preferredDate } = body;

    // Basic validation
    if (!name || !email || !phone || !service || !address || !propertyType) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (!email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await sendQuoteEmails({ name, email, phone, service, address, propertyType, message, preferredDate });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    console.error("[send-quote-request]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
