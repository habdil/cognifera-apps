import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getPublishedArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { getCategoryLabel } from "@/lib/articles-shared";
import { NewsCard } from "@/components/news/NewsCard";
import "@/components/editor/editor-styles.css";

export const revalidate = 300;

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(value: Date | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(value);
}

function absoluteImageUrl(path: string) {
  return path.startsWith("http") ? path : `https://www.cognifera.web.id${path}`;
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan",
      description: "Artikel yang Anda cari tidak tersedia.",
    };
  }

  const url = `https://www.cognifera.web.id/news/${article.slug}`;

  return {
    title: article.title,
    description: article.excerpt || article.title,
    keywords: article.tags,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt || article.title,
      url,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      images: article.coverImage
        ? [{ url: absoluteImageUrl(article.coverImage), alt: article.title }]
        : undefined,
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt || article.title,
    image: article.coverImage ? [absoluteImageUrl(article.coverImage)] : undefined,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: {
      "@type": "Organization",
      name: "Cognifera",
      url: "https://www.cognifera.web.id",
    },
    publisher: {
      "@type": "Organization",
      name: "Cognifera",
      logo: {
        "@type": "ImageObject",
        url: "https://www.cognifera.web.id/logo.png",
      },
    },
    mainEntityOfPage: `https://www.cognifera.web.id/news/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white">

        {/* Breadcrumb */}
        <div className="border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-2 text-xs text-gray-400">
            <Link href="/news" className="hover:text-primary transition-colors">
              Berita
            </Link>
            <span>/</span>
            <span className="text-gray-600 line-clamp-1">{article.title}</span>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-6 py-12">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-950 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Berita
          </Link>

          {/* Header */}
          <div className="mb-8">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">
              {getCategoryLabel(article.category)}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight leading-tight mb-5">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 border-b border-gray-100 pb-6">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishedAt)}
              </span>
              {article.tags.length > 0 && (
                <span className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {article.tags.join(", ")}
                </span>
              )}
            </div>
          </div>

          {/* Cover */}
          {article.coverImage && (
            <div className="relative aspect-[16/9] bg-gray-50 border border-gray-100 mb-10 overflow-hidden">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          )}

          {/* Content — reuses the TipTap editor content styles so the public
              rendering matches the admin WYSIWYG exactly. */}
          <div
            className="tiptap-editor-content prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        </article>

        {/* Related */}
        {relatedArticles.length > 0 && (
          <section className="border-t border-gray-100 py-16">
            <div className="max-w-6xl mx-auto px-6">
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-8">
                Artikel Lainnya
              </p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((related) => (
                  <NewsCard key={related.id} article={related} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
