"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="mb-12">
              <img 
                src="/logo/cognifera-logo.png" 
                alt="PT Cognifera Education Academy"
                className="h-20 mx-auto mb-8"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="w-20 h-20 bg-primary/10 rounded-2xl mx-auto flex items-center justify-center mb-8" style={{display: 'none'}}>
                <span className="text-3xl font-bold text-primary">C</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              PT <span className="text-primary">COGNIFERA</span>
              <br />EDUCATION ACADEMY
            </h1>
            
            <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Platform Riset Terintegrasi yang Menghubungkan Akademisi dengan Publikasi Berkualitas Internasional
            </p>

            
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Tentang <span className="text-primary">Cognifera</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              PT Cognifera Education Academy adalah perusahaan teknologi pendidikan yang berfokus pada pengembangan platform riset terintegrasi untuk akademisi Indonesia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-primary/5 rounded-xl">
              <div className="text-4xl font-bold text-primary mb-2">10+</div>
              <div className="text-gray-600">Peneliti Terdaftar</div>
            </div>
            <div className="text-center p-6 bg-secondary/20 rounded-xl">
              <div className="text-4xl font-bold text-gray-800 mb-2">5+</div>
              <div className="text-gray-600">Publikasi Jurnal</div>
            </div>
            <div className="text-center p-6 bg-green-100 rounded-xl">
              <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Tingkat Kepuasan</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Company Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Tentang <span className="text-primary">PT Cognifera Education Academy</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          </div>

          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            <p>
              <strong className="text-primary">PT Cognifera Education Academy</strong> adalah perusahaan teknologi pendidikan yang didirikan pada tahun 2025 dengan fokus utama mengembangkan platform riset terintegrasi untuk akademisi Indonesia. Kami berkomitmen untuk menjembatani gap antara penelitian berkualitas dan publikasi internasional.
            </p>
            
            <p>
              Sebagai pionir dalam bidang layanan riset terintegrasi, Cognifera hadir untuk mengatasi tantangan yang dihadapi peneliti Indonesia dalam mempublikasikan karya ilmiah mereka ke jurnal internasional bereputasi. Kami memahami bahwa proses penelitian hingga publikasi memerlukan pendampingan profesional dan sistematis.
            </p>

            <p>
              Dengan tim yang terdiri dari akademisi berpengalaman, praktisi riset, dan teknologi terdepan, kami telah membantu <strong className="text-primary">10+ peneliti</strong> mencapai target publikasi nasional dan internasional mereka dengan tingkat keberhasilan <strong className="text-primary">98%</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Layanan <span className="text-primary">Terintegrasi</span> Kami
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Satu platform, tiga layanan utama yang saling terhubung untuk memastikan kesuksesan perjalanan riset Anda dari awal hingga publikasi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">🔬</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Bimbingan Riset</h3>
              <p className="text-gray-600 mb-6 text-center leading-relaxed">
                Pendampingan komprehensif dari tahap perencanaan penelitian hingga analisis data dengan mentor berpengalaman.
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Konsultasi metodologi penelitian
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Pendampingan pengumpulan data
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Analisis statistik dan interpretasi
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Konsultasi 1-on-1 dengan ahli
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">📄</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Publikasi Jurnal</h3>
              <p className="text-gray-600 mb-6 text-center leading-relaxed">
                Bantuan penulisan dan submission artikel ilmiah ke jurnal nasional dan internasional bereputasi dengan tingkat keberhasilan tinggi.
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Penulisan artikel ilmiah berkualitas
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Pemilihan jurnal yang tepat
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Proses submission dan follow-up
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Bantuan revisi dari peer review
                </li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Penerbitan Buku</h3>
              <p className="text-gray-600 mb-6 text-center leading-relaxed">
                Publikasi buku ilmiah ber-ISBN dengan editing profesional dan distribusi nasional untuk memperluas jangkauan karya Anda.
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Kompilasi riset menjadi buku
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Editing dan layout profesional
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Penerbitan ber-ISBN resmi
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Distribusi nasional dan digital
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Informasi <span className="text-primary">Perusahaan</span>
              </h2>
              <div className="w-24 h-1 bg-primary mb-8 rounded-full"></div>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <span className="text-primary text-xl">🏢</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Nama Perusahaan</div>
                    <div className="text-lg font-semibold text-gray-900">PT Cognifera Education Academy</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <span className="text-gray-700 text-xl">📅</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Tahun Berdiri</div>
                    <div className="text-lg font-semibold text-gray-900">2025</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-tertiary/30 rounded-xl flex items-center justify-center">
                    <span className="text-gray-700 text-xl">🌍</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Bidang Usaha</div>
                    <div className="text-lg font-semibold text-gray-900">Teknologi Pendidikan & Platform Riset</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-green-600 text-xl">📧</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="text-lg font-semibold text-gray-900">cognifera.edu@gmail.com</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="text-center p-6 bg-primary/5 rounded-2xl">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-gray-600">Peneliti Terlayani</div>
              </div>
              <div className="text-center p-6 bg-secondary/20 rounded-2xl">
                <div className="text-4xl font-bold text-gray-800 mb-2">5+</div>
                <div className="text-gray-600">Publikasi Jurnal</div>
              </div>
              <div className="text-center p-6 bg-green-100 rounded-2xl">
                <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      </div>
    </>
  );
}