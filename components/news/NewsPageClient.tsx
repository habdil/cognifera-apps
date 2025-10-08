"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PublicArticle, fetchPublicArticles, calculateTotalPages } from "@/lib/api/public-articles";
import { NewsCard } from "@/components/news/NewsCard";
import { Search, Filter } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function NewsContent() {
  const searchParams = useSearchParams();
  const [news, setNews] = useState<PublicArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams?.get('category') || "all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const newsPerPage = 9;

  const categories = [
    { value: "all", label: "Semua Kategori" },
    { value: "industry", label: "Industry News" },
    { value: "research", label: "Research News" },
    { value: "company", label: "Company News" },
    { value: "announcement", label: "Pengumuman" }
  ];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: newsPerPage,
          search: searchTerm || undefined,
          category: selectedCategory !== "all" ? selectedCategory : undefined,
        };

        // Debug: Log request parameters
        console.log('🔍 Fetching articles with params:', params);
        console.log('📋 Selected Category:', selectedCategory);

        // Fetch published articles from public API
        const response = await fetchPublicArticles(params);

        console.log('✅ API Response:', response);
        console.log('📊 Total articles found:', response.meta?.total);
        console.log('📄 Articles returned:', response.data?.length);

        if (response.success && response.data) {
          setNews(response.data);
          setTotalArticles(response.meta.total);

          // Calculate totalPages from offset-based pagination
          const calculatedTotalPages = calculateTotalPages(response.meta.total, response.meta.limit);
          setTotalPages(calculatedTotalPages);

          console.log('📊 Meta from backend:', response.meta);
          console.log('📄 Calculated total pages:', calculatedTotalPages);

          // Debug: Log first article category
          if (response.data.length > 0) {
            console.log('🏷️ First article category:', response.data[0].category);
          }
        }
      } catch (error) {
        console.error('❌ Error fetching news:', error);
        toast.error('Failed to Load Articles', {
          description: 'Unable to fetch articles. Please try again later.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage, selectedCategory, searchTerm]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-3 gap-6">
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Berita & <span className="text-primary">Artikel</span>
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ikuti perkembangan terbaru di dunia riset, teknologi, dan inovasi melalui artikel-artikel pilihan kami.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <input
              type="text"
              placeholder="Cari berita, artikel, atau topik..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-gray-500 w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          {/* <div className="flex items-center gap-2 min-w-[250px]">
            <Filter className="text-gray-400 w-5 h-5 shrink-0" />
            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                console.log('📝 Category changed to:', value);
                setSelectedCategory(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Menampilkan {news.length} dari {totalArticles} artikel
            {selectedCategory !== "all" && (
              <span className="ml-2 text-primary font-medium">
                (Kategori: {categories.find(c => c.value === selectedCategory)?.label})
              </span>
            )}
          </p>
        </div>

        {/* News Grid */}
        {news.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Tidak ada artikel ditemukan
            </h3>
            <p className="text-gray-500">
              Coba ubah kata kunci pencarian atau pilih kategori lain.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {news.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === index + 1
                    ? "bg-primary text-white border-primary"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function
NewsPageClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-3 gap-6">
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
    }>
      <NewsContent />
    </Suspense>
  );
}
