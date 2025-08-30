"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
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
    { value: 'feradata', label: 'FERADATA - Paket Analisis Data Premium' },
    { value: 'feraguide', label: 'FERAGUIDE - Paket Bimbingan Karya Tulis Ilmiah' },
    { value: 'ferapub', label: 'FERAPUB - Paket Publikasi Jurnal Internasional' },
    { value: 'feragrant', label: 'FERAGRANT - Paket Hibah dan Pendanaan Penelitian' },
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
      content: '+62 813 5551 5694'
    },
    {
      icon: '📧',
      title: 'Email',
      content: 'cognifera.edu@gmail.com'
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      content: '+62 813 5551 5694'
    }
  ];

  const socialLinks = [
    { icon: 'LinkedIn', name: 'LinkedIn', url: '#' },
    { icon: 'Instagram', name: 'Instagram', url: '#' },
    { icon: 'Youtube', name: 'YouTube', url: '#' },
    { icon: 'Twitter', name: 'Twitter', url: '#' }
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
          <Card className="border-gray-300">
            <CardHeader>
                <CardTitle className="text-2xl text-[var(--color-text)]">
                <a
                  href="https://wa.me/message/VRRB5IFQ7LQ4A1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-[var(--color-primary)] transition-colors"
                >
                  Mulai Konsultasi Gratis
                </a>
                </CardTitle>
              <CardDescription>
                Isi formulir di bawah untuk memulai konsultasi gratis dengan tim expert kami
              </CardDescription>
            </CardHeader>
            <CardContent>
            
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
                <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all duration-200 placeholder:text-gray-400"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all duration-200 placeholder:text-gray-400"
                  placeholder="nama@email.com"
                />
              </div>

              <div>
                <label htmlFor="layananInterest" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Layanan yang Diminati
                </label>
                <select
                  id="layananInterest"
                  name="layananInterest"
                  value={formData.layananInterest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all duration-200"
                >
                  {layananOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[var(--color-background)] text-[var(--color-text)]">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Pesan *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all duration-200 resize-none placeholder:text-gray-400"
                  placeholder="Ceritakan tentang kebutuhan riset Anda, tantangan yang dihadapi, atau pertanyaan yang ingin dikonsultasikan..."
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 text-lg font-semibold rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-[var(--color-primary-foreground)]"
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </Button>
            </form>

            <p className="text-center text-sm text-[var(--color-muted-foreground)] mt-4">
              Dengan mengirim pesan ini, Anda menyetujui untuk dihubungi oleh tim Cognifera.
            </p>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[var(--color-text)]">
              Informasi Kontak
            </h3>

            {/* Contact Details */}
            <Card className="border-gray-300">
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-2xl flex-shrink-0">{info.icon}</div>
                    <div>
                      <h4 className="font-semibold text-[var(--color-text)] mb-1">{info.title}</h4>
                      <p className="text-[var(--color-muted-foreground)]">{info.content}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="border-gray-300">
              <CardContent>
                <h4 className="font-semibold text-[var(--color-text)] mb-3 flex items-center">
                  🕐 Jam Operasional
                </h4>
                <div className="space-y-2 text-[var(--color-muted-foreground)]">
                  <p><span className="font-medium">Senin - Jumat:</span> 08:00 - 18:00 WIB</p>
                  <p><span className="font-medium">Sabtu:</span> 09:00 - 15:00 WIB</p>
                  <p><span className="font-medium">Minggu:</span> Libur</p>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="border-gray-300">
              <CardContent>
                <h4 className="font-semibold text-[var(--color-text)] mb-4">Ikuti Kami</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-lg"
                      title={social.name}
                    >
                      <span className="text-sm font-medium">{social.icon.charAt(0)}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-gray-300">
              <CardContent className="space-y-4">
                <h4 className="font-semibold text-[var(--color-text)]">Aksi Cepat</h4>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-lg h-12 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-950 hover:border-gray-400"
                  >
                    <span className="mr-3">💬</span>
                    Chat via WhatsApp
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-lg h-12 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-950"
                  >
                    <span className="mr-3">📞</span>
                    Jadwalkan Video Call
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-lg h-12 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-950"
                  >
                    <span className="mr-3">📧</span>
                    Email Langsung
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 text-center">
          <Card className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] border-[var(--color-primary)]">
            <CardContent className="p-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
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
                  className="px-8 font-semibold rounded-full bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:bg-[var(--color-secondary)]/90"
                >
                  Konsultasi Gratis Sekarang
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 font-semibold rounded-full border-[var(--color-primary-foreground)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-foreground)] hover:text-[var(--color-primary)]"
                >
                  Lihat Portfolio Kami
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}