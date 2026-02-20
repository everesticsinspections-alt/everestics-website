# Deployment Guide — Everestics

## Platform: Vercel (recommended for Next.js)

Vercel gives you automatic HTTPS, CDN, preview deployments, and zero-config Next.js support.
The free Hobby plan is sufficient for a small business site.

---

## Step 1 — Push code to GitHub

```bash
# From your project folder
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/everestics-website.git
git push -u origin main
```

---

## Step 2 — Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up / Log in with GitHub
2. Click **Add New → Project**
3. Import your `everestics-website` repository
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy** — first deploy takes ~2 minutes

---

## Step 3 — Add Environment Variables

In Vercel → Project → Settings → Environment Variables, add:

| Variable | Value | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` | [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys) |
| `STRIPE_SECRET_KEY` | `sk_live_...` | Same as above |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Step 5 below |
| `RESEND_API_KEY` | `re_...` | [Resend → API Keys](https://resend.com/api-keys) |
| `RESEND_FROM_EMAIL` | `Everestics <noreply@yourdomain.com.au>` | After domain verification |
| `OWNER_EMAIL` | `owner@youremail.com` | Your email |
| `ADMIN_PASSWORD` | `your-strong-password` | Choose a strong password |
| `ADMIN_SESSION_TOKEN` | (random 64-char string) | Run: `openssl rand -hex 32` |

> **Important:** Use `pk_live_` and `sk_live_` Stripe keys in production (not test keys).

---

## Step 4 — Connect your domain

Your client already has a domain. In Vercel:

1. Project → Settings → Domains
2. Click **Add Domain** → Enter `everestics.com.au` (or whatever the domain is)
3. Vercel will show you two DNS records to add:
   - **A record**: `@` → `76.76.21.21`
   - **CNAME record**: `www` → `cname.vercel-dns.com`
4. Add these in your domain registrar's DNS settings (GoDaddy / Namecheap / Google Domains etc.)
5. HTTPS certificate is provisioned automatically within minutes

---

## Step 5 — Set up Stripe Webhook

This ensures payment confirmations are processed server-side even if a browser closes.

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. URL: `https://yourdomain.com.au/api/webhooks/stripe`
4. Events to listen for: `payment_intent.succeeded`
5. Copy the **Signing secret** (`whsec_...`)
6. Paste it as `STRIPE_WEBHOOK_SECRET` in Vercel env vars
7. Redeploy (Vercel → Deployments → Redeploy)

---

## Step 6 — Verify Resend domain

So emails come from `noreply@yourdomain.com.au` rather than a generic address:

1. Go to [Resend → Domains](https://resend.com/domains)
2. Add your domain
3. Add the TXT/MX records shown to your domain's DNS
4. Update `RESEND_FROM_EMAIL` in Vercel to use your verified domain

> During testing, you can use `onboarding@resend.dev` as the from address.

---

## Step 7 — Admin dashboard

The admin dashboard is at `yourdomain.com.au/admin`.

> **Production note on content editing:** The `/admin/content` editor writes to `src/data/site-content.json`.
> This works locally in development. In production on Vercel (serverless), file writes are not persisted.
> To enable production content editing, replace the file-system approach with **Vercel KV**:
> - Install: `npm install @vercel/kv`
> - Update `src/app/api/admin/content/route.ts` to use `kv.get` / `kv.set`
> - Add a free KV store in Vercel → Storage → KV

---

## Local development checklist

```bash
# 1. Copy env file
cp .env.local.example .env.local
# 2. Fill in your Stripe test keys and Resend key
# 3. Start dev server
npm run dev
# 4. Test Stripe webhook locally (install Stripe CLI first)
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
