"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: "🎯",
    title: "Excellence",
    description: "Berkomitmen memberikan layanan terbaik dengan standar internasional dalam setiap aspek penelitian dan publikasi."
  },
  {
    icon: "🤝",
    title: "Collaboration",
    description: "Membangun kemitraan strategis dengan akademisi, institusi, dan penerbit untuk menciptakan ekosistem riset yang kuat."
  },
  {
    icon: "💡",
    title: "Innovation",
    description: "Mengembangkan solusi teknologi terdepan untuk mempermudah proses penelitian dan publikasi ilmiah."
  },
  {
    icon: "🌱",
    title: "Sustainability",
    description: "Memastikan dampak jangka panjang dalam pengembangan kapasitas riset Indonesia yang berkelanjutan."
  },
  {
    icon: "📈",
    title: "Growth",
    description: "Mendorong pertumbuhan kualitas dan kuantitas publikasi ilmiah peneliti Indonesia di kancah global."
  },
  {
    icon: "✨",
    title: "Integrity",
    description: "Menjunjung tinggi etika penelitian dan transparansi dalam setiap proses pendampingan riset."
  }
];

export default function VisiMisiContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Visi & <span className="text-primary">Misi</span>
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Mewujudkan visi besar untuk memajukan ekosistem riset Indonesia melalui platform terintegrasi yang menghubungkan akademisi dengan publikasi berkualitas nasional dan internasional yang bereputasi.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">🎯</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Visi</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                Menjadi platform riset terintegrasi terdepan di Asia Tenggara yang menghubungkan akademisi dengan publikasi berkualitas internasional, mendorong inovasi penelitian, dan meningkatkan daya saing riset Indonesia di kancah global.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <span className="text-primary">Misi</span> Kami
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Platform Terintegrasi</h3>
                <p className="text-gray-600 leading-relaxed">
                  Menyediakan platform terintegrasi dari bimbingan riset hingga publikasi jurnal internasional dan penerbitan buku akademik.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Peningkatan Kualitas</h3>
                <p className="text-gray-600 leading-relaxed">
                  Meningkatkan kualitas dan kuantitas publikasi ilmiah peneliti Indonesia dengan standar internasional.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ekosistem Kolaboratif</h3>
                <p className="text-gray-600 leading-relaxed">
                  Membangun ekosistem riset yang kolaboratif dan inovatif antar akademisi, institusi, dan industri.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Pendampingan Profesional</h3>
                <p className="text-gray-600 leading-relaxed">
                  Memberikan pendampingan profesional dengan standar internasional dalam setiap tahap penelitian.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nilai-Nilai <span className="text-primary">Kami</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nilai-nilai fundamental yang menjadi fondasi dalam setiap layanan dan interaksi yang kami berikan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-md bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}