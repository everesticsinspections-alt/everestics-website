"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Send,
  Loader2,
  CheckCircle2,
  Copy,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Tag,
  Building2,
  HardHat,
  ClipboardCheck,
  FileText,
  InboxIcon,
  Users,
  Clock,
} from "lucide-react";
import type { QuoteRequest } from "@/lib/quoteStore";

const SERVICES = [
  { id: "Pre-Purchase Property Inspection", icon: ShieldCheck },
  { id: "Pre-Sale Inspection", icon: Tag },
  { id: "Building Inspection", icon: Building2 },
  { id: "New Build Stage Inspection", icon: HardHat },
  { id: "Handover Inspection", icon: ClipboardCheck },
  { id: "Termite & Pest Inspection", icon: FileText },
];

function statusConfig(status: string) {
  if (status === "pending")
    return { label: "Pending Reply", bg: "rgba(249,115,22,0.08)", color: "#EA580C", border: "rgba(249,115,22,0.25)" };
  if (status === "quoted")
    return { label: "Quote Sent", bg: "rgba(37,99,235,0.08)", color: "#2563EB", border: "rgba(37,99,235,0.25)" };
  return { label: "Booked", bg: "rgba(22,163,74,0.08)", color: "#16A34A", border: "rgba(22,163,74,0.25)" };
}

