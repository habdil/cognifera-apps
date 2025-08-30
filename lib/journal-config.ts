// Journal Configuration - Managed by Manager-Journal Dashboard
export interface JournalConfig {
  // Basic Information
  title: string;
  subtitle: string;
  description: string;
  
  // Branding
  logo: {
    type: "text" | "image";
    value: string; // Text content or image path
    size?: number;
  };
  colors: {
    primary: string;
    secondary?: string;
  };
  
  // Header Content
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
  
  // Main Navigation
  navigation: Array<{
    label: string;
    href: string;
    type: "normal" | "button";
    active?: boolean;
  }>;
  
  // Search
  searchPlaceholder: string;
  
  // Categories
  categories: string[];
  
  // Meta Information
  lastUpdated: string;
}

export const journalConfig: JournalConfig = {
  // Basic Information
  title: "Cognifera Journal",
  subtitle: "Journal Cognifera System",
  description: "Open Journal System for academic publications in educational technology, computer science, and applied mathematics.",
  
  // Branding
  logo: {
    type: "image",
    value: "/logo.png",
    size: 64
  },
  colors: {
    primary: "#EC7A01",
    secondary: "#FFDD02"
  },
  
  // Header Content
  topNavigation: {
    backLink: {
      text: "Back to Cognifera",
      href: "/"
    },
    rightLinks: [
      {
            "text": "Publications",
            "href": "/publications"
      }
]
  },
  
  // Main Navigation
  navigation: [
    {
        "label": "Home",
        "href": "/journal",
        "type": "normal"
    },
    {
        "label": "About",
        "href": "/journal/about",
        "type": "normal"
    },
    {
        "label": "Current Issue",
        "href": "/journal/current",
        "type": "normal"
    },
    {
        "label": "Archives",
        "href": "/journal/archives",
        "type": "normal"
    },
    {
        "label": "Editorial Policies",
        "href": "/journal/editorial",
        "type": "normal"
    },
    {
        "label": "Submit Article",
        "href": "/journal/submit",
        "type": "button"
    }
],
  
  // Search
  searchPlaceholder: "Search articles, authors, keywords...",
  
  // Categories
  categories: [
    "Education",
    "Math"
],
  
  // Meta
  lastUpdated: new Date().toISOString()
};
