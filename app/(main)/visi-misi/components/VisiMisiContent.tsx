"use client";

import React from "react";
import { motion } from "motion/react";
import { Target, TrendingUp, Users, Award, Lightbulb, Handshake, Sprout, ShieldCheck } from "lucide-react";

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

const missions = [
  { icon: Target, title: "Platform Terintegrasi", description: "Menyediakan platform end-to-end dari bimbingan riset hingga publikasi jurnal internasional dan penerbitan buku akademik dalam satu ekosistem." },
  { icon: TrendingUp, title: "Peningkatan Kualitas", description: "Meningkatkan kualitas dan kuantitas publikasi ilmiah peneliti Indonesia agar memenuhi standar jurnal internasional bereputasi." },
  { icon: Users, title: "Ekosistem Kolaboratif", description: "Membangun jaringan riset yang kolaboratif dan inovatif antar akademisi, institusi, dan industri di seluruh Indonesia." },
  { icon: Award, title: "Pendampingan Profesional", description: "Memberikan pendampingan terstruktur dengan standar internasional di setiap tahap penelitian — dari konsepsi hingga publikasi." },
];

const values = [
  { icon: Award, title: "Excellence", description: "Berkomitmen memberikan layanan terbaik dengan standar internasional dalam setiap aspek penelitian dan publikasi." },
  { icon: Handshake, title: "Collaboration", description: "Membangun kemitraan strategis dengan akademisi, institusi, dan penerbit untuk menciptakan ekosistem riset yang kuat." },
  { icon: Lightbulb, title: "Innovation", description: "Mengembangkan solusi teknologi terdepan untuk mempermudah proses penelitian dan publikasi ilmiah." },
  { icon: Sprout, title: "Sustainability", description: "Memastikan dampak jangka panjang dalam pengembangan kapasitas riset Indonesia yang berkelanjutan." },
  { icon: TrendingUp, title: "Growth", description: "Mendorong pertumbuhan kualitas dan kuantitas publikasi ilmiah peneliti Indonesia di kancah global." },
  { icon: ShieldCheck, title: "Integrity", description: "Menjunjung tinggi etika penelitian dan transparansi dalam setiap proses pendampingan riset." },
];

export default function VisiMisiContent() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative text-white py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero-carousel/hero-academic.jpg" alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/75" />
        </div>
        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-6"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={fadeUp} className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 mb-6">
            Vision & Mission
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] max-w-3xl mb-8">
            Visi & Misi
          </motion.h1>
          <motion.div variants={fadeIn} className="w-10 h-[2px] bg-primary mb-8" />
          <motion.p variants={fadeUp} className="text-lg text-white/60 max-w-xl leading-relaxed">
            Mewujudkan ekosistem riset Indonesia yang unggul dan terhubung dengan publikasi berkualitas internasional.
          </motion.p>
        </motion.div>
      </section>

      {/* Vision */}
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
                Our Vision
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight mb-6">
                Visi
              </motion.h2>
              <motion.div variants={fadeIn} className="w-10 h-[2px] bg-primary" />
            </div>
            <motion.div variants={fadeUp}>
              <p className="text-lg text-gray-600 leading-relaxed">
                Menjadi <strong className="text-gray-950">platform riset terintegrasi terdepan di Asia Tenggara</strong> yang menghubungkan akademisi dengan publikasi berkualitas internasional, mendorong inovasi penelitian, dan meningkatkan daya saing riset Indonesia di kancah global.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
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
              Our Mission
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              Misi
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
            {missions.map(({ icon: Icon, title, description }) => (
              <motion.div key={title} variants={fadeUp} className="bg-white group hover:bg-[#FAFAF8] transition-colors duration-200 flex flex-col">
                <div className="h-[2px] bg-gray-100 group-hover:bg-primary transition-colors duration-200" />
                <div className="p-8">
                  <div className="w-9 h-9 border border-gray-200 flex items-center justify-center mb-6">
                    <Icon className="w-4 h-4 text-gray-400" />
                  </div>
                  <h3 className="text-base font-bold text-gray-950 mb-3">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
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
              Core Values
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">Nilai-Nilai Kami</h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm md:text-right">
                Fondasi yang mendasari setiap layanan dan interaksi yang kami berikan.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="w-full h-[1px] bg-gray-200 mt-8" />
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {values.map(({ icon: Icon, title, description }) => (
              <motion.div key={title} variants={fadeUp} className="bg-white group hover:bg-[#FAFAF8] transition-colors duration-200">
                <div className="h-[2px] bg-gray-100 group-hover:bg-primary transition-colors duration-200" />
                <div className="p-8">
                  <div className="w-9 h-9 border border-gray-200 flex items-center justify-center mb-5">
                    <Icon className="w-4 h-4 text-gray-400" />
                  </div>
                  <h3 className="text-base font-bold text-gray-950 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
