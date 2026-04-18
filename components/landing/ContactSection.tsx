"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { ContactFormData } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { MapPin, Phone, Mail, MessageSquare, Clock, ArrowRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};

const layananOptions = [
  { value: "feradata", label: "FERADATA — Paket Analisis Data Premium" },
  { value: "feraguide", label: "FERAGUIDE — Paket Bimbingan Karya Tulis Ilmiah" },
  { value: "ferapub", label: "FERAPUB — Paket Publikasi Jurnal Internasional" },
  { value: "feragrant", label: "FERAGRANT — Paket Hibah dan Pendanaan Penelitian" },
  { value: "konsultasi", label: "Konsultasi Umum" },
];

const contactInfo = [
  { icon: MapPin, label: "Alamat", value: "Griya Sudiang Mandiri Blok B No. 12, Makassar, Indonesia" },
  { icon: Phone, label: "Telepon", value: "+62 813 5551 5694" },
  { icon: Mail, label: "Email", value: "cognifera.edu@gmail.com" },
  { icon: MessageSquare, label: "WhatsApp", value: "+62 813 5551 5694" },
];

const officeHours = [
  { day: "Senin — Jumat", hours: "08:00 – 18:00 WIB" },
  { day: "Sabtu", hours: "09:00 – 15:00 WIB" },
  { day: "Minggu", hours: "Libur" },
];

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    layananInterest: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", layananInterest: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <section className="py-24 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          className="mb-16"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={fadeUp} className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">
            Contact Us
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">Hubungi Kami</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm md:text-right">
              Tim expert kami siap membantu mewujudkan impian publikasi internasional Anda.
            </p>
          </motion.div>
          <motion.div variants={fadeIn} className="w-full h-[1px] bg-gray-200 mt-8" />
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-px bg-gray-200"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Contact Form */}
          <motion.div variants={fadeUp} className="bg-white p-8 md:p-10">
            <h3 className="text-lg font-bold text-gray-950 mb-1">
              <a href="https://wa.me/message/VRRB5IFQ7LQ4A1" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                Mulai Konsultasi Gratis
              </a>
            </h3>
            <p className="text-sm text-gray-400 mb-8">Isi formulir di bawah, tim kami akan segera menghubungi Anda.</p>

            {submitStatus === "success" && (
              <div className="mb-6 p-4 border border-green-200 bg-green-50 text-green-700 text-sm">
                Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mb-6 p-4 border border-red-200 bg-red-50 text-red-700 text-sm">
                Terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs font-medium tracking-wide uppercase text-gray-500 mb-2">Nama Lengkap *</label>
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-gray-300"
                  placeholder="Nama lengkap Anda" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium tracking-wide uppercase text-gray-500 mb-2">Email *</label>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-gray-300"
                  placeholder="nama@email.com" />
              </div>
              <div>
                <label htmlFor="layananInterest" className="block text-xs font-medium tracking-wide uppercase text-gray-500 mb-2">Layanan yang Diminati</label>
                <Select value={formData.layananInterest} onValueChange={(value) => setFormData((prev) => ({ ...prev, layananInterest: value }))}>
                  <SelectTrigger className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-primary rounded-none h-auto">
                    <SelectValue placeholder="Pilih layanan" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-none">
                    {layananOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium tracking-wide uppercase text-gray-500 mb-2">Pesan *</label>
                <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-gray-300"
                  placeholder="Ceritakan kebutuhan riset Anda..." />
              </div>
              <button type="submit" disabled={isSubmitting}
                className="w-full py-3 bg-primary hover:bg-primary/90 text-white text-sm font-medium tracking-wide transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                {isSubmitting ? "Mengirim..." : (<>Kirim Pesan <ArrowRight className="w-4 h-4" /></>)}
              </button>
            </form>
            <p className="text-center text-xs text-gray-400 mt-4">
              Dengan mengirim pesan ini, Anda menyetujui untuk dihubungi oleh tim Cognifera.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeUp} className="flex flex-col gap-px bg-gray-200">
            <div className="bg-white p-8 md:p-10 flex-1">
              <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-gray-400 mb-6">Informasi Kontak</h3>
              <div className="space-y-5">
                {contactInfo.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-8 h-8 border border-gray-200 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">{label}</p>
                      <p className="text-sm text-gray-700">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 md:p-10">
              <div className="flex items-center gap-3 mb-5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-gray-400">Jam Operasional</h4>
              </div>
              <div className="space-y-3">
                {officeHours.map(({ day, hours }) => (
                  <div key={day} className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{day}</span>
                    <span className={`font-medium ${hours === "Libur" ? "text-gray-400" : "text-gray-800"}`}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="mt-6 bg-gray-950 p-10 md:p-14"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.p variants={fadeUp} className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 mb-4">
              Get Started
            </motion.p>
            <motion.h3 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
              Mulai Perjalanan Riset Anda Hari Ini
            </motion.h3>
            <motion.p variants={fadeUp} className="text-white/50 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
              Jangan biarkan impian publikasi internasional hanya menjadi mimpi. Bergabunglah dengan peneliti yang telah merasakan kesuksesan bersama Cognifera.
            </motion.p>
            <motion.div variants={fadeUp}>
              <a
                href="https://api.whatsapp.com/send/?phone=6285920173338&text=Halo%21+Saya+tertarik+dengan+layanan+Cognifera&type=phone_number&app_absent=0"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 text-sm font-medium tracking-wide transition-colors"
              >
                Konsultasi Gratis
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
