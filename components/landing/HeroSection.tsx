"use client";
import React from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full bg-white overflow-hidden">
      <BackgroundRippleEffect />
      
      {/* Language Toggle - Top Right */}
      <div className="absolute top-8 right-8 z-20">
        <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200/50">
          <Button variant="secondary" size="sm" className="rounded-full">
            ID
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full">
            EN
          </Button>
        </div>
      </div>

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

          {/* Right Image/Illustration */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Image Placeholder - Letakkan gambar Anda di sini */}
            <div className="relative w-full max-w-lg">
              {/* Main Card/Dashboard Mockup */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-500">Research Dashboard</div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Research Analytics</h3>
                    <p className="text-gray-600 text-sm">Track your publication journey</p>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 rounded-2xl p-4">
                      <div className="text-2xl font-bold text-primary">12</div>
                      <div className="text-xs text-gray-600">Publications</div>
                    </div>
                    <div className="bg-secondary/20 rounded-2xl p-4">
                      <div className="text-2xl font-bold text-yellow-600">3.2</div>
                      <div className="text-xs text-gray-600">Impact Factor</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="text-sm text-gray-700 font-medium">Research Progress</div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <div className="text-xs text-gray-500">75% Complete</div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
                      Start New Research
                    </button>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                        Analytics
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                        Export
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-secondary/90 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                🏆 Published!
              </div>
              <div className="absolute -bottom-4 -left-4 bg-tertiary/90 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                📊 Analytics
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl -z-10"></div>
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
