"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { mockBooks } from "@/mock-data/publications";
import { BookData } from "@/types/publications";
import { Button } from "@/components/ui/button";
import { BookDetailSkeleton } from "@/components/publications/books/BookDetailSkeleton";
import { BookCover } from "@/components/publications/books/BookCover";
import { BookDetails } from "@/components/publications/books/BookDetails";
import { PromoBanner } from "@/components/publications/books/PromoBanner";
import { BookRecommendations } from "@/components/publications/books/BookRecommendations";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bookId = params.id as string;
    const foundBook = mockBooks.find(b => b.id === bookId);
    
    if (foundBook) {
      setBook(foundBook);
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return <BookDetailSkeleton />;
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">
              Book Not Found
            </h1>
            <p className="text-[var(--color-muted-foreground)] mb-8">
              The book you&apos;re looking for doesn&apos;t exist.
            </p>
            <Button
              onClick={() => router.push("/publications?section=books")}
              className="px-6 py-3 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg hover:opacity-90 transition-opacity"
            >
              Back to Books
            </Button>
          </div>
        </div>
      </div>
    );
  }


  const relatedBooks = mockBooks
    .filter(b => b.id !== book.id && (b.category === book.category || b.authors.some(author => book.authors.includes(author))))
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      
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
            <BookCover book={book} />
            <BookDetails book={book} />
          </div>

          <PromoBanner />
          <BookRecommendations relatedBooks={relatedBooks} currentBook={book} />
        </div>
      </div>
    </div>
  );
}

