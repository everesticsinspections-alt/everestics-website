import nodemailer from "nodemailer";

// Initialise lazily so it only runs at request time (not during static build)
function getTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error("GMAIL_USER and GMAIL_APP_PASSWORD must be set.");
  const transporter = nodemailer.createTransport({
    service: "gmail",  // uses smtp.gmail.com:587 automatically
    auth: { user, pass },
  });
  return { transporter, from: `"Everestics" <${user}>` };
}

const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "";

// ─── Shared layout ────────────────────────────────────────────────────────────

function layout(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#F7F8FA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F8FA;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#F97316,#EA580C);border-radius:16px 16px 0 0;padding:28px 32px;">
              <p style="margin:0;font-size:22px;font-weight:800;color:#FFFFFF;letter-spacing:1px;">
                Ever<span style="opacity:0.85;">estics</span>
              </p>
              <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.75);letter-spacing:2px;text-transform:uppercase;">
                Building Inspections
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#FFFFFF;border-radius:0 0 16px 16px;padding:32px;border:1px solid #E8EAED;border-top:none;">
              ${body}
              <!-- Footer -->
              <table width="100%" style="margin-top:32px;padding-top:24px;border-top:1px solid #F3F4F6;">
                <tr>
                  <td>
                    <p style="margin:0;font-size:11px;color:#9CA3AF;line-height:1.6;">
                      Everestics Building Inspections · Newcastle &amp; Sydney CBD, Australia<br/>
                      This email was sent automatically. Please do not reply to this message.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:8px 12px;font-size:12px;color:#6B7280;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:8px 12px;font-size:13px;color:#1B2E5C;font-weight:500;">${value || "—"}</td>
    </tr>`;
}

function detailTable(rows: string) {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F8FA;border:1px solid #E8EAED;border-radius:12px;margin-top:20px;margin-bottom:20px;">
      ${rows}
    </table>`;
}

// ─── 1. Customer: Quote request confirmation ──────────────────────────────────

export function quoteConfirmationEmail(data: {
  name: string;
  service: string;
  address: string;
}) {
  const body = `
    <h2 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#1B2E5C;">
      Thanks, ${data.name.split(" ")[0]}!
    </h2>
    <p style="margin:0 0 20px;font-size:14px;color:#6B7280;line-height:1.6;">
      We've received your quote request and will review your details shortly.
      You can expect a reply within <strong style="color:#1B2E5C;">1–2 business days</strong>.
    </p>

    <div style="background:rgba(249,115,22,0.05);border:1px solid rgba(249,115,22,0.2);border-radius:12px;padding:16px 20px;margin-bottom:20px;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:#EA580C;">Your Request</p>
      <p style="margin:0;font-size:14px;color:#1B2E5C;font-weight:600;">${data.service}</p>
      <p style="margin:4px 0 0;font-size:13px;color:#6B7280;">${data.address}</p>
    </div>

    <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#1B2E5C;">What happens next</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${["Our team reviews your inspection requirements", "We prepare a tailored, itemised quote", "You receive it via email within 1–2 business days"].map((step, i) => `
      <tr>
        <td style="width:28px;vertical-align:top;padding:6px 0;">
          <span style="display:inline-flex;width:20px;height:20px;border-radius:50%;background:rgba(249,115,22,0.1);color:#F97316;font-size:11px;font-weight:700;text-align:center;line-height:20px;">${i + 1}</span>
        </td>
        <td style="padding:6px 0 6px 8px;font-size:13px;color:#6B7280;">${step}</td>
      </tr>`).join("")}
    </table>

    <p style="margin:24px 0 0;font-size:13px;color:#6B7280;">
      Questions in the meantime? Reply to this email or visit
      <a href="https://everestics.com.au/contact" style="color:#F97316;">everestics.com.au/contact</a>
    </p>
  `;
  return {
    subject: `We've received your quote request — Everestics`,
    html: layout("Quote Request Received — Everestics", body),
  };
}

// ─── 2. Owner: New quote request alert ───────────────────────────────────────

