"use client";
import React from "react";

export function AboutSection() {
  const features = [
    {
      icon: "🎯",
      title: "Expert Guidance",
      description: "Tim ahli berpengalaman dengan track record publikasi internasional"
    },
    {
      icon: "⚡",
      title: "Fast & Reliable",
      description: "Proses cepat dengan kualitas terjamin dan tepat waktu"
    },
    {
      icon: "📊",
      title: "Data-Driven",
      description: "Pendekatan berbasis data untuk hasil penelitian yang optimal"
    },
    {
      icon: "🌟",
      title: "Proven Success",
      description: "95% success rate dengan 500+ klien terlayani"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Tentang <br /> <span className="text-primary">PT COGNIFERA EDUCATION ACADEMY</span>
            </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Platform layanan penelitian terintegrasi yang mengubah perjalanan riset Anda 
            menjadi publikasi berkualitas internasional dengan pendampingan expert di setiap langkah.
          </p>
        </div>

        {/* Stats Counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <div className="text-center p-6 bg-primary/5 rounded-2xl">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10+</div>
            <div className="text-gray-600 font-medium">Klien Terlayani</div>
          </div>
          <div className="text-center p-6 bg-secondary/5 rounded-2xl">
            <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">5+</div>
            <div className="text-gray-600 font-medium">Publikasi Berhasil</div>
          </div>
          <div className="text-center p-6 bg-tertiary/5 rounded-2xl">
            <div className="text-4xl md:text-5xl font-bold text-tertiary mb-2">95%</div>
            <div className="text-gray-600 font-medium">Success Rate</div>
          </div>
          <div className="text-center p-6 bg-primary/5 rounded-2xl">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">3+</div>
            <div className="text-gray-600 font-medium">Years Experience</div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">
            Mengapa Memilih Kami?
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mt-20 text-center">
          <div className="bg-primary/10 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Misi Kami
            </h3>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Memberdayakan peneliti Indonesia untuk menghasilkan karya ilmiah berkualitas tinggi 
              yang diakui secara internasional, melalui layanan komprehensif dari konsepsi ide 
              hingga publikasi sukses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}