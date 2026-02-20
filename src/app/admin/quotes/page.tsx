import { Mail, ExternalLink, InboxIcon } from "lucide-react";

export default function QuotesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "#111827" }}>Quote Requests</h1>
        <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
          Submitted quote requests from your contact form.
        </p>
      </div>

      {/* Info card */}
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
            <p className="text-sm font-semibold mb-1" style={{ color: "#111827" }}>
              Quote requests are delivered to your email
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
              Each time a customer submits a quote request on your website, two emails are sent:
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

      {/* Quick access links */}
      <div
        className="rounded-2xl p-6"
        style={{ background: "#FFFFFF", border: "1px solid #E8EAED" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <InboxIcon size={16} style={{ color: "#9CA3AF" }} />
          <h3 className="text-sm font-semibold" style={{ color: "#111827" }}>Quick Access</h3>
        </div>
        <div className="flex flex-col gap-3">
          {[
            {
              label: "View your Resend email activity",
              description: "See all sent emails, delivery status, and open tracking",
              url: "https://resend.com",
            },
            {
              label: "Open your email inbox",
              description: "Quote alert emails are delivered directly to your configured OWNER_EMAIL",
              url: "mailto:",
            },
          ].map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 p-4 rounded-xl transition-all hover:scale-[1.01]"
              style={{ background: "#F7F8FA", border: "1px solid #E8EAED" }}
            >
              <div>
                <p className="text-sm font-medium" style={{ color: "#111827" }}>{link.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{link.description}</p>
              </div>
              <ExternalLink size={14} style={{ color: "#9CA3AF", flexShrink: 0 }} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
