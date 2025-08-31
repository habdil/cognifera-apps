import { Type } from "lucide-react";
import { LocalJournalConfig } from "../hooks/useJournalConfig";

interface BasicInfoTabProps {
  config: LocalJournalConfig;
  setConfig: (updater: (prev: LocalJournalConfig) => LocalJournalConfig) => void;
}

export function BasicInfoTab({ config, setConfig }: BasicInfoTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <Type className="h-5 w-5" />
          Basic Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Title</label>
            <input
              type="text"
              value={config.title}
              onChange={(e) => setConfig(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Subtitle</label>
            <input
              type="text"
              value={config.subtitle}
              onChange={(e) => setConfig(prev => ({ ...prev, subtitle: e.target.value }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Description</label>
            <textarea
              rows={3}
              value={config.description}
              onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Search Placeholder</label>
            <input
              type="text"
              value={config.searchPlaceholder}
              onChange={(e) => setConfig(prev => ({ ...prev, searchPlaceholder: e.target.value }))}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}