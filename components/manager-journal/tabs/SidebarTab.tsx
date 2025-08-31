import { Edit3, FileText, Link as LinkIcon, LayoutGrid, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocalJournalConfig } from "../hooks/useJournalConfig";

interface SidebarTabProps {
  config: LocalJournalConfig;
  setConfig: (updater: (prev: LocalJournalConfig) => LocalJournalConfig) => void;
}

export function SidebarTab({ config, setConfig }: SidebarTabProps) {
  return (
    <div className="space-y-6">
      {/* Submit Section */}
      <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <Edit3 className="h-5 w-5" />
          Submit Section
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Title</label>
            <input
              type="text"
              value={config.sidebar.submitSection.title}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                sidebar: {
                  ...prev.sidebar,
                  submitSection: { ...prev.sidebar.submitSection, title: e.target.value }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Description</label>
            <textarea
              rows={3}
              value={config.sidebar.submitSection.description}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                sidebar: {
                  ...prev.sidebar,
                  submitSection: { ...prev.sidebar.submitSection, description: e.target.value }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Submit Button Text</label>
              <input
                type="text"
                value={config.sidebar.submitSection.submitButtonText}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  sidebar: {
                    ...prev.sidebar,
                    submitSection: { ...prev.sidebar.submitSection, submitButtonText: e.target.value }
                  }
                }))}
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Submit Button URL</label>
              <input
                type="url"
                value={config.sidebar.submitSection.submitButtonUrl}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  sidebar: {
                    ...prev.sidebar,
                    submitSection: { ...prev.sidebar.submitSection, submitButtonUrl: e.target.value }
                  }
                }))}
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Guidelines Button Text</label>
              <input
                type="text"
                value={config.sidebar.submitSection.guidelinesButtonText}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  sidebar: {
                    ...prev.sidebar,
                    submitSection: { ...prev.sidebar.submitSection, guidelinesButtonText: e.target.value }
                  }
                }))}
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Guidelines Button URL</label>
              <input
                type="url"
                value={config.sidebar.submitSection.guidelinesButtonUrl}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  sidebar: {
                    ...prev.sidebar,
                    submitSection: { ...prev.sidebar.submitSection, guidelinesButtonUrl: e.target.value }
                  }
                }))}
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Journal Info */}
      <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Journal Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Title</label>
            <input
              type="text"
              value={config.sidebar.journalInfo.title}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                sidebar: {
                  ...prev.sidebar,
                  journalInfo: { ...prev.sidebar.journalInfo, title: e.target.value }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Information Items</label>
            {config.sidebar.journalInfo.items.map((item, index) => (
              <div key={index} className="grid grid-cols-2 gap-3 mb-3 p-3 border border-[var(--color-border)] rounded-md">
                <div>
                  <label className="block text-xs font-medium mb-1">Label</label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => {
                      const newItems = [...config.sidebar.journalInfo.items];
                      newItems[index] = { ...newItems[index], label: e.target.value };
                      setConfig(prev => ({
                        ...prev,
                        sidebar: {
                          ...prev.sidebar,
                          journalInfo: { ...prev.sidebar.journalInfo, items: newItems }
                        }
                      }));
                    }}
                    className="w-full px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-xs font-medium mb-1">Value</label>
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => {
                        const newItems = [...config.sidebar.journalInfo.items];
                        newItems[index] = { ...newItems[index], value: e.target.value };
                        setConfig(prev => ({
                          ...prev,
                          sidebar: {
                            ...prev.sidebar,
                            journalInfo: { ...prev.sidebar.journalInfo, items: newItems }
                          }
                        }));
                      }}
                      className="w-full px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newItems = config.sidebar.journalInfo.items.filter((_, i) => i !== index);
                        setConfig(prev => ({
                          ...prev,
                          sidebar: {
                            ...prev.sidebar,
                            journalInfo: { ...prev.sidebar.journalInfo, items: newItems }
                          }
                        }));
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button
              size="sm"
              onClick={() => {
                const newItems = [...config.sidebar.journalInfo.items, { label: "", value: "" }];
                setConfig(prev => ({
                  ...prev,
                  sidebar: {
                    ...prev.sidebar,
                    journalInfo: { ...prev.sidebar.journalInfo, items: newItems }
                  }
                }));
              }}
            >
              Add Info Item
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <LinkIcon className="h-5 w-5" />
          Quick Links
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Title</label>
            <input
              type="text"
              value={config.sidebar.quickLinks.title}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                sidebar: {
                  ...prev.sidebar,
                  quickLinks: { ...prev.sidebar.quickLinks, title: e.target.value }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Links</label>
            {config.sidebar.quickLinks.links.map((link, index) => (
              <div key={index} className="grid grid-cols-2 gap-3 mb-3 p-3 border border-[var(--color-border)] rounded-md">
                <div>
                  <label className="block text-xs font-medium mb-1">Text</label>
                  <input
                    type="text"
                    value={link.text}
                    onChange={(e) => {
                      const newLinks = [...config.sidebar.quickLinks.links];
                      newLinks[index] = { ...newLinks[index], text: e.target.value };
                      setConfig(prev => ({
                        ...prev,
                        sidebar: {
                          ...prev.sidebar,
                          quickLinks: { ...prev.sidebar.quickLinks, links: newLinks }
                        }
                      }));
                    }}
                    className="w-full px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-xs font-medium mb-1">URL</label>
                    <input
                      type="text"
                      value={link.href}
                      onChange={(e) => {
                        const newLinks = [...config.sidebar.quickLinks.links];
                        newLinks[index] = { ...newLinks[index], href: e.target.value };
                        setConfig(prev => ({
                          ...prev,
                          sidebar: {
                            ...prev.sidebar,
                            quickLinks: { ...prev.sidebar.quickLinks, links: newLinks }
                          }
                        }));
                      }}
                      className="w-full px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newLinks = config.sidebar.quickLinks.links.filter((_, i) => i !== index);
                        setConfig(prev => ({
                          ...prev,
                          sidebar: {
                            ...prev.sidebar,
                            quickLinks: { ...prev.sidebar.quickLinks, links: newLinks }
                          }
                        }));
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button
              size="sm"
              onClick={() => {
                const newLinks = [...config.sidebar.quickLinks.links, { text: "", href: "" }];
                setConfig(prev => ({
                  ...prev,
                  sidebar: {
                    ...prev.sidebar,
                    quickLinks: { ...prev.sidebar.quickLinks, links: newLinks }
                  }
                }));
              }}
            >
              Add Quick Link
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <LayoutGrid className="h-5 w-5" />
          Journal Statistics
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Title</label>
            <input
              type="text"
              value={config.sidebar.statistics.title}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                sidebar: {
                  ...prev.sidebar,
                  statistics: { ...prev.sidebar.statistics, title: e.target.value }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Published Articles</label>
              <input
                type="number"
                value={config.sidebar.statistics.publishedArticles}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  sidebar: {
                    ...prev.sidebar,
                    statistics: { ...prev.sidebar.statistics, publishedArticles: parseInt(e.target.value) || 0 }
                  }
                }))}
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Countries</label>
              <input
                type="number"
                value={config.sidebar.statistics.countries}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  sidebar: {
                    ...prev.sidebar,
                    statistics: { ...prev.sidebar.statistics, countries: parseInt(e.target.value) || 0 }
                  }
                }))}
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Avg Review Time (weeks)</label>
              <input
                type="text"
                value={config.sidebar.statistics.avgReviewTime}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  sidebar: {
                    ...prev.sidebar,
                    statistics: { ...prev.sidebar.statistics, avgReviewTime: e.target.value }
                  }
                }))}
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Contact */}
      <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <User className="h-5 w-5" />
          Editorial Contact
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Title</label>
            <input
              type="text"
              value={config.sidebar.editorialContact.title}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                sidebar: {
                  ...prev.sidebar,
                  editorialContact: { ...prev.sidebar.editorialContact, title: e.target.value }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Email</label>
              <input
                type="email"
                value={config.sidebar.editorialContact.email}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  sidebar: {
                    ...prev.sidebar,
                    editorialContact: { ...prev.sidebar.editorialContact, email: e.target.value }
                  }
                }))}
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Editor-in-Chief</label>
              <input
                type="text"
                value={config.sidebar.editorialContact.editorInChief}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  sidebar: {
                    ...prev.sidebar,
                    editorialContact: { ...prev.sidebar.editorialContact, editorInChief: e.target.value }
                  }
                }))}
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Response Time</label>
              <input
                type="text"
                value={config.sidebar.editorialContact.responseTime}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  sidebar: {
                    ...prev.sidebar,
                    editorialContact: { ...prev.sidebar.editorialContact, responseTime: e.target.value }
                  }
                }))}
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Contact Button Text</label>
              <input
                type="text"
                value={config.sidebar.editorialContact.contactButtonText}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  sidebar: {
                    ...prev.sidebar,
                    editorialContact: { ...prev.sidebar.editorialContact, contactButtonText: e.target.value }
                  }
                }))}
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Contact Button URL</label>
            <input
              type="url"
              value={config.sidebar.editorialContact.contactButtonUrl}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                sidebar: {
                  ...prev.sidebar,
                  editorialContact: { ...prev.sidebar.editorialContact, contactButtonUrl: e.target.value }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}