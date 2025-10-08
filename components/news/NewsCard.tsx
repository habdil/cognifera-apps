import { PublicArticle, getCategoryLabel, getCategoryName } from "@/lib/api/public-articles";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface NewsCardProps {
  article: PublicArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: PublicArticle['category']) => {
    // Get the category name for comparison (handles both string and object)
    const categoryName = getCategoryName(category);

    const colorMap: { [key: string]: string } = {
      industry: "bg-blue-100 text-blue-800",
      research: "bg-green-100 text-green-800",
      company: "bg-purple-100 text-purple-800",
      announcement: "bg-orange-100 text-orange-800",
      // Also support Indonesian names
      "Industri": "bg-blue-100 text-blue-800",
      "Penelitian": "bg-green-100 text-green-800",
      "Perusahaan": "bg-purple-100 text-purple-800",
      "Pengumuman": "bg-orange-100 text-orange-800"
    };
    return colorMap[categoryName] || "bg-gray-100 text-gray-800";
  };

  return (
    <Link href={`/news/${article.id}`} className="block">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
        {/* Featured Image */}
        <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/30 overflow-hidden">
          {article.featuredImage ? (
            <Image
              src={article.featuredImage}
              alt={article.judul}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-6xl opacity-50">📰</div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category */}
          <div className="mb-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
              <Tag className="w-3 h-3 mr-1" />
              {getCategoryLabel(article.category)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {article.judul}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {article.konten.replace(/<[^>]*>/g, '').substring(0, 150)}...
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(article.publishedAt)}
            </div>
            <div className="flex items-center text-gray-600">
              <span className="font-medium">{article.author.fullName}</span>
            </div>
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {article.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
                {article.tags.length > 3 && (
                  <span className="inline-block text-gray-500 text-xs px-1 py-1">
                    +{article.tags.length - 3} lainnya
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Read More Indicator */}
          <div className="inline-flex items-center text-primary font-semibold text-sm group-hover:text-primary/80 transition-colors">
            Baca Selengkapnya
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}