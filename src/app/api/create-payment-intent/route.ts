import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// ─── Simple IP-based rate limiter ────────────────────────────────────────────
// Allows up to 5 payment intent creations per IP per 10 minutes.
// Note: on serverless (Vercel), each instance has its own Map. For stricter
// enforcement in production, replace with Upstash Redis.
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count += 1;
  return false;
}

// ─── Stripe initialiser ───────────────────────────────────────────────────────
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured.");
  return new Stripe(key, { apiVersion: "2026-01-28.clover" });
}

// ─── Metadata value sanitiser ─────────────────────────────────────────────────
// Stripe metadata values must be strings ≤ 500 chars.
function meta(value: unknown): string {
  return String(value ?? "").slice(0, 500);
}

export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  try {
    const stripe = getStripe();
    const body = await req.json();
    const { amountAud, service, name, email, phone, address, propertyType, date, shortCode } = body;

    // Validate required fields
    if (!name || !email || !service || !address) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (!String(email).includes("@")) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Validate amount — min $50, max $10,000 AUD
    const amount = Math.round(Number(amountAud) * 100); // convert to cents
    if (!amount || amount < 5000 || amount > 1_000_000) {
      return NextResponse.json(
        { error: "Invalid amount. Must be between $50 and $10,000 AUD." },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "aud",
      automatic_payment_methods: { enabled: true },
      metadata: {
        service:        meta(service),
        name:           meta(name),
        email:          meta(email),
        phone:          meta(phone),
        address:        meta(address),
        property_type:  meta(propertyType),
        preferred_date: meta(date),
        ...(shortCode ? { short_code: meta(shortCode) } : {}),
      },
      description: `Everestics — ${meta(service)}`,
      receipt_email: String(email),
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
