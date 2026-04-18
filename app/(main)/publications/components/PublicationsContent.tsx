"use client";

import { motion } from "motion/react";
import { BooksSection } from "@/components/publications/BooksSection";

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

export default function PublicationsContent() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative text-white py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hero-carousel/hero-publication.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
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
            Publications
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] max-w-3xl mb-8">
            Buku Akademik
          </motion.h1>
          <motion.div variants={fadeIn} className="w-10 h-[2px] bg-primary mb-8" />
          <motion.p variants={fadeUp} className="text-lg text-white/60 max-w-xl leading-relaxed">
            Koleksi buku ilmiah, monograf, dan buku referensi dari para peneliti terbaik Indonesia.
          </motion.p>
        </motion.div>
      </section>

      {/* Books */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <BooksSection />
        </div>
      </section>

      {/* Journal CTA */}
      <motion.section
        className="bg-gray-950 py-20"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.p variants={fadeUp} className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 mb-4">
            Open Access Journals
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
            Cari Jurnal Ilmiah?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Kunjungi portal jurnal kami untuk mengakses publikasi jurnal ilmiah Cognifera secara open access.
          </motion.p>
          <motion.div variants={fadeUp}>
            <a
              href="https://journal.cognifera.web.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 text-sm font-medium tracking-wide transition-colors"
            >
              Lihat Portal Jurnal ↗
            </a>
          </motion.div>
        </div>
      </motion.section>

    </div>
  );
}
