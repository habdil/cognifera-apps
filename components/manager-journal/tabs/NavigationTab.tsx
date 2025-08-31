import { Link as LinkIcon, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocalJournalConfig } from "../hooks/useJournalConfig";

interface NavigationTabProps {
  config: LocalJournalConfig;
  setConfig: (updater: (prev: LocalJournalConfig) => LocalJournalConfig) => void;
}

export function NavigationTab({ config, setConfig }: NavigationTabProps) {
  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <LinkIcon className="h-5 w-5" />
          Top Navigation
        </h3>
        <div className="space-y-4">
          {/* Back Link */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Back Link</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">Text</label>
                <input
                  type="text"
                  value={config.topNavigation.backLink.text}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    topNavigation: {
                      ...prev.topNavigation,
                      backLink: { ...prev.topNavigation.backLink, text: e.target.value }
                    }
                  }))}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">URL</label>
                <input
                  type="text"
                  value={config.topNavigation.backLink.href}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    topNavigation: {
                      ...prev.topNavigation,
                      backLink: { ...prev.topNavigation.backLink, href: e.target.value }
                    }
                  }))}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
            </div>
          </div>

          {/* Right Links */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Right Links</label>
            {config.topNavigation.rightLinks.map((link, index) => (
              <div key={index} className="grid grid-cols-2 gap-3 mb-3 p-3 border border-[var(--color-border)] rounded-md">
                <div>
                  <label className="block text-xs font-medium mb-1">Text</label>
                  <input
                    type="text"
                    value={link.text}
                    onChange={(e) => {
                      const newRightLinks = [...config.topNavigation.rightLinks];
                      newRightLinks[index] = { ...newRightLinks[index], text: e.target.value };
                      setConfig(prev => ({
                        ...prev,
                        topNavigation: { ...prev.topNavigation, rightLinks: newRightLinks }
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
                        const newRightLinks = [...config.topNavigation.rightLinks];
                        newRightLinks[index] = { ...newRightLinks[index], href: e.target.value };
                        setConfig(prev => ({
                          ...prev,
                          topNavigation: { ...prev.topNavigation, rightLinks: newRightLinks }
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
                        const newRightLinks = config.topNavigation.rightLinks.filter((_, i) => i !== index);
                        setConfig(prev => ({
                          ...prev,
                          topNavigation: { ...prev.topNavigation, rightLinks: newRightLinks }
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
                const newRightLinks = [...config.topNavigation.rightLinks, { text: "", href: "" }];
                setConfig(prev => ({
                  ...prev,
                  topNavigation: { ...prev.topNavigation, rightLinks: newRightLinks }
                }));
              }}
            >
              Add Right Link
            </Button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <LinkIcon className="h-5 w-5" />
          Main Navigation
        </h3>
        <div className="space-y-4">
          {config.navigation.map((navItem, index) => (
            <div key={index} className="grid grid-cols-3 gap-3 p-4 border border-[var(--color-border)] rounded-md">
              <div>
                <label className="block text-xs font-medium text-[var(--color-foreground)] mb-1">Label</label>
                <input
                  type="text"
                  value={navItem.label}
                  onChange={(e) => {
                    const newNav = [...config.navigation];
                    newNav[index] = { ...newNav[index], label: e.target.value };
                    setConfig(prev => ({ ...prev, navigation: newNav }));
                  }}
                  className="w-full px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--color-foreground)] mb-1">URL</label>
                <input
                  type="text"
                  value={navItem.href}
                  onChange={(e) => {
                    const newNav = [...config.navigation];
                    newNav[index] = { ...newNav[index], href: e.target.value };
                    setConfig(prev => ({ ...prev, navigation: newNav }));
                  }}
                  className="w-full px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                />
              </div>
              <div className="flex items-end gap-2">
                <select
                  value={navItem.type}
                  onChange={(e) => {
                    const newNav = [...config.navigation];
                    newNav[index] = { ...newNav[index], type: e.target.value as "normal" | "button" };
                    setConfig(prev => ({ ...prev, navigation: newNav }));
                  }}
                  className="flex-1 px-2 py-1 border border-[var(--color-border)] rounded text-sm"
                >
                  <option value="normal">Normal</option>
                  <option value="button">Button</option>
                </select>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newNav = config.navigation.filter((_, i) => i !== index);
                    setConfig(prev => ({ ...prev, navigation: newNav }));
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
              const newNav = [...config.navigation, { label: "", href: "", type: "normal" as const }];
              setConfig(prev => ({ ...prev, navigation: newNav }));
            }}
          >
            Add Navigation Item
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Categories
        </h3>
        <div className="space-y-4">
          {config.categories.map((category, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={category}
                onChange={(e) => {
                  const newCategories = [...config.categories];
                  newCategories[index] = e.target.value;
                  setConfig(prev => ({ ...prev, categories: newCategories }));
                }}
                className="flex-1 px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const newCategories = config.categories.filter((_, i) => i !== index);
                  setConfig(prev => ({ ...prev, categories: newCategories }));
                }}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            size="sm"
            onClick={() => {
              const newCategories = [...config.categories, ""];
              setConfig(prev => ({ ...prev, categories: newCategories }));
            }}
          >
            Add Category
          </Button>
        </div>
      </div>
    </div>
  );
}