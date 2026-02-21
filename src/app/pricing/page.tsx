import { getContent } from "@/lib/content";
import { PricingContent } from "./PricingContent";

export default function PricingPage() {
  const content = getContent();
  return (
    <PricingContent
      services={content.services}
      faqs={content.faqs}
      phone={content.contact.phone}
    />
  );
}
