"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Search, Eye, ShoppingCart, Calendar, Users, Clock } from "lucide-react";
import { formatBookPrice, getBookHref, getBookInquiryUrl } from "@/lib/books";
import { mockBooks } from "@/mock-data/publications";
import { BookData } from "@/types/publications";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const comingSoonBooks = [
  { title: "Metodologi Penelitian Kualitatif", category: "Referensi", year: "2026" },
  { title: "Statistika Terapan untuk Peneliti", category: "Buku Teks", year: "2026" },
  { title: "Penulisan Karya Ilmiah Internasional", category: "Panduan", year: "2026" },
];

export const BooksSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory] = useState<string>("all");
  const [sortBy] = useState<"year" | "title" | "price">("year");

  // const categories = [
  //   { id: "all", label: "Semua Kategori" },
  //   { id: "textbook", label: "Buku Teks" },
  //   { id: "reference", label: "Buku Referensi" },
  //   { id: "monograph", label: "Monograf" },
  //   { id: "proceedings", label: "Prosiding" },
  // ];

  const filteredBooks = mockBooks
    .filter((book) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        book.title.toLowerCase().includes(query) ||
        book.authors.some((a) => a.toLowerCase().includes(query)) ||
        book.keywords.some((k) => k.toLowerCase().includes(query)) ||
        book.publisher.toLowerCase().includes(query);
      const matchesCategory =
        selectedCategory === "all" || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "year": return b.publicationYear - a.publicationYear;
        case "title": return a.title.localeCompare(b.title);
        case "price": return (a.price || 0) - (b.price || 0);
        default: return 0;
      }
    });

  return (
    <div>
      {/* Section header */}
      <div className="mb-12">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">
          Book Collection
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
            Koleksi Buku
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm md:text-right">
            Karya ilmiah dari peneliti dan akademisi yang diterbitkan bersama Cognifera.
          </p>
        </div>
        <div className="w-full h-[1px] bg-gray-200 mt-8" />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari judul, penulis, atau kata kunci..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-gray-300"
          />
        </div>
        {/* <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48 border border-gray-200 bg-white text-sm rounded-none h-[46px] px-4 focus:ring-0">
            <SelectValue placeholder="Semua Kategori" />
          </SelectTrigger>
          <SelectContent className="rounded-none border-gray-200">
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id} className="text-sm">{cat.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as "year" | "title" | "price")}>
          <SelectTrigger className="w-full md:w-44 border border-gray-200 bg-white text-sm rounded-none h-[46px] px-4 focus:ring-0">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent className="rounded-none border-gray-200">
            <SelectItem value="year" className="text-sm">Tahun Terbaru</SelectItem>
            <SelectItem value="title" className="text-sm">Judul A–Z</SelectItem>
            <SelectItem value="price" className="text-sm">Harga Terendah</SelectItem>
          </SelectContent>
        </Select> */}
      </div>

      {/* Count */}
      <p className="text-[11px] tracking-[0.1em] uppercase text-gray-400 mb-8">
        {filteredBooks.length} buku tersedia
      </p>

      {/* Books display */}
      {filteredBooks.length === 0 ? (
        <div className="py-24 text-center border border-gray-200">
          <p className="text-gray-400 text-sm tracking-wide">Tidak ada buku yang sesuai dengan pencarian Anda.</p>
        </div>
      ) : filteredBooks.length === 1 ? (
        /* Single book — featured horizontal layout */
        <FeaturedBookCard book={filteredBooks[0]} />
      ) : (
        /* Multiple books — grid */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-gray-200">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {/* Coming soon */}
      {!searchQuery && selectedCategory === "all" && (
        <div className="mt-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-full h-[1px] bg-gray-200" />
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400 whitespace-nowrap flex items-center gap-2">
              <Clock className="w-3 h-3" /> Segera Hadir
            </p>
            <div className="w-full h-[1px] bg-gray-200" />
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-gray-200">
            {comingSoonBooks.map((item, i) => (
              <div key={i} className="bg-[#FAFAF8] p-8 flex flex-col gap-4">
                <div className="aspect-[3/4] bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-gray-300">Coming Soon</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-gray-400 mb-1">{item.category} · {item.year}</p>
                  <p className="text-sm font-semibold text-gray-400 leading-snug">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* Featured layout for single book */
const FeaturedBookCard = ({ book }: { book: BookData }) => (
  <div className="border border-gray-200 group hover:border-gray-300 transition-colors duration-200">
    <div className="h-[2px] bg-primary" />
    <div className="grid md:grid-cols-[280px_1fr]">
      {/* Cover */}
      <Link href={getBookHref(book)} className="block">
        <div className="relative aspect-[3/4] bg-gray-50 border-r border-gray-100 overflow-hidden">
          <Image
            src={book.coverImage}
            alt={book.coverAlt ?? book.title}
            fill
            className="object-contain p-6 group-hover:scale-[1.02] transition-transform duration-500"
            sizes="280px"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="p-8 md:p-12 flex flex-col justify-between">
        <div>
          {/* Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="border border-primary/30 text-primary text-[10px] font-medium px-3 py-1 tracking-wider uppercase">
              {book.category.replace("-", " ")}
            </span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wide">{book.language === "id" ? "Bahasa Indonesia" : "English"}</span>
          </div>

          <Link href={getBookHref(book)}>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight leading-snug mb-4 hover:text-primary transition-colors">
              {book.title}
            </h3>
          </Link>

          <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {book.authors.join(", ")}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {book.publisher} · {book.publicationYear}
            </span>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-lg">
            {book.description}
          </p>

          <div className="space-y-1 text-xs text-gray-400 mb-8">
            <p>ISBN: {book.isbn}</p>
            <p>{book.pageLabel ?? (book.pages > 0 ? `${book.pages} halaman` : "")} · {book.format === "both" ? "Cetak & Digital" : book.format === "print" ? "Cetak" : "Digital"}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {book.price && (
            <span className="text-xl font-bold text-gray-950 mr-2">
              {formatBookPrice(book.price)}
            </span>
          )}
          <Link
            href={getBookHref(book)}
            className="flex items-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-950 px-5 py-2.5 text-sm font-medium transition-colors"
          >
            <Eye className="w-4 h-4" />
            Lihat Detail
          </Link>
          <Link
            href={book.purchaseUrl ?? getBookInquiryUrl(book)}
            target="_blank"
            className="flex items-center gap-2 bg-gray-950 hover:bg-primary text-white px-5 py-2.5 text-sm font-medium transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            {book.purchaseUrl ? "Beli Sekarang" : "Tanya Buku Ini"}
          </Link>
        </div>
      </div>
    </div>
  </div>
);

/* Grid card for multiple books */
const BookCard = ({ book }: { book: BookData }) => {
  const availabilityColor = {
    available: "text-green-600 border-green-200",
    "out-of-stock": "text-gray-400 border-gray-200",
    "pre-order": "text-amber-600 border-amber-200",
  }[book.availability] ?? "text-gray-400 border-gray-200";

  const availabilityLabel = {
    available: "Tersedia",
    "out-of-stock": "Habis",
    "pre-order": "Pre-order",
  }[book.availability] ?? book.availability;

  return (
    <div className="bg-white group hover:bg-[#FAFAF8] transition-colors duration-200 flex flex-col">
      <div className="h-[2px] bg-gray-100 group-hover:bg-primary transition-colors duration-200" />
      <Link href={getBookHref(book)}>
        <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden border-b border-gray-100">
          <Image
            src={book.coverImage}
            alt={book.coverAlt ?? book.title}
            fill
            className="object-contain p-4 group-hover:scale-[1.02] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] uppercase tracking-[0.1em] text-gray-400">{book.category.replace("-", " ")}</span>
          <span className="text-[10px] uppercase tracking-[0.1em] text-gray-400">{book.language === "id" ? "ID" : "EN"}</span>
        </div>
        <Link href={getBookHref(book)}>
          <h3 className="text-sm font-bold text-gray-950 leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">{book.title}</h3>
        </Link>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <Users className="w-3 h-3 flex-shrink-0" />
          <span className="line-clamp-1">{book.authors.join(", ")}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <Calendar className="w-3 h-3 flex-shrink-0" />
          <span>{book.publisher} · {book.publicationYear}</span>
        </div>
        <p className="text-[10px] text-gray-400 mb-4">ISBN: {book.isbn}</p>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 mb-4">
          {book.price ? (
            <span className="text-sm font-bold text-gray-950">{formatBookPrice(book.price)}</span>
          ) : (
            <span className="text-xs text-gray-400">Hubungi kami</span>
          )}
          <span className={`text-[10px] font-medium border px-2 py-0.5 tracking-wide ${availabilityColor}`}>{availabilityLabel}</span>
        </div>
        <div className="flex gap-2">
          <Link href={getBookHref(book)} className="flex flex-1 items-center justify-center gap-1.5 border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-950 px-3 py-2 text-xs font-medium transition-colors">
            <Eye className="w-3.5 h-3.5" />Detail
          </Link>
          <Link href={book.purchaseUrl ?? getBookInquiryUrl(book)} target="_blank" className="flex flex-1 items-center justify-center gap-1.5 bg-gray-950 hover:bg-primary text-white px-3 py-2 text-xs font-medium transition-colors">
            <ShoppingCart className="w-3.5 h-3.5" />{book.purchaseUrl ? "Beli" : "Tanya"}
          </Link>
        </div>
      </div>
    </div>
  );
};
