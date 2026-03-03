import { NextRequest, NextResponse } from "next/server";
import { sendQuoteEmails } from "@/lib/emails";
import { saveQuote } from "@/lib/quoteStore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, address, propertyType, message, preferredDate } = body;

    if (!name || !email || !phone || !service || !address || !propertyType) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (!email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Persist the quote request to PostgreSQL
    const quote = await saveQuote({ name, email, phone, service, address, propertyType, message, preferredDate });

    // Deep-link into the admin panel for this specific quote
    const origin = req.headers.get("origin") ?? "https://www.everestics.com.au";
    const adminLink = `${origin}/admin/quotes?id=${quote.id}`;

    await sendQuoteEmails({ name, email, phone, service, address, propertyType, message, preferredDate, quoteId: quote.id, adminLink });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    console.error("[send-quote-request]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
