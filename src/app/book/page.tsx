"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck,
  Tag,
  Building2,
  HardHat,
  ClipboardCheck,
  FileText,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  CalendarCheck,
  DollarSign,
} from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const SERVICES = [
  { id: "pre-purchase", label: "Pre-Purchase Property Inspection", icon: ShieldCheck },
  { id: "pre-sale", label: "Pre-Sale Inspection", icon: Tag },
  { id: "building", label: "Building Inspection", icon: Building2 },
  { id: "new-build", label: "New Build Stage Inspection", icon: HardHat },
  { id: "handover", label: "Handover Inspection", icon: ClipboardCheck },
  { id: "termite-pest", label: "Termite & Pest Inspection", icon: FileText },
];

const STEPS = ["Service & Price", "Property", "Your Details", "Payment", "Done"];

// ─── Shared styles ────────────────────────────────────────────────────────────

function inputStyle(hasError?: boolean): React.CSSProperties {
  return {
    background: "#FFFFFF",
    border: `1px solid ${hasError ? "#EF4444" : "#E8EAED"}`,
    color: "#111827",
    borderRadius: "0.75rem",
    padding: "0.875rem 1rem",
    width: "100%",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s",
  };
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{msg}</p>;
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-1 mb-10 overflow-x-auto pb-1">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-1 flex-shrink-0">
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
              style={{
                background:
                  i < current
                    ? "linear-gradient(135deg, #F97316, #EA580C)"
                    : i === current
                    ? "rgba(249,115,22,0.1)"
                    : "#F3F4F6",
                border: i <= current ? "1px solid #F97316" : "1px solid #E8EAED",
                color: i <= current ? (i < current ? "#fff" : "#F97316") : "#9CA3AF",
              }}
            >
              {i < current ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            <span className="text-xs hidden sm:block" style={{ color: i === current ? "#F97316" : "#9CA3AF" }}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className="w-6 md:w-10 h-px mb-4 flex-shrink-0"
              style={{ background: i < current ? "#F97316" : "#E8EAED" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Payment form (Stripe Elements) ──────────────────────────────────────────

function PaymentForm({
  amountAud,
  onSuccess,
  onBack,
}: {
  amountAud: number;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Payment failed");
      setProcessing(false);
      return;
    }

    // Confirm payment — for a real integration, redirect would take the user
    // to a return_url. Here we use confirmPayment with redirect: "if_required"
    // so card payments stay in-page.
    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: typeof window !== "undefined" ? `${window.location.origin}/book?success=true` : "",
      },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message ?? "Payment failed. Please try again.");
      setProcessing(false);
    } else {
      onSuccess();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div
        className="rounded-xl p-4 flex items-center justify-between"
        style={{ background: "rgba(249,115,22,0.04)", border: "1px solid rgba(249,115,22,0.15)" }}
      >
        <span className="text-sm font-medium" style={{ color: "#6B7280" }}>Amount to pay</span>
        <span className="text-xl font-bold" style={{ color: "#F97316" }}>
          ${amountAud.toLocaleString("en-AU", { minimumFractionDigits: 2 })} AUD
        </span>
      </div>

      <PaymentElement
        options={{
          layout: "tabs",
          fields: { billingDetails: { name: "auto", email: "auto" } },
        }}
      />

      {error && (
        <div
          className="rounded-xl p-3 text-sm"
          style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", color: "#DC2626" }}
        >
          {error}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium"
          style={{ color: "#6B7280", background: "#F3F4F6", border: "1px solid #E8EAED" }}
        >
          <ArrowLeft size={14} /> Back
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
          style={{
            background: "linear-gradient(135deg, #F97316, #EA580C)",
            boxShadow: "0 2px 16px rgba(249,115,22,0.25)",
          }}
        >
          {processing ? (
            <><Loader2 size={14} className="animate-spin" /> Processing…</>
          ) : (
            <><CalendarCheck size={14} /> Pay & Confirm Booking</>
          )}
        </button>
      </div>

      <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
        Payments are processed securely by Stripe. Your card details are never stored.
      </p>
    </form>
  );
}

// ─── Main booking page ────────────────────────────────────────────────────────

export default function BookPage() {
  return (
    <Suspense>
      <BookPageContent />
    </Suspense>
  );
}

function BookPageContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  // Quote token state
  const [quoteToken, setQuoteToken] = useState<string | null>(null);
  const [quoteError, setQuoteError] = useState("");
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [amountLocked, setAmountLocked] = useState(false);

  // Form data
  const [service, setService] = useState("");
  const [quotedAmount, setQuotedAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState<"residential" | "commercial" | "industrial" | "">("");
  const [addressError, setAddressError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});

  // Stripe state
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [creatingIntent, setCreatingIntent] = useState(false);
  const [intentError, setIntentError] = useState("");

  // On mount: check for ?quote= token and validate it
  useEffect(() => {
    const token = searchParams.get("quote");
    if (!token) return;
    setQuoteToken(token);
    setQuoteLoading(true);
    fetch(`/api/validate-quote?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setQuoteError(data.error);
        } else {
          setName(data.name ?? "");
          setEmail(data.email ?? "");
          setService(data.service ?? "");
          setQuotedAmount(String(data.amountAud));
          setAmountLocked(true);
        }
      })
      .catch(() => setQuoteError("Could not validate quote link. Please contact us."))
      .finally(() => setQuoteLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function go(d: number) {
    setDirection(d);
    setStep((s) => s + d);
  }

  // Validate step 1
  function validateStep1() {
    if (!service) return false;
    const n = parseFloat(quotedAmount);
    if (!quotedAmount || isNaN(n) || n < 50 || n > 10000) {
      setAmountError("Please enter a valid quoted amount between $50 and $10,000.");
      return false;
    }
    setAmountError("");
    return true;
  }

  // Validate step 2
  function validateStep2() {
    if (!address || address.trim().length < 5) {
      setAddressError("Please enter the full property address.");
      return false;
    }
    setAddressError("");
    return true;
  }

  // Validate step 3 and create PaymentIntent
  async function validateStep3AndCreateIntent() {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Name is required.";
    if (!email.includes("@")) errors.email = "Please enter a valid email.";
    if (phone.trim().length < 8) errors.phone = "Please enter a valid phone number.";
    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }
    setContactErrors({});

    setCreatingIntent(true);
    setIntentError("");
    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountAud: parseFloat(quotedAmount),
          service,
          name,
          email,
          phone,
          address,
          propertyType,
          date,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.clientSecret) throw new Error(data.error ?? "Could not create payment.");
      setClientSecret(data.clientSecret);
      go(1);
    } catch (err) {
      setIntentError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setCreatingIntent(false);
    }
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
  };

  const selectedServiceLabel = SERVICES.find((s) => s.id === service)?.label ?? service;

  return (
    <div style={{ background: "#F7F8FA", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="pt-24 pb-10 text-center"
        style={{ background: "#FFFFFF", borderBottom: "1px solid #E8EAED" }}
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
          style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)", color: "#EA580C" }}
        >
          Book Your Inspection
        </div>
        <h1 className="text-3xl md:text-4xl font-bold" style={{ color: "#111827" }}>
          Confirm &amp; Pay
        </h1>
        <p className="mt-2 text-sm" style={{ color: "#6B7280" }}>
          Already have your quote? Complete the form below to lock in your date.
        </p>
        <p className="mt-1 text-xs" style={{ color: "#9CA3AF" }}>
          Don&apos;t have a quote yet?{" "}
          <Link href="/contact" className="underline" style={{ color: "#F97316" }}>
            Get a free quote first
          </Link>
        </p>
      </div>

      {/* Form card */}
      <div className="max-w-xl mx-auto px-4 py-12">

        {/* Quote token status banners */}
        {quoteLoading && (
          <div
            className="flex items-center gap-3 rounded-2xl p-4 mb-4"
            style={{ background: "#F7F8FA", border: "1px solid #E8EAED" }}
          >
            <Loader2 size={16} className="animate-spin flex-shrink-0" style={{ color: "#F97316" }} />
            <p className="text-sm" style={{ color: "#6B7280" }}>Validating your quote link…</p>
          </div>
        )}

        {quoteError && (
          <div
            className="rounded-2xl p-4 mb-4"
            style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: "#DC2626" }}>Quote link invalid</p>
            <p className="text-sm" style={{ color: "#6B7280" }}>{quoteError}</p>
          </div>
        )}

        {amountLocked && !quoteError && (
          <div
            className="flex items-center gap-3 rounded-2xl p-4 mb-4"
            style={{ background: "rgba(22,163,74,0.06)", border: "1px solid rgba(22,163,74,0.2)" }}
          >
            <CheckCircle2 size={16} style={{ color: "#16A34A", flexShrink: 0 }} />
            <p className="text-sm" style={{ color: "#374151" }}>
              Your quote has been pre-filled. The amount is locked to{" "}
              <strong style={{ color: "#16A34A" }}>${parseFloat(quotedAmount).toFixed(2)} AUD</strong>.
            </p>
          </div>
        )}

        <div
          className="rounded-2xl p-8 md:p-10"
          style={{ background: "#FFFFFF", border: "1px solid #E8EAED", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
        >
          <StepIndicator current={step} />

          <div style={{ overflow: "hidden" }}>
            <AnimatePresence mode="wait" custom={direction}>

              {/* ── Step 1: Service + quoted amount ── */}
              {step === 0 && (
                <motion.div
                  key="s1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h2 className="text-lg font-bold mb-1" style={{ color: "#111827" }}>Select your service</h2>
                  <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
                    {amountLocked ? "Service pre-filled from your quote." : "Choose the inspection you were quoted for."}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {SERVICES.map((s) => {
                      const Icon = s.icon;
                      const sel = service === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => !amountLocked && setService(s.id)}
                          disabled={amountLocked && !sel}
                          className="flex items-center gap-3 p-3.5 rounded-xl text-left transition-all"
                          style={{
                            background: sel ? "rgba(249,115,22,0.06)" : "#F9FAFB",
                            border: sel ? "1px solid rgba(249,115,22,0.4)" : "1px solid #E8EAED",
                            opacity: amountLocked && !sel ? 0.4 : 1,
                            cursor: amountLocked ? "default" : "pointer",
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: sel ? "rgba(249,115,22,0.12)" : "#F3F4F6" }}
                          >
                            <Icon size={15} style={{ color: sel ? "#F97316" : "#9CA3AF" }} />
                          </div>
                          <span className="text-xs font-medium leading-snug" style={{ color: sel ? "#111827" : "#6B7280" }}>
                            {s.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Quoted amount */}
                  <div className="mb-6">
                    <label className="block text-xs font-medium mb-2" style={{ color: "#6B7280" }}>
                      {amountLocked ? "Quoted Price (AUD) — locked" : "Your quoted price (AUD) *"}
                    </label>
                    {amountLocked ? (
                      <div
                        className="flex items-center gap-2 rounded-xl px-4 py-3"
                        style={{ background: "rgba(22,163,74,0.06)", border: "1px solid rgba(22,163,74,0.2)" }}
                      >
                        <DollarSign size={15} style={{ color: "#16A34A" }} />
                        <span className="text-base font-bold" style={{ color: "#16A34A" }}>
                          {parseFloat(quotedAmount).toFixed(2)} AUD
                        </span>
                        <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(22,163,74,0.1)", color: "#16A34A" }}>
                          Locked
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="relative">
                          <DollarSign
                            size={15}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2"
                            style={{ color: "#9CA3AF" }}
                          />
                          <input
                            type="number"
                            min="50"
                            max="10000"
                            step="0.01"
                            placeholder="e.g. 450.00"
                            value={quotedAmount}
                            onChange={(e) => { setQuotedAmount(e.target.value); setAmountError(""); }}
                            style={{ ...inputStyle(!!amountError), paddingLeft: "2.25rem" }}
                          />
                        </div>
                        <FieldError msg={amountError} />
                        <p className="text-xs mt-1.5" style={{ color: "#9CA3AF" }}>
                          Enter the exact amount from your Everestics quote.
                        </p>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => validateStep1() && go(1)}
                    disabled={!service}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                    style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}
                  >
                    Continue <ArrowRight size={14} />
                  </button>
                </motion.div>
              )}

              {/* ── Step 2: Property details ── */}
              {step === 1 && (
                <motion.div
                  key="s2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h2 className="text-lg font-bold mb-1" style={{ color: "#111827" }}>Property details</h2>
                  <p className="text-sm mb-6" style={{ color: "#6B7280" }}>Tell us about the property to be inspected.</p>

                  <div className="flex flex-col gap-5 mb-6">
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: "#6B7280" }}>
                        Property Address *
                      </label>
                      <input
                        value={address}
                        onChange={(e) => { setAddress(e.target.value); setAddressError(""); }}
                        placeholder="e.g. 12 Builder St, Newcastle NSW 2300"
                        style={inputStyle(!!addressError)}
                      />
                      <FieldError msg={addressError} />
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: "#6B7280" }}>
                        Property Type *
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {(["residential", "commercial", "industrial"] as const).map((type) => (
                          <button
                            key={type}
                            onClick={() => setPropertyType(type)}
                            className="py-3 px-4 rounded-xl text-sm font-medium capitalize transition-all"
                            style={{
                              background: propertyType === type ? "rgba(249,115,22,0.06)" : "#F9FAFB",
                              border: propertyType === type ? "1px solid rgba(249,115,22,0.35)" : "1px solid #E8EAED",
                              color: propertyType === type ? "#111827" : "#6B7280",
                            }}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => go(-1)}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium"
                      style={{ color: "#6B7280", background: "#F3F4F6", border: "1px solid #E8EAED" }}
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                    <button
                      onClick={() => validateStep2() && go(1)}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                      style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}
                    >
                      Continue <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Step 3: Contact + date ── */}
              {step === 2 && (
                <motion.div
                  key="s3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h2 className="text-lg font-bold mb-1" style={{ color: "#111827" }}>Your contact details</h2>
                  <p className="text-sm mb-6" style={{ color: "#6B7280" }}>We&apos;ll confirm your booking to these details.</p>

                  <div className="flex flex-col gap-5 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-2" style={{ color: "#6B7280" }}>Full Name *</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="James Smith" style={inputStyle(!!contactErrors.name)} />
                        <FieldError msg={contactErrors.name} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-2" style={{ color: "#6B7280" }}>Phone *</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="04XX XXX XXX" style={inputStyle(!!contactErrors.phone)} />
                        <FieldError msg={contactErrors.phone} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: "#6B7280" }}>Email Address *</label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" style={inputStyle(!!contactErrors.email)} />
                      <FieldError msg={contactErrors.email} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: "#6B7280" }}>Preferred Inspection Date (optional)</label>
                      <input value={date} onChange={(e) => setDate(e.target.value)} type="date" style={inputStyle()} />
                    </div>
                  </div>

                  {intentError && (
                    <div
                      className="mb-4 rounded-xl p-3 text-sm"
                      style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", color: "#DC2626" }}
                    >
                      {intentError}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => go(-1)}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium"
                      style={{ color: "#6B7280", background: "#F3F4F6", border: "1px solid #E8EAED" }}
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                    <button
                      onClick={validateStep3AndCreateIntent}
                      disabled={creatingIntent}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 disabled:opacity-60"
                      style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}
                    >
                      {creatingIntent ? <><Loader2 size={14} className="animate-spin" /> Setting up payment…</> : <>Continue <ArrowRight size={14} /></>}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Step 4: Payment ── */}
              {step === 3 && clientSecret && (
                <motion.div
                  key="s4"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h2 className="text-lg font-bold mb-1" style={{ color: "#111827" }}>Payment</h2>
                  <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
                    Complete your payment to confirm the booking.
                  </p>

                  {/* Booking summary */}
                  <div
                    className="rounded-xl p-4 mb-6 flex flex-col gap-2"
                    style={{ background: "#F7F8FA", border: "1px solid #E8EAED" }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#9CA3AF" }}>Booking Summary</p>
                    {[
                      { label: "Service", value: selectedServiceLabel },
                      { label: "Address", value: address },
                      { label: "Name", value: name },
                      ...(date ? [{ label: "Preferred Date", value: date }] : []),
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between text-sm gap-4">
                        <span style={{ color: "#9CA3AF" }}>{row.label}</span>
                        <span className="font-medium text-right" style={{ color: "#374151" }}>{row.value}</span>
                      </div>
                    ))}
                  </div>

                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: "stripe",
                        variables: {
                          colorPrimary: "#F97316",
                          colorBackground: "#FFFFFF",
                          colorText: "#111827",
                          colorDanger: "#EF4444",
                          borderRadius: "12px",
                          fontFamily: "system-ui, sans-serif",
                        },
                      },
                    }}
                  >
                    <PaymentForm
                      amountAud={parseFloat(quotedAmount)}
                      onSuccess={() => {
                        // Booking confirmation email is sent server-side via the Stripe webhook
                        // (payment_intent.succeeded) — no client-side email call needed.
                        go(1);
                      }}
                      onBack={() => go(-1)}
                    />
                  </Elements>
                </motion.div>
              )}

              {/* ── Step 5: Success ── */}
              {step === 4 && (
                <motion.div
                  key="s5"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col items-center text-center py-6 gap-5"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.25)" }}
                  >
                    <CheckCircle2 size={32} style={{ color: "#F97316" }} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2" style={{ color: "#111827" }}>Booking confirmed!</h2>
                    <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "#6B7280" }}>
                      Payment received. We&apos;ll be in touch within 4 business hours to confirm your inspection date.
                    </p>
                  </div>

                  <div
                    className="w-full rounded-xl p-5 text-left"
                    style={{ background: "rgba(249,115,22,0.04)", border: "1px solid rgba(249,115,22,0.15)" }}
                  >
                    <p className="text-xs font-semibold mb-3" style={{ color: "#EA580C" }}>What happens next</p>
                    {[
                      "Confirmation sent to your email",
                      "Our team will contact you to finalise the date and time",
                      "Receive your detailed report within 24 hours of inspection",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 py-1.5">
                        <span
                          className="w-5 h-5 rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: "rgba(249,115,22,0.1)", color: "#F97316" }}
                        >
                          {i + 1}
                        </span>
                        <span className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}
                  >
                    Back to Home <ArrowRight size={14} />
                  </Link>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
