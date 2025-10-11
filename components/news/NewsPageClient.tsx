"use client";

import React, { useEffect, useState, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { PublicArticle, fetchPublicArticles, calculateTotalPages } from "@/lib/api/public-articles";
import { NewsCard } from "@/components/news/NewsCard";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

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

  // Debounce search term - tunggu 500ms setelah user stop ngetik
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const categories = [
    { value: "all", label: "Semua Kategori" },
    { value: "industry", label: "Industry News" },
    { value: "research", label: "Research News" },
    { value: "company", label: "Company News" },
    { value: "announcement", label: "Pengumuman" }
  ];

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: newsPerPage,
        search: debouncedSearchTerm || undefined,
        category: selectedCategory !== "all" ? selectedCategory : undefined,
      };

      const response = await fetchPublicArticles(params);

      if (response.success && response.data) {
        setNews(response.data);
        setTotalArticles(response.meta.total);

        const calculatedTotalPages = calculateTotalPages(response.meta.total, response.meta.limit);
        setTotalPages(calculatedTotalPages);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      toast.error('Failed to Load Articles', {
        description: 'Unable to fetch articles. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory, debouncedSearchTerm]);

  // Fetch ketika dependencies berubah
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Reset ke page 1 ketika search atau filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedCategory]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers untuk pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Show last page
      pages.push(totalPages);
    }

    return pages;
  };

  if (loading && news.length === 0) {
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
            <Input
              type="text"
              placeholder="Cari berita, artikel, atau topik..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-gray-500 w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {loading && debouncedSearchTerm !== searchTerm && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 min-w-[250px]">
            <Filter className="text-gray-400 w-5 h-5 shrink-0" />
            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value);
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
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-gray-600">
            Menampilkan {news.length} dari {totalArticles} artikel
            {selectedCategory !== "all" && (
              <span className="ml-2 text-primary font-medium">
                (Kategori: {categories.find(c => c.value === selectedCategory)?.label})
              </span>
            )}
          </p>
          {loading && news.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
              Memuat...
            </div>
          )}
        </div>

        {/* News Grid */}
        {news.length === 0 && !loading ? (
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
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {news.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                    className="gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  <div className="flex gap-1">
                    {getPageNumbers().map((page, index) => (
                      <React.Fragment key={index}>
                        {page === '...' ? (
                          <span className="px-3 py-2 text-gray-400">...</span>
                        ) : (
                          <Button
                            onClick={() => paginate(page as number)}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            className="min-w-[40px]"
                          >
                            {page}
                          </Button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <Button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    size="sm"
                    className="gap-1"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function NewsPageClient() {
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
