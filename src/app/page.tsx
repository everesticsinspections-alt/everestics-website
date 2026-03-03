import { Hero } from "@/components/home/Hero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Stats } from "@/components/home/Stats";
import { WhyUs } from "@/components/home/WhyUs";
import { CTASection } from "@/components/home/CTASection";
import { getContent } from "@/lib/content";

export default async function Home() {
  const content = await getContent();
  return (
    <>
      <Hero headline={content.hero.headline} subheadline={content.hero.subheadline} />
      <Stats />
      <ServicesGrid services={content.services} />
      <WhyUs features={content.whyUs} />
      <CTASection />
    </>
  );
}
