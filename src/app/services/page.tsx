import { getContent } from "@/lib/content";
import { ServicesContent } from "./ServicesContent";

export default async function ServicesPage() {
  const content = await getContent();
  return <ServicesContent services={content.services} />;
}
