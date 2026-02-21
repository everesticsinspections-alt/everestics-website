import { readFileSync } from "fs";
import path from "path";

export type ServiceItem = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  includes: string[];
  audience: string;
  popular: boolean;
};

export type WhyUsFeature = {
  title: string;
  description: string;
};

export type SiteContent = {
  contact: { phone: string; email: string; address: string };
  businessHours: string;
  tagline: string;
  hero: { headline: string; subheadline: string };
  about: { storyP1: string; storyP2: string };
  whyUs: WhyUsFeature[];
  services: ServiceItem[];
  faqs: { question: string; answer: string }[];
  serviceAreas: string[];
};

// Reads fresh on every request so admin edits show immediately without redeploy.
export function getContent(): SiteContent {
  const filePath = path.join(process.cwd(), "src/data/site-content.json");
  return JSON.parse(readFileSync(filePath, "utf-8")) as SiteContent;
}
