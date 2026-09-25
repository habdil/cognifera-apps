import { Suspense } from "react";
import { Metadata } from "next";
import { listPublishedBooks } from "@/lib/books";
import PublicationsContent from "./components/PublicationsContent";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Publikasi - Buku Akademik",
  description: "Jelajahi koleksi buku ilmiah, monograf, dan buku referensi yang diterbitkan bersama Cognifera oleh para peneliti terbaik Indonesia.",
  keywords: [
    "buku ilmiah", "monograf", "buku referensi", "penelitian", "riset",
    "penerbitan buku", "karya ilmiah", "cognifera publications", "buku akademik"
  ],
  openGraph: {
    title: "Publikasi - Buku Akademik | Cognifera",
    description: "Koleksi buku ilmiah, monograf, dan buku referensi dari para peneliti terbaik Indonesia.",
    url: "https://www.cognifera.web.id/publications",
    type: "website",
    images: [
      {
        url: "/og-home.jpg",
        width: 904,
        height: 533,
        alt: "Cognifera Publications",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cognifera.web.id/publications",
  },
};


export default async function PublicationsPage() {
  const books = await listPublishedBooks();

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white animate-pulse">
        <div className="h-[400px] bg-gray-200" />
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white h-96" />
            ))}
          </div>
        </div>
      </div>
    }>
      <PublicationsContent books={books} />
    </Suspense>
  );
}