import { getContent } from "@/lib/content";
import { PricingContent } from "./PricingContent";

export default async function PricingPage() {
  const content = await getContent();
  return (
    <PricingContent
      services={content.services}
      faqs={content.faqs}
      phone={content.contact.phone}
    />
  );
}
