"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { newGetCurrentUser } from '@/lib/auth-new';

interface ArticlePreviewData {
  judul: string;
  category: string;
  featuredImage: string;
  konten: string;
  tags: string[];
  author?: {
    id: string;
    fullName: string;
    avatar?: string;
  };
}

export default function ArticlePreviewPage() {
  const [article, setArticle] = useState<ArticlePreviewData | null>(null);
  const [authorName, setAuthorName] = useState<string>('Author Name');

  useEffect(() => {
    // Load article from localStorage
    const stored = localStorage.getItem('article-preview');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setArticle(data);

        // If article has author info from backend, use it
        if (data.author?.fullName) {
          setAuthorName(data.author.fullName);
        }
      } catch (error) {
        console.error('Failed to parse preview data:', error);
      }
    }

    // Get current user from auth (already in localStorage from login)
    const currentUser = newGetCurrentUser();
    if (currentUser?.full_name) {
      setAuthorName(currentUser.full_name);
    }
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">
            No Preview Available
          </h1>
          <p className="text-[var(--color-muted-foreground)] mb-6">
            Please go back and create an article first.
          </p>
          <Button onClick={() => window.close()}>
                <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header Bar */}
      <div className="sticky top-0 z-50 bg-[var(--color-background)] border-b border-[var(--color-border)] shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => window.close()}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="text-sm text-[var(--color-muted-foreground)]">
                Preview Mode • Changes are not saved
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Category Badge */}
        {article.category && (
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-[var(--color-primary)] text-white rounded-full text-sm font-medium">
              {article.category.replace('-', ' ').toUpperCase()}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-foreground)] mb-6 leading-tight">
          {article.judul || 'Untitled Article'}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-[var(--color-muted-foreground)]">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{authorName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
        </div>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-8">
            <Image
              src={article.featuredImage}
              alt={article.judul || 'Article cover'}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <Tag className="w-4 h-4 text-[var(--color-muted-foreground)]" />
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[var(--color-muted)] text-[var(--color-foreground)] rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none text-[var(--color-foreground)]"
          dangerouslySetInnerHTML={{ __html: article.konten }}
          style={{
            fontSize: '1.125rem',
            lineHeight: '1.75',
          }}
        />

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <p className="text-center text-[var(--color-muted-foreground)] text-sm">
            End of Preview
          </p>
        </div>
      </article>

      <style jsx global>{`
        /* Match editor styles */
        .prose h1 {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1.2;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: var(--color-foreground);
        }

        .prose h2 {
          font-size: 2rem;
          font-weight: 600;
          line-height: 1.3;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
          color: var(--color-foreground);
        }

        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.4;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: var(--color-foreground);
        }

        .prose p {
          margin-bottom: 1rem;
          color: var(--color-foreground);
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

        .prose ul[data-type="taskList"] {
          list-style: none;
          padding-left: 0;
        }

        .prose ul[data-type="taskList"] li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .prose blockquote {
          border-left: 4px solid var(--color-border);
          padding-left: 1rem;
          font-style: italic;
          color: var(--color-muted-foreground);
          margin: 1rem 0;
        }

        .prose code {
          background-color: var(--color-muted);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
          font-family: monospace;
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
        }

        .prose a:hover {
          color: #2563eb;
        }
      `}</style>
    </div>
  );
}
