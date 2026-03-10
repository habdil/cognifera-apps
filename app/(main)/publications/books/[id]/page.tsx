import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCover } from "@/components/publications/books/BookCover";
import { BookDetails } from "@/components/publications/books/BookDetails";
import { BookRecommendations } from "@/components/publications/books/BookRecommendations";
import { PromoBanner } from "@/components/publications/books/PromoBanner";
import { getBookByParam, getBookHref, getBookInquiryUrl, getRelatedBooks } from "@/lib/books";
import { mockBooks } from "@/mock-data/publications";

interface BookDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return mockBooks.map((book) => ({
    id: book.slug,
  }));
}

export async function generateMetadata({
  params,
}: BookDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const book = getBookByParam(id);

  if (!book) {
    return {
      title: "Buku Tidak Ditemukan | Cognifera",
      description: "Halaman buku yang Anda cari tidak tersedia.",
    };
  }

  return {
    title: `${book.title} | Cognifera Publications`,
    description: book.description,
    keywords: book.keywords,
    alternates: {
      canonical: `https://www.cognifera.web.id${getBookHref(book)}`,
    },
    openGraph: {
      title: book.title,
      description: book.description,
      url: `https://www.cognifera.web.id${getBookHref(book)}`,
      type: "website",
      images: [
        {
          url: `https://www.cognifera.web.id${book.coverImage}`,
          alt: book.coverAlt ?? book.title,
        },
      ],
    },
  };
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = await params;
  const book = getBookByParam(id);

  if (!book) {
    notFound();
  }

  const relatedBooks = getRelatedBooks(book);
  const inquiryUrl = getBookInquiryUrl(book);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: book.authors.map((author) => ({
      "@type": "Person",
      name: author,
    })),
    publisher: {
      "@type": "Organization",
      name: book.publisher,
    },
    isbn: book.isbn,
    inLanguage: book.language === "id" ? "id-ID" : "en-US",
    datePublished: `${book.publicationYear}-01-01`,
    description: book.description,
    image: `https://www.cognifera.web.id${book.coverImage}`,
    url: `https://www.cognifera.web.id${getBookHref(book)}`,
    offers: {
      "@type": "Offer",
      availability:
        book.availability === "available"
          ? "https://schema.org/InStock"
          : book.availability === "pre-order"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/OutOfStock",
      price: book.price,
      priceCurrency: "IDR",
      url: book.purchaseUrl ?? inquiryUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white">
        <div className="pt-16 pb-16 px-4 md:pt-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <Link
                href="/publications?section=books"
                className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Books
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <BookCover book={book} />
              <BookDetails book={book} inquiryUrl={inquiryUrl} />
            </div>

            <PromoBanner />
            <BookRecommendations relatedBooks={relatedBooks} currentBook={book} />
          </div>
        </div>
      </div>
    </>
  );
}
