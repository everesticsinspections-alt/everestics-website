"use client";

import { useState } from "react";
import {
  Mail,
  ExternalLink,
  InboxIcon,
  Send,
  Loader2,
  CheckCircle2,
  Copy,
  ShieldCheck,
  Tag,
  Building2,
  HardHat,
  ClipboardCheck,
  FileText,
} from "lucide-react";

const SERVICES = [
  { id: "Pre-Purchase Property Inspection", icon: ShieldCheck },
  { id: "Pre-Sale Inspection", icon: Tag },
  { id: "Building Inspection", icon: Building2 },
  { id: "New Build Stage Inspection", icon: HardHat },
  { id: "Handover Inspection", icon: ClipboardCheck },
  { id: "Termite & Pest Inspection", icon: FileText },
];

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

export default function QuotesPage() {
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
    if (!amount || isNaN(n) || n < 50 || n > 50000) e.amount = "Enter an amount between $50 and $50,000";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function sendQuote() {
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
      setName(""); setEmail(""); setService(""); setAmount(""); setErrors({});
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  function copyLink() {
    if (!result) return;
    navigator.clipboard.writeText(result.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "#1B2E5C" }}>Quotes</h1>
        <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
          Send a secure payment link to a customer, or review how quote requests work.
        </p>
      </div>

      {/* ── Send a Quote form ── */}
      <div
        className="rounded-2xl p-6 mb-6"
        style={{ background: "#FFFFFF", border: "1px solid #E8EAED" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#F97316,#EA580C)" }}
          >
            <Send size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold" style={{ color: "#1B2E5C" }}>Send a Quote</h2>
            <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
              The customer receives a secure link with a locked payment amount — they can&apos;t change the price.
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
                <p className="text-sm font-semibold mb-1" style={{ color: "#1B2E5C" }}>Quote email sent!</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>
                  The customer received a branded email with a Pay &amp; Book button. The link expires in 7 days.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium" style={{ color: "#6B7280" }}>Payment link (also sent to customer):</p>
              <div
                className="flex items-center gap-2 rounded-xl p-3"
                style={{ background: "#F7F8FA", border: "1px solid #E8EAED" }}
              >
                <p className="text-xs flex-1 truncate font-mono" style={{ color: "#374151" }}>{result.link}</p>
                <button
                  onClick={copyLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium flex-shrink-0 transition-all"
                  style={{ background: copied ? "rgba(22,163,74,0.1)" : "#F3F4F6", color: copied ? "#16A34A" : "#6B7280" }}
                >
                  {copied ? <><CheckCircle2 size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                </button>
              </div>
            </div>

            <button
              onClick={() => setResult(null)}
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
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7280" }}>Customer Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  style={inputStyle(!!errors.name)}
                />
                {errors.name && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.name}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7280" }}>Customer Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="jane@example.com"
                  style={inputStyle(!!errors.email)}
                />
                {errors.email && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7280" }}>Service</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICES.map((s) => {
                  const Icon = s.icon;
                  const sel = service === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => { setService(s.id); setErrors((e) => ({ ...e, service: "" })); }}
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
              {errors.service && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.service}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7280" }}>
                Quoted Amount (AUD) — customer cannot change this
              </label>
              <div className="relative">
                <span
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold"
                  style={{ color: "#9CA3AF" }}
                >$</span>
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
              {errors.amount && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.amount}</p>}
            </div>

            {sendError && (
              <div
                className="rounded-xl p-3 text-sm"
                style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", color: "#DC2626" }}
              >
                {sendError}
              </div>
            )}

            <button
              onClick={sendQuote}
              disabled={sending}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 disabled:opacity-60 self-start"
              style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}
            >
              {sending ? (
                <><Loader2 size={14} className="animate-spin" /> Sending…</>
              ) : (
                <><Send size={14} /> Send Quote Email</>
              )}
            </button>
          </div>
        )}
      </div>

      {/* ── How quote requests work ── */}
      <div
        className="rounded-2xl p-6 flex flex-col gap-4 mb-6"
        style={{ background: "#FFFFFF", border: "1px solid #E8EAED" }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(249,115,22,0.1)" }}
          >
            <Mail size={18} style={{ color: "#F97316" }} />
          </div>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: "#1B2E5C" }}>
              How quote requests from the website work
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
              When customers fill in the contact form, two emails are sent automatically:
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mt-2">
          {[
            {
              label: "Customer gets",
              items: ["Confirmation their request was received", "Expected 1–2 business day reply time", "What happens next steps"],
              color: "#F97316",
            },
            {
              label: "You get",
              items: ["Full quote request details", "Service, property, contact info", "Direct reply link to the customer"],
              color: "#2563EB",
            },
          ].map((col) => (
            <div
              key={col.label}
              className="rounded-xl p-4"
              style={{ background: "#F7F8FA", border: "1px solid #E8EAED" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: col.color }}>
                {col.label}
              </p>
              <ul className="flex flex-col gap-1.5">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs" style={{ color: "#6B7280" }}>
                    <span style={{ color: col.color, marginTop: "1px" }}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Quick access */}
      <div className="rounded-2xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E8EAED" }}>
        <div className="flex items-center gap-2 mb-4">
          <InboxIcon size={16} style={{ color: "#9CA3AF" }} />
          <h3 className="text-sm font-semibold" style={{ color: "#1B2E5C" }}>Quick Access</h3>
        </div>
        <a
          href="mailto:"
          className="flex items-center justify-between gap-4 p-4 rounded-xl transition-all hover:scale-[1.01]"
          style={{ background: "#F7F8FA", border: "1px solid #E8EAED" }}
        >
          <div>
            <p className="text-sm font-medium" style={{ color: "#1B2E5C" }}>Open your email inbox</p>
            <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>Quote alert emails are delivered directly to your configured owner email</p>
          </div>
          <ExternalLink size={14} style={{ color: "#9CA3AF", flexShrink: 0 }} />
        </a>
      </div>
    </div>
  );
}
