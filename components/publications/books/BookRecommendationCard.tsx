"use client";

import { BookOpen } from "lucide-react";
import { BookData } from "@/types/publications";

interface BookRecommendationCardProps {
  book: BookData;
}

export function BookRecommendationCard({ book }: BookRecommendationCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div
      className="cursor-pointer group"
      onClick={() => window.location.href = `/publications/books/${book.id}`}
    >
      <div className="aspect-[3/4] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-lg mb-3 p-4 flex items-center justify-center group-hover:shadow-lg transition-shadow">
        <div className="text-white text-center">
          <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-80" />
          <div className="text-xs font-medium opacity-90 line-clamp-2">{book.title}</div>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-1 text-xs">
          {book.format === 'digital' && <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">Digital</span>}
          {book.format === 'print' && <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">Print</span>}
          {book.format === 'both' && <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs">Both</span>}
          <span className="bg-[var(--color-muted)] text-[var(--color-muted-foreground)] px-2 py-0.5 rounded text-xs capitalize">
            {book.category.replace('-', ' ')}
          </span>
        </div>

        <h4 className="font-medium text-[var(--color-foreground)] text-sm line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
          {book.title}
        </h4>

        <p className="text-xs text-[var(--color-muted-foreground)] line-clamp-1">
          {book.authors.join(", ")}
        </p>

        <div className="font-bold text-[var(--color-primary)]">
          {book.price ? formatPrice(book.price) : 'Contact'}
        </div>
      </div>
    </div>
  );
}