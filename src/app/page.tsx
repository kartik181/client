import BgGraident from "@/components/common/BgGraident";
import CTASection from "@/components/home/CTASection";
import DemoSection from "@/components/home/DemoSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorkSection from "@/components/home/HowItWorks";
import PricingSection from "@/components/home/PricingSection";
export default function Home() {
  return (
    <div className="relative w-full">
      <BgGraident />
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <HowItWorkSection />
        <PricingSection />
        <CTASection />
      </div>
    </div>
  );
}
