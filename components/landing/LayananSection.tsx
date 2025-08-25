"use client";
import React, { useEffect, useState } from "react";
import { LayananData } from "@/types";
import { layananAPI } from "@/lib/api-dummy";

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

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'bar-chart-3':
        return '📊';
      case 'compass':
        return '🧭';
      case 'pen-tool':
        return '✏️';
      case 'send':
        return '🚀';
      default:
        return '⚡';
    }
  };

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
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {layanan.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Service Header */}
              <div 
                className="p-8 pb-6"
                style={{ 
                  background: `linear-gradient(135deg, ${service.warna}10 0%, ${service.warna}05 100%)` 
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{getIconComponent(service.icon)}</div>
                  {service.successRate && (
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {service.successRate} Success Rate
                    </div>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {service.nama}
                </h3>
                <p 
                  className="text-lg font-medium mb-4"
                  style={{ color: service.warna }}
                >
                  {service.tagline}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {service.deskripsi}
                </p>
              </div>

              {/* Service Content */}
              <div className="p-8 pt-6">
                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Fitur Utama:</h4>
                  <ul className="space-y-2">
                    {service.fiturUtama.slice(0, 3).map((fitur, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                        {fitur}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Target Market */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Target:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.targetMarket.map((target, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {target}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {formatPrice(service.hargaMulai)}
                    </div>
                    <div className="text-sm text-gray-500">Mulai dari</div>
                  </div>
                  <button 
                    className="px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg"
                    style={{ 
                      backgroundColor: service.warna,
                      color: 'white'
                    }}
                  >
                    Pelajari Lebih Lanjut
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Tidak yakin layanan mana yang tepat?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Konsultasikan kebutuhan riset Anda dengan tim ahli kami. 
              Dapatkan rekomendasi layanan yang sesuai dengan tujuan penelitian Anda.
            </p>
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Konsultasi Gratis Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}