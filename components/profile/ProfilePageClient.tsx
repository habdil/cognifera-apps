"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, FlaskConical, FileText, BookOpen, Building2, Calendar, Globe, Mail, Check } from "lucide-react";

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

const stats = [
  { value: "10+", label: "Peneliti Terlayani" },
  { value: "5+", label: "Publikasi Berhasil" },
  { value: "95%", label: "Success Rate" },
  { value: "2025", label: "Tahun Berdiri" },
];

const services = [
  {
    icon: FlaskConical,
    title: "Bimbingan Riset",
    description: "Pendampingan komprehensif dari tahap perencanaan penelitian hingga analisis data dengan mentor berpengalaman.",
    features: ["Konsultasi metodologi penelitian", "Pendampingan pengumpulan data", "Analisis statistik dan interpretasi", "Konsultasi 1-on-1 dengan ahli"],
  },
  {
    icon: FileText,
    title: "Publikasi Jurnal",
    description: "Bantuan penulisan dan submission artikel ilmiah ke jurnal nasional dan internasional bereputasi.",
    features: ["Penulisan artikel ilmiah berkualitas", "Pemilihan jurnal yang tepat", "Proses submission dan follow-up", "Bantuan revisi dari peer review"],
  },
  {
    icon: BookOpen,
    title: "Penerbitan Buku",
    description: "Publikasi buku ilmiah ber-ISBN dengan editing profesional dan distribusi nasional.",
    features: ["Kompilasi riset menjadi buku", "Editing dan layout profesional", "Penerbitan ber-ISBN resmi", "Distribusi nasional dan digital"],
  },
];

const companyInfo = [
  { icon: Building2, label: "Nama Perusahaan", value: "PT Cognifera Education Academy" },
  { icon: Calendar, label: "Tahun Berdiri", value: "2025" },
  { icon: Globe, label: "Bidang Usaha", value: "Teknologi Pendidikan & Platform Riset" },
  { icon: Mail, label: "Email", value: "cognifera.edu@gmail.com" },
];

export function ProfilePageClient() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative text-white py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-carousel/hero-profile.jpg"
            alt=""
            fill
            priority
            quality={65}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/75" />
        </div>
        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-6"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={fadeUp} className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 mb-6">
            About Us
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] max-w-3xl mb-8">
            PT Cognifera<br />Education Academy
          </motion.h1>
          <motion.div variants={fadeIn} className="w-10 h-[2px] bg-primary mb-8" />
          <motion.p variants={fadeUp} className="text-lg text-white/60 max-w-xl leading-relaxed">
            Platform riset terintegrasi yang menghubungkan akademisi Indonesia dengan publikasi berkualitas internasional.
          </motion.p>
        </motion.div>
      </section>

      {/* Stats strip */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="py-8 text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-950 mb-1 tabular-nums">{s.value}</div>
                <div className="text-[11px] text-gray-400 tracking-[0.12em] uppercase">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* About */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="grid lg:grid-cols-2 gap-16 items-start"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div>
              <motion.p variants={fadeUp} className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">
                Company Overview
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight mb-6">
                Mendorong Riset Indonesia ke Panggung Global
              </motion.h2>
              <motion.div variants={fadeIn} className="w-10 h-[2px] bg-primary mb-8" />
            </div>
            <motion.div variants={fadeUp} className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-950 font-semibold">PT Cognifera Education Academy</strong> adalah perusahaan teknologi pendidikan yang didirikan pada 2025, berfokus mengembangkan platform riset terintegrasi untuk akademisi Indonesia.
              </p>
              <p>
                Kami hadir untuk menjembatani kesenjangan antara penelitian berkualitas dan publikasi internasional — mendampingi peneliti secara profesional dan sistematis dari konsepsi ide hingga publikasi sukses.
              </p>
              <p>
                Dengan tim akademisi berpengalaman dan praktisi riset, kami telah membantu <strong className="text-gray-950">10+ peneliti</strong> mencapai target publikasi nasional dan internasional dengan tingkat keberhasilan <strong className="text-gray-950">95%</strong>.
              </p>
              <a
                href="https://wa.me/message/VRRB5IFQ7LQ4A1"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 text-sm font-medium tracking-wide transition-colors mt-2"
              >
                Konsultasi Sekarang
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="mb-12"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p variants={fadeUp} className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">
              Our Services
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight max-w-lg">
              Layanan Terintegrasi dalam Satu Platform
            </motion.h2>
            <motion.div variants={fadeIn} className="w-full h-[1px] bg-gray-200 mt-8" />
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-px bg-gray-200"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {services.map(({ icon: Icon, title, description, features }) => (
              <motion.div key={title} variants={fadeUp} className="bg-white group hover:bg-[#FAFAF8] transition-colors duration-200 flex flex-col">
                <div className="h-[2px] bg-gray-100 group-hover:bg-primary transition-colors duration-200" />
                <div className="p-8 flex flex-col flex-1">
                  <div className="w-9 h-9 border border-gray-200 flex items-center justify-center mb-6">
                    <Icon className="w-4 h-4 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-950 mb-3">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{description}</p>
                  <div className="space-y-2 mt-auto">
                    {features.map((f) => (
                      <div key={f} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="mb-12"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p variants={fadeUp} className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">
              Company Information
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              Informasi Perusahaan
            </motion.h2>
            <motion.div variants={fadeIn} className="w-full h-[1px] bg-gray-200 mt-8" />
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-px bg-gray-200"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {companyInfo.map(({ icon: Icon, label, value }) => (
              <motion.div key={label} variants={fadeUp} className="bg-white p-8 flex items-start gap-5">
                <div className="w-9 h-9 border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-gray-400 mb-1">{label}</p>
                  <p className="text-gray-950 font-semibold">{value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
