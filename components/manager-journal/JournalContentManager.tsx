"use client";

import { useState } from "react";
import { Save, Settings, Image as ImageIcon, Type, Palette, Link as LinkIcon, Globe, LayoutGrid, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useJournalConfig } from "./hooks/useJournalConfig";
import { BasicInfoTab } from "./tabs/BasicInfoTab";
import { BrandingTab } from "./tabs/BrandingTab";
import { MainContentTab } from "./tabs/MainContentTab";
import { AboutPageTab } from "./tabs/AboutPageTab";
import { SidebarTab } from "./tabs/SidebarTab";
import { FooterTab } from "./tabs/FooterTab";
import { NavigationTab } from "./tabs/NavigationTab";
import { EditorialPoliciesTab } from "./tabs/EditorialPoliciesTab";

export default function JournalContentManager() {
  const { localConfig, setLocalConfig, saving, handleSaveConfig } = useJournalConfig();
  const [activeTab, setActiveTab] = useState<"basic" | "branding" | "main-content" | "about-page" | "editorial-policies" | "sidebar" | "footer" | "navigation">("basic");

  const tabs = [
    { id: "basic" as const, label: "Basic Information", icon: <Type className="h-4 w-4" /> },
    { id: "branding" as const, label: "Branding & Colors", icon: <Palette className="h-4 w-4" /> },
    { id: "main-content" as const, label: "Main Content", icon: <ImageIcon className="h-4 w-4" /> },
    { id: "about-page" as const, label: "About Page", icon: <Edit3 className="h-4 w-4" /> },
    { id: "editorial-policies" as const, label: "Editorial Policies", icon: <Settings className="h-4 w-4" /> },
    { id: "sidebar" as const, label: "Sidebar", icon: <LayoutGrid className="h-4 w-4" /> },
    { id: "footer" as const, label: "Footer", icon: <Globe className="h-4 w-4" /> },
    { id: "navigation" as const, label: "Navigation", icon: <LinkIcon className="h-4 w-4" /> }
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
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
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
      {activeTab === "basic" && <BasicInfoTab config={localConfig} setConfig={setLocalConfig} />}
      {activeTab === "branding" && <BrandingTab config={localConfig} setConfig={setLocalConfig} />}
      {activeTab === "main-content" && <MainContentTab config={localConfig} setConfig={setLocalConfig} />}
      {activeTab === "about-page" && <AboutPageTab config={localConfig} setConfig={setLocalConfig} />}
      {activeTab === "sidebar" && <SidebarTab config={localConfig} setConfig={setLocalConfig} />}
      {activeTab === "footer" && <FooterTab config={localConfig} setConfig={setLocalConfig} />}
      {activeTab === "navigation" && <NavigationTab config={localConfig} setConfig={setLocalConfig} />}
      {activeTab === "editorial-policies" && <EditorialPoliciesTab config={localConfig} setConfig={setLocalConfig} />}

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