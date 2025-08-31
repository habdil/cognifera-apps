import { useState } from "react";
import { toast } from "sonner";
import { journalConfig } from "@/lib/journal-config";

export interface LocalJournalConfig {
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
  aboutPage: {
    journalDescription: {
      paragraphs: string[];
      focusScope: {
        title: string;
        items: string[];
      };
      publicationDetails: {
        title: string;
        items: Array<{
          label: string;
          value: string;
        }>;
      };
    };
    contact: {
      title: string;
      email: string;
      phone: string;
      website: string;
      editorialOffice: {
        name: string;
        address: string[];
      };
    };
    policies: Array<{
      title: string;
      description: string;
      href: string;
    }>;
    submissions: Array<{
      title: string;
      description: string;
      href: string;
    }>;
    otherInfo: Array<{
      title: string;
      description: string;
      href: string;
    }>;
  };
  mainContent: {
    heroSection: {
      title: string;
      subtitle: string;
      description: string[];
      focusAreas: {
        title: string;
        description: string;
      };
      openAccessPolicy: {
        title: string;
        description: string;
      };
      badges: Array<{
        text: string;
        variant: "primary" | "secondary" | "tertiary";
      }>;
    };
    recentPublications: {
      title: string;
      subtitle: string;
    };
  };
  footer: {
    description: string;
    badges: Array<{
      text: string;
      variant: "primary" | "secondary";
    }>;
    quickLinks: Array<{
      title: string;
      links: Array<{
        text: string;
        href: string;
      }>;
    }>;
    contact: {
      email: string;
      phone: string;
      responseTime: string;
      publisher: {
        name: string;
        fullName: string;
      };
    };
    copyright: {
      year: number;
      text: string;
    };
    bottomLinks: Array<{
      text: string;
      href: string;
    }>;
    poweredBy: string;
  };
  sidebar: {
    submitSection: {
      title: string;
      description: string;
      submitButtonText: string;
      submitButtonUrl: string;
      guidelinesButtonText: string;
      guidelinesButtonUrl: string;
    };
    journalInfo: {
      title: string;
      items: Array<{
        label: string;
        value: string;
      }>;
    };
    quickLinks: {
      title: string;
      links: Array<{
        text: string;
        href: string;
      }>;
    };
    qualityStandards: {
      title: string;
      badges: Array<{
        text: string;
        variant: "primary" | "secondary" | "tertiary" | "success";
      }>;
      description: string;
    };
    statistics: {
      title: string;
      publishedArticles: number;
      countries: number;
      avgReviewTime: string;
      authorDistribution: Array<{
        country: string;
        flag: string;
        percentage: string;
      }>;
    };
    editorialContact: {
      title: string;
      email: string;
      editorInChief: string;
      responseTime: string;
      contactButtonText: string;
      contactButtonUrl: string;
    };
  };
  editorialPolicies?: {
    pageTitle?: string;
    pageSubtitle?: string;
    navigation?: Array<{
      id: string;
      title: string;
      href: string;
    }>;
    focusScope?: {
      title: string;
      icon: string;
      description: string;
      researchAreas: {
        title: string;
        items: Array<{
          title: string;
          description: string;
        }>;
      };
      contributionTypes: {
        title: string;
        items: Array<{
          title: string;
          description: string;
        }>;
      };
    };
    sectionPolicies?: {
      title: string;
      icon: string;
      subtitle: string;
      policies: Array<{
        title: string;
        description: string;
        status: "open" | "closed" | "indexed" | "reviewed";
      }>;
    };
    peerReview?: {
      title: string;
      icon: string;
      description: string;
      process: Array<{
        step: number;
        title: string;
        description: string;
      }>;
      timeline: {
        title: string;
        description: string;
      };
    };
    publicationFrequency?: {
      title: string;
      icon: string;
      description: string;
      schedule: {
        title: string;
        issues: Array<{
          volume: string;
          month: string;
        }>;
      };
      targets: {
        title: string;
        items: Array<{
          title: string;
          description?: string;
        }>;
      };
    };
    openAccess?: {
      title: string;
      icon: string;
      description: string;
      benefits: {
        title: string;
        items: Array<{
          title: string;
          description: string;
        }>;
      };
      copyright: {
        title: string;
        items: Array<{
          title: string;
          description: string;
        }>;
      };
    };
    archiving?: {
      title: string;
      icon: string;
      description: string;
    };
    plagiarism?: {
      title: string;
      icon: string;
      description: string;
      tolerancePolicy: {
        title: string;
        description: string;
      };
    };
    authorFees?: {
      title: string;
      icon: string;
      policyStatement: {
        title: string;
        description: string;
        fees: Array<{
          type: string;
          amount: string;
        }>;
      };
      commitment: {
        title: string;
        description: string;
      };
    };
  };
}

export function useJournalConfig() {
  const [localConfig, setLocalConfig] = useState<LocalJournalConfig>({
    title: journalConfig.title,
    subtitle: journalConfig.subtitle,
    description: journalConfig.description,
    logo: journalConfig.logo,
    colors: journalConfig.colors,
    topNavigation: journalConfig.topNavigation,
    navigation: journalConfig.navigation,
    searchPlaceholder: journalConfig.searchPlaceholder,
    categories: journalConfig.categories,
    aboutPage: journalConfig.aboutPage,
    mainContent: journalConfig.mainContent,
    footer: journalConfig.footer,
    sidebar: journalConfig.sidebar,
    editorialPolicies: journalConfig.editorialPolicies,
  });

  const [saving, setSaving] = useState(false);

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
        }),
      });

      if (response.ok) {
        toast.success("Journal configuration saved successfully!");
      } else {
        throw new Error('Failed to save configuration');
      }
    } catch (error) {
      toast.error("Failed to save configuration. Please try again.");
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  return {
    localConfig,
    setLocalConfig,
    saving,
    handleSaveConfig
  };
}