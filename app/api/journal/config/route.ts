import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const configPath = join(process.cwd(), 'lib', 'journal-config.ts');
    const content = readFileSync(configPath, 'utf-8');
    
    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error('Failed to read config:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read config file' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { config } = await request.json();
    
    // Generate the updated config file content
    const configContent = `// Journal Configuration - Managed by Manager-Journal Dashboard
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
  title: ${JSON.stringify(config.title)},
  subtitle: ${JSON.stringify(config.subtitle)},
  description: ${JSON.stringify(config.description)},
  
  // Branding
  logo: {
    type: ${JSON.stringify(config.logo.type)},
    value: ${JSON.stringify(config.logo.value)},
    size: ${config.logo.size || 64}
  },
  colors: {
    primary: ${JSON.stringify(config.colors.primary)},
    secondary: ${JSON.stringify(config.colors.secondary || "#FFDD02")}
  },
  
  // Header Content
  topNavigation: {
    backLink: {
      text: ${JSON.stringify(config.topNavigation.backLink.text)},
      href: ${JSON.stringify(config.topNavigation.backLink.href)}
    },
    rightLinks: ${JSON.stringify(config.topNavigation.rightLinks, null, 6)}
  },
  
  // Main Navigation
  navigation: ${JSON.stringify(config.navigation, null, 4)},
  
  // Search
  searchPlaceholder: ${JSON.stringify(config.searchPlaceholder)},
  
  // Categories
  categories: ${JSON.stringify(config.categories, null, 4)},
  
  // Meta
  lastUpdated: new Date().toISOString()
};
`;

    // Write to file
    const configPath = join(process.cwd(), 'lib', 'journal-config.ts');
    writeFileSync(configPath, configContent, 'utf-8');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Journal configuration saved successfully' 
    });
  } catch (error) {
    console.error('Failed to save config:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save config file' },
      { status: 500 }
    );
  }
}