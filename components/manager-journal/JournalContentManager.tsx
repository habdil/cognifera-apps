"use client";

import { useState, useEffect } from "react";
import { Edit3, Save, Eye, Settings, Image as ImageIcon, Type, Palette, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { journalConfig, type JournalConfig } from "@/lib/journal-config";

interface LocalJournalConfig {
  title: string;
  subtitle: string;
  description: string;
  logo: {
    type: "text" | "image";
    value: string;
    size?: number;
  };
  colors: {
    primary: string;
    secondary?: string;
  };
  topNavigation: {
    backLink: {
      text: string;
      href: string;
    };
    rightLinks: Array<{
      text: string;
      href: string;
    }>;
  };
  navigation: Array<{
    label: string;
    href: string;
    type: "normal" | "button";
  }>;
  searchPlaceholder: string;
  categories: string[];
}

interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  lastModified: string;
}

export function JournalContentManager() {
  const [activeTab, setActiveTab] = useState<"config" | "pages" | "branding">("config");
  const [saving, setSaving] = useState(false);
  const [localConfig, setLocalConfig] = useState<LocalJournalConfig>({
    title: journalConfig.title,
    subtitle: journalConfig.subtitle,
    description: journalConfig.description,
    logo: journalConfig.logo,
    colors: journalConfig.colors,
    topNavigation: journalConfig.topNavigation,
    navigation: journalConfig.navigation,
    searchPlaceholder: journalConfig.searchPlaceholder,
    categories: journalConfig.categories
  });

  const [pages, setPages] = useState<PageContent[]>([
    {
      id: "about",
      title: "About Journal",
      slug: "about",
      content: "Welcome to Cognifera Journal - a premier academic publication platform dedicated to advancing knowledge in educational technology, computer science, and applied mathematics...",
      lastModified: "2024-01-15"
    },
    {
      id: "editorial",
      title: "Editorial Policies",
      slug: "editorial",
      content: "Our editorial policies ensure the highest standards of academic integrity and quality in all published research...",
      lastModified: "2024-01-10"
    },
    {
      id: "submit",
      title: "Submit Article",
      slug: "submit",
      content: "Guidelines for authors submitting manuscripts to Cognifera Journal...",
      lastModified: "2024-01-12"
    }
  ]);

  const [selectedPage, setSelectedPage] = useState<PageContent | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const handleSaveConfig = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/journal/config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          config: localConfig
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Journal configuration saved successfully!", {
          description: "Configuration has been updated. The changes are now permanent and will be reflected after refresh."
        });
      } else {
        throw new Error(result.error || 'Failed to save configuration');
      }
    } catch (error) {
      console.error('Failed to save config:', error);
      toast.error("Failed to save configuration", {
        description: error instanceof Error ? error.message : "An unexpected error occurred"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSavePage = () => {
    if (selectedPage) {
      setPages(pages.map(page => 
        page.id === selectedPage.id 
          ? { ...page, content: editingContent, lastModified: new Date().toISOString().split('T')[0] }
          : page
      ));
      setSelectedPage({ ...selectedPage, content: editingContent, lastModified: new Date().toISOString().split('T')[0] });
      toast.success(`${selectedPage.title} content saved successfully!`);
    }
  };

  const handleEditPage = (page: PageContent) => {
    setSelectedPage(page);
    setEditingContent(page.content);
  };

  const tabs = [
    { id: "config" as const, label: "Journal Config", icon: <Settings className="h-4 w-4" /> },
    { id: "pages" as const, label: "Content Pages", icon: <Edit3 className="h-4 w-4" /> },
    { id: "branding" as const, label: "Branding", icon: <Palette className="h-4 w-4" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Journal Content Management</h1>
        <p className="text-[var(--color-muted-foreground)]">Manage journal content, configuration, and branding</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-[var(--color-border)]">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                  : "border-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "config" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Configuration */}
          <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
              <Type className="h-5 w-5" />
              Basic Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Journal Title
                </label>
                <input
                  type="text"
                  value={localConfig.title}
                  onChange={(e) => setLocalConfig(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={localConfig.subtitle}
                  onChange={(e) => setLocalConfig(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Description
                </label>
                <textarea
                  value={localConfig.description}
                  onChange={(e) => setLocalConfig(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">
              Journal Categories
            </h3>
            <div className="space-y-3">
              {localConfig.categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[var(--color-muted)] rounded-lg">
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => {
                      const newCategories = [...localConfig.categories];
                      newCategories[index] = e.target.value;
                      setLocalConfig(prev => ({ ...prev, categories: newCategories }));
                    }}
                    className="flex-1 bg-transparent text-[var(--color-foreground)] focus:outline-none"
                  />
                  <button 
                    onClick={() => {
                      const newCategories = localConfig.categories.filter((_, i) => i !== index);
                      setLocalConfig(prev => ({ ...prev, categories: newCategories }));
                    }}
                    className="text-red-600 hover:text-red-700 text-sm ml-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setLocalConfig(prev => ({ 
                    ...prev, 
                    categories: [...prev.categories, "New Category"]
                  }));
                }}
              >
                Add Category
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "pages" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Page List */}
          <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">
              Journal Pages
            </h3>
            <div className="space-y-2">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedPage?.id === page.id
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-[var(--color-muted)] hover:bg-[var(--color-muted)]/80"
                  }`}
                  onClick={() => handleEditPage(page)}
                >
                  <div className="font-medium">{page.title}</div>
                  <div className="text-sm opacity-75">/{page.slug}</div>
                  <div className="text-xs opacity-60">Modified: {page.lastModified}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Page Editor */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-[var(--color-border)]">
            {selectedPage ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[var(--color-foreground)]">
                    Edit: {selectedPage.title}
                  </h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" onClick={handleSavePage}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  rows={20}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none font-mono text-sm"
                  placeholder="Enter page content here..."
                />
              </div>
            ) : (
              <div className="text-center py-12 text-[var(--color-muted-foreground)]">
                Select a page from the left to start editing
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "branding" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Logo Management */}
          <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Logo & Visual Identity
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Current Logo
                </label>
                <div className="flex items-center gap-4">
                  {localConfig.logo.type === "image" ? (
                    <img
                      src={localConfig.logo.value}
                      alt="Journal Logo"
                      className="w-16 h-16 object-contain border border-[var(--color-border)] rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-[var(--color-primary)] rounded-lg flex items-center justify-center border border-[var(--color-border)]">
                      <span className="text-2xl font-bold text-white">
                        {localConfig.logo.value.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <Button variant="outline">
                    Change Logo
                  </Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Primary Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={localConfig.colors.primary}
                    onChange={(e) => setLocalConfig(prev => ({ 
                      ...prev, 
                      colors: { ...prev.colors, primary: e.target.value }
                    }))}
                    className="w-12 h-12 border border-[var(--color-border)] rounded-lg"
                  />
                  <input
                    type="text"
                    value={localConfig.colors.primary}
                    onChange={(e) => setLocalConfig(prev => ({ 
                      ...prev, 
                      colors: { ...prev.colors, primary: e.target.value }
                    }))}
                    className="flex-1 px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Navigation Links
            </h3>
            <div className="space-y-3">
              {localConfig.navigation.map((navItem, index) => (
                <div key={index} className="p-3 bg-[var(--color-muted)] rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={navItem.label}
                      onChange={(e) => {
                        const newNav = [...localConfig.navigation];
                        newNav[index] = { ...newNav[index], label: e.target.value };
                        setLocalConfig(prev => ({ ...prev, navigation: newNav }));
                      }}
                      className="font-medium bg-transparent text-[var(--color-foreground)] focus:outline-none flex-1"
                    />
                    <select
                      value={navItem.type}
                      onChange={(e) => {
                        const newNav = [...localConfig.navigation];
                        newNav[index] = { ...newNav[index], type: e.target.value as "normal" | "button" };
                        setLocalConfig(prev => ({ ...prev, navigation: newNav }));
                      }}
                      className="ml-2 px-2 py-1 text-xs border border-[var(--color-border)] rounded"
                    >
                      <option value="normal">Normal</option>
                      <option value="button">Button</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    value={navItem.href}
                    onChange={(e) => {
                      const newNav = [...localConfig.navigation];
                      newNav[index] = { ...newNav[index], href: e.target.value };
                      setLocalConfig(prev => ({ ...prev, navigation: newNav }));
                    }}
                    className="w-full text-sm bg-transparent text-[var(--color-muted-foreground)] focus:outline-none"
                    placeholder="URL path"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveConfig} 
          disabled={saving}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
}