"use client";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// Data layanan FERA Series
const feraServices = [
  {
    id: "feradata",
    nama: "FERADATA",
    deskripsi: "Paket Analisis Data Premium dengan dukungan statistisi berpengalaman",
    hargaMulai: 500000,
    warna: "#EC7A01",
    successRate: "95%",
    fiturUtama: [
      "Konsultasi desain penelitian",
      "Analisis statistik profesional",
      "Visualisasi data menarik"
    ],
    targetMarket: "Mahasiswa & Peneliti"
  },
  {
    id: "feraguide",
    nama: "FERAGUIDE",
    deskripsi: "Paket Bimbingan Karya Tulis Ilmiah dengan mentoring menyeluruh",
    hargaMulai: 750000,
    warna: "#FFDD02",
    successRate: "90%",
    fiturUtama: [
      "Mentoring proposal penelitian",
      "Guidance metodologi penelitian",
      "Review dan feedback berkala"
    ],
    targetMarket: "Mahasiswa S1/S2/S3"
  },
  {
    id: "ferapub",
    nama: "FERAPUB",
    deskripsi: "Paket Publikasi Jurnal Internasional dengan strategi submission terpadu",
    hargaMulai: 400000,
    warna: "#10b981",
    successRate: "92%",
    fiturUtama: [
      "Analisis jurnal target",
      "Strategi submission",
      "Review pre-submission"
    ],
    targetMarket: "Dosen & Peneliti"
  },
  {
    id: "feragrant",
    nama: "FERAGRANT",
    deskripsi: "Paket Hibah dan Pendanaan Penelitian dengan dukungan proposal berkualitas",
    hargaMulai: 600000,
    warna: "#97D5EE",
    successRate: "85%",
    fiturUtama: [
      "Konsultasi strategi hibah",
      "Penulisan proposal hibah",
      "Database sumber funding"
    ],
    targetMarket: "Dosen & Institusi"
  }
];

// Data paket penerbitan buku
const bookServices = [
  {
    id: "bukuhemat",
    nama: "Paket Hemat",
    deskripsi: "Solusi terjangkau untuk menerbitkan buku pertama Anda",
    hargaMulai: 500000,
    warna: "#8B5CF6",
    fiturUtama: [
      "ISBN Buku",
      "Layouting Cover & Isi",
      "Terindeks Google Scholar"
    ],
    label: "Paling Populer"
  },
  {
    id: "bukustandar",
    nama: "Paket Standar",
    deskripsi: "Paket lengkap dengan proofreading untuk hasil lebih berkualitas",
    hargaMulai: 750000,
    warna: "#F59E0B",
    fiturUtama: [
      "ISBN + Proofreading",
      "Layouting Professional",
      "E-Book + E-Sertifikat"
    ],
    label: "Recommended"
  },
  {
    id: "bukukomplit",
    nama: "Paket Komplit",
    deskripsi: "Layanan premium dengan konversi naskah dan layouting high quality",
    hargaMulai: 1500000,
    warna: "#DC2626",
    fiturUtama: [
      "Konversi Naskah Lengkap",
      "Layouting High Quality",
      "Full Support & Konsultasi"
    ],
    label: "Premium"
  }
];

export function LayananSection() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Layanan Kami
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Solusi komprehensif untuk setiap kebutuhan penelitian dan publikasi ilmiah Anda
          </p>
        </div>

        {/* FERA Series Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                FERA Series - Layanan Penelitian
              </h3>
              <p className="text-gray-600">
                Solusi penelitian dari analisis data hingga publikasi internasional
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {feraServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group flex flex-col h-full"
              >
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

                  <div className="space-y-2 mb-4">
                    {service.fiturUtama.map((fitur, index) => (
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
                        {service.targetMarket}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/services/${service.id}`}
                    className="block w-full py-3 px-4 rounded-xl font-semibold text-sm text-center transition-all duration-300 transform hover:scale-[1.02]"
                    style={{
                      backgroundColor: service.warna,
                      color: 'white'
                    }}
                  >
                    Pelajari Lebih Lanjut
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book Publishing Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Paket Penerbitan Buku
              </h3>
              <p className="text-gray-600">
                Terbitkan buku Anda dengan ISBN resmi dan terindeks Google Scholar
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {bookServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group flex flex-col h-full relative"
              >
                {service.label && (
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: service.warna }}
                    >
                      {service.label}
                    </span>
                  </div>
                )}

                <div className="p-6 pb-4 flex-grow">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${service.warna}15` }}
                  >
                    <svg
                      className="w-6 h-6"
                      style={{ color: service.warna }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.nama}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.deskripsi}
                  </p>

                  <div className="space-y-2 mb-4">
                    {service.fiturUtama.map((fitur, index) => (
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

                <div className="px-6 pb-6">
                  <div className="mb-4">
                    <div className="text-lg font-bold text-gray-900">
                      {formatPrice(service.hargaMulai)}
                    </div>
                    <div className="text-xs text-gray-500">Harga paket</div>
                  </div>

                  <Link
                    href={`/services/${service.id}`}
                    className="block w-full py-3 px-4 rounded-xl font-semibold text-sm text-center transition-all duration-300 transform hover:scale-[1.02]"
                    style={{
                      backgroundColor: service.warna,
                      color: 'white'
                    }}
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Services Page */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Lihat Semua Layanan Kami
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              Jelajahi katalog lengkap layanan kami dengan filter kategori untuk menemukan solusi yang tepat untuk kebutuhan penelitian Anda.
            </p>
            <Link href="/services">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md">
                Jelajahi Semua Layanan
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