export function quoteAlertEmail(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string;
  propertyType: string;
  message?: string;
  preferredDate?: string;
}) {
  const body = `
    <h2 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#1B2E5C;">
      New Quote Request
    </h2>
    <p style="margin:0 0 20px;font-size:14px;color:#6B7280;">
      A new quote request has been submitted through your website.
    </p>

    ${detailTable(
      row("Name", data.name) +
      row("Email", `<a href="mailto:${data.email}" style="color:#F97316;">${data.email}</a>`) +
      row("Phone", data.phone) +
      row("Service", data.service) +
      row("Property", data.address) +
      row("Type", data.propertyType) +
      (data.preferredDate ? row("Preferred Date", data.preferredDate) : "") +
      (data.message ? row("Notes", data.message) : "")
    )}

    <a href="mailto:${data.email}?subject=Re: Your Everestics Quote Request"
       style="display:inline-block;background:linear-gradient(135deg,#F97316,#EA580C);color:#FFFFFF;font-size:13px;font-weight:600;padding:12px 24px;border-radius:10px;text-decoration:none;margin-top:4px;">
      Reply to ${data.name.split(" ")[0]}
    </a>
  `;
  return {
    subject: `New Quote Request — ${data.service}`,
    html: layout("New Quote Request", body),
  };
}

// ─── 3. Customer: Booking confirmation ───────────────────────────────────────

export function bookingConfirmationEmail(data: {
  name: string;
  service: string;
  address: string;
  date?: string;
  amountAud: number;
}) {
  const formatted = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(data.amountAud);
  const body = `
    <div style="text-align:center;padding:8px 0 24px;">
      <div style="display:inline-block;width:52px;height:52px;border-radius:50%;background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.25);line-height:52px;font-size:22px;margin-bottom:12px;">✓</div>
      <h2 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#1B2E5C;">Booking Confirmed!</h2>
      <p style="margin:0;font-size:14px;color:#6B7280;">
        Thanks, ${data.name.split(" ")[0]}. Your inspection has been booked and payment received.
      </p>
    </div>

    ${detailTable(
      row("Service", data.service) +
      row("Property", data.address) +
      (data.date ? row("Preferred Date", data.date) : "") +
      row("Amount Paid", `<span style="color:#16A34A;font-weight:700;">${formatted} AUD</span>`)
    )}

    <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#1B2E5C;">What happens next</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${[
        "Our team will contact you to confirm the exact inspection time",
        "A qualified inspector attends on the agreed date",
        "You receive a detailed written report within 24 hours of inspection",
      ].map((step, i) => `
      <tr>
        <td style="width:28px;vertical-align:top;padding:6px 0;">
          <span style="display:inline-flex;width:20px;height:20px;border-radius:50%;background:rgba(249,115,22,0.1);color:#F97316;font-size:11px;font-weight:700;text-align:center;line-height:20px;">${i + 1}</span>
        </td>
        <td style="padding:6px 0 6px 8px;font-size:13px;color:#6B7280;">${step}</td>
      </tr>`).join("")}
    </table>

    <p style="margin:24px 0 0;font-size:12px;color:#9CA3AF;">
      Keep this email as your booking receipt. Payment was processed securely by Stripe.
    </p>
  `;
  return {
    subject: `Booking Confirmed — ${data.service} | Everestics`,
    html: layout("Booking Confirmed — Everestics", body),
  };
}

// ─── 4. Owner: New booking + payment alert ────────────────────────────────────

export function bookingAlertEmail(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string;
  propertyType: string;
  date?: string;
  amountAud: number;
}) {
  const formatted = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(data.amountAud);
  const body = `
    <h2 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#1B2E5C;">
      New Booking + Payment Received
    </h2>
    <p style="margin:0 0 20px;font-size:14px;color:#6B7280;">
      A customer has completed a booking and payment through your website.
    </p>

    ${detailTable(
      row("Name", data.name) +
      row("Email", `<a href="mailto:${data.email}" style="color:#F97316;">${data.email}</a>`) +
      row("Phone", data.phone) +
      row("Service", data.service) +
      row("Property", data.address) +
      row("Type", data.propertyType) +
      (data.date ? row("Preferred Date", data.date) : "") +
      row("Amount Paid", `<span style="color:#16A34A;font-weight:700;">${formatted} AUD</span>`)
    )}

    <a href="mailto:${data.email}?subject=Re: Your Everestics Booking"
       style="display:inline-block;background:linear-gradient(135deg,#F97316,#EA580C);color:#FFFFFF;font-size:13px;font-weight:600;padding:12px 24px;border-radius:10px;text-decoration:none;margin-top:4px;">
      Contact ${data.name.split(" ")[0]} to Confirm Time
    </a>
  `;
  return {
    subject: `New Booking — ${data.service} — ${formatted}`,
    html: layout("New Booking Received", body),
  };
}

