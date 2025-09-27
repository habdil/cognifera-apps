"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BeritaData } from "@/types";
import { beritaAPI } from "@/lib/api-dummy";
import { ArrowLeft, Share2, Eye, ThumbsUp } from "lucide-react";
import Link from "next/link";

interface NewsDetailClientProps {
  initialArticle?: BeritaData | null;
}

export function NewsDetailClient({ initialArticle }: NewsDetailClientProps) {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<BeritaData | null>(initialArticle || null);
  const [relatedNews, setRelatedNews] = useState<BeritaData[]>([]);
  const [loading, setLoading] = useState(!initialArticle);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/#news');
    }
  };

  useEffect(() => {
    if (!initialArticle && id) {
      const fetchArticle = async () => {
        const response = await beritaAPI.getById(id as string);
        if (response.success && response.data) {
          setArticle(response.data);
        }
        setLoading(false);
      };

      fetchArticle();
    }
  }, [id, initialArticle]);

  useEffect(() => {
    if (article) {
      const fetchRelatedNews = async () => {
        const relatedResponse = await beritaAPI.getAll({
          status: "aktif",
          category: article.category
        });

        if (relatedResponse.success && relatedResponse.data) {
          const related = relatedResponse.data
            .filter(item => item.id !== article.id)
            .slice(0, 3);
          setRelatedNews(related);
        }
      };

      fetchRelatedNews();
    }
  }, [article]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      industry: "Industry",
      research: "Research",
      company: "Company",
      announcement: "Announcement"
    };
    return categoryMap[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      research: "bg-blue-100 text-blue-800",
      industry: "bg-purple-100 text-purple-800",
      company: "bg-orange-100 text-orange-800",
      announcement: "bg-red-100 text-red-800"
    };
    return colorMap[category] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">📰</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Artikel Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-8">Artikel yang Anda cari tidak tersedia.</p>
          <Link
            href="/#news"
            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-8 py-6">
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>

            {/* Article Header */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {article.judul}
              </h1>

              {/* Author and Date */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="font-medium">{article.author}</span>
                <span>•</span>
                <span>{formatDate(article.publicationDate)}</span>
              </div>

              {/* Social Actions */}
              <div className="flex items-center gap-4 py-3 border-y border-gray-200">
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">Like</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
                <div className="flex items-center gap-2 text-gray-500 ml-auto">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">1,234 views</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/30 rounded-lg flex items-center justify-center">
                <div className="text-6xl opacity-50">📰</div>
              </div>
              <p className="text-xs text-gray-500 mt-2 italic">Ilustrasi artikel - {article.judul}</p>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div
                className="text-gray-900 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: article.konten
                    .trim()
                    .split('\n\n')
                    .map(paragraph => paragraph.trim())
                    .filter(paragraph => paragraph.length > 0)
                    .map(paragraph => `<p class="mb-6">${paragraph.replace(/\n/g, '<br>')}</p>`)
                    .join('')
                }}
              />
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-gray-700 mr-2">Tags:</span>
                  {article.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/#news?tag=${tag}`}
                      className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-100 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-80 hidden lg:block">
            {/* Ad Space */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="text-center">
                <div className="text-4xl mb-3">📢</div>
                <p className="text-sm text-gray-600 font-medium">Advertisement Space</p>
                <p className="text-xs text-gray-500 mt-2">Your ad could be here</p>
              </div>
            </div>

            {/* Related News in Sidebar */}
            {relatedNews.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Artikel Terkait</h3>
                <div className="space-y-4">
                  {relatedNews.map((relatedArticle) => (
                    <Link
                      key={relatedArticle.id}
                      href={`/news/${relatedArticle.id}`}
                      className="block group"
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/30 rounded flex items-center justify-center">
                            <span className="text-lg opacity-50">📰</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2 text-sm leading-tight">
                            {relatedArticle.judul}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(relatedArticle.publicationDate)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Another Ad Space */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mt-6">
              <div className="text-center">
                <div className="text-3xl mb-3">🎯</div>
                <p className="text-sm text-gray-700 font-medium">Sponsored Content</p>
                <p className="text-xs text-gray-600 mt-2">Premium placement available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Related News */}
        {relatedNews.length > 0 && (
          <div className="lg:hidden mt-8 px-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Artikel Terkait</h2>
            <div className="grid gap-4">
              {relatedNews.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/news/${relatedArticle.id}`}
                  className="flex gap-4 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/30 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl opacity-50">📰</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${getCategoryColor(relatedArticle.category)}`}>
                      {getCategoryLabel(relatedArticle.category)}
                    </span>
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                      {relatedArticle.judul}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(relatedArticle.publicationDate)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}