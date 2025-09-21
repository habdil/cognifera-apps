"use client";
import React, { useEffect, useState } from "react";
import { IklanData, LayananData } from "@/types";
import { iklanAPI, layananAPI } from "@/lib/api-dummy";
import { Button } from "../ui/button";

export function PromoSection() {
  const [promos, setPromos] = useState<IklanData[]>([]);
  const [layanan, setLayanan] = useState<LayananData[]>([]);
  const [currentPromo, setCurrentPromo] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [promosResponse, layananResponse] = await Promise.all([
        iklanAPI.getAll({ status: 'aktif', sortBy: 'priority', sortOrder: 'asc' }),
        layananAPI.getAll({ status: 'aktif' })
      ]);
      
      if (promosResponse.success && promosResponse.data) {
        // Filter active promos that haven't expired
        const activePromos = promosResponse.data.filter(promo => 
          new Date() <= promo.tanggalBerakhir
        );
        setPromos(activePromos);
      }
      
      if (layananResponse.success && layananResponse.data) {
        setLayanan(layananResponse.data);
      }
      
      setLoading(false);
    };
    
    fetchData();
  }, []);

  // Auto slide promos
  useEffect(() => {
    if (promos.length > 1) {
      const interval = setInterval(() => {
        setCurrentPromo((prev) => (prev + 1) % promos.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [promos.length]);

  const getLayananNames = (layananIds: string[]) => {
    return layananIds
      .map(id => layanan.find(l => l.id === id)?.nama)
      .filter(Boolean)
      .join(', ');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const isExpiringSoon = (endDate: Date) => {
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  if (loading || promos.length === 0) {
    return null;
  }

  const currentPromoData = promos[currentPromo];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Promo <span className="text-primary">Special</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Main Promo Display */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              {/* Promo Content */}
              <div className="md:w-2/3 p-8 md:p-12">
                {/* Discount Badge */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-red-500 text-white px-6 py-3 rounded-full text-2xl font-bold">
                    {currentPromoData.discountPercentage}% OFF
                  </div>
                  {isExpiringSoon(currentPromoData.tanggalBerakhir) && (
                    <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium animate-pulse">
                      ⏰ Segera Berakhir!
                    </div>
                  )}
                </div>

                {/* Promo Title */}
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {currentPromoData.judul}
                </h3>

                {/* Promo Description */}
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {currentPromoData.deskripsi}
                </p>

                {/* Affected Services */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Berlaku untuk:</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentPromoData.layananAffected.map((serviceId, index) => {
                      const service = layanan.find(l => l.id === serviceId);
                      return service ? (
                        <span 
                          key={index}
                          className="px-4 py-2 rounded-full text-sm font-medium"
                          style={{ 
                            backgroundColor: `${service.warna}20`,
                            color: service.warna,
                            border: `1px solid ${service.warna}40`
                          }}
                        >
                          {service.nama}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Validity Period */}
                <div className="mb-8 p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-600">Berlaku hingga:</span>
                      <span className="font-semibold text-gray-800 ml-2">
                        {formatDate(currentPromoData.tanggalBerakhir)}
                      </span>
                    </div>
                    <div className="text-gray-600">
                      {Math.ceil((currentPromoData.tanggalBerakhir.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} hari lagi
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Klaim Sekarang
                </button>
              </div>

              {/* Promo Visual/Image */}
              <div className="md:w-1/3 bg-primary/10 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <div className="text-2xl font-bold text-primary mb-2">
                    Hemat hingga
                  </div>
                  <div className="text-4xl font-bold text-gray-800">
                    {currentPromoData.discountPercentage}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Navigation */}
          {promos.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {promos.map((_, index) => (
                <Button
                  key={index}
                  onClick={() => setCurrentPromo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentPromo 
                      ? 'bg-primary scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Terms & Conditions */}
        {currentPromoData.termsConditions && (
          <div className="mt-8 text-center">
            <details className="bg-white rounded-2xl p-6 shadow-lg">
              <summary className="font-semibold text-gray-800 cursor-pointer hover:text-primary transition-colors">
                Syarat & Ketentuan
              </summary>
              <div className="mt-4 text-sm text-gray-600 text-left">
                {currentPromoData.termsConditions}
              </div>
            </details>
          </div>
        )}

        {/* All Promos Quick View */}
        {promos.length > 1 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Promo Lainnya
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {promos.filter((_, index) => index !== currentPromo).slice(0, 3).map((promo, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setCurrentPromo(promos.findIndex(p => p.id === promo.id))}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                      {promo.discountPercentage}%
                    </div>
                    {isExpiringSoon(promo.tanggalBerakhir) && (
                      <div className="text-yellow-600 text-sm">⏰</div>
                    )}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{promo.judul}</h4>
                  <p className="text-sm text-gray-600 mb-4">{promo.deskripsi.slice(0, 100)}...</p>
                  <div className="text-sm text-gray-500">
                    Berlaku hingga {formatDate(promo.tanggalBerakhir)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}