// ─── 5. Customer: Quote offer with payment link ───────────────────────────────

export function quoteOfferEmail(data: {
  name: string;
  service: string;
  amountAud: number;
  paymentLink: string;
}) {
  const formatted = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(data.amountAud);
  const body = `
    <h2 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#1B2E5C;">
      Your quote is ready, ${data.name.split(" ")[0]}!
    </h2>
    <p style="margin:0 0 20px;font-size:14px;color:#6B7280;line-height:1.6;">
      We've prepared a quote for your upcoming inspection. Review the details below and click the button to pay and lock in your date.
    </p>

    <div style="background:rgba(249,115,22,0.05);border:1px solid rgba(249,115,22,0.2);border-radius:12px;padding:20px 24px;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:#EA580C;">Your Quote</p>
      <p style="margin:0 0 4px;font-size:15px;color:#1B2E5C;font-weight:600;">${data.service}</p>
      <p style="margin:0;font-size:28px;font-weight:800;color:#F97316;">${formatted} AUD</p>
    </div>

    <a href="${data.paymentLink}"
       style="display:block;text-align:center;background:linear-gradient(135deg,#F97316,#EA580C);color:#FFFFFF;font-size:15px;font-weight:700;padding:16px 32px;border-radius:12px;text-decoration:none;margin-bottom:20px;">
      Pay &amp; Book Now →
    </a>

    <p style="margin:0 0 8px;font-size:12px;color:#9CA3AF;text-align:center;">
      This quote link expires in <strong style="color:#6B7280;">7 days</strong>. The amount is fixed and cannot be changed.
    </p>

    <table width="100%" style="margin-top:16px;background:#F7F8FA;border:1px solid #E8EAED;border-radius:12px;">
      <tr>
        <td style="padding:12px 16px;font-size:12px;color:#6B7280;">What happens next</td>
      </tr>
      ${["Complete payment using the button above", "We contact you within 4 hours to confirm your inspection date and time", "Receive your detailed report within 24 hours of the inspection"].map((step, i) => `
      <tr>
        <td style="padding:6px 16px 6px 20px;font-size:13px;color:#374151;">
          <span style="color:#F97316;font-weight:700;">${i + 1}.</span> ${step}
        </td>
      </tr>`).join("")}
      <tr><td style="padding:8px 0;"></td></tr>
    </table>
  `;
  return {
    subject: `Your Everestics inspection quote — ${formatted} AUD`,
    html: layout("Your Quote — Everestics", body),
  };
}

// ─── Send helpers ─────────────────────────────────────────────────────────────

export async function sendQuoteEmails(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string;
  propertyType: string;
  message?: string;
  preferredDate?: string;
}) {
  const { transporter, from } = getTransport();
  const customer = quoteConfirmationEmail(data);
  const owner = quoteAlertEmail(data);

  await Promise.all([
    transporter.sendMail({ from, to: data.email, ...customer }),
    ...(OWNER_EMAIL ? [transporter.sendMail({ from, to: OWNER_EMAIL, ...owner })] : []),
  ]);
}

export async function sendQuoteOffer(data: {
  name: string;
  email: string;
  service: string;
  amountAud: number;
  paymentLink: string;
}) {
  const { transporter, from } = getTransport();
  const email = quoteOfferEmail(data);
  await transporter.sendMail({ from, to: data.email, ...email });
}

export async function sendBookingEmails(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string;
  propertyType: string;
  date?: string;
  amountAud: number;
}) {
  const { transporter, from } = getTransport();
  const customer = bookingConfirmationEmail(data);
  const owner = bookingAlertEmail(data);

  await Promise.all([
    transporter.sendMail({ from, to: data.email, ...customer }),
    ...(OWNER_EMAIL ? [transporter.sendMail({ from, to: OWNER_EMAIL, ...owner })] : []),
  ]);
}