function inputStyle(hasError?: boolean): React.CSSProperties {
  return {
    background: "#FFFFFF",
    border: `1px solid ${hasError ? "#EF4444" : "#E8EAED"}`,
    color: "#1B2E5C",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    width: "100%",
    fontSize: "0.875rem",
    outline: "none",
  };
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Inline send-quote form inside an expanded row ────────────────────────────

function SendQuoteInline({ quote, onSent }: { quote: QuoteRequest; onSent: () => void }) {
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [done, setDone] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [copied, setCopied] = useState(false);

  async function send() {
    const n = parseFloat(amount);
    if (!amount || isNaN(n) || n < 50 || n > 50000) {
      setAmountError("Enter an amount between $50 and $50,000");
      return;
    }
    setAmountError("");
    setSending(true);
    setSendError("");
    try {
      const res = await fetch("/api/admin/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: quote.name,
          email: quote.email,
          service: quote.service,
          amountAud: amount,
          quoteId: quote.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send");
      setPaymentLink(data.paymentLink ?? "");
      setDone(true);
      onSent();
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div
        className="rounded-xl p-4 mt-4"
        style={{ background: "rgba(22,163,74,0.05)", border: "1px solid rgba(22,163,74,0.2)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 size={16} style={{ color: "#16A34A" }} />
          <p className="text-sm font-semibold" style={{ color: "#1B2E5C" }}>
            Quote email sent!
          </p>
        </div>
        {paymentLink && (
          <div
            className="flex items-center gap-2 rounded-xl p-3"
            style={{ background: "#F7F8FA", border: "1px solid #E8EAED" }}
          >
            <p className="text-xs flex-1 truncate font-mono" style={{ color: "#374151" }}>
              {paymentLink}
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(paymentLink);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium flex-shrink-0"
              style={{
                background: copied ? "rgba(22,163,74,0.1)" : "#F3F4F6",
                color: copied ? "#16A34A" : "#6B7280",
              }}
            >
              {copied ? (
                <>
                  <CheckCircle2 size={11} /> Copied
                </>
              ) : (
                <>
                  <Copy size={11} /> Copy
                </>
              )}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mt-4 pt-4" style={{ borderTop: "1px solid #F3F4F6" }}>
      <p className="text-xs font-semibold mb-3" style={{ color: "#1B2E5C" }}>
        Send Quote to {quote.name.split(" ")[0]}
      </p>
      <div className="flex gap-3 items-start">
        <div className="flex-1">
          <div className="relative">
            <span
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold"
              style={{ color: "#9CA3AF" }}
            >
              $
            </span>
            <input
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setAmountError("");
              }}
              type="number"
              min="50"
              step="0.01"
              placeholder="Amount (AUD)"
              style={{ ...inputStyle(!!amountError), paddingLeft: "1.75rem" }}
            />
          </div>
          {amountError && (
            <p className="text-xs mt-1" style={{ color: "#EF4444" }}>
              {amountError}
            </p>
          )}
        </div>
        <button
          onClick={send}
          disabled={sending}
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 disabled:opacity-60 flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}
        >
          {sending ? (
            <>
              <Loader2 size={13} className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send size={13} /> Send Quote
            </>
          )}
        </button>
      </div>
      {sendError && (
        <p className="text-xs mt-2" style={{ color: "#EF4444" }}>
          {sendError}
        </p>
      )}
    </div>
  );
}

// ─── Single quote request row ─────────────────────────────────────────────────

function QuoteRow({
  quote,
  defaultOpen,
  onSent,
}: {
  quote: QuoteRequest;
  defaultOpen?: boolean;
  onSent: () => void;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const st = statusConfig(quote.status);

  const details = [
    { icon: Mail, label: quote.email, href: `mailto:${quote.email}` },
    { icon: Phone, label: quote.phone, href: `tel:${quote.phone}` },
    { icon: MapPin, label: `${quote.address} (${quote.propertyType})` },
    ...(quote.preferredDate ? [{ icon: Calendar, label: quote.preferredDate }] : []),
  ];

  return (
    <div style={{ borderBottom: "1px solid #F3F4F6" }}>
      {/* Row header — click to expand */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors"
        style={{ background: open ? "#FAFBFF" : "transparent" }}
      >
        <span
          className="flex-shrink-0 px-2.5 py-0.5 rounded-full text-xs font-semibold"
          style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}` }}
        >
          {st.label}
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: "#1B2E5C" }}>
            {quote.name}
          </p>
          <p className="text-xs truncate" style={{ color: "#9CA3AF" }}>
            {quote.service}
          </p>
        </div>

        <span className="text-xs flex-shrink-0" style={{ color: "#9CA3AF" }}>
          {fmtDate(quote.createdAt)}
        </span>

        {open ? (
          <ChevronUp size={16} style={{ color: "#9CA3AF", flexShrink: 0 }} />
        ) : (
          <ChevronDown size={16} style={{ color: "#9CA3AF", flexShrink: 0 }} />
        )}
      </button>

      {/* Expanded content */}
      {open && (
        <div className="px-5 pb-5">
          <div className="grid sm:grid-cols-2 gap-2 mb-3">
            {details.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 p-3 rounded-xl"
                  style={{ background: "#F7F8FA", border: "1px solid #E8EAED" }}
                >
                  <Icon size={13} style={{ color: "#F97316", flexShrink: 0 }} />
                  {"href" in item ? (
                    <a href={item.href} className="text-xs truncate" style={{ color: "#374151" }}>
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-xs truncate" style={{ color: "#374151" }}>
                      {item.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {quote.message && (
            <div
              className="flex gap-2 p-3 rounded-xl mb-3"
              style={{ background: "#F7F8FA", border: "1px solid #E8EAED" }}
            >
              <MessageSquare size={13} style={{ color: "#9CA3AF", flexShrink: 0, marginTop: "1px" }} />
              <p className="text-xs leading-relaxed" style={{ color: "#374151" }}>
                {quote.message}
              </p>
            </div>
          )}

          {quote.status === "pending" && <SendQuoteInline quote={quote} onSent={onSent} />}

          {quote.status === "quoted" && quote.quotedAmountAud && (
            <div
              className="mt-3 pt-3 flex items-center gap-2"
              style={{ borderTop: "1px solid #F3F4F6" }}
            >
              <CheckCircle2 size={14} style={{ color: "#2563EB" }} />
              <p className="text-xs" style={{ color: "#6B7280" }}>
                Quote sent for{" "}
                <strong style={{ color: "#1B2E5C" }}>${quote.quotedAmountAud.toFixed(2)} AUD</strong>.
                Awaiting customer payment.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Manual send-quote form (for customers who didn't submit via website) ─────

function ManualSendQuote() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ link: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [sendError, setSendError] = useState("");

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Required";
    if (!email.includes("@")) e.email = "Valid email required";
    if (!service) e.service = "Select a service";
    const n = parseFloat(amount);
    if (!amount || isNaN(n) || n < 50 || n > 50000)
      e.amount = "Enter an amount between $50 and $50,000";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function send() {
    if (!validate()) return;
    setSending(true);
    setSendError("");
    try {
      const res = await fetch("/api/admin/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service, amountAud: amount }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send");
      setResult({ link: data.paymentLink });
      setName("");
      setEmail("");
      setService("");
      setAmount("");
      setErrors({});
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="rounded-2xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E8EAED" }}>
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#F97316,#EA580C)" }}
        >
          <Send size={18} className="text-white" />
        </div>
        <div>
          <h2 className="text-base font-semibold" style={{ color: "#1B2E5C" }}>
            Send a Quote (Manual)
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
            Send a secure payment link to any customer — the amount is locked and can&apos;t be changed.
          </p>
        </div>
      </div>

      {result ? (
        <div>
          <div
            className="flex items-start gap-3 rounded-xl p-4 mb-4"
            style={{ background: "rgba(22,163,74,0.06)", border: "1px solid rgba(22,163,74,0.2)" }}
          >
            <CheckCircle2 size={18} style={{ color: "#16A34A", flexShrink: 0, marginTop: "1px" }} />
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "#1B2E5C" }}>
                Quote email sent!
              </p>
              <p className="text-xs" style={{ color: "#6B7280" }}>
                Customer received a branded email with a Pay &amp; Book button. Expires in 7 days.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium" style={{ color: "#6B7280" }}>
              Payment link (also sent to customer):
            </p>
            <div
              className="flex items-center gap-2 rounded-xl p-3"
              style={{ background: "#F7F8FA", border: "1px solid #E8EAED" }}
            >
              <p className="text-xs flex-1 truncate font-mono" style={{ color: "#374151" }}>
                {result.link}
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(result.link);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium flex-shrink-0 transition-all"
                style={{
                  background: copied ? "rgba(22,163,74,0.1)" : "#F3F4F6",
                  color: copied ? "#16A34A" : "#6B7280",
                }}
              >
                {copied ? (
                  <>
                    <CheckCircle2 size={12} /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={12} /> Copy
                  </>
                )}
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              setResult(null);
              setCopied(false);
            }}
            className="mt-4 text-xs font-medium"
            style={{ color: "#F97316" }}
          >
            Send another quote
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7280" }}>
                Customer Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                style={inputStyle(!!errors.name)}
              />
              {errors.name && (
                <p className="text-xs mt-1" style={{ color: "#EF4444" }}>
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7280" }}>
                Customer Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="jane@example.com"
                style={inputStyle(!!errors.email)}
              />
              {errors.email && (
                <p className="text-xs mt-1" style={{ color: "#EF4444" }}>
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7280" }}>
              Service
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SERVICES.map((s) => {
                const Icon = s.icon;
                const sel = service === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setService(s.id);
                      setErrors((e) => ({ ...e, service: "" }));
                    }}
                    className="flex items-center gap-2 p-3 rounded-xl text-left text-xs font-medium transition-all"
                    style={{
                      background: sel ? "rgba(249,115,22,0.06)" : "#F9FAFB",
                      border: sel ? "1px solid rgba(249,115,22,0.35)" : "1px solid #E8EAED",
                      color: sel ? "#1B2E5C" : "#6B7280",
                    }}
                  >
                    <Icon size={13} style={{ color: sel ? "#F97316" : "#9CA3AF", flexShrink: 0 }} />
                    {s.id}
                  </button>
                );
              })}
            </div>
            {errors.service && (
              <p className="text-xs mt-1" style={{ color: "#EF4444" }}>
                {errors.service}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7280" }}>
              Quoted Amount (AUD) — customer cannot change this
            </label>
            <div className="relative">
              <span
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold"
                style={{ color: "#9CA3AF" }}
              >
                $
              </span>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                min="50"
                step="0.01"
                placeholder="450.00"
                style={{ ...inputStyle(!!errors.amount), paddingLeft: "1.75rem" }}
              />
            </div>
            {errors.amount && (
              <p className="text-xs mt-1" style={{ color: "#EF4444" }}>
                {errors.amount}
              </p>
            )}
          </div>

          {sendError && (
            <div
              className="rounded-xl p-3 text-sm"
              style={{
                background: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#DC2626",
              }}
            >
              {sendError}
            </div>
          )}

          <button
            onClick={send}
            disabled={sending}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 disabled:opacity-60 self-start"
            style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}
          >
            {sending ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send size={14} /> Send Quote Email
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Page content (needs Suspense for useSearchParams) ────────────────────────

function QuotesContent() {
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("id");

  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  async function loadQuotes() {
    try {
      const res = await fetch("/api/admin/quotes");
      if (!res.ok) throw new Error("Failed to load quotes");
      const data = await res.json();
      setQuotes(data);
    } catch {
      setLoadError("Could not load quote requests.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuotes();
  }, []);

  const total = quotes.length;
  const pending = quotes.filter((q) => q.status === "pending").length;
  const quoted = quotes.filter((q) => q.status === "quoted").length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "#1B2E5C" }}>
          Quotes
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
          View and respond to incoming quote requests, or send a manual quote to any customer.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Requests", value: total, icon: Users, color: "#1B2E5C" },
          { label: "Pending Reply", value: pending, icon: Clock, color: "#EA580C" },
          { label: "Quote Sent", value: quoted, icon: CheckCircle2, color: "#2563EB" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl p-5"
              style={{ background: "#FFFFFF", border: "1px solid #E8EAED" }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium" style={{ color: "#9CA3AF" }}>
                  {stat.label}
                </p>
                <Icon size={15} style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: stat.color }}>
                {loading ? "–" : stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quote request list */}
      <div
        className="rounded-2xl mb-6 overflow-hidden"
        style={{ background: "#FFFFFF", border: "1px solid #E8EAED" }}
      >
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: "1px solid #F3F4F6" }}
        >
          <InboxIcon size={16} style={{ color: "#9CA3AF" }} />
          <h2 className="text-sm font-semibold" style={{ color: "#1B2E5C" }}>
            Quote Requests
          </h2>
          {!loading && pending > 0 && (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(249,115,22,0.08)",
                color: "#EA580C",
                border: "1px solid rgba(249,115,22,0.2)",
              }}
            >
              {pending} pending
            </span>
          )}
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-3 py-12">
            <Loader2 size={18} className="animate-spin" style={{ color: "#F97316" }} />
            <p className="text-sm" style={{ color: "#9CA3AF" }}>
              Loading quote requests…
            </p>
          </div>
        )}

        {!loading && loadError && (
          <p className="px-5 py-8 text-sm text-center" style={{ color: "#EF4444" }}>
            {loadError}
          </p>
        )}

        {!loading && !loadError && quotes.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-12">
            <InboxIcon size={32} style={{ color: "#E8EAED" }} />
            <p className="text-sm" style={{ color: "#9CA3AF" }}>
              No quote requests yet
            </p>
            <p className="text-xs" style={{ color: "#C4C9D4" }}>
              They&apos;ll appear here when customers submit the contact form
            </p>
          </div>
        )}

        {!loading &&
          quotes.map((q) => (
            <QuoteRow
              key={q.id}
              quote={q}
              defaultOpen={q.id === highlightId}
              onSent={loadQuotes}
            />
          ))}
      </div>

      {/* Manual send-quote form */}
      <ManualSendQuote />
    </div>
  );
}

export default function QuotesPage() {
  return (
    <Suspense>
      <QuotesContent />
    </Suspense>
  );
}
