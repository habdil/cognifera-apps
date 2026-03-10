"use client";

import Image from "next/image";
import { useState } from "react";
import { BookOpen } from "lucide-react";
import { BookData } from "@/types/publications";

interface BookCoverProps {
  book: BookData;
}

export function BookCover({ book }: BookCoverProps) {
  const previews = book.previewImages?.length
    ? book.previewImages
    : [book.coverImage];
  const [selectedImage, setSelectedImage] = useState(previews[0]);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-3">
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt={book.coverAlt ?? book.title}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
            <div className="text-center">
              <BookOpen className="mx-auto mb-4 h-16 w-16 opacity-80" />
              <div className="text-lg font-bold">{book.title}</div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {previews.map((image, index) => {
          const isActive = image === selectedImage;

          return (
            <button
              key={`${book.slug}-${index}`}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`relative aspect-[3/4] overflow-hidden rounded-lg border transition-colors ${
                isActive
                  ? "border-[var(--color-primary)]"
                  : "border-[var(--color-border)] hover:border-[var(--color-primary)]"
              }`}
            >
              <Image
                src={image}
                alt={`${book.title} preview ${index + 1}`}
                fill
                className="object-contain"
                sizes="120px"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
