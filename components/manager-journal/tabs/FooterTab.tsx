import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocalJournalConfig } from "../hooks/useJournalConfig";

interface FooterTabProps {
  config: LocalJournalConfig;
  setConfig: (updater: (prev: LocalJournalConfig) => LocalJournalConfig) => void;
}

export function FooterTab({ config, setConfig }: FooterTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Footer Content
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Description</label>
            <textarea
              rows={3}
              value={config.footer.description}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                footer: { ...prev.footer, description: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          {/* Footer Badges */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Footer Badges</label>
            {config.footer.badges.map((badge, index) => (
              <div key={index} className="grid grid-cols-3 gap-3 mb-3 p-3 border border-[var(--color-border)] rounded-md">
                <div>
                  <label className="block text-xs font-medium mb-1">Text</label>
                  <input
                    type="text"
                    value={badge.text}
                    onChange={(e) => {
                      const newBadges = [...config.footer.badges];
                      newBadges[index] = { ...newBadges[index], text: e.target.value };
                      setConfig(prev => ({
                        ...prev,
                        footer: { ...prev.footer, badges: newBadges }
                      }));
                    }}
                    className="w-full px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Variant</label>
                  <select
                    value={badge.variant}
                    onChange={(e) => {
                      const newBadges = [...config.footer.badges];
                      newBadges[index] = { ...newBadges[index], variant: e.target.value as "primary" | "secondary" };
                      setConfig(prev => ({
                        ...prev,
                        footer: { ...prev.footer, badges: newBadges }
                      }));
                    }}
                    className="w-full px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const newBadges = config.footer.badges.filter((_, i) => i !== index);
                      setConfig(prev => ({
                        ...prev,
                        footer: { ...prev.footer, badges: newBadges }
                      }));
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <Button
              size="sm"
              onClick={() => {
                const newBadges = [...config.footer.badges, { text: "", variant: "primary" as const }];
                setConfig(prev => ({
                  ...prev,
                  footer: { ...prev.footer, badges: newBadges }
                }));
              }}
            >
              Add Badge
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Quick Links Sections</label>
            {config.footer.quickLinks.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border border-[var(--color-border)] rounded-md p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <input
                    type="text"
                    placeholder="Section Title"
                    value={section.title}
                    onChange={(e) => {
                      const newQuickLinks = [...config.footer.quickLinks];
                      newQuickLinks[sectionIndex] = { ...newQuickLinks[sectionIndex], title: e.target.value };
                      setConfig(prev => ({
                        ...prev,
                        footer: { ...prev.footer, quickLinks: newQuickLinks }
                      }));
                    }}
                    className="flex-1 px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const newQuickLinks = config.footer.quickLinks.filter((_, i) => i !== sectionIndex);
                      setConfig(prev => ({
                        ...prev,
                        footer: { ...prev.footer, quickLinks: newQuickLinks }
                      }));
                    }}
                    className="ml-2"
                  >
                    Remove Section
                  </Button>
                </div>
                
                {section.links.map((link, linkIndex) => (
                  <div key={linkIndex} className="grid grid-cols-2 gap-3 mb-2 p-2 bg-[var(--color-muted)]/50 rounded">
                    <div>
                      <input
                        type="text"
                        placeholder="Link Text"
                        value={link.text}
                        onChange={(e) => {
                          const newQuickLinks = [...config.footer.quickLinks];
                          const newLinks = [...newQuickLinks[sectionIndex].links];
                          newLinks[linkIndex] = { ...newLinks[linkIndex], text: e.target.value };
                          newQuickLinks[sectionIndex] = { ...newQuickLinks[sectionIndex], links: newLinks };
                          setConfig(prev => ({
                            ...prev,
                            footer: { ...prev.footer, quickLinks: newQuickLinks }
                          }));
                        }}
                        className="w-full px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Link URL"
                        value={link.href}
                        onChange={(e) => {
                          const newQuickLinks = [...config.footer.quickLinks];
                          const newLinks = [...newQuickLinks[sectionIndex].links];
                          newLinks[linkIndex] = { ...newLinks[linkIndex], href: e.target.value };
                          newQuickLinks[sectionIndex] = { ...newQuickLinks[sectionIndex], links: newLinks };
                          setConfig(prev => ({
                            ...prev,
                            footer: { ...prev.footer, quickLinks: newQuickLinks }
                          }));
                        }}
                        className="flex-1 px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const newQuickLinks = [...config.footer.quickLinks];
                          const newLinks = newQuickLinks[sectionIndex].links.filter((_, i) => i !== linkIndex);
                          newQuickLinks[sectionIndex] = { ...newQuickLinks[sectionIndex], links: newLinks };
                          setConfig(prev => ({
                            ...prev,
                            footer: { ...prev.footer, quickLinks: newQuickLinks }
                          }));
                        }}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button
                  size="sm"
                  onClick={() => {
                    const newQuickLinks = [...config.footer.quickLinks];
                    const newLinks = [...newQuickLinks[sectionIndex].links, { text: "", href: "" }];
                    newQuickLinks[sectionIndex] = { ...newQuickLinks[sectionIndex], links: newLinks };
                    setConfig(prev => ({
                      ...prev,
                      footer: { ...prev.footer, quickLinks: newQuickLinks }
                    }));
                  }}
                >
                  Add Link
                </Button>
              </div>
            ))}
            <Button
              size="sm"
              onClick={() => {
                const newQuickLinks = [...config.footer.quickLinks, { title: "", links: [] }];
                setConfig(prev => ({
                  ...prev,
                  footer: { ...prev.footer, quickLinks: newQuickLinks }
                }));
              }}
            >
              Add Link Section
            </Button>
          </div>

          {/* Contact & Copyright */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
            <div className="space-y-3">
              <h4 className="font-medium text-[var(--color-foreground)]">Contact Information</h4>
              <div>
                <label className="block text-xs font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={config.footer.contact.email}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    footer: {
                      ...prev.footer,
                      contact: { ...prev.footer.contact, email: e.target.value }
                    }
                  }))}
                  className="w-full px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  value={config.footer.contact.phone}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    footer: {
                      ...prev.footer,
                      contact: { ...prev.footer.contact, phone: e.target.value }
                    }
                  }))}
                  className="w-full px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Response Time</label>
                <input
                  type="text"
                  value={config.footer.contact.responseTime}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    footer: {
                      ...prev.footer,
                      contact: { ...prev.footer.contact, responseTime: e.target.value }
                    }
                  }))}
                  className="w-full px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-[var(--color-foreground)]">Copyright & Publisher</h4>
              <div>
                <label className="block text-xs font-medium mb-1">Copyright Year</label>
                <input
                  type="number"
                  value={config.footer.copyright.year}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    footer: {
                      ...prev.footer,
                      copyright: { ...prev.footer.copyright, year: parseInt(e.target.value) || new Date().getFullYear() }
                    }
                  }))}
                  className="w-full px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Copyright Text</label>
                <input
                  type="text"
                  value={config.footer.copyright.text}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    footer: {
                      ...prev.footer,
                      copyright: { ...prev.footer.copyright, text: e.target.value }
                    }
                  }))}
                  className="w-full px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Publisher Name</label>
                <input
                  type="text"
                  value={config.footer.contact.publisher.name}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    footer: {
                      ...prev.footer,
                      contact: {
                        ...prev.footer.contact,
                        publisher: { ...prev.footer.contact.publisher, name: e.target.value }
                      }
                    }
                  }))}
                  className="w-full px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Powered By</label>
                <input
                  type="text"
                  value={config.footer.poweredBy}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    footer: { ...prev.footer, poweredBy: e.target.value }
                  }))}
                  className="w-full px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}