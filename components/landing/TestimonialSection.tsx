"use client";
import React, { useEffect, useState } from "react";
import { TestimonialData, LayananData } from "@/types";
import { testimonialAPI, layananAPI } from "@/lib/api-dummy";

export function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [layanan, setLayanan] = useState<LayananData[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [testimonialsResponse, layananResponse] = await Promise.all([
        testimonialAPI.getAll({ status: 'aktif' }),
        layananAPI.getAll({ status: 'aktif' })
      ]);
      
      if (testimonialsResponse.success && testimonialsResponse.data) {
        // Prioritize featured testimonials
        const sortedTestimonials = testimonialsResponse.data.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        setTestimonials(sortedTestimonials);
      }
      
      if (layananResponse.success && layananResponse.data) {
        setLayanan(layananResponse.data);
      }
      
      setLoading(false);
    };
    
    fetchData();
  }, []);

  // Auto slide testimonials
  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-2xl ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ⭐
      </span>
    ));
  };

  const getLayananNames = (layananIds: string[]) => {
    return layananIds
      .map(id => layanan.find(l => l.id === id)?.nama)
      .filter(Boolean);
  };

  if (loading || testimonials.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentData = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Kata Klien <span className="text-primary">Kami</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kepercayaan klien adalah motivasi terbesar kami. Simak cerita sukses 
            mereka yang telah mempercayakan perjalanan riset kepada Cognifera.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="md:flex">
              {/* Client Photo & Info */}
              <div className="md:w-1/3 bg-primary/10 p-8 md:p-12 flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mb-6 text-4xl">
                  👤
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {currentData.clientName}
                </h3>
                <p className="text-primary font-medium mb-1">
                  {currentData.position}
                </p>
                <p className="text-gray-600 text-sm mb-6">
                  {currentData.institution}
                </p>
                
                {/* Services Used */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Layanan yang digunakan:</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {getLayananNames(currentData.layananDigunakan).map((nama, index) => (
                      <span 
                        key={index}
                        className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {nama}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center space-x-1">
                  {renderStars(currentData.rating)}
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="md:w-2/3 p-8 md:p-12">
                {/* Quote Icon */}
                <div className="text-4xl text-primary/20 mb-6">&ldquo;</div>
                
                {/* Testimonial Text */}
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 font-medium italic">
                  {currentData.testimonialText}
                </blockquote>

                {/* Achievement */}
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg mb-6">
                  <h4 className="font-semibold text-green-800 mb-2">Hasil yang Dicapai:</h4>
                  <p className="text-green-700">{currentData.hasilDicapai}</p>
                </div>

                {/* Featured Badge */}
                {currentData.featured && (
                  <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                    ⭐ Featured Success Story
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={() => setCurrentTestimonial((prev) => 
                  prev === 0 ? testimonials.length - 1 : prev - 1
                )}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-2xl text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                ‹
              </button>
              <button
                onClick={() => setCurrentTestimonial((prev) => 
                  (prev + 1) % testimonials.length
                )}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-2xl text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Testimonial Indicators */}
        {testimonials.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-primary scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* All Testimonials Grid (Featured ones) */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-12">
            Lebih Banyak Cerita Sukses
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials
              .filter((t, index) => index !== currentTestimonial)
              .slice(0, 3)
              .map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => setCurrentTestimonial(
                    testimonials.findIndex(t => t.id === testimonial.id)
                  )}
                >
                  <div className="flex items-center space-x-1 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    &ldquo;{testimonial.testimonialText.slice(0, 120)}...&rdquo;
                  </p>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.clientName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.position} • {testimonial.institution}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-primary/10 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Siap Menjadi Success Story Selanjutnya?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Bergabunglah dengan ratusan peneliti yang telah mempercayakan perjalanan riset mereka kepada Cognifera.
            </p>
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Mulai Konsultasi
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}