"use client";

import { AboutSection } from "@/components/landing/AboutSection";
import { LayananSection } from "@/components/landing/LayananSection";
import { PromoSection } from "@/components/landing/PromoSection";
import { TestimonialSection } from "@/components/landing/TestimonialSection";
import { BeritaSection } from "@/components/landing/BeritaSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { HeroSection } from "@/components/landing/HeroSection";

export function HomePageClient() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <LayananSection />
      <PromoSection />
      <TestimonialSection />
      <BeritaSection />
      <ContactSection />
    </main>
  );
}