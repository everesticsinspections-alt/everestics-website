import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Seed site content from the existing JSON file
  const contentPath = path.join(process.cwd(), "src/data/site-content.json");
  const content = JSON.parse(readFileSync(contentPath, "utf-8"));

  await prisma.siteContent.upsert({
    where:  { key: "site-content" },
    update: { value: content },
    create: { key: "site-content", value: content },
  });

  console.log("✅ Site content seeded");
  console.log("✅ Database ready — quotes table is empty and ready for production use");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
