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

        {/* Breadcrumb bar */}
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-xs text-gray-400">
            <Link href="/publications" className="hover:text-primary transition-colors">
              Publikasi
            </Link>
            <span>/</span>
            <Link href="/publications" className="hover:text-primary transition-colors">
              Buku
            </Link>
            <span>/</span>
            <span className="text-gray-600 line-clamp-1">{book.title}</span>
          </div>
        </div>

        {/* Back link */}
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-2">
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-950 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Koleksi Buku
          </Link>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-6 py-10 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <BookCover book={book} />
            <BookDetails book={book} inquiryUrl={inquiryUrl} />
          </div>

          <PromoBanner />
          <BookRecommendations relatedBooks={relatedBooks} currentBook={book} />
        </div>

      </div>
    </>
  );
}
