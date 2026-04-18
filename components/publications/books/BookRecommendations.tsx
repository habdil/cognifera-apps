"use client";

import Image from "next/image";
import Link from "next/link";
import { BookData } from "@/types/publications";
import { formatBookPrice, getBookHref, getBookInquiryUrl } from "@/lib/books";

interface BookRecommendationsProps {
  relatedBooks: BookData[];
  currentBook: BookData;
}

export function BookRecommendations({ relatedBooks, currentBook }: BookRecommendationsProps) {
  if (relatedBooks.length === 0) return null;

  return (
    <div className="mt-16">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-2">
          Buku Lainnya
        </p>
        <div className="w-full h-[1px] bg-gray-200" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-gray-200">
        {relatedBooks.map((book) => (
          <Link
            key={book.id}
            href={getBookHref(book)}
            className="bg-white group hover:bg-[#FAFAF8] transition-colors duration-200"
          >
            <div className="h-[2px] bg-gray-100 group-hover:bg-primary transition-colors duration-200" />
            <div className="p-3">
              <div className="relative aspect-[3/4] bg-gray-50 border border-gray-100 overflow-hidden mb-3">
                <Image
                  src={book.coverImage}
                  alt={book.coverAlt ?? book.title}
                  fill
                  className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 180px"
                />
              </div>
              <p className="text-xs font-semibold text-gray-950 leading-snug line-clamp-2 mb-1">
                {book.title}
              </p>
              <p className="text-[10px] text-gray-400 line-clamp-1">{book.authors[0]}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Current book sticky CTA */}
      <div className="mt-6 border border-gray-200 bg-[#FAFAF8] p-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-10 overflow-hidden border border-gray-200 bg-white flex-shrink-0">
            <Image
              src={currentBook.coverImage}
              alt={currentBook.coverAlt ?? currentBook.title}
              fill
              className="object-contain p-1"
              sizes="40px"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-950 line-clamp-1">{currentBook.title}</p>
            <p className="text-sm font-bold text-primary">
              {currentBook.price ? formatBookPrice(currentBook.price) : "Hubungi Kami"}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href={getBookHref(currentBook)}
            className="border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-950 px-5 py-2 text-sm font-medium transition-colors"
          >
            Lihat Detail
          </Link>
          <Link
            href={currentBook.purchaseUrl ?? getBookInquiryUrl(currentBook)}
            target="_blank"
            className="bg-primary hover:bg-primary/90 text-white px-5 py-2 text-sm font-medium transition-colors"
          >
            {currentBook.purchaseLabel ?? "Tanya Buku"}
          </Link>
        </div>
      </div>
    </div>
  );
}
