"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Share2, ExternalLink, FileText, MessageCircle, Check } from "lucide-react";
import { BookData } from "@/types/publications";
import { formatBookPrice } from "@/lib/books";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

interface BookDetailsProps {
  book: BookData;
  inquiryUrl: string;
}

export function BookDetails({ book, inquiryUrl }: BookDetailsProps) {
  const handleShare = async () => {
    const sharePayload = { title: book.title, text: book.description, url: window.location.href };
    if (navigator.share) { await navigator.share(sharePayload); return; }
    await navigator.clipboard.writeText(window.location.href);
  };

  const formatLabel = book.format === "both" ? "Print & Digital" : book.format === "digital" ? "Digital" : "Cetak";
  const availabilityLabel = book.availability === "available" ? "Tersedia" : book.availability === "pre-order" ? "Pre-order" : "Habis";
  const availabilityColor = book.availability === "available" ? "text-green-600 border-green-200" : book.availability === "pre-order" ? "text-amber-600 border-amber-200" : "text-gray-400 border-gray-200";

  return (
    <motion.div
      className="lg:col-span-2 space-y-10"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      {/* Title block */}
      <motion.div variants={fadeUp}>
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="border border-primary/30 text-primary text-[10px] font-medium px-3 py-1 tracking-wider uppercase">
            {book.category.replace("-", " ")}
          </span>
          <span className="border border-gray-200 text-gray-500 text-[10px] font-medium px-3 py-1 tracking-wider uppercase">
            {book.language === "id" ? "Bahasa Indonesia" : "English"}
          </span>
          <span className="border border-gray-200 text-gray-500 text-[10px] font-medium px-3 py-1 tracking-wider uppercase">
            {formatLabel}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight leading-snug mb-3">{book.title}</h1>
        <p className="text-base text-gray-500 mb-6">{book.authors.join(", ")}</p>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={handleShare}
            className="inline-flex items-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-950 px-4 py-2 text-sm font-medium transition-colors">
            <Share2 className="w-4 h-4" />Bagikan
          </button>
          {book.previewUrl && (
            <Link href={book.previewUrl} target="_blank"
              className="inline-flex items-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-950 px-4 py-2 text-sm font-medium transition-colors">
              <FileText className="w-4 h-4" />Lihat Preview
            </Link>
          )}
        </div>
      </motion.div>

      {/* Price & CTA */}
      <motion.div variants={fadeUp} className="border border-gray-200 bg-[#FAFAF8]">
        <div className="h-[2px] bg-primary" />
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.12em] text-gray-400 mb-1">Harga</p>
              <div className="text-3xl font-bold text-gray-950">
                {book.price ? formatBookPrice(book.price) : "Hubungi Kami"}
              </div>
            </div>
            <span className={`text-[10px] font-medium border px-3 py-1 tracking-wide ${availabilityColor}`}>{availabilityLabel}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {book.purchaseUrl ? (
              <Link href={book.purchaseUrl} target="_blank"
                className="inline-flex flex-1 items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-3 text-sm font-medium tracking-wide transition-colors">
                <ExternalLink className="w-4 h-4" />{book.purchaseLabel ?? "Beli Buku"}
              </Link>
            ) : (
              <Link href={inquiryUrl} target="_blank"
                className="inline-flex flex-1 items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-3 text-sm font-medium tracking-wide transition-colors">
                <MessageCircle className="w-4 h-4" />{book.purchaseLabel ?? "Tanya Buku Ini"}
              </Link>
            )}
            <Link href={inquiryUrl} target="_blank"
              className="inline-flex flex-1 items-center justify-center gap-2 bg-gray-950 hover:bg-gray-800 text-white px-5 py-3 text-sm font-medium tracking-wide transition-colors">
              <MessageCircle className="w-4 h-4" />Hubungi Admin
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div variants={fadeUp}>
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">Deskripsi</p>
        <div className="w-full h-[1px] bg-gray-200 mb-6" />
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>{book.description}</p>
          {book.longDescription?.map((paragraph, i) => (
            <p key={i} className="text-gray-500">{paragraph}</p>
          ))}
        </div>
      </motion.div>

      {/* Highlights */}
      {book.highlights?.length ? (
        <motion.div variants={fadeUp}>
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">Highlight</p>
          <div className="w-full h-[1px] bg-gray-200 mb-6" />
          <div className="grid gap-2 md:grid-cols-2">
            {book.highlights.map((item, i) => (
              <div key={i} className="flex items-start gap-3 border border-gray-200 px-4 py-3 text-sm text-gray-700">
                <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />{item}
              </div>
            ))}
          </div>
        </motion.div>
      ) : null}

      {/* Table of Contents */}
      {book.tableOfContents?.length ? (
        <motion.div variants={fadeUp}>
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">Daftar Isi</p>
          <div className="w-full h-[1px] bg-gray-200 mb-6" />
          <div className="border border-gray-200 divide-y divide-gray-100">
            {book.tableOfContents.map((item, index) => (
              <div key={index} className="flex items-start gap-4 px-5 py-3 text-sm">
                <span className="font-semibold text-primary w-5 flex-shrink-0">{index + 1}.</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ) : null}

      {/* Book Info */}
      <motion.div variants={fadeUp}>
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">Informasi Buku</p>
        <div className="w-full h-[1px] bg-gray-200 mb-6" />
        <div className="grid md:grid-cols-2 gap-px bg-gray-200">
          {[
            { label: "Bahasa", value: book.language === "id" ? "Indonesia" : "English" },
            { label: "Penerbit", value: book.publisher },
            { label: "Penulis", value: book.authors.join(", ") },
            { label: "ISBN", value: book.isbn },
            { label: "Tahun Terbit", value: String(book.publicationYear) },
            { label: "Halaman", value: book.pageLabel ?? (book.pages > 0 ? `${book.pages} halaman` : "—") },
            { label: "Format", value: formatLabel },
            ...(book.keywords.length > 0 ? [{ label: "Kata Kunci", value: book.keywords.join(", ") }] : []),
          ].map(({ label, value }) => (
            <div key={label} className="bg-white px-5 py-4 flex gap-4">
              <span className="w-28 text-[11px] uppercase tracking-[0.08em] text-gray-400 flex-shrink-0 pt-0.5">{label}</span>
              <span className="text-sm font-medium text-gray-950">{value}</span>
            </div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
}
