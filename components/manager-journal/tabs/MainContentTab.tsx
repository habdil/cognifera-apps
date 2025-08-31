import { Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocalJournalConfig } from "../hooks/useJournalConfig";

interface MainContentTabProps {
  config: LocalJournalConfig;
  setConfig: (updater: (prev: LocalJournalConfig) => LocalJournalConfig) => void;
}

export function MainContentTab({ config, setConfig }: MainContentTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Hero Section
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Main Title</label>
            <input
              type="text"
              value={config.mainContent.heroSection.title}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                mainContent: {
                  ...prev.mainContent,
                  heroSection: { ...prev.mainContent.heroSection, title: e.target.value }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Subtitle</label>
            <input
              type="text"
              value={config.mainContent.heroSection.subtitle}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                mainContent: {
                  ...prev.mainContent,
                  heroSection: { ...prev.mainContent.heroSection, subtitle: e.target.value }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Description</label>
            {config.mainContent.heroSection.description.map((paragraph, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <textarea
                  rows={2}
                  value={paragraph}
                  onChange={(e) => {
                    const newDescription = [...config.mainContent.heroSection.description];
                    newDescription[index] = e.target.value;
                    setConfig(prev => ({
                      ...prev,
                      mainContent: {
                        ...prev.mainContent,
                        heroSection: { ...prev.mainContent.heroSection, description: newDescription }
                      }
                    }));
                  }}
                  className="flex-1 px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newDescription = config.mainContent.heroSection.description.filter((_, i) => i !== index);
                    setConfig(prev => ({
                      ...prev,
                      mainContent: {
                        ...prev.mainContent,
                        heroSection: { ...prev.mainContent.heroSection, description: newDescription }
                      }
                    }));
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              size="sm"
              onClick={() => {
                const newDescription = [...config.mainContent.heroSection.description, ""];
                setConfig(prev => ({
                  ...prev,
                  mainContent: {
                    ...prev.mainContent,
                    heroSection: { ...prev.mainContent.heroSection, description: newDescription }
                  }
                }));
              }}
            >
              Add Paragraph
            </Button>
          </div>

          {/* Focus Areas */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Focus Areas Title</label>
            <input
              type="text"
              value={config.mainContent.heroSection.focusAreas.title}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                mainContent: {
                  ...prev.mainContent,
                  heroSection: {
                    ...prev.mainContent.heroSection,
                    focusAreas: { ...prev.mainContent.heroSection.focusAreas, title: e.target.value }
                  }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Focus Areas Description</label>
            <textarea
              rows={2}
              value={config.mainContent.heroSection.focusAreas.description}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                mainContent: {
                  ...prev.mainContent,
                  heroSection: {
                    ...prev.mainContent.heroSection,
                    focusAreas: { ...prev.mainContent.heroSection.focusAreas, description: e.target.value }
                  }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          {/* Open Access Policy */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Open Access Policy Title</label>
            <input
              type="text"
              value={config.mainContent.heroSection.openAccessPolicy.title}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                mainContent: {
                  ...prev.mainContent,
                  heroSection: {
                    ...prev.mainContent.heroSection,
                    openAccessPolicy: { ...prev.mainContent.heroSection.openAccessPolicy, title: e.target.value }
                  }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Open Access Policy Description</label>
            <textarea
              rows={2}
              value={config.mainContent.heroSection.openAccessPolicy.description}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                mainContent: {
                  ...prev.mainContent,
                  heroSection: {
                    ...prev.mainContent.heroSection,
                    openAccessPolicy: { ...prev.mainContent.heroSection.openAccessPolicy, description: e.target.value }
                  }
                }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          {/* Badges */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Hero Section Badges</label>
            {config.mainContent.heroSection.badges.map((badge, index) => (
              <div key={index} className="grid grid-cols-3 gap-3 mb-3 p-3 border border-[var(--color-border)] rounded-md">
                <div>
                  <label className="block text-xs font-medium mb-1">Text</label>
                  <input
                    type="text"
                    value={badge.text}
                    onChange={(e) => {
                      const newBadges = [...config.mainContent.heroSection.badges];
                      newBadges[index] = { ...newBadges[index], text: e.target.value };
                      setConfig(prev => ({
                        ...prev,
                        mainContent: {
                          ...prev.mainContent,
                          heroSection: { ...prev.mainContent.heroSection, badges: newBadges }
                        }
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
                      const newBadges = [...config.mainContent.heroSection.badges];
                      newBadges[index] = { ...newBadges[index], variant: e.target.value as "primary" | "secondary" | "tertiary" };
                      setConfig(prev => ({
                        ...prev,
                        mainContent: {
                          ...prev.mainContent,
                          heroSection: { ...prev.mainContent.heroSection, badges: newBadges }
                        }
                      }));
                    }}
                    className="w-full px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="tertiary">Tertiary</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const newBadges = config.mainContent.heroSection.badges.filter((_, i) => i !== index);
                      setConfig(prev => ({
                        ...prev,
                        mainContent: {
                          ...prev.mainContent,
                          heroSection: { ...prev.mainContent.heroSection, badges: newBadges }
                        }
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
                const newBadges = [...config.mainContent.heroSection.badges, { text: "", variant: "primary" as const }];
                setConfig(prev => ({
                  ...prev,
                  mainContent: {
                    ...prev.mainContent,
                    heroSection: { ...prev.mainContent.heroSection, badges: newBadges }
                  }
                }));
              }}
            >
              Add Badge
            </Button>
          </div>

          {/* Recent Publications */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-[var(--color-foreground)] mb-3">Recent Publications Section</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Title</label>
                <input
                  type="text"
                  value={config.mainContent.recentPublications.title}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    mainContent: {
                      ...prev.mainContent,
                      recentPublications: { ...prev.mainContent.recentPublications, title: e.target.value }
                    }
                  }))}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Subtitle</label>
                <input
                  type="text"
                  value={config.mainContent.recentPublications.subtitle}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    mainContent: {
                      ...prev.mainContent,
                      recentPublications: { ...prev.mainContent.recentPublications, subtitle: e.target.value }
                    }
                  }))}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}