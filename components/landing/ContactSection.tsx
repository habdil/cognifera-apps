"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactFormData } from "@/types";

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    layananInterest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const layananOptions = [
    { value: '', label: 'Pilih layanan yang diminati' },
    { value: 'feradata', label: 'FERADATA - Analisis Data' },
    { value: 'feraguide', label: 'FERAGUIDE - Research Guidance' },
    { value: 'ferawrite', label: 'FERAWRITE - Academic Writing' },
    { value: 'ferapub', label: 'FERAPUB - Publication Strategy' },
    { value: 'konsultasi', label: 'Konsultasi Umum' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', layananInterest: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Alamat',
      content: 'Jl. Penelitian No. 123, Jakarta Selatan, Indonesia 12345'
    },
    {
      icon: '📞',
      title: 'Telepon',
      content: '+62 21 1234 5678'
    },
    {
      icon: '📧',
      title: 'Email',
      content: 'info@cognifera.com'
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      content: '+62 812 3456 7890'
    }
  ];

  const socialLinks = [
    { icon: '💼', name: 'LinkedIn', url: '#' },
    { icon: '📷', name: 'Instagram', url: '#' },
    { icon: '🎥', name: 'YouTube', url: '#' },
    { icon: '🐦', name: 'Twitter', url: '#' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Hubungi <span className="text-primary">Kami</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Siap memulai perjalanan riset Anda? Tim expert kami siap membantu 
            mewujudkan impian publikasi internasional Anda.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Mulai Konsultasi Gratis
            </h3>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                ✅ Pesan Anda telah terkirim! Tim kami akan segera menghubungi Anda.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                ❌ Terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  placeholder="nama@email.com"
                />
              </div>

              <div>
                <label htmlFor="layananInterest" className="block text-sm font-medium text-gray-700 mb-2">
                  Layanan yang Diminati
                </label>
                <select
                  id="layananInterest"
                  name="layananInterest"
                  value={formData.layananInterest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                >
                  {layananOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Pesan *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none"
                  placeholder="Ceritakan tentang kebutuhan riset Anda, tantangan yang dihadapi, atau pertanyaan yang ingin dikonsultasikan..."
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 text-lg font-semibold rounded-lg"
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
              Dengan mengirim pesan ini, Anda menyetujui untuk dihubungi oleh tim Cognifera.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-800">
              Informasi Kontak
            </h3>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-2xl flex-shrink-0">{info.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{info.title}</h4>
                    <p className="text-gray-600">{info.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Office Hours */}
            <div className="bg-primary/10 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                🕐 Jam Operasional
              </h4>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium">Senin - Jumat:</span> 08:00 - 18:00 WIB</p>
                <p><span className="font-medium">Sabtu:</span> 09:00 - 15:00 WIB</p>
                <p><span className="font-medium">Minggu:</span> Libur</p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Ikuti Kami</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-xl hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-md"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Aksi Cepat</h4>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start rounded-lg h-12"
                >
                  <span className="mr-3">💬</span>
                  Chat via WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start rounded-lg h-12"
                >
                  <span className="mr-3">📞</span>
                  Jadwalkan Video Call
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start rounded-lg h-12"
                >
                  <span className="mr-3">📧</span>
                  Email Langsung
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 text-center">
          <div className="bg-primary rounded-3xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Mulai Perjalanan Riset Anda Hari Ini
            </h3>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Jangan biarkan impian publikasi internasional hanya menjadi mimpi. 
              Bergabunglah dengan ratusan peneliti yang telah merasakan kesuksesan bersama Cognifera.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="px-8 font-semibold rounded-full"
              >
                Konsultasi Gratis Sekarang
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 font-semibold rounded-full border-white text-white hover:bg-white hover:text-primary"
              >
                Lihat Portfolio Kami
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}