"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BeritaData } from "@/types";
import { beritaAPI } from "@/lib/api-dummy";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";

export default function NewsDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState<BeritaData | null>(null);
  const [relatedNews, setRelatedNews] = useState<BeritaData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      const response = await beritaAPI.getById(id as string);
      if (response.success && response.data) {
        setArticle(response.data);
        
        // Fetch related news
        const relatedResponse = await beritaAPI.getAll({ 
          status: "aktif", 
          category: response.data.category 
        });
        
        if (relatedResponse.success && relatedResponse.data) {
          const related = relatedResponse.data
            .filter(item => item.id !== id)
            .slice(0, 3);
          setRelatedNews(related);
        }
      }
      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long", 
      day: "numeric",
    });
  };

  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      industry: "Industry News",
      research: "Research News",
      company: "Company News", 
      announcement: "Pengumuman"
    };
    return categoryMap[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      industry: "bg-blue-100 text-blue-800",
      research: "bg-green-100 text-green-800",
      company: "bg-purple-100 text-purple-800",
      announcement: "bg-orange-100 text-orange-800"
    };
    return colorMap[category] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <>
        <Navbar />
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
        <Footer />
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-4xl mx-auto px-6 py-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📰</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Artikel Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-8">Artikel yang Anda cari tidak tersedia.</p>
            <Link
              href="/news"
              className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Berita
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Back Button */}
          <Link
            href="/news"
            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Berita
          </Link>

          {/* Article */}
          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="p-8 border-b">
              {/* Category */}
              <div className="mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                  <Tag className="w-4 h-4 mr-1" />
                  {getCategoryLabel(article.category)}
                </span>
                {article.featured && (
                  <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    ⭐ Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                {article.judul}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  {formatDate(article.publicationDate)}
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  5 min read
                </div>
                <button className="flex items-center hover:text-primary transition-colors">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Image Placeholder */}
            <div className="h-64 bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
              <div className="text-8xl opacity-50">📰</div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div 
                className="prose prose-lg max-w-none text-gray-900"
                dangerouslySetInnerHTML={{ __html: article.konten }}
              />
            </div>
          </article>

          {/* Related News */}
          {relatedNews.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Artikel Terkait</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedNews.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/news/${relatedArticle.id}`}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="h-32 bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
                      <div className="text-4xl opacity-50">📰</div>
                    </div>
                    <div className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(relatedArticle.category)}`}>
                        {getCategoryLabel(relatedArticle.category)}
                      </span>
                      <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {relatedArticle.judul}
                      </h3>
                      <p className="text-gray-900 text-sm">
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
      <Footer />
    </>
  );
}