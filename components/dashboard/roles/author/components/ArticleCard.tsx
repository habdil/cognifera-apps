import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2, FileText, Calendar, Send } from 'lucide-react';
import Image from 'next/image';
import type { Article } from '@/lib/api/author-articles';

interface ArticleCardProps {
  article: Article;
  isDraft: boolean;
  isPublishing: boolean;
  onView: (article: Article) => void;
  onEdit: (articleId: string) => void;
  onDelete: (article: Article) => void;
  onPublish?: (article: Article) => void;
}

const getCategoryLabel = (category: string) => {
  const categories: Record<string, string> = {
    'research-tips': 'Research Tips',
    'success-stories': 'Success Stories',
    'industry-news': 'Industry News',
    'company-news': 'Company News',
    'industry': 'Industry',
    'research': 'Research',
    'company': 'Company',
    'announcement': 'Announcement',
  };
  return categories[category] || category;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const ArticleCard = memo(({
  article,
  isDraft,
  isPublishing,
  onView,
  onEdit,
  onDelete,
  onPublish
}: ArticleCardProps) => {
  return (
    <div className="p-4 md:p-6 hover:bg-[var(--color-muted)] transition-colors group">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Thumbnail */}
        {article.featuredImage ? (
          <div className="relative w-full md:w-24 h-48 md:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-[var(--color-muted)]">
            <Image
              src={article.featuredImage}
              alt={article.judul}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full md:w-24 h-48 md:h-24 flex-shrink-0 rounded-lg bg-[var(--color-muted)] flex items-center justify-center">
            <FileText className="w-8 h-8 text-[var(--color-muted-foreground)]" />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-1 line-clamp-2">
              {article.judul}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-muted-foreground)] mb-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--color-muted)] rounded-md">
                {getCategoryLabel(article.category)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(article.updatedAt)}
              </span>
            </div>
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(article)}
              className="flex items-center gap-1"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">View</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(article.id)}
              className="flex items-center gap-1"
            >
              <Pencil className="w-4 h-4" />
              <span className="hidden sm:inline">Edit</span>
            </Button>
            {isDraft && onPublish && (
              <Button
                variant="default"
                size="sm"
                onClick={() => onPublish(article)}
                disabled={isPublishing}
                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {isPublishing ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span className="hidden sm:inline">Publishing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Publish</span>
                  </>
                )}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(article)}
              className="flex items-center gap-1 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Delete</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

ArticleCard.displayName = 'ArticleCard';
