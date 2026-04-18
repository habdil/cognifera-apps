"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SplitText from "@/components/ui/split-text";
import { ArrowRight, MessageCircle, ChevronDown } from "lucide-react";

const heroImages = [
  "/hero-carousel/hero-library.jpg",
  "/hero-carousel/hero-research.jpg",
  "/hero-carousel/hero-academic.jpg",
  "/hero-carousel/hero-science.jpg",
];

const SLIDE_DURATION = 5000; // ms

const stats = [
  { value: "10+", label: "Klien Terlayani" },
  { value: "5+", label: "Publikasi Berhasil" },
  { value: "95%", label: "Success Rate" },
  { value: "3+", label: "Tahun Pengalaman" },
];

const socialProofImages = [
  "/social-proof/Asih Luklu Susiati.jpeg",
  "/social-proof/Zakia Asrifah Ramly.jpeg",
  "/social-proof/Oriny Tri Ananda.jpeg",
  "/social-proof/Hikmah Nur Fadillah.jpeg",
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
      setProgress(0);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  // Progress bar tick (every 50ms)
  useEffect(() => {
    setProgress(0);
    const tick = setInterval(() => {
      setProgress((prev) => Math.min(prev + (50 / SLIDE_DURATION) * 100, 100));
    }, 50);
    return () => clearInterval(tick);
  }, [current]);

  const goToSlide = (i: number) => {
    setCurrent(i);
    setProgress(0);
  };

  const scrollToServices = () => {
    document.getElementById("layanan")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen w-full flex flex-col"
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* Background images — crossfade */}
      <div className="absolute inset-0 overflow-hidden">
        {heroImages.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover object-center"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/75" />
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex items-center z-10">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">

            {/* Eyebrow label */}
            <div className="inline-flex items-center gap-2 border border-white/30 text-white/70 px-4 py-1.5 text-[11px] font-medium tracking-[0.15em] uppercase mb-10">
              <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
              Platform Riset Terintegrasi di Indonesia
            </div>

            {/* Main Headline */}
            <SplitText
              text="Dari Riset hingga Publikasi Jurnal & Penerbitan Buku"
              tag="h1"
              className="text-4xl md:text-5xl lg:text-[3.75rem] font-bold text-white leading-[1.1] tracking-tight mb-8"
              splitType="words"
              delay={80}
              duration={0.7}
              ease="power3.out"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.2}
              itemProp="name"
            />

            {/* Accent line */}
            <div className="w-10 h-[2px] bg-primary mx-auto mb-8" />

            {/* Subheadline */}
            <p
              className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-12"
              itemProp="description"
            >
              Satu-satunya platform terintegrasi yang mendampingi perjalanan lengkap riset Anda — dari bimbingan penelitian, publikasi jurnal internasional, hingga penerbitan buku ilmiah.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
              <a href="https://wa.me/message/VRRB5IFQ7LQ4A1">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 h-12 rounded-none font-medium text-sm tracking-wide gap-2 w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4" />
                  Konsultasi Gratis
                </Button>
              </a>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToServices}
                className="border-white/40 text-white hover:bg-white hover:text-gray-900 px-8 h-12 rounded-none font-medium text-sm tracking-wide gap-2 bg-transparent cursor-pointer"
              >
                Lihat Layanan
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-3">
              <div className="flex -space-x-2">
                {socialProofImages.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Peneliti"
                    className="w-8 h-8 rounded-full border-2 border-white/30 object-cover"
                  />
                ))}
                <div className="w-8 h-8 bg-white/20 border-2 border-white/30 rounded-full flex items-center justify-center text-white text-[10px] font-semibold">
                  +6
                </div>
              </div>
              <span className="text-sm text-white/60">Bergabung dengan peneliti Indonesia</span>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-4">
        <button
          onClick={scrollToServices}
          className="flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
          aria-label="Scroll ke layanan"
        >
          <span className="text-[10px] tracking-[0.15em] uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>

      {/* Carousel progress indicators */}
      <div className="relative z-10 flex justify-center gap-2 pb-5">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="h-[2px] bg-white/20 overflow-hidden relative"
            style={{ width: i === current ? 48 : 16 }}
            aria-label={`Slide ${i + 1}`}
          >
            {i === current && (
              <span
                className="absolute inset-y-0 left-0 bg-primary"
                style={{ width: `${progress}%` }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Stats strip */}
      <div className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((stat, i) => (
              <div key={i} className="py-7 text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[11px] text-white/50 tracking-[0.12em] uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
