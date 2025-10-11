"use client";

import { memo, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Plus,
  Search,
  FileText,
  Clock,
  Trash2,
  Eye
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useAuthorArticles, useDeleteArticle, useUpdateArticle } from '@/hooks/useAuthorArticles';
import { useDebounce } from '@/hooks/useDebounce';
import { updateArticle, type Article } from '@/lib/api/author-articles';
import { processContentImages } from '@/lib/utils/image-processor';
import { ArticleStatsCard } from './components/ArticleStatsCard';
import { ArticleCard } from './components/ArticleCard';

type TabType = 'published' | 'drafts';

interface AuthorArticlesContentProps {
  onNavigate?: (tab: string) => void;
  initialTab?: TabType;
}

export const AuthorArticlesContent = memo(({ onNavigate, initialTab = 'published' }: AuthorArticlesContentProps) => {
  // Check localStorage for initial tab preference
  const getInitialTab = (): TabType => {
    const savedTab = localStorage.getItem('articles-initial-tab');
    if (savedTab === 'drafts') {
      localStorage.removeItem('articles-initial-tab'); // Clear after reading
      return 'drafts';
    }
    return initialTab;
  };

  const [activeTab, setActiveTab] = useState<TabType>(getInitialTab());
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const [isPublishing, setIsPublishing] = useState<string | null>(null);

  // Use React Query hooks with reduced limit (50 -> 20)
  const { data: articles = [], isLoading } = useAuthorArticles({ status: 'all', limit: 20 });
  const deleteArticleMutation = useDeleteArticle();
  const updateArticleMutation = useUpdateArticle();

  console.log('📊 AuthorArticlesContent - articles:', articles, 'isLoading:', isLoading, 'type:', typeof articles, 'isArray:', Array.isArray(articles));

  // Debounce search query untuk mengurangi re-render
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Filter articles based on active tab and debounced search query (client-side filtering)
  const filteredArticles = useMemo(() => {
    if (!Array.isArray(articles)) return [];

    return articles
      .filter(article => {
        const matchesTab = activeTab === 'published'
          ? article.status === 'aktif'
          : article.status === 'nonaktif';

        const matchesSearch = article.judul.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          article.tags.some(tag => tag.toLowerCase().includes(debouncedSearch.toLowerCase()));

        return matchesTab && matchesSearch;
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [articles, activeTab, debouncedSearch]);

  // Calculate stats
  const stats = useMemo(() => {
    if (!Array.isArray(articles)) return { published: 0, drafts: 0, total: 0 };

    const published = articles.filter(a => a.status === 'aktif').length;
    const drafts = articles.filter(a => a.status === 'nonaktif').length;
    return { published, drafts, total: articles.length };
  }, [articles]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleNewArticle = () => {
    if (onNavigate) {
      onNavigate('create');
    }
  };

  const handleEditArticle = (articleId: string) => {
    // TODO: Store article ID for editing
    localStorage.setItem('article-edit-id', articleId);
    if (onNavigate) {
      onNavigate('create'); // Navigate to create tab which will handle edit mode
    }
  };

  const handleViewArticle = (article: Article) => {
    // Save to localStorage for preview
    localStorage.setItem('article-preview', JSON.stringify(article));
    window.open('/dashboard/author/preview', '_blank');
  };

  const handleDeleteClick = (article: Article) => {
    setArticleToDelete(article);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!articleToDelete) return;

    try {
      // Use React Query mutation
      await deleteArticleMutation.mutateAsync(articleToDelete.id);
      setDeleteDialogOpen(false);
      setArticleToDelete(null);
    } catch (error) {
      // Error already handled in useMutation
      console.error('Error deleting article:', error);
    }
  };

  const handlePublishDraft = async (article: Article) => {
    // Validation
    if (!article.judul || !article.category || !article.konten) {
      toast.error('Cannot Publish Draft', {
        description: 'Article must have a title, category, and content before publishing.',
        duration: 5000,
      });
      return;
    }

    setIsPublishing(article.id);

    // Show loading toast
    const loadingToastId = toast.loading('Publishing your article...', {
      description: 'Processing content and uploading images...',
    });

    try {
      // Process content images: upload base64 images and replace with URLs
      const processedContent = await processContentImages(
        article.konten,
        (current, total) => {
          toast.loading(`Uploading images: ${current} of ${total}`, {
            id: loadingToastId,
            description: 'Optimizing your content images...',
          });
        }
      );

      // Update article status to active (published)
      const payload = {
        judul: article.judul,
        konten: processedContent,
        category: article.category,
        featured_image: article.featuredImage || '',
        tags: article.tags,
        status: 'aktif' as const
      };

      const response = await updateArticle(article.id, payload);

      if (response.success) {
        // Dismiss loading toast
        toast.dismiss(loadingToastId);

        // Show success toast
        toast.success('Article Published Successfully!', {
          description: `"${article.judul}" is now live and visible to readers.`,
          duration: 4000,
        });

        // Update using React Query mutation
        updateArticleMutation.mutate({ articleId: article.id, payload });
      }
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      console.error('Error publishing draft:', error);
      toast.error('Failed to Publish Draft', {
        description: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        duration: 6000,
      });
    } finally {
      setIsPublishing(null);
    }
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-foreground)]">My Articles</h1>
          <p className="text-[var(--color-muted-foreground)] mt-1">
            Manage your published articles and drafts
          </p>
        </div>
        <Button onClick={handleNewArticle} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Article
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ArticleStatsCard
          icon={FileText}
          value={stats.total}
          label="Total Articles"
          colorClass="bg-blue-100 text-blue-600"
        />
        <ArticleStatsCard
          icon={Eye}
          value={stats.published}
          label="Published"
          colorClass="bg-green-100 text-green-600"
        />
        <ArticleStatsCard
          icon={Clock}
          value={stats.drafts}
          label="Drafts"
          colorClass="bg-amber-100 text-amber-600"
        />
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="inline-flex bg-[var(--color-muted)] rounded-lg p-1 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => handleTabChange('published')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'published'
                ? 'bg-[var(--color-background)] text-[var(--color-foreground)] shadow-sm'
                : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
            }`}
          >
            <span className="hidden sm:inline">Published ({stats.published})</span>
            <span className="sm:hidden">Published</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('drafts')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'drafts'
                ? 'bg-[var(--color-background)] text-[var(--color-foreground)] shadow-sm'
                : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
            }`}
          >
            <span className="hidden sm:inline">Drafts ({stats.drafts})</span>
            <span className="sm:hidden">Drafts</span>
          </button>
        </div>

        <div className="relative w-full sm:w-auto sm:min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 bg-[var(--color-muted)] rounded-full flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-foreground)]"></div>
            </div>
            <p className="text-[var(--color-muted-foreground)]">Loading articles...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 bg-[var(--color-muted)] rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-[var(--color-muted-foreground)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-2">
              {searchQuery ? 'No articles found' : `No ${activeTab === 'published' ? 'published articles' : 'drafts'} yet`}
            </h3>
            <p className="text-[var(--color-muted-foreground)] text-center max-w-md mb-6">
              {searchQuery
                ? 'Try adjusting your search query'
                : activeTab === 'published'
                ? 'Start writing and publish your first article to see it here.'
                : 'Save your work as draft to continue editing later.'
              }
            </p>
            {!searchQuery && (
              <Button onClick={handleNewArticle} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Your First Article
              </Button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-[var(--color-border)]">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                isDraft={activeTab === 'drafts'}
                isPublishing={isPublishing === article.id}
                onView={handleViewArticle}
                onEdit={handleEditArticle}
                onDelete={handleDeleteClick}
                onPublish={activeTab === 'drafts' ? handlePublishDraft : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-10 h-10 text-red-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">Delete Article?</DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to delete &quot;{articleToDelete?.judul}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex-col sm:flex-col gap-2 mt-4">
            <Button
              onClick={handleDeleteConfirm}
              disabled={deleteArticleMutation.isPending}
              variant="destructive"
              className="w-full flex items-center justify-center gap-2"
            >
              {deleteArticleMutation.isPending ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Yes, Delete Article
                </>
              )}
            </Button>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteArticleMutation.isPending}
              variant="outline"
              className="w-full"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
});

AuthorArticlesContent.displayName = 'AuthorArticlesContent';
