"use client";

import Image from "next/image";
import Link from "next/link";
import { BookData } from "@/types/publications";
import { formatBookPrice, getBookHref, getBookInquiryUrl } from "@/lib/books";
import { BookRecommendationCard } from "./BookRecommendationCard";

interface BookRecommendationsProps {
  relatedBooks: BookData[];
  currentBook: BookData;
}

export function BookRecommendations({
  relatedBooks,
  currentBook,
}: BookRecommendationsProps) {
  if (relatedBooks.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="mb-8 text-2xl font-bold text-[var(--color-foreground)]">
        Rekomendasi Lainnya
      </h2>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
        {relatedBooks.map((relatedBook) => (
          <BookRecommendationCard key={relatedBook.id} book={relatedBook} />
        ))}
      </div>

      <div className="mt-12 flex items-center justify-between rounded-lg bg-[var(--color-muted)] p-4">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-12 overflow-hidden rounded border border-[var(--color-border)] bg-white p-1">
            <Image
              src={currentBook.coverImage}
              alt={currentBook.coverAlt ?? currentBook.title}
              fill
              className="object-contain"
              sizes="48px"
            />
          </div>
          <div>
            <div className="font-bold text-[var(--color-foreground)]">
              {currentBook.title}
            </div>
            <div className="font-bold text-[var(--color-primary)]">
              {currentBook.price
                ? formatBookPrice(currentBook.price)
                : "Hubungi Kami"}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href={getBookHref(currentBook)}
            className="rounded-lg border border-[var(--color-primary)] px-6 py-2 text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/10"
          >
            Lihat Detail
          </Link>
          <Link
            href={currentBook.purchaseUrl ?? getBookInquiryUrl(currentBook)}
            target="_blank"
            className="rounded-lg bg-[var(--color-primary)] px-6 py-2 text-[var(--color-primary-foreground)] transition-opacity hover:opacity-90"
          >
            {currentBook.purchaseLabel ?? "Tanya Buku"}
          </Link>
        </div>
      </div>
    </div>
  );
}
