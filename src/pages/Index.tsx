import HeroSection from "@/components/sections/HeroSection";
import UseCasesSection from "@/components/sections/UseCasesSection";
import AudienceSection from "@/components/sections/AudienceSection";
import PricingSection from "@/components/sections/PricingSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import PoliciesSection from "@/components/sections/PoliciesSection";
import FormSection from "@/components/sections/FormSection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <UseCasesSection />
      <AudienceSection />
      <PricingSection />
      <WhyUsSection />
      <PoliciesSection />
      <FormSection />
      <FooterSection />
    </main>
  );
};

export default Index;
