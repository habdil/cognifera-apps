"use client";

import { memo, useState, useCallback } from 'react';
import { RichTextEditor } from '@/components/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Save, Send, X, Eye } from 'lucide-react';
import Image from 'next/image';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

interface ArticleFormData {
  judul: string;
  category: string;
  featuredImage: string;
  konten: string;
  tags: string[];
}

export const AuthorCreateContent = memo(() => {
  const [formData, setFormData] = useState<ArticleFormData>({
    judul: '',
    category: '',
    featuredImage: '',
    konten: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleCoverImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setFormData(prev => ({ ...prev, featuredImage: url }));
      };
      reader.readAsDataURL(file);
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
    setIsSubmitting(true);
    try {
      // TODO: Implement save draft API call
      console.log('Saving draft:', { ...formData, status: 'nonaktif' });
      alert('Draft saved successfully!');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Failed to save draft');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const handlePublish = useCallback(async () => {
    if (!formData.judul || !formData.category || !formData.konten) {
      alert('Please fill in all required fields (Title, Category, Content)');
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Implement publish API call
      console.log('Publishing article:', { ...formData, status: 'aktif' });
      alert('Article published successfully!');
    } catch (error) {
      console.error('Error publishing article:', error);
      alert('Failed to publish article');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const handlePreview = useCallback(() => {
    // Save to localStorage temporarily
    localStorage.setItem('article-preview', JSON.stringify(formData));

    // Open preview in new tab
    window.open('/dashboard/author/preview', '_blank');
  }, [formData]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-foreground)]">Create New Article</h1>
        <p className="text-[var(--color-muted-foreground)] mt-2">Write and publish your article with rich formatting</p>
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
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-[var(--color-border)] rounded-lg cursor-pointer hover:border-[var(--color-primary)] transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-[var(--color-muted-foreground)] mb-3" />
                  <p className="mb-2 text-sm text-[var(--color-muted-foreground)]">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-[var(--color-muted-foreground)] mb-3">
            Recommended size: 1200x630px or 1920x1080px (16:9 ratio) • Max file size: 10MB • Formats: PNG, JPG, GIF
          </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleCoverImageUpload}
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
        >
          <Eye className="w-4 h-4" />
          Preview Article
        </Button>

        <div className="flex gap-4">
          <Button
            onClick={handleSaveDraft}
            variant="outline"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save as Draft
          </Button>
          <Button
            onClick={handlePublish}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Publish Article
          </Button>
        </div>
      </div>
    </div>
  );
});

AuthorCreateContent.displayName = 'AuthorCreateContent';
