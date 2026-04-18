"use client";
import React, { useEffect, useState } from "react";
import { TestimonialData } from "@/types";
import { testimonialAPI } from "@/lib/api-dummy";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { ArrowRight } from "lucide-react";

const socialProofData = [
  { name: "Asih Luklu Susiati", position: "Dosen", institution: "Universitas Negeri Malang", photo: "/social-proof/Asih Luklu Susiati.jpeg" },
  { name: "Zakia Asrifah Ramly", position: "Dosen", institution: "Universitas Negeri Malang", photo: "/social-proof/Zakia Asrifah Ramly.jpeg" },
  { name: "Oriny Tri Ananda", position: "Peneliti", institution: "Universitas Negeri Malang", photo: "/social-proof/Oriny Tri Ananda.jpeg" },
  { name: "Hikmah Nur Fadillah", position: "Peneliti", institution: "Universitas Negeri Malang", photo: "/social-proof/Hikmah Nur Fadillah.jpeg" },
  { name: "Fitrah Amalia Salim", position: "Peneliti", institution: "Universitas Negeri Malang", photo: "/social-proof/Fitrah Amalia Salim.jpeg" },
  { name: "Arifah Novia Arifin", position: "Dosen", institution: "Universitas Negeri Malang", photo: "/social-proof/Arifah Novia Arifin.jpeg" },
  { name: "Dr. Hardianto", position: "Direktur", institution: "PT Cognifera Education Academy", photo: "/social-proof/Hardianto.jpeg" },
  { name: "Maisuna Kundariati", position: "Dosen", institution: "Universitas Negeri Malang", photo: "/social-proof/Maisuna Kundariati.jpeg" },
  { name: "Wahyudi Jasman", position: "Peneliti", institution: "Universitas Negeri Malang", photo: "/social-proof/Wahyudi Jasman.jpg" },
];

export function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await testimonialAPI.getAll({ status: "aktif" });
      if (res.success && res.data) {
        setTestimonials(
          res.data.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
        );
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading || testimonials.length === 0) {
    return (
      <section className="py-18 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-pulse space-y-4">
            <div className="h-3 bg-gray-100 rounded w-24" />
            <div className="h-8 bg-gray-100 rounded w-64" />
          </div>
        </div>
      </section>
    );
  }

  const formattedTestimonials = testimonials.map((t, i) => {
    const person = socialProofData[i % socialProofData.length];
    return {
      id: t.id,
      quote: t.testimonialText,
      name: person.name,
      designation: `${person.position} · ${person.institution}`,
      src: person.photo,
    };
  });

  return (
    <section id="testimonial" className="py-0 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-12">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">
            Testimonials
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              Kata Klien Kami
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm md:text-right">
              Kepercayaan klien adalah motivasi terbesar kami dalam terus berkembang.
            </p>
          </div>
          <div className="w-full h-[1px] bg-gray-200 mt-8" />
        </div>

        {/* Testimonials */}
        <AnimatedTestimonials testimonials={formattedTestimonials} autoplay={true} />

      </div>
    </section>
  );
}
