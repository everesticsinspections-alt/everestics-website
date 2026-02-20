import { Hero } from "@/components/home/Hero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Stats } from "@/components/home/Stats";
import { WhyUs } from "@/components/home/WhyUs";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesGrid />
      <WhyUs />
      <CTASection />
    </>
  );
}
