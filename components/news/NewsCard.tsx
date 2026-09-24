import { ContentImage } from "@/components/shared/ContentImage";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { ArticleData, getCategoryLabel } from "@/lib/articles-shared";

function formatDate(value: Date | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(value);
}

export function NewsCard({ article }: { article: ArticleData }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="bg-white border border-gray-200 group hover:bg-[#FAFAF8] hover:border-gray-300 transition-colors duration-200 flex flex-col"
    >
      <div className="h-[2px] bg-gray-100 group-hover:bg-primary transition-colors duration-200" />
      <div className="relative aspect-[16/9] bg-gray-50 overflow-hidden border-b border-gray-100">
        {article.coverImage ? (
          <ContentImage
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] uppercase tracking-[0.15em] text-gray-300">
              Cognifera
            </span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] uppercase tracking-[0.1em] text-primary font-medium">
            {getCategoryLabel(article.category)}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
            <Calendar className="w-3 h-3" />
            {formatDate(article.publishedAt)}
          </span>
        </div>
        <h3 className="text-base font-bold text-gray-950 leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
