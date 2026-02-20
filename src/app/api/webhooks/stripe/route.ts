import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendBookingEmails } from "@/lib/emails";

// Stripe requires the raw body to verify the webhook signature.
// Next.js App Router gives us access to the raw body via req.text().
export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return NextResponse.json({ error: "Stripe not configured." }, { status: 500 });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2026-01-28.clover" });

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook signature verification failed.";
    console.error("[stripe-webhook] Signature error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // Handle payment_intent.succeeded — send confirmation emails
  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as Stripe.PaymentIntent;
    const meta = intent.metadata ?? {};

    try {
      await sendBookingEmails({
        name: meta.name ?? "Customer",
        email: meta.email ?? "",
        phone: meta.phone ?? "",
        service: meta.service ?? "Inspection",
        address: meta.address ?? "",
        propertyType: meta.property_type ?? "",
        date: meta.preferred_date,
        amountAud: intent.amount / 100, // convert cents back to dollars
      });
    } catch (err) {
      // Log but don't fail — Stripe will retry if we return an error
      console.error("[stripe-webhook] Failed to send emails:", err);
    }
  }

  return NextResponse.json({ received: true });
}
