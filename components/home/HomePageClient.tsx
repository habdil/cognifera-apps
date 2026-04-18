"use client";

import { LayananSection } from "@/components/landing/LayananSection";
import { PromoSection } from "@/components/landing/PromoSection";
import { TestimonialSection } from "@/components/landing/TestimonialSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { HeroSection } from "@/components/landing/HeroSection";

export function HomePageClient() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <LayananSection />
      <PromoSection />
      <TestimonialSection />
      <ContactSection />
    </main>
  );
}