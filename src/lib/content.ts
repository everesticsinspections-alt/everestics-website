import { prisma } from "./prisma";

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

const CONTENT_KEY = "site-content";

// Reads from PostgreSQL on every request — admin edits go live immediately.
// Falls back to the seed JSON file before the database is first populated.
export async function getContent(): Promise<SiteContent> {
  const row = await prisma.siteContent.findUnique({ where: { key: CONTENT_KEY } });
  if (row?.value) return row.value as SiteContent;

  // Fallback: read from the JSON file (works on first run before seeding)
  try {
    const { readFileSync } = await import("fs");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "src/data/site-content.json");
    return JSON.parse(readFileSync(filePath, "utf-8")) as SiteContent;
  } catch {
    throw new Error("Site content not found. Run: npm run db:seed");
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  await prisma.siteContent.upsert({
    where:  { key: CONTENT_KEY },
    update: { value: content as object },
    create: { key: CONTENT_KEY, value: content as object },
  });
}
