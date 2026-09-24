import { Metadata } from "next";
import Link from "next/link";
import { listPublishedArticles } from "@/lib/articles";
import { ARTICLE_CATEGORIES } from "@/lib/articles-shared";
import { NewsCard } from "@/components/news/NewsCard";

const PAGE_SIZE = 9;

export const metadata: Metadata = {
  title: "Berita & Artikel",
  description:
    "Berita terbaru, artikel riset, dan pengumuman dari Cognifera — layanan riset akademik, publikasi jurnal, dan penerbitan buku.",
  keywords: [
    "berita cognifera", "artikel riset", "publikasi ilmiah", "berita akademik",
    "penelitian indonesia",
  ],
  openGraph: {
    title: "Berita & Artikel | Cognifera",
    description: "Berita terbaru, artikel riset, dan pengumuman dari Cognifera.",
    url: "https://www.cognifera.web.id/news",
    type: "website",
  },
  alternates: {
    canonical: "https://www.cognifera.web.id/news",
  },
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const category = ARTICLE_CATEGORIES.some((c) => c.value === params.category)
    ? params.category
    : undefined;
  const page = Math.max(1, Number(params.page) || 1);

  const { articles, total } = await listPublishedArticles({
    category,
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const categoryHref = (value?: string) =>
    value ? `/news?category=${value}` : "/news";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-950 text-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 mb-6">
            News & Articles
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] max-w-3xl mb-6">
            Berita & Artikel
          </h1>
          <div className="w-10 h-[2px] bg-primary mb-6" />
          <p className="text-lg text-white/60 max-w-xl leading-relaxed">
            Kabar terbaru seputar riset, publikasi, dan kegiatan Cognifera.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            <Link
              href={categoryHref()}
              className={`text-xs font-medium px-4 py-2 border transition-colors ${
                !category
                  ? "bg-gray-950 text-white border-gray-950"
                  : "border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              Semua
            </Link>
            {ARTICLE_CATEGORIES.map((item) => (
              <Link
                key={item.value}
                href={categoryHref(item.value)}
                className={`text-xs font-medium px-4 py-2 border transition-colors ${
                  category === item.value
                    ? "bg-gray-950 text-white border-gray-950"
                    : "border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {articles.length === 0 ? (
            <div className="py-24 text-center border border-gray-200">
              <p className="text-gray-400 text-sm tracking-wide">
                Belum ada artikel di kategori ini.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/news?${category ? `category=${category}&` : ""}page=${p}`}
                  className={`w-9 h-9 flex items-center justify-center text-sm border transition-colors ${
                    p === page
                      ? "bg-gray-950 text-white border-gray-950"
                      : "border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
