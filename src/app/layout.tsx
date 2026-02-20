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

export const metadata: Metadata = {
  title: "Everestics | Building Inspections Newcastle & Sydney CBD",
  description:
    "Everestics is a trusted provider of comprehensive building inspection services for residential and commercial properties. Serving Newcastle and Sydney CBD.",
  keywords: "building inspection, pre-purchase inspection, handover inspection, Newcastle, Sydney, new build inspection, dilapidation report",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
