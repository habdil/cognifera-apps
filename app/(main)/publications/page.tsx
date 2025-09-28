import { Suspense } from "react";
import { Metadata } from "next";
import PublicationsContent from "./components/PublicationsContent";

export const metadata: Metadata = {
  title: "Publikasi - Jurnal & Buku Akademik",
  description: "Jelajahi koleksi publikasi kami meliputi jurnal penelitian, layanan komunitas, dan buku akademik yang berkontribusi pada pengetahuan ilmiah dan pengembangan masyarakat.",
  keywords: [
    "publikasi", "jurnal akademik", "buku ilmiah", "penelitian", "riset",
    "publikasi jurnal", "penerbitan buku", "karya ilmiah", "cognifera publications"
  ],
  openGraph: {
    title: "Publikasi - Jurnal & Buku Akademik | Cognifera",
    description: "Jelajahi koleksi publikasi kami meliputi jurnal penelitian, layanan komunitas, dan buku akademik yang berkontribusi pada pengetahuan ilmiah.",
    url: "https://www.cognifera.web.id/publications",
    type: "website",
  },
  alternates: {
    canonical: "https://www.cognifera.web.id/publications",
  },
};


export default function PublicationsPage() {
  return (
    <Suspense fallback={
      <>
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="animate-pulse">
              {/* Header skeleton */}
              <div className="text-center mb-12">
                <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-6"></div>
                <div className="w-24 h-1 bg-gray-200 mx-auto mb-8 rounded-full"></div>
                <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
              </div>

              {/* Navigation buttons skeleton */}
              <div className="flex justify-center gap-4 mb-16">
                <div className="h-12 bg-gray-200 rounded-full w-40"></div>
                <div className="h-12 bg-gray-200 rounded-full w-48"></div>
                <div className="h-12 bg-gray-200 rounded-full w-32"></div>
              </div>

              {/* Content grid skeleton */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-xl p-6">
                    <div className="h-48 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    }>
      <PublicationsContent />
    </Suspense>
  );
}