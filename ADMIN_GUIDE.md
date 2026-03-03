# Everestics — Website Admin Guide

This guide covers everything you need to manage your website on your own — no developer required.

---

## Table of Contents

1. [Logging In](#1-logging-in)
2. [Dashboard Overview](#2-dashboard-overview)
3. [Managing Quote Requests](#3-managing-quote-requests)
4. [Sending a Quote to a Customer](#4-sending-a-quote-to-a-customer)
5. [Sending a Manual Quote (Phone/Walk-In Customers)](#5-sending-a-manual-quote-phonewalkin-customers)
6. [Viewing Bookings](#6-viewing-bookings)
7. [Viewing Earnings & Revenue](#7-viewing-earnings--revenue)
8. [Editing Website Content](#8-editing-website-content)
9. [What You Can Change vs. What Needs a Developer](#9-what-you-can-change-vs-what-needs-a-developer)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Logging In

1. Open your website in a browser
2. Go to: `yourwebsite.com.au/admin`
3. Enter your admin password
4. Click **Login**

You will be taken to your admin dashboard automatically.

> **Your password:** Keep this safe. Do not share it with anyone you don't fully trust.
>
> **Logged out automatically?** Sessions expire after 7 days. Just log in again.

---

## 2. Dashboard Overview

When you log in, you'll see the main dashboard with:

| Card | What it shows |
|------|---------------|
| **Total Bookings** | Every booking ever paid through the website |
| **This Month** | Bookings made in the current calendar month |
| **Week Revenue** | Money received in the last 7 days |
| **Month Revenue** | Money received this calendar month |
| **Total Revenue** | All revenue ever received through the site |
| **Quote Requests** | Number of pending enquiries waiting for a reply |

Below the cards you'll also see:
- **Recent Bookings** — the last 5 completed payments
- **Top Services** — which services are generating the most revenue

The left sidebar has links to every section:
- **Dashboard** — overview (you are here)
- **Bookings** — full list of all paid bookings
- **Earnings** — detailed revenue breakdown
- **Quotes** — customer enquiries and quote management
- **Site Content** — edit your website text

---

## 3. Managing Quote Requests

When a customer fills out the quote form on your website, you'll receive an email alert and the enquiry will appear here.

### How to view quote requests:
1. Click **Quotes** in the left sidebar
2. You'll see a list of all enquiries with their status:
   - 🟠 **Pending Reply** — you haven't sent a quote yet
   - 🔵 **Quote Sent** — you've emailed them a payment link
   - 🟢 **Booked** — they've paid

### How to see full details of an enquiry:
- Click anywhere on the row to expand it
- You'll see the customer's email, phone, address, property type, preferred date, and any message they wrote

### Status colours at a glance:
```
🟠 Pending Reply  →  New enquiry, needs action
🔵 Quote Sent     →  Awaiting payment from customer
🟢 Booked         →  Payment received, job confirmed
```

---

## 4. Sending a Quote to a Customer

After reviewing an enquiry, here's how to send the customer a quote with a payment link:

1. Click on the customer's row to expand it
2. Find the **"Send Quote"** section within the expanded row
3. Enter the dollar amount (e.g. `450` for $450.00)
4. Click **Send Quote**

**What happens automatically:**
- The customer receives a professional email with your quoted price
- The email contains a secure **"Pay & Book Now"** button
- When they click it, they're taken directly to your payment page with the amount pre-filled
- Once they pay, you receive a booking confirmation email and their status changes to "Booked"
- The payment link expires after **7 days** — if they haven't paid, you'll need to send a new quote

> **Important:** The amount you enter is what the customer will be charged. Double-check before sending.

---

## 5. Sending a Manual Quote (Phone/Walk-In Customers)

If a customer contacts you by phone, email, or in person (not through the website form), you can still generate a secure payment link for them.

1. Click **Quotes** in the sidebar
2. Scroll down to the **"Manual Quote"** section
3. Select the service type (click the icon)
4. Enter the customer's **name** and **email**
5. Enter the **dollar amount**
6. Click **Generate Payment Link**

A secure link will appear that you can copy and paste into an email or SMS to send directly to the customer. When they pay, you receive the same confirmation email as normal website bookings.

---

## 6. Viewing Bookings

This page shows every customer who has completed a payment through your website.

1. Click **Bookings** in the sidebar
2. You'll see a calendar at the top showing which dates have bookings
3. Below the calendar is the full bookings list

Each booking shows:
- **Service** booked
- **Customer name, phone number, email**
- **Property address**
- **Amount paid**
- **Date payment was made**

> This data comes directly from Stripe (your payment processor) and is always accurate.

---

## 7. Viewing Earnings & Revenue

1. Click **Earnings** in the sidebar
2. Use the period buttons at the top to filter:
   - **Today** / **This Week** / **This Month** / **This Year** / **All Time**
3. The summary cards update to show revenue and booking count for that period

Below the summary you'll see:
- **Revenue by service** — which inspection types are most popular
- **Full transactions list** — every payment with date, customer, service, address, and amount

You can also export this data using the **Export** button (saves as a spreadsheet).

---

## 8. Editing Website Content

This is where you can change almost any text on the public website — no coding required.

### How to edit content:
1. Click **Site Content** in the sidebar
2. Find the section you want to edit (they are clearly labelled)
3. Click into any field and type your changes
4. When you're done, click the orange **Save Changes** button in the top right
5. Your changes go live on the website **immediately**

---

### What each section controls:

#### Hero Section
The large headline and paragraph text visitors see first on the homepage.
- **Headline** — the big bold text (e.g. "Building Inspections You Can Trust.")
- **Subheadline** — the paragraph below it

#### Contact Details
Your phone number, email address, and location shown across the website.
- If you change your phone number here, it updates everywhere on the site at once

#### Business Hours
The opening hours shown on your contact page.
- Format example: `Monday – Saturday: 9am – 6pm`

#### About Page — Our Story
The two paragraphs that tell your company's story on the About page.

#### Why Us — Feature Cards
The six selling-point cards shown on the homepage (e.g. "Independent & Unbiased", "24hr Reports").
- You can edit the **title** and **description** of each card

#### Services
All six inspection services. For each one you can edit:
- **Title** — the service name
- **Tagline** — the short phrase below the title
- **Audience** — who this service is for (e.g. "Buyers")
- **Description** — the full paragraph explaining the service
- **What's Included** — the bullet point list (you can add or remove items)
- **Most Requested** checkbox — tick this to highlight the service as popular

> To expand a service for editing, click on its name.

#### Business Tagline
A short description of Everestics used in various places across the site.

#### Service Areas
The locations you service, shown as tags.
- Click any area to rename it
- Click the trash icon to remove it
- Click **+ Add** to add a new location

#### Frequently Asked Questions
The Q&A section shown on the Pricing page.
- Edit any existing question or answer
- Click **+ Add FAQ** to create a new one
- Click the trash icon to remove a question

---

### Golden rule: always click "Save Changes"

Changes are **not saved automatically**. If you close the page or navigate away before saving, your changes will be lost. Always click the orange **Save Changes** button when you're done editing.

---

## 9. What You Can Change vs. What Needs a Developer

### You can change these yourself:
- ✅ Any text on the website (headlines, descriptions, about page, FAQs)
- ✅ Your phone number, email, address, business hours
- ✅ Service names, descriptions, prices (via quotes)
- ✅ Service areas (add/remove locations)
- ✅ FAQ questions and answers
- ✅ Which service is marked as "Most Requested"

### These require a developer:
- ❌ Changing photos or images
- ❌ Changing colours, fonts, or layout
- ❌ Adding a completely new page
- ❌ Changing how payments work
- ❌ Adding new features or forms
- ❌ Changing the logo

---

## 10. Troubleshooting

### "I can't log in"
- Double-check your password (it's case-sensitive)
- Try clearing your browser's cookies and logging in again
- If you've forgotten the password, contact your developer to reset it

### "I saved content but the website still shows old text"
- Try a hard refresh: press **Ctrl + Shift + R** (Windows) or **Cmd + Shift + R** (Mac)
- If it still shows old text after 60 seconds, contact your developer

### "A customer says they can't pay / the payment link isn't working"
- Payment links expire after **7 days** — send a new quote
- Make sure the customer is using the full link (it's long — check it wasn't cut off in an email or SMS)

### "I don't see a recent booking in the Bookings page"
- The bookings page only shows **completed payments**. If a customer filled out the form but didn't pay, they'll appear in **Quotes** instead
- Wait a few minutes and refresh — sometimes Stripe takes a moment to process

### "The Save button isn't working on Site Content"
- Make sure you're connected to the internet
- Try refreshing the page, make your edits again, and save

---

## Contact Your Developer

If you need something that's beyond what's listed in this guide, reach out to your developer with as much detail as possible about what you'd like to change.

---

*Last updated: March 2026*
