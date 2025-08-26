"use client";
import React, { useEffect, useState } from "react";
import { TestimonialData } from "@/types";
import { testimonialAPI } from "@/lib/api-dummy";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const testimonialsResponse = await testimonialAPI.getAll({ status: 'aktif' });
      
      if (testimonialsResponse.success && testimonialsResponse.data) {
        // Prioritize featured testimonials
        const sortedTestimonials = testimonialsResponse.data.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        setTestimonials(sortedTestimonials);
      }
      
      setLoading(false);
    };
    
    fetchData();
  }, []);

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

  // Transform testimonial data to match AnimatedTestimonials format
  const formattedTestimonials = testimonials.map((testimonial, index) => ({
    id: testimonial.id,
    quote: testimonial.testimonialText,
    name: testimonial.clientName,
    designation: `${testimonial.position} • ${testimonial.institution}`,
    src: index % 2 === 0 ? "/example-photo/people-1.png" : "/example-photo/people-2.png"
  }));

  return (
    <section id="testimonial" className="py-20 bg-white">
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

        {/* Animated Testimonials */}
        <AnimatedTestimonials testimonials={formattedTestimonials} autoplay={true} />

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-primary/10 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Siap Menjadi Success Story Selanjutnya?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Bergabunglah dengan ratusan peneliti yang telah mempercayakan perjalanan riset mereka kepada Cognifera.
            </p>
            <a
              href="https://wa.me/message/VRRB5IFQ7LQ4A1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block"
            >
              Mulai Konsultasi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}