import { getContent } from "@/lib/content";
import { ServicesContent } from "./ServicesContent";

export default function ServicesPage() {
  const content = getContent();
  return <ServicesContent services={content.services} />;
}
