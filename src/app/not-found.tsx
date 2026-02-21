import Link from "next/link";
import { Home, ArrowRight, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#F7F8FA" }}
    >
      <div className="text-center max-w-lg w-full">
        {/* Large 404 */}
        <div
          className="text-8xl font-black mb-4 leading-none"
          style={{
            background: "linear-gradient(135deg, #F97316, #EA580C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </div>

        {/* Heading */}
        <h1
          className="text-2xl font-bold mb-3"
          style={{ color: "#111827" }}
        >
          Page Not Found
        </h1>
        <p className="text-sm leading-relaxed mb-8" style={{ color: "#6B7280" }}>
          Sorry, we couldn&apos;t find the page you were looking for. It may have
          been moved, deleted, or the URL might be incorrect.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}
          >
            <Home size={15} />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{
              background: "#FFFFFF",
              border: "1px solid #E8EAED",
              color: "#374151",
            }}
          >
            <Search size={15} />
            Contact Us
          </Link>
        </div>

        {/* Quick links */}
        <div
          className="mt-10 rounded-2xl p-5 text-left"
          style={{ background: "#FFFFFF", border: "1px solid #E8EAED" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#9CA3AF" }}>
            Popular pages
          </p>
          <div className="flex flex-col gap-2">
            {[
              { href: "/services", label: "Our Services" },
              { href: "/pricing", label: "Pricing" },
              { href: "/book", label: "Book an Inspection" },
              { href: "/about", label: "About Everestics" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all hover:scale-[1.01]"
                style={{
                  background: "#F7F8FA",
                  border: "1px solid #E8EAED",
                  color: "#374151",
                }}
              >
                {link.label}
                <ArrowRight size={13} style={{ color: "#9CA3AF" }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
