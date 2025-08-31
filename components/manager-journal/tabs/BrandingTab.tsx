import { Palette } from "lucide-react";
import { LocalJournalConfig } from "../hooks/useJournalConfig";

interface BrandingTabProps {
  config: LocalJournalConfig;
  setConfig: (updater: (prev: LocalJournalConfig) => LocalJournalConfig) => void;
}

export function BrandingTab({ config, setConfig }: BrandingTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Logo & Colors
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Logo Type</label>
            <select
              value={config.logo.type}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                logo: { ...prev.logo, type: e.target.value as "text" | "image" }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              <option value="text">Text Logo</option>
              <option value="image">Image Logo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
              {config.logo.type === "text" ? "Logo Text" : "Logo Image Path"}
            </label>
            <input
              type="text"
              value={config.logo.value}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                logo: { ...prev.logo, value: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Primary Color</label>
            <input
              type="color"
              value={config.colors.primary}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                colors: { ...prev.colors, primary: e.target.value }
              }))}
              className="w-full h-10 border border-[var(--color-border)] rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Secondary Color</label>
            <input
              type="color"
              value={config.colors.secondary || "#FFDD02"}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                colors: { ...prev.colors, secondary: e.target.value }
              }))}
              className="w-full h-10 border border-[var(--color-border)] rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}