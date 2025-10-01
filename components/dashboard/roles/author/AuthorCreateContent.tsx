"use client";

import { memo, useState, useCallback, useEffect } from 'react';
import { RichTextEditor } from '@/components/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Save, Send, X, Eye, CheckCircle2, FileText, Plus, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { uploadArticleImage } from '@/lib/api/upload';
import { createArticle, saveDraft, updateArticle, fetchArticleById } from '@/lib/api/author-articles';

interface ArticleFormData {
  judul: string;
  category: string;
  featuredImage: string;
  konten: string;
  tags: string[];
}

interface AuthorCreateContentProps {
  onNavigate?: (tab: string) => void;
}

export const AuthorCreateContent = memo(({ onNavigate }: AuthorCreateContentProps) => {
  const [formData, setFormData] = useState<ArticleFormData>({
    judul: '',
    category: '',
    featuredImage: '',
    konten: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [publishedArticleId, setPublishedArticleId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editArticleId, setEditArticleId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingArticle, setIsLoadingArticle] = useState(false);

  // Check if we're in edit mode
  useEffect(() => {
    const articleEditId = localStorage.getItem('article-edit-id');
    if (articleEditId) {
      setEditMode(true);
      setEditArticleId(articleEditId);
      loadArticleForEdit(articleEditId);
      // Clear after reading
      localStorage.removeItem('article-edit-id');
    }
  }, []);

  // Load article data for editing
  const loadArticleForEdit = async (articleId: string) => {
    try {
      setIsLoadingArticle(true);
      const response = await fetchArticleById(articleId);

      if (response.success) {
        const article = response.data;
        setFormData({
          judul: article.judul,
          category: article.category,
          featuredImage: article.featuredImage,
          konten: article.konten,
          tags: article.tags
        });
      }
    } catch (error) {
      console.error('Error loading article:', error);
      toast.error('Failed to Load Article', {
        description: error instanceof Error ? error.message : 'Please try again.',
      });
      // Exit edit mode on error
      setEditMode(false);
      setEditArticleId(null);
    } finally {
      setIsLoadingArticle(false);
    }
  };

  const categories = [
    { value: 'research-tips', label: 'Research Tips' },
    { value: 'success-stories', label: 'Success Stories' },
    { value: 'industry-news', label: 'Industry News' },
    { value: 'company-news', label: 'Company News' },
    { value: 'industry', label: 'Industry' },
    { value: 'research', label: 'Research' },
    { value: 'company', label: 'Company' },
    { value: 'announcement', label: 'Announcement' }
  ];

  const handleCoverImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Upload to Supabase via API
      const response = await uploadArticleImage(file);

      if (response.success) {
        setFormData(prev => ({ ...prev, featuredImage: response.data.url }));
        toast.success('Image Uploaded', {
          description: 'Cover image has been uploaded successfully.',
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Upload Failed', {
        description: error instanceof Error ? error.message : 'Failed to upload image. Please try again.',
      });
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleAddTag = useCallback(() => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  }, [tagInput, formData.tags]);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  }, []);

  const handleSaveDraft = useCallback(async () => {
    if (!formData.judul && !formData.konten) {
      toast.error('Nothing to Save', {
        description: 'Please write at least a title or some content before saving as draft.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        judul: formData.judul,
        konten: formData.konten,
        category: formData.category || '',
        featured_image: formData.featuredImage || '',
        tags: formData.tags,
        status: 'nonaktif' as const
      };

      let response;
      if (editMode && editArticleId) {
        // Update existing draft
        response = await updateArticle(editArticleId, payload);
      } else {
        // Create new draft
        response = await saveDraft(payload);
      }

      if (response.success) {
        toast.success('Draft Saved Successfully!', {
          description: 'Your draft has been saved. You can continue editing or view all drafts.',
          action: {
            label: 'View Drafts',
            onClick: () => {
              if (onNavigate) {
                onNavigate('articles');
                localStorage.setItem('articles-initial-tab', 'drafts');
              }
            },
          },
          duration: 5000,
        });

        // Update edit mode with saved article ID
        if (!editMode && response.data.id) {
          setEditMode(true);
          setEditArticleId(response.data.id);
        }
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to Save Draft', {
        description: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onNavigate, editMode, editArticleId]);

  const handlePublish = useCallback(async () => {
    if (!formData.judul || !formData.category || !formData.konten) {
      toast.error('Incomplete Form', {
        description: 'Please fill in all required fields (Title, Category, Content)',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        judul: formData.judul,
        konten: formData.konten,
        category: formData.category,
        featured_image: formData.featuredImage || '',
        tags: formData.tags,
        status: 'aktif' as const
      };

      let response;
      if (editMode && editArticleId) {
        // Update existing article and publish
        response = await updateArticle(editArticleId, payload);
      } else {
        // Create new article and publish
        response = await createArticle(payload);
      }

      if (response.success) {
        setPublishedArticleId(response.data.id);

        // Save to localStorage for preview/view
        localStorage.setItem('article-preview', JSON.stringify(response.data));

        // Show success dialog
        setShowSuccessDialog(true);
      }
    } catch (error) {
      console.error('Error publishing article:', error);
      toast.error('Publication Failed', {
        description: error instanceof Error ? error.message : 'Failed to publish article. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, editMode, editArticleId]);

  const handleCreateAnother = useCallback(() => {
    setShowSuccessDialog(false);
    setFormData({
      judul: '',
      category: '',
      featuredImage: '',
      konten: '',
      tags: []
    });
    setPublishedArticleId(null);
    setEditMode(false);
    setEditArticleId(null);
    toast.success('Ready to Create', {
      description: 'Form has been reset. Start writing your next article!',
    });
  }, []);

  const handleViewArticle = useCallback(() => {
    setShowSuccessDialog(false);
    // TODO: Navigate to article detail/preview page
    // if (publishedArticleId) {
    //   router.push(`/dashboard/author/articles/${publishedArticleId}`);
    // }

    // For now, open preview with the published data
    window.open('/dashboard/author/preview', '_blank');
  }, []);

  const handleBackToArticles = useCallback(() => {
    setShowSuccessDialog(false);
    if (onNavigate) {
      onNavigate('articles');
    }
  }, [onNavigate]);

  const handlePreview = useCallback(() => {
    // Save to localStorage temporarily
    const dataToPreview = {
      judul: formData.judul,
      category: formData.category,
      featuredImage: formData.featuredImage,
      konten: formData.konten,
      tags: formData.tags
    };
    localStorage.setItem('article-preview', JSON.stringify(dataToPreview));

    // Open preview in new tab
    window.open('/dashboard/author/preview', '_blank');
  }, [formData.judul, formData.category, formData.featuredImage, formData.konten, formData.tags]);

  // Show loading state while fetching article for edit
  if (isLoadingArticle) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 bg-[var(--color-muted)] rounded-full flex items-center justify-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-foreground)]"></div>
        </div>
        <p className="text-[var(--color-muted-foreground)]">Loading article...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-foreground)]">
          {editMode ? 'Edit Article' : 'Create New Article'}
        </h1>
        <p className="text-[var(--color-muted-foreground)] mt-2">
          {editMode ? 'Update your article and republish' : 'Write and publish your article with rich formatting'}
        </p>
      </div>

      {/* Article Information */}
      <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] p-6 space-y-6">
        <h2 className="text-xl font-semibold text-[var(--color-foreground)]">Article Information</h2>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            id="title"
            type="text"
            value={formData.judul}
            onChange={(e) => setFormData(prev => ({ ...prev, judul: e.target.value }))}
            placeholder="Enter article title..."
            className="w-full"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger className="w-full hover:border-[var(--color-primary)]">
              <SelectValue placeholder="Select a category..." />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem className='bg-white hover:text-primary hover:bg-gray-50' key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
            Cover Image
          </label>
          <div className="space-y-4">
            {formData.featuredImage ? (
              <div className="relative w-full h-64 rounded-lg overflow-hidden border border-[var(--color-border)]">
                <Image
                  src={formData.featuredImage}
                  alt="Cover preview"
                  fill
                  className="object-cover"
                />
                <Button
                  onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <label className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-[var(--color-border)] rounded-lg ${isUploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-[var(--color-primary)]'} transition-colors`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-foreground)] mb-3"></div>
                      <p className="mb-2 text-sm text-[var(--color-muted-foreground)] font-semibold">
                        Uploading image...
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-[var(--color-muted-foreground)] mb-3" />
                      <p className="mb-2 text-sm text-[var(--color-muted-foreground)]">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-[var(--color-muted-foreground)] mb-3">
                        Recommended size: 1200x630px or 1920x1080px (16:9 ratio) • Max file size: 5MB • Formats: PNG, JPG, WebP, GIF
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  onChange={handleCoverImageUpload}
                  disabled={isUploading}
                />
              </label>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-3">
            <Input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              placeholder="Add a tag..."
              className="flex-1"
            />
            <Button onClick={handleAddTag} variant="outline">
              Add Tag
            </Button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--color-muted)] text-[var(--color-foreground)] rounded-full text-sm"
                >
                  {tag}
                  <Button
                    variant="ghost"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Article Content */}
      <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] p-6 space-y-4">
        <h2 className="text-xl font-semibold text-[var(--color-foreground)]">
          Article Content <span className="text-red-500">*</span>
        </h2>
        <RichTextEditor
          content={formData.konten}
          onChange={(content) => setFormData(prev => ({ ...prev, konten: content }))}
          placeholder="Start writing your article..."
          className="min-h-[500px]"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-4 p-6 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]">
        <Button
          onClick={handlePreview}
          variant="outline"
          className="flex items-center gap-2"
          disabled={isSubmitting}
        >
          <Eye className="w-4 h-4" />
          Preview Article
        </Button>

        <div className="flex gap-4">
          <Button
            onClick={handleSaveDraft}
            variant="outline"
            disabled={isSubmitting || isUploading}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save as Draft
          </Button>
          <Button
            onClick={handlePublish}
            disabled={isSubmitting || isUploading}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">⏳</span>
                {editMode ? 'Updating...' : 'Publishing...'}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {editMode ? 'Update Article' : 'Publish Article'}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">Article Published Successfully!</DialogTitle>
            <DialogDescription className="text-center">
              Your article &quot;{formData.judul}&quot; has been published and is now live. What would you like to do next?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex-col sm:flex-col gap-2 mt-4">
            <Button
              onClick={handleViewArticle}
              className="w-full flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              View Article
            </Button>
            <Button
              onClick={handleCreateAnother}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Another Article
            </Button>
            <Button
              onClick={handleBackToArticles}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to My Articles
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
});

AuthorCreateContent.displayName = 'AuthorCreateContent';
