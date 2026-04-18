"use client";
import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};

const feraServices = [
  {
    id: "feradata",
    nama: "FERADATA",
    tagline: "Premium Data Analysis",
    deskripsi: "Paket Analisis Data Premium dengan dukungan statistisi berpengalaman",
    hargaMulai: 500000,
    successRate: "95%",
    fiturUtama: ["Konsultasi desain penelitian", "Analisis statistik profesional", "Visualisasi data menarik"],
    targetMarket: "Mahasiswa & Peneliti"
  },
  {
    id: "feraguide",
    nama: "FERAGUIDE",
    tagline: "Academic Writing Guidance",
    deskripsi: "Paket Bimbingan Karya Tulis Ilmiah dengan mentoring menyeluruh",
    hargaMulai: 750000,
    successRate: "90%",
    fiturUtama: ["Mentoring proposal penelitian", "Guidance metodologi penelitian", "Review dan feedback berkala"],
    targetMarket: "Mahasiswa S1/S2/S3"
  },
  {
    id: "ferapub",
    nama: "FERAPUB",
    tagline: "International Journal Publication",
    deskripsi: "Paket Publikasi Jurnal Internasional dengan strategi submission terpadu",
    hargaMulai: 400000,
    successRate: "92%",
    fiturUtama: ["Analisis jurnal target", "Strategi submission", "Review pre-submission"],
    targetMarket: "Dosen & Peneliti"
  },
  {
    id: "feragrant",
    nama: "FERAGRANT",
    tagline: "Research Grant & Funding",
    deskripsi: "Paket Hibah dan Pendanaan Penelitian dengan dukungan proposal berkualitas",
    hargaMulai: 600000,
    successRate: "85%",
    fiturUtama: ["Konsultasi strategi hibah", "Penulisan proposal hibah", "Database sumber funding"],
    targetMarket: "Dosen & Institusi"
  }
];

const bookServices = [
  {
    id: "bukuhemat",
    nama: "Paket Hemat",
    deskripsi: "Solusi terjangkau untuk menerbitkan buku pertama Anda",
    hargaMulai: 500000,
    fiturUtama: ["ISBN Buku", "Layouting Cover & Isi", "Terindeks Google Scholar"],
    label: "Populer"
  },
  {
    id: "bukustandar",
    nama: "Paket Standar",
    deskripsi: "Paket lengkap dengan proofreading untuk hasil lebih berkualitas",
    hargaMulai: 750000,
    fiturUtama: ["ISBN + Proofreading", "Layouting Professional", "E-Book + E-Sertifikat"],
    label: "Recommended"
  },
  {
    id: "bukukomplit",
    nama: "Paket Komplit",
    deskripsi: "Layanan premium dengan konversi naskah dan layouting high quality",
    hargaMulai: 1500000,
    fiturUtama: ["Konversi Naskah Lengkap", "Layouting High Quality", "Full Support & Konsultasi"],
    label: "Premium"
  }
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);

export function LayananSection() {
  return (
    <section id="layanan" className="py-18 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          className="mb-16"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={fadeUp} className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">
            Our Services
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight max-w-xl">
              Solusi Riset & Publikasi<br />Terintegrasi
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm md:text-right">
              Dari analisis data hingga penerbitan buku ilmiah — semua layanan dalam satu platform.
            </p>
          </motion.div>
          <motion.div variants={fadeIn} className="w-full h-[1px] bg-gray-200 mt-8" />
        </motion.div>

        {/* FERA Series */}
        <div className="mb-20">
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-medium tracking-[0.15em] uppercase text-gray-400">FERA Series</span>
            <div className="flex-1 h-[1px] bg-gray-100" />
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {feraServices.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeUp}
                className="bg-white group flex flex-col h-full hover:bg-[#FAFAF8] transition-colors duration-200"
              >
                <div className="h-[2px] bg-gray-100 group-hover:bg-primary transition-colors duration-200" />
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-end mb-5">
                    <span className="text-[11px] font-medium text-gray-400 tracking-wide">{service.successRate} success</span>
                  </div>
                  <div className="mb-1">
                    <h3 className="text-base font-bold text-gray-950 tracking-wide">{service.nama}</h3>
                    <p className="text-[11px] text-gray-400 tracking-[0.08em] uppercase">{service.tagline}</p>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mt-3 mb-5">{service.deskripsi}</p>
                  <div className="space-y-2 mb-6 flex-grow">
                    {service.fiturUtama.map((fitur, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{fitur}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 pt-4 mb-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-[11px] text-gray-400 uppercase tracking-wide mb-0.5">Mulai dari</div>
                        <div className="text-lg font-bold text-gray-950 tabular-nums">{formatPrice(service.hargaMulai)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[11px] text-gray-400 uppercase tracking-wide mb-0.5">Untuk</div>
                        <div className="text-xs text-gray-600 font-medium">{service.targetMarket}</div>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/#layanan"
                    className="flex items-center justify-between w-full py-2.5 px-4 bg-gray-950 text-white text-xs font-medium tracking-wide hover:bg-primary transition-colors duration-200 group/btn"
                  >
                    <span>Pelajari Lebih Lanjut</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Book Publishing */}
        <div className="mb-16">
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-medium tracking-[0.15em] uppercase text-gray-400">Penerbitan Buku</span>
            <div className="flex-1 h-[1px] bg-gray-100" />
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-px bg-gray-200"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {bookServices.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeUp}
                className="bg-white group flex flex-col h-full hover:bg-[#FAFAF8] transition-colors duration-200 relative"
              >
                <div className="h-[2px] bg-gray-100 group-hover:bg-primary transition-colors duration-200" />
                <div className="p-6 flex-grow flex flex-col">
                  {service.label && (
                    <div className="mb-4">
                      <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-primary border border-primary/30 px-2 py-0.5">
                        {service.label}
                      </span>
                    </div>
                  )}
                  <h3 className="text-base font-bold text-gray-950 mb-2">{service.nama}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.deskripsi}</p>
                  <div className="space-y-2 mb-6 flex-grow">
                    {service.fiturUtama.map((fitur, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{fitur}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 pt-4 mb-5">
                    <div className="text-[11px] text-gray-400 uppercase tracking-wide mb-0.5">Harga paket</div>
                    <div className="text-lg font-bold text-gray-950 tabular-nums">{formatPrice(service.hargaMulai)}</div>
                  </div>
                  <Link
                    href="/#layanan"
                    className="flex items-center justify-between w-full py-2.5 px-4 bg-gray-950 text-white text-xs font-medium tracking-wide hover:bg-primary transition-colors duration-200 group/btn"
                  >
                    <span>Lihat Detail</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
