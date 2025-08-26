"use client";
import React from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full bg-white overflow-hidden">
      <BackgroundRippleEffect />

      <div className="container mx-auto px-6 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Logo/Brand */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary">
                COGNIFERA
              </h1>
              <div className="w-20 h-1 bg-primary rounded-full"></div>
            </div>

            {/* Tagline */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 leading-tight">
              Dari Data ke Publikasi,<br />
              <span className="text-primary">Kami Bersama Anda</span>
            </h2>

            {/* Value Proposition */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
              Platform layanan penelitian terintegrasi yang mengubah perjalanan riset Anda menjadi publikasi berkualitas internasional.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8 font-semibold text-lg shadow-lg hover:shadow-xl">
                Konsultasi Gratis
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 font-semibold text-lg">
                Lihat Layanan
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-gray-600">Klien Terlayani</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">200+</div>
                <div className="text-sm text-gray-600">Publikasi Berhasil</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-3xl">
                {/* Main Hero Image */}
                <div className="relative -translate-y-15">
                <img 
                  src="/hero/hero-section.png" 
                  alt="Cognifera Services - Research Platform"
                  className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105 drop-shadow-2xl relative z-10"
                />
                
                {/* Floating UI Cards */}
                <div className="absolute top-5 left-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 animate-float">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Research Active</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">4 Services Online</div>
                </div>

                <div className="absolute top-20 right-8 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 animate-float-delayed">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">95%</div>
                    <div className="text-xs text-gray-600">Success Rate</div>
                  </div>
                </div>

                <div className="absolute bottom-10 left-8 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 animate-float">
                  <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs">📊</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">Analytics</div>
                    <div className="text-xs text-gray-500">Real-time data</div>
                  </div>
                  </div>
                </div>

                <div className="absolute bottom-8 right-12 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 animate-float-delayed">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                      <span className="text-xs">🏆</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">Publications</div>
                      <div className="text-xs text-gray-500">200+ completed</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Geometric Shapes */}
              <div className="absolute top-12 right-4 w-24 h-24 border-2 border-primary/20 rounded-3xl rotate-12 -z-10"></div>
              <div className="absolute bottom-20 left-12 w-16 h-16 border-2 border-secondary/30 rounded-2xl -rotate-12 -z-10"></div>
              <div className="absolute top-1/2 left-0 w-8 h-32 bg-tertiary/10 rounded-full -z-10"></div>
              <div className="absolute bottom-4 right-0 w-20 h-8 bg-primary/10 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
