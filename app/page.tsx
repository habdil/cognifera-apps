
import { Navbar } from "@/components/shared/Navbar";
import { AboutSection } from "@/components/landing/AboutSection";
import { LayananSection } from "@/components/landing/LayananSection";
import { PromoSection } from "@/components/landing/PromoSection";
import { TestimonialSection } from "@/components/landing/TestimonialSection";
import { BeritaSection } from "@/components/landing/BeritaSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { Footer } from "@/components/shared/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <LayananSection />
        <PromoSection />
        <TestimonialSection />
        <BeritaSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
