"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { QuoteForm } from "@/components/contact/QuoteForm";

const ease = "easeOut" as const;

const contactDetails = [
  { icon: Phone,  label: "Phone",         value: "0451 171 987",                      href: "tel:0451171987",                              color: "#F97316" },
  { icon: Mail,   label: "Email",          value: "everesticsinspections@gmail.com",   href: "mailto:everesticsinspections@gmail.com",      color: "#1B2E5C" },
  { icon: MapPin, label: "Locations",      value: "Newcastle & Sydney CBD",            href: null,                                          color: "#F97316" },
  { icon: Clock,  label: "Response Time",  value: "Within 4 business hours",           href: null,                                          color: "#1B2E5C" },
];

export default function ContactPage() {
  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="relative pt-36 pb-16 overflow-hidden blueprint-grid"
        style={{ background: "#FFFFFF" }}
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest mb-5"
              style={{
                background: "rgba(249,115,22,0.08)",
                border: "1px solid rgba(249,115,22,0.2)",
                color: "#EA580C",
              }}
            >
              Get in Touch
            </div>
            <h1
              className="text-5xl md:text-6xl font-bold leading-tight mb-4"
              style={{ color: "#1B2E5C" }}
            >
              Request a{" "}
              <span className="gradient-text-orange">free quote.</span>
            </h1>
            <p
              className="max-w-xl text-lg leading-relaxed"
              style={{ color: "#6B7280" }}
            >
              Fill out the form and we&apos;ll get back to you with a tailored inspection quote within 4 business hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-28" style={{ background: "#F7F8FA", borderTop: "1px solid #E8EAED" }}>
        <div className="max-w-7xl mx-auto px-6 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* Left — Contact info */}
            <motion.div
              className="lg:col-span-2 flex flex-col gap-4"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease }}
            >
              {contactDetails.map((item) => {
                const Icon = item.icon;
                const inner = (
                  <div
                    className="flex items-start gap-4 p-5 rounded-xl"
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #E8EAED",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}10` }}
                    >
                      <Icon size={18} style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider mb-0.5" style={{ color: "#9CA3AF" }}>
                        {item.label}
                      </p>
                      <p className="text-sm font-medium" style={{ color: "#1B2E5C" }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} className="hover:opacity-80 transition-opacity">
                    {inner}
                  </a>
                ) : (
                  <div key={item.label}>{inner}</div>
                );
              })}

              {/* Service areas */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: "rgba(249,115,22,0.04)",
                  border: "1px solid rgba(249,115,22,0.15)",
                }}
              >
                <p className="text-xs font-semibold mb-3" style={{ color: "#EA580C" }}>
                  Service Areas
                </p>
                {[
                  "Newcastle CBD & surrounds",
                  "Hunter Valley",
                  "Lake Macquarie",
                  "Sydney CBD",
                  "Greater Sydney region",
                ].map((area) => (
                  <div key={area} className="flex items-center gap-2 py-1">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F97316" }} />
                    <span className="text-sm" style={{ color: "#6B7280" }}>{area}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease }}
            >
              <QuoteForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
