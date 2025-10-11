"use client";
import React, { useEffect, useState } from "react";
import { PublicArticle, fetchPublicArticles, getCategoryLabel as getApiCategoryLabel, getCategoryName } from "@/lib/api/public-articles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

export function BeritaSection() {
  const [berita, setBerita] = useState<PublicArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'All Articles' },
    { value: 'research', label: 'Research' },
    { value: 'industry', label: 'Industry' },
    { value: 'company', label: 'Company' },
    { value: 'announcement', label: 'Announcement' }
  ];

  useEffect(() => {
    const fetchBerita = async () => {
      setLoading(true);
      try {
        const response = await fetchPublicArticles({
          limit: 4,
          offset: 0,
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
        });

        if (response.success && response.data) {
          setBerita(response.data);
        }
      } catch (error) {
        console.error('Error fetching articles for landing page:', error);
        toast.error('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, [selectedCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const getCategoryColor = (category: PublicArticle['category']) => {
    const categoryName = getCategoryName(category);
    const colors: { [key: string]: string } = {
      'research': 'bg-blue-100 text-blue-800',
      'industry': 'bg-purple-100 text-purple-800',
      'company': 'bg-orange-100 text-orange-800',
      'announcement': 'bg-red-100 text-red-800',
      'Penelitian': 'bg-blue-100 text-blue-800',
      'Industri': 'bg-purple-100 text-purple-800',
      'Perusahaan': 'bg-orange-100 text-orange-800',
      'Pengumuman': 'bg-red-100 text-red-800'
    };
    return colors[categoryName] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryLabel = (category: PublicArticle['category']) => {
    // Try to get from API helper first (handles both string and object)
    const apiLabel = getApiCategoryLabel(category);

    // If it's already translated, return it
    if (apiLabel !== getCategoryName(category)) {
      return apiLabel;
    }

    // Otherwise use our local mapping
    const categoryName = getCategoryName(category);
    return categories.find(c => c.value === categoryName)?.label || categoryName;
  };

  const getCategoryEmoji = (category: PublicArticle['category']) => {
    const categoryName = getCategoryName(category);
    const emojis: { [key: string]: string } = {
      'research': '🔬',
      'industry': '📊',
      'company': '🏢',
      'announcement': '📢',
      'Penelitian': '🔬',
      'Industri': '📊',
      'Perusahaan': '🏢',
      'Pengumuman': '📢'
    };
    return emojis[categoryName] || '📰';
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Berita & <span className="text-primary">Artikel</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tetap update dengan tips riset terbaru, success stories inspiring, 
            dan perkembangan terkini di dunia publikasi ilmiah.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.value)}
              className="rounded-full"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Articles Grid */}
        {berita.length > 0 ? (
          <>
            {/* Featured Article */}
            <div className="mb-12">
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="md:flex">
                  <div className="md:w-1/2 relative bg-gradient-to-br from-primary/10 to-primary/30 overflow-hidden">
                    {berita[0].featuredImage ? (
                      <Image
                        src={berita[0].featuredImage}
                        alt={berita[0].judul}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="p-8 h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-4">📖</div>
                          <div className="text-lg font-medium text-primary">Featured Article</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(berita[0].category)}`}>
                        {getCategoryLabel(berita[0].category)}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {formatDate(berita[0].publishedAt)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
                      {berita[0].judul}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                      {berita[0].konten.replace(/<[^>]*>/g, '').substring(0, 200)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">
                        By {berita[0].author.fullName}
                      </span>
                      <Link href={`/news/${berita[0].id}`}>
                        <Button variant="outline" className="rounded-full">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {berita.slice(1).map((artikel) => (
                <div
                  key={artikel.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="h-48 relative bg-gradient-to-br from-primary/10 to-primary/30 overflow-hidden">
                    {artikel.featuredImage ? (
                      <Image
                        src={artikel.featuredImage}
                        alt={artikel.judul}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-4xl">
                          {getCategoryEmoji(artikel.category)}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(artikel.category)}`}>
                        {getCategoryLabel(artikel.category)}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {formatDate(artikel.publishedAt)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                      {artikel.judul}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {artikel.konten.replace(/<[^>]*>/g, '').substring(0, 120)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs">
                        {artikel.author.fullName}
                      </span>
                      <Link href={`/news/${artikel.id}`}>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          Read More →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link href="/news">
                <Button size="lg" className="rounded-full px-8">
                  View All Articles
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Belum ada artikel untuk kategori ini
            </h3>
            <p className="text-gray-600">
              Coba pilih kategori lain atau cek kembali nanti
            </p>
          </div>
        )}
      </div>
    </section>
  );
}