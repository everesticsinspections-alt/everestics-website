import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUpRight, MountainSnow } from "lucide-react";

const services = [
  "Pre-Purchase Property Inspections",
  "Pre-Sale Inspections",
  "Building Inspections",
  "New Build Inspections",
  "Handover Inspections",
  "Termite & Pest Inspections",
];

const company = [
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Get a Quote", href: "/contact" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden blueprint-grid"
      style={{ background: "#0A1628", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, #F97316, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}
              >
                <MountainSnow size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-widest uppercase" style={{ color: "#F9FAFB" }}>
                Ever<span style={{ color: "#F97316" }}>estics</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B7280" }}>
              A trusted provider of comprehensive building inspection services for residential and commercial properties. Newcastle &amp; Sydney CBD.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:0451171987"
                className="flex items-center gap-2 text-sm transition-colors hover:text-brand-orange"
                style={{ color: "#9CA3AF" }}
              >
                <Phone size={14} style={{ color: "#F97316" }} />
                0451 171 987
              </a>
              <a
                href="mailto:everesticsinspections@gmail.com"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: "#9CA3AF" }}
              >
                <Mail size={14} style={{ color: "#F97316" }} />
                everesticsinspections@gmail.com
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: "#F97316" }}>
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-sm transition-colors hover:text-brand-white flex items-center gap-1.5 group"
                    style={{ color: "#6B7280" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full transition-colors"
                      style={{ background: "#F97316", opacity: 0.5 }}
                    />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: "#F97316" }}>
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors flex items-center gap-1 group"
                    style={{ color: "#6B7280" }}
                  >
                    {item.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "#F97316" }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: "#F97316" }}>
              Locations
            </h4>
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin size={14} style={{ color: "#3B82F6" }} />
                  <span className="text-sm font-medium" style={{ color: "#F9FAFB" }}>Newcastle</span>
                </div>
                <p className="text-sm pl-5" style={{ color: "#6B7280" }}>
                  Hunter Valley & surrounds
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin size={14} style={{ color: "#3B82F6" }} />
                  <span className="text-sm font-medium" style={{ color: "#F9FAFB" }}>Sydney CBD</span>
                </div>
                <p className="text-sm pl-5" style={{ color: "#6B7280" }}>
                  Greater Sydney region
                </p>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #F97316, #EA580C)", boxShadow: "0 0 16px rgba(249,115,22,0.2)" }}
            >
              Get a Free Quote
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs" style={{ color: "#4B5563" }}>
            © {new Date().getFullYear()} Everestics Pty Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs" style={{ color: "#4B5563" }}>
              Newcastle &amp; Sydney CBD
            </p>
            <Link href="/privacy" className="text-xs transition-colors hover:opacity-80" style={{ color: "#4B5563" }}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
