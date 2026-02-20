"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, CheckCircle2, Plus, Trash2 } from "lucide-react";

type SiteContent = {
  contact: { phone: string; email: string; address: string };
  businessHours: string;
  tagline: string;
  faqs: { question: string; answer: string }[];
  serviceAreas: string[];
};

function inputStyle(full = false): React.CSSProperties {
  return {
    background: "#FFFFFF",
    border: "1px solid #E8EAED",
    color: "#111827",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    width: full ? "100%" : undefined,
    fontSize: "0.875rem",
    outline: "none",
  };
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E8EAED" }}>
      <h3 className="text-sm font-semibold mb-5" style={{ color: "#111827" }}>{title}</h3>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7280" }}>
      {children}
    </label>
  );
}

export default function ContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data) => { setContent(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function save() {
    if (!content) return;
    setSaving(true);
    try {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  function updateContact(key: keyof SiteContent["contact"], val: string) {
    setContent((c) => c ? { ...c, contact: { ...c.contact, [key]: val } } : c);
  }

  function updateFaq(i: number, key: "question" | "answer", val: string) {
    setContent((c) => {
      if (!c) return c;
      const faqs = [...c.faqs];
      faqs[i] = { ...faqs[i], [key]: val };
      return { ...c, faqs };
    });
  }

  function addFaq() {
    setContent((c) => c ? { ...c, faqs: [...c.faqs, { question: "", answer: "" }] } : c);
  }

  function removeFaq(i: number) {
    setContent((c) => c ? { ...c, faqs: c.faqs.filter((_, idx) => idx !== i) } : c);
  }

  function updateServiceArea(i: number, val: string) {
    setContent((c) => {
      if (!c) return c;
      const areas = [...c.serviceAreas];
      areas[i] = val;
      return { ...c, serviceAreas: areas };
    });
  }

  function removeServiceArea(i: number) {
    setContent((c) => c ? { ...c, serviceAreas: c.serviceAreas.filter((_, idx) => idx !== i) } : c);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin" style={{ color: "#F97316" }} />
      </div>
    );
  }

  if (!content) {
    return <p className="text-sm" style={{ color: "#EF4444" }}>Failed to load content.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#111827" }}>Site Content</h1>
          <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
            Edit your website&apos;s contact details, FAQs, and service areas.
          </p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #F97316, #EA580C)", flexShrink: 0 }}
        >
          {saved ? (
            <><CheckCircle2 size={14} /> Saved!</>
          ) : saving ? (
            <><Loader2 size={14} className="animate-spin" /> Saving…</>
          ) : (
            <><Save size={14} /> Save Changes</>
          )}
        </button>
      </div>

      <div className="flex flex-col gap-5">

        {/* Contact details */}
        <SectionCard title="Contact Details">
          <div className="grid sm:grid-cols-2 gap-4">
            {(["phone", "email", "address"] as const).map((key) => (
              <div key={key} className={key === "address" ? "sm:col-span-2" : ""}>
                <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                <input
                  value={content.contact[key]}
                  onChange={(e) => updateContact(key, e.target.value)}
                  style={inputStyle(true)}
                />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Business hours */}
        <SectionCard title="Business Hours">
          <Label>Hours (shown on contact page)</Label>
          <textarea
            value={content.businessHours}
            onChange={(e) => setContent((c) => c ? { ...c, businessHours: e.target.value } : c)}
            rows={4}
            style={{ ...inputStyle(true), resize: "vertical" }}
          />
        </SectionCard>

        {/* Tagline */}
        <SectionCard title="Business Tagline">
          <Label>Short description (shown on the home page)</Label>
          <textarea
            value={content.tagline}
            onChange={(e) => setContent((c) => c ? { ...c, tagline: e.target.value } : c)}
            rows={2}
            style={{ ...inputStyle(true), resize: "vertical" }}
          />
        </SectionCard>

        {/* Service areas */}
        <SectionCard title="Service Areas">
          <div className="flex flex-wrap gap-2 mb-3">
            {content.serviceAreas.map((area, i) => (
              <div
                key={i}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm"
                style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}
              >
                <input
                  value={area}
                  onChange={(e) => updateServiceArea(i, e.target.value)}
                  className="bg-transparent outline-none text-xs font-medium"
                  style={{ color: "#EA580C", width: `${Math.max(area.length, 4)}ch` }}
                />
                <button onClick={() => removeServiceArea(i)} style={{ color: "#F97316", marginLeft: "2px" }}>
                  <Trash2 size={11} />
                </button>
              </div>
            ))}
            <button
              onClick={() => setContent((c) => c ? { ...c, serviceAreas: [...c.serviceAreas, "New Area"] } : c)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: "#F3F4F6", border: "1px solid #E8EAED", color: "#6B7280" }}
            >
              <Plus size={11} /> Add
            </button>
          </div>
        </SectionCard>

        {/* FAQs */}
        <SectionCard title="Frequently Asked Questions">
          <div className="flex flex-col gap-4">
            {content.faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl p-4"
                style={{ background: "#F7F8FA", border: "1px solid #E8EAED" }}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <p className="text-xs font-semibold" style={{ color: "#9CA3AF" }}>FAQ {i + 1}</p>
                  <button onClick={() => removeFaq(i)} style={{ color: "#EF4444" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <Label>Question</Label>
                    <input
                      value={faq.question}
                      onChange={(e) => updateFaq(i, "question", e.target.value)}
                      style={inputStyle(true)}
                    />
                  </div>
                  <div>
                    <Label>Answer</Label>
                    <textarea
                      value={faq.answer}
                      onChange={(e) => updateFaq(i, "answer", e.target.value)}
                      rows={3}
                      style={{ ...inputStyle(true), resize: "vertical" }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addFaq}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium self-start"
              style={{ background: "#F3F4F6", border: "1px solid #E8EAED", color: "#6B7280" }}
            >
              <Plus size={14} /> Add FAQ
            </button>
          </div>
        </SectionCard>

      </div>
    </div>
  );
}
