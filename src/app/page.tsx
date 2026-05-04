import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ComparisonSlider } from "@/components/ComparisonSlider";
import { ComunidadVIP } from "@/components/ComunidadVIP";
import { CursosSection } from "@/components/CursosSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ExpertSection } from "@/components/ExpertSection";
import { GuaranteeSection } from "@/components/GuaranteeSection";
import { PresencialesSection } from "@/components/PresencialesSection";
import { RealEstateSection } from "@/components/RealEstateSection";
import { BackgroundPatterns } from "@/components/BackgroundPatterns";

import { FAQSection } from "@/components/FAQSection";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <BackgroundPatterns />
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <ComparisonSlider />
        <ComunidadVIP />
        <CursosSection />
        <PresencialesSection />
        <RealEstateSection />
        <TestimonialsSection />
        <ExpertSection />
        <GuaranteeSection />
        <FAQSection />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
