"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { LayananData } from "@/types";
import { layananAPI } from "@/lib/api-dummy";
import {
  ArrowLeft,
  Check,
  Users,
  Phone,
  Mail
} from "lucide-react";
import Link from "next/link";

interface ServiceDetailClientProps {
  initialService?: LayananData | null;
}

export function ServiceDetailClient({ initialService }: ServiceDetailClientProps) {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<LayananData | null>(initialService || null);
  const [loading, setLoading] = useState(!initialService);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialService && params.id) {
      fetchService(params.id as string);
    }
  }, [params.id, initialService]);

  const fetchService = async (id: string) => {
    try {
      setLoading(true);
      const response = await layananAPI.getById(id);
      if (response.success && response.data) {
        setService(response.data);
      } else {
        setError("Layanan tidak ditemukan");
      }
    } catch (error) {
      console.error("Error fetching service:", error);
      setError("Gagal memuat data layanan");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="h-16 bg-gray-200 rounded mb-6"></div>
              <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mb-8"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </button>

          <div className="text-center py-16">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {error || "Layanan tidak ditemukan"}
            </h1>
            <p className="text-gray-600 mb-8">
              Layanan yang Anda cari mungkin sudah tidak tersedia atau URL tidak valid.
            </p>
            <Link
              href="/#services"
              className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Lihat Semua Layanan
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </button>

        {/* Hero Section - Dashboard Style */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl overflow-hidden mb-12 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, ${service.warna} 2px, transparent 0), radial-gradient(circle at 75px 75px, ${service.warna} 2px, transparent 0)`,
              backgroundSize: '100px 100px'
            }}></div>
          </div>

          <div className="relative p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Information Dashboard */}
              <div className="space-y-6">
                {/* Service Badge */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: service.warna }}
                  ></div>
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                    FERA Series
                  </span>
                </div>

                {/* Main Title */}
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    {service.nama}
                  </h1>
                  <p
                    className="text-xl font-semibold mb-6"
                    style={{ color: service.warna }}
                  >
                    {service.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {service.deskripsiLengkap}
                </p>

                {/* Stats Dashboard */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: service.warna }}
                      ></div>
                      <span className="text-sm text-gray-500">Starting Price</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatPrice(service.hargaMulai)}
                    </div>
                  </div>

                  {service.successRate && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm text-gray-500">Success Rate</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {service.successRate}
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  href="https://wa.me/message/VRRB5IFQ7LQ4A1"
                  className="inline-block px-8 py-4 rounded-2xl font-semibold text-white text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  style={{ backgroundColor: service.warna }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                </Link>
              </div>

              {/* Right Side - Large Hero Character */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <img
                    src={`/hero/hero-${service.id}.png`}
                    alt={`${service.nama} hero character`}
                    className="w-150 h-150 lg:w-150 lg:h-150 object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Fitur Utama
              </h2>
              <div className="space-y-4">
                {service.fiturUtama.map((fitur, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-gray-600">{fitur}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Market */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Cocok untuk
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.targetMarket.map((target, index) => (
                  <div key={index} className="flex items-center bg-gray-50 rounded-lg p-4">
                    <Users className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{target}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Mengapa Memilih {service.nama}?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Tim ahli Cognifera telah berpengalaman membantu ribuan peneliti mencapai tujuan akademis mereka.
                Dengan metodologi yang teruji dan dukungan berkelanjutan, kami memastikan setiap proyek penelitian
                Anda mencapai standar publikasi internasional.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-1">500+</div>
                  <div className="text-sm text-gray-600">Proyek Selesai</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-1">50+</div>
                  <div className="text-sm text-gray-600">Jurnal Partner</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - CTA */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Tertarik dengan layanan ini?
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Konsultasi gratis untuk menentukan paket yang sesuai dengan kebutuhan Anda.
              </p>

              <div className="space-y-3 mb-6">
                <a
                  href="tel:+62811234567"
                  className="flex items-center text-gray-600 hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 mr-3" />
                  <span>+62 811-234-567</span>
                </a>
                <a
                  href="mailto:info@cognifera.com"
                  className="flex items-center text-gray-600 hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 mr-3" />
                  <span>info@cognifera.com</span>
                </a>
              </div>

              <a
                href="https://wa.me/message/VRRB5IFQ7LQ4A1"
                className="block w-full bg-primary text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors mb-3"
              >
                Konsultasi Sekarang
              </a>

              <Link
                href="/#services"
                className="block w-full bg-gray-100 text-gray-700 text-center py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Lihat Layanan Lain
              </Link>
            </div>

            {/* Quick Info */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="font-semibold text-blue-800 mb-3">💡 Info Penting</h4>
              <div className="space-y-2 text-sm text-blue-700">
                <p>✓ Konsultasi awal gratis</p>
                <p>✓ Garansi revisi hingga puas</p>
                <p>✓ Timeline kerja yang jelas</p>
                <p>✓ Progress report berkala</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}