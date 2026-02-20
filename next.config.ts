import type { NextConfig } from "next";

const securityHeaders = [
  // Strict HTTPS for 2 years, including subdomains
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Prevent MIME-type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Stop browsers leaking referrer to third-party sites
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Limit browser features we don't use
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // Content Security Policy
  // Stripe requires:
  //   script-src  → https://js.stripe.com
  //   connect-src → https://api.stripe.com  https://*.stripe.com
  //   frame-src   → https://js.stripe.com  https://hooks.stripe.com
  //   img-src     → https://*.stripe.com
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: self, Next.js inline chunks, Stripe.js
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
      // Styles: self + inline (Tailwind injects inline styles)
      "style-src 'self' 'unsafe-inline'",
      // Images: self, data URIs, Stripe, Unsplash CDN
      "img-src 'self' data: blob: https://*.stripe.com https://images.unsplash.com",
      // Fonts: self
      "font-src 'self'",
      // API calls: self, Stripe API
      "connect-src 'self' https://api.stripe.com https://*.stripe.com",
      // iframes (Stripe PaymentElement renders inside an iframe)
      "frame-src https://js.stripe.com https://hooks.stripe.com",
      // Workers: none
      "worker-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
