import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://www.everestics.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Everestics | Building Inspections Newcastle & Sydney CBD",
    template: "%s | Everestics",
  },
  description:
    "Everestics delivers independent, licensed building inspections for buyers, sellers, and developers across Newcastle and Sydney CBD. Reports within 24 hours.",
  keywords:
    "building inspection, pre-purchase inspection, handover inspection, Newcastle, Sydney CBD, new build stage inspection, termite pest inspection, licensed inspector NSW",
  authors: [{ name: "Everestics" }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: BASE_URL,
    siteName: "Everestics",
    title: "Everestics | Building Inspections Newcastle & Sydney CBD",
    description:
      "Independent, licensed building inspections across Newcastle and Sydney CBD. Clear reports delivered within 24 hours.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Everestics Building Inspections",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Everestics | Building Inspections Newcastle & Sydney CBD",
    description:
      "Independent, licensed building inspections across Newcastle and Sydney CBD. Clear reports delivered within 24 hours.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
