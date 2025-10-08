"use client";

import { memo, useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  FileText,
  Clock,
  Calendar,
  MoreVertical,
  Filter,
  Send
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import Image from 'next/image';
import { fetchAuthorArticles, deleteArticle, updateArticle, type Article } from '@/lib/api/author-articles';
import { processContentImages } from '@/lib/utils/image-processor';

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
  const [articles, setArticles] = useState<Article[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState<string | null>(null);

  // Fetch articles from API
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        const response = await fetchAuthorArticles({
          status: 'all', // Fetch all articles (both published and drafts)
          limit: 50
        });

        if (response.success) {
          setArticles(response.data);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        toast.error('Failed to Load Articles', {
          description: error instanceof Error ? error.message : 'Please try again later.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  // Filter articles based on active tab and search query
  const filteredArticles = useMemo(() => {
    return articles
      .filter(article => {
        const matchesTab = activeTab === 'published'
          ? article.status === 'aktif'
          : article.status === 'nonaktif';

        const matchesSearch = article.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesTab && matchesSearch;
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [articles, activeTab, searchQuery]);

  // Calculate stats
  const stats = useMemo(() => {
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

    setIsDeleting(true);
    try {
      // Call delete API
      await deleteArticle(articleToDelete.id);

      // Remove from local state
      setArticles(prev => prev.filter(a => a.id !== articleToDelete.id));

      toast.success('Article Deleted', {
        description: `"${articleToDelete.judul}" has been deleted successfully.`,
      });

      setDeleteDialogOpen(false);
      setArticleToDelete(null);
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Delete Failed', {
        description: error instanceof Error ? error.message : 'Failed to delete article. Please try again.',
      });
    } finally {
      setIsDeleting(false);
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

        // Update local state
        setArticles(prev => prev.map(a =>
          a.id === article.id ? { ...a, ...response.data } : a
        ));
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

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
        <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-foreground)]">{stats.total}</p>
              <p className="text-sm text-[var(--color-muted-foreground)]">Total Articles</p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-foreground)]">{stats.published}</p>
              <p className="text-sm text-[var(--color-muted-foreground)]">Published</p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-foreground)]">{stats.drafts}</p>
              <p className="text-sm text-[var(--color-muted-foreground)]">Drafts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="inline-flex bg-[var(--color-muted)] rounded-lg p-1">
          <button
            onClick={() => handleTabChange('published')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'published'
                ? 'bg-[var(--color-background)] text-[var(--color-foreground)] shadow-sm'
                : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
            }`}
          >
            Published ({stats.published})
          </button>
          <button
            onClick={() => handleTabChange('drafts')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'drafts'
                ? 'bg-[var(--color-background)] text-[var(--color-foreground)] shadow-sm'
                : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
            }`}
          >
            Drafts ({stats.drafts})
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
              <div
                key={article.id}
                className="p-6 hover:bg-[var(--color-muted)] transition-colors group"
              >
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  {article.featuredImage ? (
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-[var(--color-muted)]">
                      <Image
                        src={article.featuredImage}
                        alt={article.judul}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 flex-shrink-0 rounded-lg bg-[var(--color-muted)] flex items-center justify-center">
                      <FileText className="w-8 h-8 text-[var(--color-muted-foreground)]" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-1 truncate">
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
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewArticle(article)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditArticle(article.id)}
                          className="flex items-center gap-1"
                        >
                          <Pencil className="w-4 h-4" />
                          Edit
                        </Button>
                        {/* Show Publish button only in Drafts tab */}
                        {activeTab === 'drafts' && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handlePublishDraft(article)}
                            disabled={isPublishing === article.id}
                            className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white"
                          >
                            {isPublishing === article.id ? (
                              <>
                                <span className="animate-spin">⏳</span>
                                Publishing...
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                Publish
                              </>
                            )}
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteClick(article)}
                          className="flex items-center gap-1 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
              disabled={isDeleting}
              variant="destructive"
              className="w-full flex items-center justify-center gap-2"
            >
              {isDeleting ? (
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
              disabled={isDeleting}
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
