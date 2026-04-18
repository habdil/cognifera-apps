"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { BookData } from "@/types/publications";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface BookCoverProps {
  book: BookData;
}

export function BookCover({ book }: BookCoverProps) {
  const previews = book.previewImages?.length ? book.previewImages : [book.coverImage];
  const [selectedImage, setSelectedImage] = useState(previews[0]);

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      {/* Main image */}
      <div className="relative aspect-[3/4] overflow-hidden border border-gray-200 bg-gray-50">
        <Image
          src={selectedImage}
          alt={book.coverAlt ?? book.title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>

      {/* Thumbnails */}
      {previews.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {previews.map((image, index) => (
            <button
              key={`${book.slug}-${index}`}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`relative aspect-[3/4] overflow-hidden border transition-colors ${
                image === selectedImage ? "border-primary" : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={image}
                alt={`${book.title} preview ${index + 1}`}
                fill
                className="object-contain p-1"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
