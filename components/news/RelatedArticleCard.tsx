import Link from "next/link";
import Image from "next/image";
import { PublicArticle, getCategoryLabel } from "@/lib/api/public-articles";

interface RelatedArticleCardProps {
  article: PublicArticle;
  variant?: 'sidebar' | 'mobile';
  formatDate: (date: string) => string;
  getCategoryColor: (category: PublicArticle['category']) => string;
}

export function RelatedArticleCard({
  article,
  variant = 'sidebar',
  formatDate,
  getCategoryColor
}: RelatedArticleCardProps) {
  if (variant === 'sidebar') {
    return (
      <Link
        href={`/news/${article.id}`}
        className="block group"
      >
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="relative w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/30 rounded overflow-hidden">
              {article.featuredImage ? (
                <Image
                  src={article.featuredImage}
                  alt={article.judul}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-lg opacity-50">📰</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2 text-sm leading-tight">
              {article.judul}
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              {formatDate(article.publishedAt)}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  // Mobile variant
  return (
    <Link
      href={`/news/${article.id}`}
      className="flex gap-4 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="relative w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/30 rounded overflow-hidden flex-shrink-0">
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.judul}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-2xl opacity-50">📰</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${getCategoryColor(article.category)}`}>
          {getCategoryLabel(article.category)}
        </span>
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
          {article.judul}
        </h3>
        <p className="text-sm text-gray-500">
          {formatDate(article.publishedAt)}
        </p>
      </div>
    </Link>
  );
}
