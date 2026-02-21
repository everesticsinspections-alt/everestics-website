import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Everestics Privacy Policy — how we collect, use, and protect your personal information.",
};

const CONTACT_EMAIL = "everesticsinspections@gmail.com";
const COMPANY = "Everestics";
const EFFECTIVE_DATE = "21 February 2026";

export default function PrivacyPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#F7F8FA" }}
    >
      {/* Header */}
      <div
        className="py-14 px-4"
        style={{
          background: "linear-gradient(135deg, #1B2E5C 0%, #152347 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#F97316" }}>
            Legal
          </p>
          <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-sm" style={{ color: "#9CA3AF" }}>
            Effective date: {EFFECTIVE_DATE}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div
          className="rounded-2xl p-8 flex flex-col gap-8"
          style={{ background: "#FFFFFF", border: "1px solid #E8EAED" }}
        >
          <Section title="1. Who We Are">
            <p>
              {COMPANY} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates this website and
              provides building inspection services across Newcastle and Sydney CBD, NSW, Australia. We
              are committed to protecting the personal information you share with us in accordance with
              the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles (APPs).
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect personal information you provide directly, including:</p>
            <ul>
              <li>Your name, email address, and phone number (via contact or booking forms)</li>
              <li>Property address or inspection details</li>
              <li>Service preferences and scheduling information</li>
              <li>Payment details (processed securely by Stripe — we never store card numbers)</li>
            </ul>
            <p className="mt-3">
              We also collect limited technical data automatically (IP address, browser type, pages
              visited) through standard web server logs to maintain site security and performance.
            </p>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>Your information is used to:</p>
            <ul>
              <li>Process and confirm inspection bookings and payments</li>
              <li>Respond to enquiries and send quote communications</li>
              <li>Deliver inspection reports and post-service follow-ups</li>
              <li>Improve our services and website experience</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-3">
              We do not use your personal information for unsolicited marketing without your consent.
            </p>
          </Section>

          <Section title="4. Payments">
            <p>
              All online payments are processed by{" "}
              <strong>Stripe, Inc.</strong>, a PCI-DSS-compliant payment processor. Your card details
              are transmitted directly to Stripe and are never stored on our servers. By making a
              payment, you also agree to{" "}
              <a
                href="https://stripe.com/au/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#F97316" }}
              >
                Stripe&apos;s Privacy Policy
              </a>
              .
            </p>
          </Section>

          <Section title="5. Disclosure of Information">
            <p>
              We do not sell, rent, or trade your personal information. We may share information with:
            </p>
            <ul>
              <li>
                <strong>Service providers</strong> — e.g., email delivery services (Resend), Stripe
                for payment processing — solely to operate our services
              </li>
              <li>
                <strong>Legal authorities</strong> — if required by law, court order, or to protect
                the rights and safety of our business or others
              </li>
            </ul>
          </Section>

          <Section title="6. Data Storage &amp; Security">
            <p>
              Your data is stored on secure servers. We use industry-standard measures including HTTPS
              encryption, HMAC-signed access tokens, and session authentication to protect your
              information. We retain personal data only as long as necessary to fulfil the purposes
              described in this policy or as required by law.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p>Under Australian Privacy Law, you have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal retention requirements)</li>
              <li>Withdraw consent for any optional communications</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "#F97316" }}>
                {CONTACT_EMAIL}
              </a>
              . We will respond within 30 days.
            </p>
          </Section>

          <Section title="8. Cookies">
            <p>
              This website uses a single session cookie for admin authentication purposes only. We do
              not use third-party tracking cookies or advertising cookies. Standard browser behaviour
              applies.
            </p>
          </Section>

          <Section title="9. Third-Party Links">
            <p>
              Our website may contain links to third-party sites (e.g., Stripe payment pages). We are
              not responsible for the privacy practices of those sites and encourage you to review
              their policies.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this policy from time to time. The effective date at the top of this page
              will reflect the latest revision. Continued use of our website after changes constitutes
              acceptance of the updated policy.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>
              For any privacy-related questions or requests, please contact us at:
            </p>
            <div
              className="mt-3 rounded-xl p-4"
              style={{ background: "#F7F8FA", border: "1px solid #E8EAED" }}
            >
              <p className="text-sm font-semibold" style={{ color: "#1B2E5C" }}>{COMPANY}</p>
              <p className="text-sm mt-1" style={{ color: "#6B7280" }}>Newcastle &amp; Sydney CBD, NSW, Australia</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm mt-1 block"
                style={{ color: "#F97316" }}
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </Section>
        </div>

        <p className="text-center text-xs mt-8" style={{ color: "#9CA3AF" }}>
          <Link href="/" style={{ color: "#F97316" }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-base font-bold mb-3" style={{ color: "#1B2E5C" }}>
        {title}
      </h2>
      <div
        className="text-sm leading-relaxed flex flex-col gap-2 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul]:list-none [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_li]:before:content-['·'] [&_li]:before:flex-shrink-0"
        style={{ color: "#6B7280" }}
      >
        {children}
      </div>
    </div>
  );
}
