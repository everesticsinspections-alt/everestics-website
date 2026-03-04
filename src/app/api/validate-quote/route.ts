import { NextRequest, NextResponse } from "next/server";
import { getQuoteByShortCode } from "@/lib/quoteStore";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "No reference code provided." }, { status: 400 });
  }

  // Short code format: EVR-XXXXXX
  if (!token.startsWith("EVR-")) {
    return NextResponse.json({ error: "Invalid reference code format." }, { status: 400 });
  }

  const quote = await getQuoteByShortCode(token.toUpperCase());

  if (!quote) {
    return NextResponse.json({ error: "Reference code not found. Please check and try again." }, { status: 404 });
  }

  if (!quote.tokenExpiry || new Date() > quote.tokenExpiry) {
    return NextResponse.json({ error: "This quote has expired. Contact us for a new quote." }, { status: 410 });
  }

  if (!quote.quotedAmountAud) {
    return NextResponse.json({ error: "Quote amount not set. Please contact us." }, { status: 400 });
  }

  return NextResponse.json({
    name: quote.name,
    email: quote.email,
    service: quote.service,
    amountAud: quote.quotedAmountAud,
  });
}
