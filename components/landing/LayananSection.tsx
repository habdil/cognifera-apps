"use client";
import React, { useEffect, useState } from "react";
import { LayananData } from "@/types";
import { layananAPI } from "@/lib/api-dummy";
import { Button } from "../ui/button";
import { Link } from "lucide-react";

export function LayananSection() {
  const [layanan, setLayanan] = useState<LayananData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLayanan = async () => {
      const response = await layananAPI.getAll({ status: 'aktif' });
      if (response.success && response.data) {
        setLayanan(response.data);
      }
      setLoading(false);
    };
    
    fetchLayanan();
  }, []);


  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
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

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Layanan <span className="text-primary">FERA Series</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Solusi komprehensif untuk setiap tahap perjalanan penelitian Anda, 
            dari analisis data hingga publikasi internasional.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {layanan.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group flex flex-col h-full"
            >
              {/* Service Header with Icon */}
              <div className="p-6 pb-4 flex-grow">
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${service.warna}15` }}
                  >
                    <img 
                      src={`/hero/hero-${service.id}.png`}
                      alt={`${service.nama} icon`}
                      className="w-8 h-8 object-contain"
                      loading="lazy"
                    />
                  </div>
                  {service.successRate && (
                    <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      {service.successRate}
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.nama}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.deskripsi}
                </p>

                {/* Key Features */}
                <div className="space-y-2 mb-4">
                  {service.fiturUtama.slice(0, 3).map((fitur, index) => (
                    <div key={index} className="flex items-center text-gray-600 text-sm">
                      <div 
                        className="w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0"
                        style={{ backgroundColor: service.warna }}
                      ></div>
                      <span>{fitur}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Section */}
              <div className="px-6 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatPrice(service.hargaMulai)}
                    </div>
                    <div className="text-xs text-gray-500">Mulai dari</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">Cocok untuk</div>
                    <div className="text-sm text-gray-700 font-medium">
                      {service.targetMarket[0]}
                    </div>
                  </div>
                </div>
                
                <a 
                  href={`/services/${service.id}`}
                  className="block w-full py-3 px-4 rounded-xl font-semibold text-sm text-center transition-all duration-300 transform hover:scale-[1.02]"
                  style={{ 
                    backgroundColor: service.warna,
                    color: 'white'
                  }}
                >
                  Pelajari Lebih Lanjut
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Tidak yakin layanan mana yang tepat?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              Konsultasikan kebutuhan riset Anda dengan tim ahli kami. 
              Dapatkan rekomendasi layanan yang sesuai dengan tujuan penelitian Anda.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md">
              <a href="https://wa.me/message/VRRB5IFQ7LQ4A1">
                Konsultasi Gratis Sekarang
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}