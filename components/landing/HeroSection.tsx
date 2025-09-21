"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import SplitText from "@/components/ui/split-text";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full bg-gray-50 overflow-hidden">
      <BackgroundRippleEffect />
      <div className="container mx-auto px-6 pt-8">
        <div className="relative pt-10 flex items-center justify-center">
          
          {/* Center Content - Main Hero */}
          <div className="text-center max-w-4xl mx-auto space-y-8 relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              Platform Riset Terintegrasi di Indonesia
            </div>

            {/* Main Headline */}
            <SplitText
              text="Dari Riset hingga Publikasi Jurnal & Penerbitan Buku"
              tag="h1"
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight hero-headline"
              splitType="words"
              delay={100}
              duration={0.8}
              ease="power3.out"
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.2}
            />

            {/* Subheadline */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Satu-satunya platform terintegrasi yang mendampingi perjalanan lengkap riset Anda: dari bimbingan penelitian, publikasi jurnal internasional, hingga penerbitan buku ilmiah.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-white hover:text-primary hover:border-1 text-white px-8 py-4 rounded-lg font-semibold text-lg">
                Konsultasi Gratis
              </Button>
              <Button variant="outline" size="lg" className="border-1 text-primary px-8 py-4 rounded-lg font-semibold text-lg">
                Lihat Layanan
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-4 pt-6">
              <div className="flex -space-x-2">
                <img 
                  src="/social-proof/Asih Luklu Susiati.jpeg" 
                  alt="Peneliti" 
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="/social-proof/Zakia Asrifah Ramly.jpeg" 
                  alt="Peneliti" 
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="/social-proof/Oriny Tri Ananda.jpeg" 
                  alt="Peneliti" 
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="/social-proof/Hikmah Nur Fadillah.jpeg" 
                  alt="Peneliti" 
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <div className="w-10 h-10 bg-primary rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  +6
                </div>
              </div>
              <span className="text-gray-600 font-medium">Menjadi bagian peneliti Indonesia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
