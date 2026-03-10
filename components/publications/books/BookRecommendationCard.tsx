"use client";

import Image from "next/image";
import Link from "next/link";
import { BookData } from "@/types/publications";
import { formatBookPrice, getBookHref } from "@/lib/books";

interface BookRecommendationCardProps {
  book: BookData;
}

export function BookRecommendationCard({ book }: BookRecommendationCardProps) {
  return (
    <Link href={getBookHref(book)} className="group block">
      <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-lg border border-[var(--color-border)] bg-white p-2 transition-shadow group-hover:shadow-lg">
        <Image
          src={book.coverImage}
          alt={book.coverAlt ?? book.title}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 50vw, 16vw"
        />
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-1 text-xs">
          {book.format === "digital" && (
            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
              Digital
            </span>
          )}
          {book.format === "print" && (
            <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-800">
              Print
            </span>
          )}
          {book.format === "both" && (
            <span className="rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
              Both
            </span>
          )}
          <span className="rounded bg-[var(--color-muted)] px-2 py-0.5 text-xs capitalize text-[var(--color-muted-foreground)]">
            {book.category.replace("-", " ")}
          </span>
        </div>

        <h4 className="line-clamp-2 text-sm font-medium text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-primary)]">
          {book.title}
        </h4>

        <p className="line-clamp-1 text-xs text-[var(--color-muted-foreground)]">
          {book.authors.join(", ")}
        </p>

        <div className="font-bold text-[var(--color-primary)]">
          {book.price ? formatBookPrice(book.price) : "Hubungi Kami"}
        </div>
      </div>
    </Link>
  );
}
