"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

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

const teamData = [
  {
    id: "muhammad-alqadri-burga",
    name: "Dr. Muhammad Alqadri Burga, S.Pd.I., M.Pd",
    position: "Komisaris / Ketua Dewan Pengawas",
    image: "/photo-team/Qadri.png",
    bio: "Pemimpin visioner dengan pengalaman luas dalam pendidikan dan manajemen strategis.",
    specialties: ["Manajemen Strategis", "Pendidikan", "Kepemimpinan"],
    education: "S.Pd.I., M.Pd, Doktor"
  },
  {
    id: "hardianto",
    name: "Dr. Hardianto, S.Pd., M.Pd",
    position: "Direktur Utama / CEO",
    image: "/photo-team/Hardianto.png",
    bio: "CEO berpengalaman dengan fokus pada inovasi pendidikan dan pengembangan organisasi.",
    specialties: ["Kepemimpinan Eksekutif", "Inovasi Pendidikan", "Manajemen Organisasi"],
    education: "S.Pd., M.Pd, Doktor"
  },
  {
    id: "musa",
    name: "Musa, S.Kom., M.M",
    position: "Direktur Operasional / COO",
    image: "/photo-team/Musa.png",
    bio: "Ahli operasional dengan latar belakang teknologi dan manajemen bisnis.",
    specialties: ["Manajemen Operasional", "Teknologi", "Manajemen Bisnis"],
    education: "S.Kom., M.M"
  },
  {
    id: "nur-al-huda-asrul",
    name: "Ar. Nur Al Huda Asrul, S.T",
    position: "Direktur Keuangan / CFO",
    image: "/photo-team/Huda.png",
    bio: "Arsitek dan ahli keuangan dengan keahlian dalam manajemen finansial strategis.",
    specialties: ["Manajemen Keuangan", "Arsitektur", "Perencanaan Strategis"],
    education: "S.T, Arsitek"
  },
  {
    id: "nurhinayah-burga",
    name: "Nurhinayah Burga, S.Pd., M.Pd",
    position: "Direktur Pemasaran / CMO",
    image: "/photo-team/Nurhinayah Burga.png",
    bio: "Pakar pemasaran pendidikan dengan pengalaman dalam strategi komunikasi dan branding.",
    specialties: ["Pemasaran Digital", "Strategi Komunikasi", "Branding Pendidikan"],
    education: "S.Pd., M.Pd"
  },
  {
    id: "habdil-iqrawardana",
    name: "Habdil Iqrawardana",
    position: "Direktur Teknologi / CTO",
    image: "/photo-team/Habdil Iqrawardana.png",
    bio: "Technology leader dengan keahlian dalam pengembangan platform digital dan inovasi teknologi pendidikan.",
    specialties: ["Full Stack Development", "Teknologi Pendidikan", "Inovasi Digital"],
    education: "Technology Expert"
  }
];

export default function OurTeamContent() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative text-white py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-carousel/hero-research.jpg"
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
            Our Team
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] max-w-2xl mb-8">
            Tim Cognifera Academy
          </motion.h1>
          <motion.div variants={fadeIn} className="w-10 h-[2px] bg-primary mb-8" />
          <motion.p variants={fadeUp} className="text-lg text-white/60 max-w-xl leading-relaxed">
            Profesional berpengalaman yang berdedikasi menghadirkan layanan riset dan publikasi terbaik untuk akademisi Indonesia.
          </motion.p>
        </motion.div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="mb-12"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p variants={fadeUp} className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">
              Leadership
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              Kenali Tim Kami
            </motion.h2>
            <motion.div variants={fadeIn} className="w-full h-[1px] bg-gray-200 mt-8" />
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {teamData.map((member) => (
              <motion.div
                key={member.id}
                variants={fadeUp}
                className="bg-white group hover:bg-[#FAFAF8] transition-colors duration-200 flex flex-col"
              >
                <div className="h-[2px] bg-gray-100 group-hover:bg-primary transition-colors duration-200" />
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={`${member.name} — ${member.position}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    quality={70}
                    className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <h3 className="text-base font-bold text-gray-950 mb-1 leading-snug">{member.name}</h3>
                    <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-primary">{member.position}</p>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{member.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {member.specialties.map((s) => (
                      <span key={s} className="border border-gray-200 text-gray-500 text-[10px] font-medium px-2 py-0.5 tracking-wide">{s}</span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400 mb-0.5">Pendidikan</p>
                    <p className="text-xs text-gray-600 font-medium">{member.education}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        className="bg-gray-950 py-20"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.p variants={fadeUp} className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 mb-4">
            Work With Us
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
            Mulai Bersama Tim Expert Kami
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Konsultasikan kebutuhan riset Anda langsung dengan tim profesional Cognifera.
          </motion.p>
          <motion.div variants={fadeUp}>
            <a
              href="https://wa.me/message/VRRB5IFQ7LQ4A1"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 text-sm font-medium tracking-wide transition-colors"
            >
              Konsultasi Sekarang
            </a>
          </motion.div>
        </div>
      </motion.section>

    </div>
  );
}
