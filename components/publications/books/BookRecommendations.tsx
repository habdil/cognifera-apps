"use client";

import { BookData } from "@/types/publications";
import { BookRecommendationCard } from "./BookRecommendationCard";

interface BookRecommendationsProps {
  relatedBooks: BookData[];
  currentBook: BookData;
}

export function BookRecommendations({ relatedBooks, currentBook }: BookRecommendationsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (relatedBooks.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-8">Rekomendasi Lainnya</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {relatedBooks.map((relatedBook) => (
          <BookRecommendationCard key={relatedBook.id} book={relatedBook} />
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="mt-12 flex items-center justify-between bg-[var(--color-muted)] rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded"></div>
          <div>
            <div className="font-bold text-[var(--color-foreground)]">{currentBook.title}</div>
            <div className="text-[var(--color-primary)] font-bold">
              {currentBook.price ? formatPrice(currentBook.price) : 'Hubungi Kami'}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-6 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)]/10 transition-colors">
            Tambah ke Keranjang
          </button>
          <button className="px-6 py-2 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg hover:opacity-90 transition-opacity">
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}