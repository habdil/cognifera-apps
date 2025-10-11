"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PublicArticle, fetchPublicArticleById, fetchPublicArticles, getCategoryLabel, getCategoryName, incrementArticleView } from "@/lib/api/public-articles";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { CommentSection } from "@/components/news/CommentSection";
import { ArticleHeader } from "@/components/news/ArticleHeader";
import { ArticleTags } from "@/components/news/ArticleTags";
import { RelatedArticlesSidebar } from "@/components/news/RelatedArticlesSidebar";
import { RelatedArticleCard } from "@/components/news/RelatedArticleCard";

interface NewsDetailClientProps {
  initialArticle?: PublicArticle | null;
}

export function NewsDetailClient({ initialArticle }: NewsDetailClientProps) {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<PublicArticle | null>(initialArticle || null);
  const [relatedNews, setRelatedNews] = useState<PublicArticle[]>([]);
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
        try {
          const response = await fetchPublicArticleById(id as string);
          if (response.success && response.data) {
            setArticle(response.data);

            // Increment view count when article is loaded
            incrementArticleView(id as string);
          }
        } catch (error) {
          console.error('Error fetching article:', error);
          toast.error('Failed to Load Article', {
            description: 'Unable to fetch article details.',
          });
        } finally {
          setLoading(false);
        }
      };

      fetchArticle();
    } else if (initialArticle) {
      // Also increment view count for SSR-loaded articles
      incrementArticleView(initialArticle.id);
    }
  }, [id, initialArticle]);

  useEffect(() => {
    if (article) {
      const fetchRelatedNews = async () => {
        try {
          // Get category name for API filter (handles both string and object)
          const categoryName = getCategoryName(article.category);

          const relatedResponse = await fetchPublicArticles({
            category: categoryName,
            limit: 4
          });

          if (relatedResponse.success && relatedResponse.data) {
            const related = relatedResponse.data
              .filter(item => item.id !== article.id)
              .slice(0, 3);
            setRelatedNews(related);
          }
        } catch (error) {
          console.error('Error fetching related news:', error);
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

  const getCategoryColor = (category: PublicArticle['category']) => {
    // Get the category name for comparison (handles both string and object)
    const categoryName = getCategoryName(category);

    const colorMap: { [key: string]: string } = {
      research: "bg-blue-100 text-blue-800",
      industry: "bg-purple-100 text-purple-800",
      company: "bg-orange-100 text-orange-800",
      announcement: "bg-red-100 text-red-800",
      // Also support Indonesian names
      "Penelitian": "bg-blue-100 text-blue-800",
      "Industri": "bg-purple-100 text-purple-800",
      "Perusahaan": "bg-orange-100 text-orange-800",
      "Pengumuman": "bg-red-100 text-red-800"
    };
    return colorMap[categoryName] || "bg-gray-100 text-gray-800";
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
            <ArticleHeader
              articleId={article.id}
              title={article.judul}
              author={article.author.fullName}
              publishedAt={article.publishedAt}
              views={article.views}
              initialLikes={article.likes}
              initialIsLiked={article.isLiked}
              categoryLabel={getCategoryLabel(article.category)}
            />

            {/* Featured Image */}
            <div className="mb-8">
              <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-primary/30 rounded-lg overflow-hidden">
                {article.featuredImage ? (
                  <Image
                    src={article.featuredImage}
                    alt={article.judul}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-6xl opacity-50">📰</div>
                  </div>
                )}
              </div>
              {article.featuredImage && (
                <p className="text-xs text-gray-500 mt-2 italic">Ilustrasi artikel - {article.judul}</p>
              )}
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <style jsx global>{`
                /* Article Content Styling - Same as Preview Page */
                .prose h1 {
                  font-size: 2.25rem;
                  font-weight: 700;
                  margin-top: 2rem;
                  margin-bottom: 1rem;
                  color: #111827;
                }

                .prose h2 {
                  font-size: 1.875rem;
                  font-weight: 700;
                  margin-top: 1.75rem;
                  margin-bottom: 0.875rem;
                  color: #111827;
                }

                .prose h3 {
                  font-size: 1.5rem;
                  font-weight: 600;
                  margin-top: 1.5rem;
                  margin-bottom: 0.75rem;
                  color: #111827;
                }

                .prose p {
                  margin-bottom: 1rem;
                  line-height: 1.75;
                  color: #374151;
                }

                .prose ul,
                .prose ol {
                  padding-left: 1.5rem;
                  margin-bottom: 1rem;
                }

                .prose ul {
                  list-style-type: disc;
                }

                .prose ol {
                  list-style-type: decimal;
                }

                .prose li {
                  margin-bottom: 0.25rem;
                  line-height: 1.75;
                }

                .prose img {
                  max-width: 100%;
                  height: auto;
                  border-radius: 0.5rem;
                  margin: 1rem auto;
                  display: block;
                }

                .prose img[data-align="left"] {
                  margin-left: 0 !important;
                  margin-right: auto !important;
                }

                .prose img[data-align="center"] {
                  margin-left: auto !important;
                  margin-right: auto !important;
                }

                .prose img[data-align="right"] {
                  margin-left: auto !important;
                  margin-right: 0 !important;
                }

                .prose a {
                  color: #3b82f6;
                  text-decoration: underline;
                  transition: color 0.2s;
                }

                .prose a:hover {
                  color: #2563eb;
                }

                .prose blockquote {
                  border-left: 4px solid #e5e7eb;
                  padding-left: 1rem;
                  font-style: italic;
                  color: #6b7280;
                  margin: 1rem 0;
                }

                .prose code {
                  background-color: #f3f4f6;
                  padding: 0.2rem 0.4rem;
                  border-radius: 0.25rem;
                  font-size: 0.9em;
                  font-family: monospace;
                }
              `}</style>
              <div
                className="text-gray-900 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.konten }}
              />
            </div>

            {/* Tags */}
            <ArticleTags tags={article.tags} />

            {/* Comment Section */}
            <CommentSection articleId={article.id} />
          </div>

          {/* Sidebar */}
          <RelatedArticlesSidebar
            articles={relatedNews}
            formatDate={formatDate}
            getCategoryColor={getCategoryColor}
          />
        </div>

        {/* Mobile Related News */}
        {relatedNews.length > 0 && (
          <div className="lg:hidden mt-8 px-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Artikel Terkait</h2>
            <div className="grid gap-4">
              {relatedNews.map((relatedArticle) => (
                <RelatedArticleCard
                  key={relatedArticle.id}
                  article={relatedArticle}
                  variant="mobile"
                  formatDate={formatDate}
                  getCategoryColor={getCategoryColor}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
