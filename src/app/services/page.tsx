"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Tag, Building2, HardHat, ClipboardCheck, FileText, ArrowRight, CheckCircle2 } from "lucide-react";

const ease = "easeOut" as const;

const services = [
  {
    icon: ShieldCheck,
    title: "Pre-Purchase Property Inspections",
    tagline: "Buy with confidence.",
    description:
      "Before you sign anything, know exactly what you're getting. Our pre-purchase inspections identify structural issues, safety risks, hidden defects, and any evidence of non-compliant work — so you can negotiate from strength or walk away informed.",
    includes: [
      "Full structural assessment",
      "Roof, subfloor and wall cavity inspection",
      "Identification of safety hazards",
      "Photo-rich written report within 24 hours",
      "Plain-language findings you can act on",
    ],
    color: "#F97316",
    audience: "Buyers",
  },
  {
    icon: Tag,
    title: "Pre-Sale Inspections",
    tagline: "Control your sale from the start.",
    description:
      "Understand your property's condition before you list it. Identifying issues early lets you address them proactively, price accurately, and present buyers with confidence — removing uncertainty from both sides of the negotiation.",
    includes: [
      "Complete property condition assessment",
      "Identification of defects and maintenance needs",
      "Documentation to share with prospective buyers",
      "Recommendations for cost-effective remediation",
    ],
    color: "#2563EB",
    audience: "Sellers",
  },
  {
    icon: Building2,
    title: "Building Inspections",
    tagline: "The full picture on any property.",
    description:
      "A thorough examination of any residential or commercial building. We assess structural integrity, safety compliance, and maintenance requirements — giving you a clear, complete view of the property's condition.",
    includes: [
      "Structural and safety assessment",
      "Internal and external condition review",
      "Essential maintenance identification",
      "Compliance review against Australian Standards",
      "Detailed photographic evidence",
    ],
    color: "#F97316",
    audience: "Owners & Investors",
  },
  {
    icon: HardHat,
    title: "New Build Inspections",
    tagline: "Independent eyes at every stage.",
    description:
      "Don't rely solely on the builder's own sign-off. Our stage inspections provide independent assessment at key construction milestones — checking workmanship, structural elements, finishes, and compliance before the next phase begins.",
    includes: [
      "Pre-slab / foundation stage",
      "Frame stage inspection",
      "Lock-up stage inspection",
      "Fixing stage inspection",
      "Practical completion review",
    ],
    color: "#2563EB",
    audience: "Developers & Buyers",
  },
  {
    icon: ClipboardCheck,
    title: "Handover Inspections",
    tagline: "Don't take possession of someone else's problem.",
    description:
      "Your final opportunity to identify defects before occupancy. We document every issue thoroughly so your builder is legally required to correct them — protecting your investment from day one.",
    includes: [
      "Comprehensive pre-occupancy inspection",
      "Defect documentation with photographic evidence",
      "Formal defect list for builder rectification",
      "Follow-up inspection available after repairs",
    ],
    color: "#F97316",
    audience: "New Home Buyers",
  },
  {
    icon: FileText,
    title: "Dilapidation Reports",
    tagline: "Protect your property before work begins next door.",
    description:
      "A dilapidation report documents your property's existing condition before nearby construction activity begins. If damage occurs during that construction, you have clear, timestamped evidence to support any claim.",
    includes: [
      "Full photographic property condition survey",
      "Written condition report with timestamps",
      "Documentation of all existing cracks and defects",
      "Post-construction follow-up report available",
    ],
    color: "#2563EB",
    audience: "Property Owners",
  },
];

export default function ServicesPage() {
  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="relative pt-36 pb-20 blueprint-grid overflow-hidden"
        style={{ background: "#FFFFFF" }}
      >
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest mb-6"
              style={{
                background: "rgba(249,115,22,0.08)",
                border: "1px solid rgba(249,115,22,0.2)",
                color: "#EA580C",
              }}
            >
              What We Do
            </div>
          </motion.div>
          <motion.h1
            className="text-5xl md:text-6xl font-bold leading-tight mb-5"
            style={{ color: "#111827" }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            Every inspection type,{" "}
            <span className="gradient-text-orange">covered.</span>
          </motion.h1>
          <motion.p
            className="max-w-xl mx-auto text-lg"
            style={{ color: "#6B7280" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            Comprehensive building inspection services for homeowners, buyers, sellers, and developers
            across Newcastle and Sydney CBD.
          </motion.p>
        </div>
      </section>

      {/* Services list */}
      <section
        className="pb-28"
        style={{ background: "#F7F8FA", borderTop: "1px solid #E8EAED" }}
      >
        <div className="max-w-5xl mx-auto px-6 pt-12 flex flex-col gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                className="rounded-2xl p-8 md:p-10"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E8EAED",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.05 * (i % 3), ease }}
                whileHover={{
                  borderColor: `${service.color}30`,
                  boxShadow: `0 6px 32px ${service.color}0A`,
                }}
              >
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: `${service.color}10` }}
                      >
                        <Icon size={22} style={{ color: service.color }} />
                      </div>
                      <span
                        className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{
                          background: `${service.color}08`,
                          color: service.color,
                          border: `1px solid ${service.color}20`,
                        }}
                      >
                        {service.audience}
                      </span>
                    </div>

                    <h2
                      className="text-2xl font-bold mb-1"
                      style={{ color: "#111827" }}
                    >
                      {service.title}
                    </h2>
                    <p className="text-sm font-medium mb-4" style={{ color: service.color }}>
                      {service.tagline}
                    </p>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B7280" }}>
                      {service.description}
                    </p>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105"
                      style={{
                        background: "linear-gradient(135deg, #F97316, #EA580C)",
                        boxShadow: "0 2px 16px rgba(249,115,22,0.22)",
                      }}
                    >
                      Request a Quote <ArrowRight size={13} />
                    </Link>
                  </div>

                  {/* Right — includes */}
                  <div
                    className="md:w-64 lg:w-72 rounded-xl p-5 flex-shrink-0 self-start"
                    style={{
                      background: "#F7F8FA",
                      border: "1px solid #E8EAED",
                    }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#9CA3AF" }}>
                      What&apos;s Included
                    </p>
                    <ul className="flex flex-col gap-3">
                      {service.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: service.color }} />
                          <span className="text-sm leading-snug" style={{ color: "#6B7280" }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA — intentionally dark */}
      <section
        className="py-20 text-center relative overflow-hidden"
        style={{ background: "#111827" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: "#F97316" }}
        />
        <div className="max-w-2xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col items-center gap-5"
          >
            <h2 className="text-3xl font-bold" style={{ color: "#F9FAFB" }}>
              Not sure which inspection you need?
            </h2>
            <p style={{ color: "#9CA3AF" }}>
              Get in touch and we&apos;ll recommend the right service for your situation.
            </p>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #F97316, #EA580C)",
                boxShadow: "0 4px 24px rgba(249,115,22,0.35)",
              }}
            >
              Talk to Us <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
