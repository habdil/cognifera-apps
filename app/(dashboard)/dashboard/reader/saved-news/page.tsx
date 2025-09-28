"use client";

import { useState, useEffect } from 'react';
import { useUnifiedAuth } from '@/hooks/useUnifiedAuth';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Heart, Trash2, ExternalLink, Calendar, User } from 'lucide-react';
import { toast } from 'sonner';

// Mock data untuk berita tersimpan - nanti bisa diganti dengan API
const mockSavedNews = [
  {
    id: '1',
    title: 'Breakthrough in Quantum Computing Technology',
    excerpt: 'Scientists achieve new milestone in quantum computing that could revolutionize the industry...',
    category: 'Technology',
    publishedAt: '2024-01-15',
    author: 'Dr. Sarah Johnson',
    imageUrl: '/api/placeholder/300/200',
    savedAt: '2024-01-16'
  },
  {
    id: '2',
    title: 'Climate Change Impact on Marine Ecosystems',
    excerpt: 'New research reveals concerning trends in ocean temperature and marine biodiversity...',
    category: 'Environment',
    publishedAt: '2024-01-10',
    author: 'Prof. Michael Chen',
    imageUrl: '/api/placeholder/300/200',
    savedAt: '2024-01-12'
  },
  {
    id: '3',
    title: 'AI Ethics in Healthcare Applications',
    excerpt: 'Exploring the ethical considerations and guidelines for AI implementation in medical...',
    category: 'Healthcare',
    publishedAt: '2024-01-08',
    author: 'Dr. Emily Rodriguez',
    imageUrl: '/api/placeholder/300/200',
    savedAt: '2024-01-09'
  }
];

export default function SavedNewsPage() {
  const { user, loading, error } = useUnifiedAuth('READER');
  const [savedNews, setSavedNews] = useState(mockSavedNews);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
          <p className="text-gray-600">You need to be logged in to access this page.</p>
        </div>
      </div>
    );
  }

  const handleRemoveFromSaved = (newsId: string) => {
    setSavedNews(savedNews.filter(news => news.id !== newsId));
    toast.success('Berita berhasil dihapus dari koleksi tersimpan');
  };

  const categories = ['all', ...Array.from(new Set(savedNews.map(news => news.category)))];
  const filteredNews = selectedCategory === 'all'
    ? savedNews
    : savedNews.filter(news => news.category === selectedCategory);

  return (
    <DashboardLayout userRole="READER" userName={user.fullName}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Berita Tersimpan</h1>
            <p className="text-gray-600 mt-1">
              Koleksi berita yang telah Anda simpan ({savedNews.length} artikel)
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span className="text-sm text-gray-500">Total: {savedNews.length}</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category === 'all' ? 'Semua' : category}
            </Button>
          ))}
        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map(news => (
              <div key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image */}
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/api/placeholder/300/200';
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                      {news.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {news.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{news.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(news.publishedAt).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <Button
                      size="sm"
                      className="flex items-center space-x-2"
                      onClick={() => window.open(`/news/${news.id}`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Baca</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveFromSaved(news.id)}
                      className="flex items-center space-x-2 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Hapus</span>
                    </Button>
                  </div>

                  {/* Saved Date */}
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      Disimpan: {new Date(news.savedAt).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {selectedCategory === 'all' ? 'Belum Ada Berita Tersimpan' : `Tidak Ada Berita di Kategori ${selectedCategory}`}
            </h3>
            <p className="text-gray-500 mb-4">
              {selectedCategory === 'all'
                ? 'Mulai simpan berita favorit Anda untuk dibaca nanti'
                : 'Coba pilih kategori lain atau reset filter'
              }
            </p>
            <Button
              onClick={() => setSelectedCategory('all')}
              variant="outline"
            >
              {selectedCategory === 'all' ? 'Jelajahi Berita' : 'Lihat Semua'}
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}