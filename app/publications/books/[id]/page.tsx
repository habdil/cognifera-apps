"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Heart, Share2, ShoppingCart, BookOpen, Plus, Minus } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { mockBooks } from "@/mock-data/publications";
import { BookData } from "@/types/publications";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const bookId = params.id as string;
    const foundBook = mockBooks.find(b => b.id === bookId);
    
    if (foundBook) {
      setBook(foundBook);
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-[3/4] w-full rounded" />
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <div className="flex items-center gap-4 mb-4">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-6">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="p-3 bg-white rounded-lg border-2 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Skeleton className="h-5 w-24 mb-1" />
                        <Skeleton className="h-7 w-32" />
                      </div>
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="border rounded-lg flex items-center">
                      <Skeleton className="h-10 w-10" />
                      <Skeleton className="h-10 w-8" />
                      <Skeleton className="h-10 w-10" />
                    </div>
                    <Skeleton className="flex-1 h-12 rounded-lg" />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-6 w-24 mb-3" />
                  <Skeleton className="h-20 w-full mb-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div>
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex">
                          <Skeleton className="h-4 w-24 mr-2" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex">
                          <Skeleton className="h-4 w-24 mr-2" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">
              Book Not Found
            </h1>
            <p className="text-[var(--color-muted-foreground)] mb-8">
              The book you're looking for doesn't exist.
            </p>
            <button
              onClick={() => router.push("/publications?section=books")}
              className="px-6 py-3 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg hover:opacity-90 transition-opacity"
            >
              Back to Books
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const relatedBooks = mockBooks
    .filter(b => b.id !== book.id && (b.category === book.category || b.authors.some(author => book.authors.includes(author))))
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => router.push("/publications?section=books")}
              className="flex items-center gap-2 text-[var(--color-primary)] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Books
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Book Cover and Thumbnails */}
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-lg p-8 flex items-center justify-center">
                <div className="text-white text-center">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-80" />
                  <div className="text-lg font-bold mb-2">{book.title}</div>
                  <div className="text-sm opacity-80">{book.authors[0]}</div>
                </div>
              </div>
              
              {/* Thumbnail previews */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((thumb) => (
                  <div key={thumb} className="aspect-[3/4] bg-gray-100 rounded border-2 border-transparent hover:border-[var(--color-primary)] cursor-pointer transition-colors">
                    <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 rounded flex items-center justify-center">
                      <span className="text-xs text-[var(--color-muted-foreground)]">{thumb}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Details */}
            <div className="lg:col-span-2 space-y-6">
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
          </div>

          {/* Promotional Banner */}
          <div className="mt-12 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Yuk, cari tahu perbedaan format PDF dan EPUB!</h3>
              <p className="mb-6">Dapatkan pengalaman membaca yang lebih baik dengan format yang sesuai kebutuhan Anda</p>
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Klik di Sini
              </button>
            </div>
          </div>

          {/* Recommendations */}
          {relatedBooks.length > 0 && (
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
                    <div className="font-bold text-[var(--color-foreground)]">{book.title}</div>
                    <div className="text-[var(--color-primary)] font-bold">
                      {book.price ? formatPrice(book.price) : 'Hubungi Kami'}
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
          )}
        </div>
      </div>
    </div>
  );
}

const BookRecommendationCard = ({ book }: { book: BookData }) => {
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
};