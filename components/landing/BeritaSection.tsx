"use client";
import React, { useEffect, useState } from "react";
import { BeritaData } from "@/types";
import { beritaAPI } from "@/lib/api-dummy";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function BeritaSection() {
  const [berita, setBerita] = useState<BeritaData[]>([]);
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
      const filters = selectedCategory === 'all' 
        ? { sortBy: 'date' as const, sortOrder: 'desc' as const }
        : { category: selectedCategory, sortBy: 'date' as const, sortOrder: 'desc' as const };
      
      const response = await beritaAPI.getAll(filters);
      if (response.success && response.data) {
        // Filter only active articles on frontend
        const activeArticles = response.data.filter(article => article.status === 'aktif');
        setBerita(activeArticles.slice(0, 4)); // Show latest 4 articles
      }
      setLoading(false);
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

  const getCategoryColor = (category: string) => {
    const colors = {
      'research': 'bg-blue-100 text-blue-800',
      'industry': 'bg-purple-100 text-purple-800',
      'company': 'bg-orange-100 text-orange-800',
      'announcement': 'bg-red-100 text-red-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryLabel = (category: string) => {
    return categories.find(c => c.value === category)?.label || category;
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
                  <div className="md:w-1/2 bg-primary/10 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📖</div>
                      <div className="text-lg font-medium text-primary">Featured Article</div>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(berita[0].category)}`}>
                        {getCategoryLabel(berita[0].category)}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {formatDate(berita[0].publicationDate)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
                      {berita[0].judul}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {berita[0].metaDescription || `${berita[0].konten.slice(0, 200)}...`}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">
                        By {berita[0].author}
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
              {berita.slice(1).map((artikel, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="h-48 bg-primary/10 flex items-center justify-center">
                    <div className="text-4xl">
                      {artikel.category === 'research' && '🔬'}
                      {artikel.category === 'industry' && '📊'}
                      {artikel.category === 'company' && '🏢'}
                      {artikel.category === 'announcement' && '📢'}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(artikel.category)}`}>
                        {getCategoryLabel(artikel.category)}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {formatDate(artikel.publicationDate)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                      {artikel.judul}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {artikel.metaDescription || `${artikel.konten.slice(0, 120)}...`}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs">
                        {artikel.author}
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