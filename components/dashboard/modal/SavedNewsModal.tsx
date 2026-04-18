"use client";

import { memo, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Heart, Trash2, ExternalLink, Calendar, User, X } from 'lucide-react';
import { toast } from 'sonner';

// Mock data untuk berita tersimpan
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

interface SavedNewsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SavedNewsModal = memo(({ open, onOpenChange }: SavedNewsModalProps) => {
  const [savedNews, setSavedNews] = useState(mockSavedNews);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleRemoveFromSaved = (newsId: string) => {
    setSavedNews(savedNews.filter(news => news.id !== newsId));
    toast.success('Berita berhasil dihapus dari koleksi tersimpan');
  };

  const categories = ['all', ...Array.from(new Set(savedNews.map(news => news.category)))];
  const filteredNews = selectedCategory === 'all'
    ? savedNews
    : savedNews.filter(news => news.category === selectedCategory);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span>Berita Tersimpan</span>
          </DialogTitle>
          <DialogDescription>
            Koleksi berita yang telah Anda simpan ({savedNews.length} artikel)
          </DialogDescription>
        </DialogHeader>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 py-4 border-b">
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

        {/* News List - Scrollable */}
        <div className="flex-1 overflow-y-auto pr-2">
          {filteredNews.length > 0 ? (
            <div className="space-y-4">
              {filteredNews.map(news => (
                <div
                  key={news.id}
                  className="bg-[var(--color-muted)] rounded-lg p-4 hover:bg-gray-50 transition-colors border border-[var(--color-border)]"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="flex-shrink-0 w-32 h-24 bg-gray-200 rounded-lg overflow-hidden relative">
                      <Image
                        src={news.imageUrl}
                        alt={news.title}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                      <div className="absolute top-1 right-1">
                        <span className="bg-[var(--color-primary)] text-white px-2 py-0.5 rounded-full text-xs">
                          {news.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base text-[var(--color-foreground)] mb-1 line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-[var(--color-muted-foreground)] text-sm mb-2 line-clamp-2">
                        {news.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center text-xs text-[var(--color-muted-foreground)] mb-2 space-x-3">
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
                          variant="outline"
                          className="flex items-center space-x-1 h-8"
                          onClick={() => window.open(`/news/${news.id}`, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>Baca</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFromSaved(news.id)}
                          className="flex items-center space-x-1 text-red-600 hover:bg-red-50 h-8"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>Hapus</span>
                        </Button>
                      </div>

                      {/* Saved Date */}
                      <div className="mt-2 pt-2 border-t border-[var(--color-border)]">
                        <p className="text-xs text-[var(--color-muted-foreground)]">
                          Disimpan: {new Date(news.savedAt).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-[var(--color-muted-foreground)] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[var(--color-foreground)] mb-2">
                {selectedCategory === 'all' ? 'Belum Ada Berita Tersimpan' : `Tidak Ada Berita di Kategori ${selectedCategory}`}
              </h3>
              <p className="text-[var(--color-muted-foreground)] mb-4">
                {selectedCategory === 'all'
                  ? 'Mulai simpan berita favorit Anda untuk dibaca nanti'
                  : 'Coba pilih kategori lain atau reset filter'
                }
              </p>
              <Button
                onClick={() => setSelectedCategory('all')}
                variant="outline"
                size="sm"
              >
                {selectedCategory === 'all' ? 'Jelajahi Berita' : 'Lihat Semua'}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
});

SavedNewsModal.displayName = 'SavedNewsModal';
