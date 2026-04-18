"use client";
import React, { useEffect, useState } from "react";
import { IklanData, LayananData } from "@/types";
import { iklanAPI, layananAPI } from "@/lib/api-dummy";
import { ArrowRight, Clock } from "lucide-react";

export function PromoSection() {
  const [promos, setPromos] = useState<IklanData[]>([]);
  const [layanan, setLayanan] = useState<LayananData[]>([]);
  const [currentPromo, setCurrentPromo] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [promosResponse, layananResponse] = await Promise.all([
        iklanAPI.getAll({ status: "aktif", sortBy: "priority", sortOrder: "asc" }),
        layananAPI.getAll({ status: "aktif" }),
      ]);
      if (promosResponse.success && promosResponse.data) {
        setPromos(promosResponse.data.filter((p) => new Date() <= p.tanggalBerakhir));
      }
      if (layananResponse.success && layananResponse.data) {
        setLayanan(layananResponse.data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (promos.length > 1) {
      const interval = setInterval(() => {
        setCurrentPromo((prev) => (prev + 1) % promos.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [promos.length]);

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);

  const daysLeft = (endDate: Date) =>
    Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const isExpiringSoon = (endDate: Date) => daysLeft(endDate) <= 7;

  if (loading || promos.length === 0) return null;

  const promo = promos[currentPromo];

  return (
    <section className="py-24 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-12">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">
            Special Offer
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              Promo Eksklusif
            </h2>
            {promos.length > 1 && (
              <div className="flex items-center gap-2">
                {promos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPromo(i)}
                    className={`h-[2px] transition-all duration-300 ${
                      i === currentPromo ? "w-8 bg-primary" : "w-4 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Promo ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="w-full h-[1px] bg-gray-200 mt-8" />
        </div>

        {/* Main promo */}
        <div className="border border-gray-200 bg-white">
          <div className="grid md:grid-cols-3">

            {/* Discount panel */}
            <div className="bg-gray-950 flex flex-col items-center justify-center p-10 text-center">
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/50 mb-4">
                Diskon Spesial
              </p>
              <div className="text-7xl md:text-8xl font-bold text-white tabular-nums leading-none mb-2">
                {promo.discountPercentage}
                <span className="text-4xl text-primary">%</span>
              </div>
              <p className="text-white/40 text-sm mt-3">Hemat lebih banyak</p>

              {isExpiringSoon(promo.tanggalBerakhir) && (
                <div className="mt-6 flex items-center gap-2 border border-yellow-500/30 bg-yellow-500/10 px-3 py-2">
                  <Clock className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-yellow-400 text-xs font-medium">Segera Berakhir</span>
                </div>
              )}
            </div>

            {/* Promo detail */}
            <div className="md:col-span-2 p-8 md:p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-3">
                  {promo.judul}
                </h3>
                <p className="text-gray-500 leading-relaxed mb-6">
                  {promo.deskripsi}
                </p>

                {/* Affected services */}
                {promo.layananAffected.length > 0 && (
                  <div className="mb-6">
                    <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-400 mb-3">
                      Berlaku untuk
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {promo.layananAffected.map((id, i) => {
                        const svc = layanan.find((l) => l.id === id);
                        return svc ? (
                          <span
                            key={i}
                            className="border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1 tracking-wide"
                          >
                            {svc.nama}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {/* Validity */}
                <div className="flex items-center gap-6 text-sm text-gray-500 border-t border-gray-100 pt-5">
                  <div>
                    <span className="text-[11px] uppercase tracking-wide text-gray-400 block mb-0.5">Berlaku hingga</span>
                    <span className="font-medium text-gray-700">{formatDate(promo.tanggalBerakhir)}</span>
                  </div>
                  <div className="w-[1px] h-8 bg-gray-200" />
                  <div>
                    <span className="text-[11px] uppercase tracking-wide text-gray-400 block mb-0.5">Sisa waktu</span>
                    <span className="font-medium text-gray-700">{daysLeft(promo.tanggalBerakhir)} hari lagi</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="https://wa.me/message/VRRB5IFQ7LQ4A1"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 text-sm font-medium tracking-wide transition-colors"
                >
                  Klaim Sekarang
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Terms */}
          {promo.termsConditions && (
            <div className="border-t border-gray-100 px-8 md:px-10 py-4">
              <details className="group">
                <summary className="text-xs font-medium text-gray-400 tracking-wide cursor-pointer hover:text-gray-600 transition-colors list-none flex items-center gap-2">
                  <span>Syarat & Ketentuan</span>
                  <span className="group-open:rotate-180 transition-transform text-gray-300">▾</span>
                </summary>
                <p className="mt-3 text-xs text-gray-500 leading-relaxed">
                  {promo.termsConditions}
                </p>
              </details>
            </div>
          )}
        </div>

        {/* Other promos */}
        {promos.length > 1 && (
          <div className="mt-6 grid md:grid-cols-3 gap-px bg-gray-200">
            {promos
              .filter((_, i) => i !== currentPromo)
              .slice(0, 3)
              .map((p, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPromo(promos.findIndex((x) => x.id === p.id))}
                  className="bg-white hover:bg-[#FAFAF8] transition-colors text-left p-5 group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl font-bold text-gray-950 tabular-nums">
                      {p.discountPercentage}
                      <span className="text-base text-primary">%</span>
                    </span>
                    {isExpiringSoon(p.tanggalBerakhir) && (
                      <Clock className="w-3.5 h-3.5 text-yellow-500 mt-1" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-800 mb-1">{p.judul}</p>
                  <p className="text-xs text-gray-400">
                    s/d {formatDate(p.tanggalBerakhir)}
                  </p>
                </button>
              ))}
          </div>
        )}

      </div>
    </section>
  );
}
