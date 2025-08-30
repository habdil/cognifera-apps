"use client";

import { useState } from "react";
import { Save, Eye, ArrowLeft, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JournalData {
  title: string;
  abstract: string;
  keywords: string[];
  authors: string[];
  category: string;
  content: string;
  status: "draft" | "review" | "published";
}

export function JournalEditor() {
  const [journalData, setJournalData] = useState<JournalData>({
    title: "",
    abstract: "",
    keywords: [],
    authors: [],
    category: "",
    content: "",
    status: "draft"
  });
  
  const [newKeyword, setNewKeyword] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !journalData.keywords.includes(newKeyword.trim())) {
      setJournalData(prev => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()]
      }));
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setJournalData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const handleAddAuthor = () => {
    if (newAuthor.trim() && !journalData.authors.includes(newAuthor.trim())) {
      setJournalData(prev => ({
        ...prev,
        authors: [...prev.authors, newAuthor.trim()]
      }));
      setNewAuthor("");
    }
  };

  const handleRemoveAuthor = (author: string) => {
    setJournalData(prev => ({
      ...prev,
      authors: prev.authors.filter(a => a !== author)
    }));
  };

  const handleSave = () => {
    console.log("Saving journal:", journalData);
    // Implement save logic
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-foreground)]">
              {journalData.title || "New Journal"}
            </h1>
            <p className="text-[var(--color-muted-foreground)]">Create or edit journal article</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
              Title *
            </label>
            <input
              type="text"
              value={journalData.title}
              onChange={(e) => setJournalData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter journal title..."
              className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg"
            />
          </div>

          {/* Abstract */}
          <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
              Abstract *
            </label>
            <textarea
              value={journalData.abstract}
              onChange={(e) => setJournalData(prev => ({ ...prev, abstract: e.target.value }))}
              placeholder="Write the abstract..."
              rows={6}
              className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
            />
          </div>

          {/* Content Editor */}
          <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
              Content *
            </label>
            <div className="border border-[var(--color-border)] rounded-lg">
              {/* Toolbar */}
              <div className="flex items-center gap-2 p-3 border-b border-[var(--color-border)]">
                <Button size="sm" variant="outline">Bold</Button>
                <Button size="sm" variant="outline">Italic</Button>
                <Button size="sm" variant="outline">Link</Button>
                <Button size="sm" variant="outline">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              {/* Editor */}
              <textarea
                value={journalData.content}
                onChange={(e) => setJournalData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Write your journal content here..."
                rows={20}
                className="w-full px-4 py-3 border-0 focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
              Status
            </label>
            <select
              value={journalData.status}
              onChange={(e) => setJournalData(prev => ({ ...prev, status: e.target.value as any }))}
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              <option value="draft">Draft</option>
              <option value="review">Under Review</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Category */}
          <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
              Category *
            </label>
            <select
              value={journalData.category}
              onChange={(e) => setJournalData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              <option value="">Select category...</option>
              <option value="computer-science">Computer Science</option>
              <option value="environmental-science">Environmental Science</option>
              <option value="business">Business</option>
              <option value="medicine">Medicine</option>
              <option value="engineering">Engineering</option>
            </select>
          </div>

          {/* Authors */}
          <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
              Authors
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="Add author..."
                  className="flex-1 px-3 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddAuthor()}
                />
                <Button size="sm" onClick={handleAddAuthor}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {journalData.authors.map((author, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-sm"
                  >
                    {author}
                    <button
                      onClick={() => handleRemoveAuthor(author)}
                      className="hover:bg-[var(--color-primary)]/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Keywords */}
          <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
              Keywords
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Add keyword..."
                  className="flex-1 px-3 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                />
                <Button size="sm" onClick={handleAddKeyword}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {journalData.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--color-muted)] text-[var(--color-muted-foreground)] rounded-full text-sm"
                  >
                    {keyword}
                    <button
                      onClick={() => handleRemoveKeyword(keyword)}
                      className="hover:bg-[var(--color-muted)] rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
              Attachments
            </label>
            <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-4 text-center">
              <Upload className="h-8 w-8 mx-auto text-[var(--color-muted-foreground)] mb-2" />
              <p className="text-sm text-[var(--color-muted-foreground)]">
                Drop files here or click to upload
              </p>
              <input type="file" multiple className="hidden" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}