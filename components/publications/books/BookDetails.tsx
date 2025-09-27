"use client";

import { useState } from "react";
import { Heart, Share2, ShoppingCart, Plus, Minus } from "lucide-react";
import { BookData } from "@/types/publications";

interface BookDetailsProps {
  book: BookData;
}

export function BookDetails({ book }: BookDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Title and Actions */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-foreground)] mb-2">
          {book.title}
        </h1>

        <div className="flex items-center gap-4 mb-4">
          <button className="flex items-center gap-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)]">
            <Heart className="h-5 w-5" />
            Favorit
          </button>
          <button className="flex items-center gap-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)]">
            <Share2 className="h-5 w-5" />
            Bagikan
          </button>
        </div>
      </div>

      {/* Purchase Options */}
      <div className="bg-[var(--color-muted)] rounded-lg p-6">
        <h3 className="font-bold text-[var(--color-foreground)] mb-4">Opsi Pembelian</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border-2 border-[var(--color-primary)]">
            <div>
              <div className="font-medium text-[var(--color-foreground)]">
                {book.format === 'both' ? 'Digital + Print' : book.format === 'digital' ? 'Digital' : 'Cetakan'}
              </div>
              <div className="text-2xl font-bold text-[var(--color-primary)]">
                {book.price ? formatPrice(book.price) : 'Hubungi Kami'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[var(--color-muted-foreground)]">
                {book.format === 'digital' && 'PDF'}
              </div>
            </div>
          </div>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center border border-[var(--color-border)] rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-[var(--color-muted)] transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 py-2 font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 hover:bg-[var(--color-muted)] transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg hover:opacity-90 transition-opacity font-medium">
            <ShoppingCart className="h-5 w-5" />
            Tambah ke Keranjang
          </button>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-3">Deskripsi</h3>
        <p className="text-[var(--color-foreground)] leading-relaxed mb-4">
          {book.description}
        </p>
        <button className="text-[var(--color-primary)] hover:underline">
          Baca Selengkapnya
        </button>
      </div>

      {/* Book Information */}
      <div>
        <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-4">Informasi Buku</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex">
              <span className="w-24 text-[var(--color-muted-foreground)] text-sm">Bahasa</span>
              <span className="font-medium text-[var(--color-foreground)]">
                {book.language === 'id' ? 'Indonesia' : 'English'}
              </span>
            </div>
            <div className="flex">
              <span className="w-24 text-[var(--color-muted-foreground)] text-sm">Penerbit</span>
              <span className="font-medium text-[var(--color-foreground)]">{book.publisher}</span>
            </div>
            <div className="flex">
              <span className="w-24 text-[var(--color-muted-foreground)] text-sm">Penulis</span>
              <span className="font-medium text-[var(--color-foreground)]">{book.authors.join(", ")}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex">
              <span className="w-24 text-[var(--color-muted-foreground)] text-sm">Tanggal Rilis</span>
              <span className="font-medium text-[var(--color-foreground)]">{book.publicationYear}</span>
            </div>
            <div className="flex">
              <span className="w-24 text-[var(--color-muted-foreground)] text-sm">Halaman</span>
              <span className="font-medium text-[var(--color-foreground)]">{book.pages} Halaman</span>
            </div>
            <div className="flex">
              <span className="w-24 text-[var(--color-muted-foreground)] text-sm">Format</span>
              <span className="font-medium text-[var(--color-foreground)]">
                {book.format === 'both' ? 'Print & Digital' : book.format === 'digital' ? 'Digital' : 'Print'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}