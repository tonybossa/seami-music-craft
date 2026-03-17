import SEOStructuredData from "@/components/SEOStructuredData";
import HeroSection from "@/components/sections/HeroSection";
import UseCasesSection from "@/components/sections/UseCasesSection";
import AudienceSection from "@/components/sections/AudienceSection";
import PricingSection from "@/components/sections/PricingSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import PoliciesSection from "@/components/sections/PoliciesSection";
import FAQSection from "@/components/sections/FAQSection";
import FormSection from "@/components/sections/FormSection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEOStructuredData />
      <HeroSection />
      <UseCasesSection />
      <AudienceSection />
      <PricingSection />
      <WhyUsSection />
      <PoliciesSection />
      <FAQSection />
      <FormSection />
      <FooterSection />
    </main>
  );
};

export default Index;
