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
  
  // About Page Configuration
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
  
  // Main Content Configuration
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
  
  // Footer Configuration
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
  
  // Meta Information
  lastUpdated: string;
  
  // Sidebar Configuration
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
  
  // Editorial Policies Configuration
  editorialPolicies: {
    pageTitle: string;
    pageSubtitle: string;
    navigation: Array<{
      id: string;
      title: string;
      href: string;
    }>;
    focusScope: {
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
    sectionPolicies: {
      title: string;
      icon: string;
      subtitle: string;
      policies: Array<{
        title: string;
        description: string;
        status: "open" | "closed" | "indexed" | "reviewed";
      }>;
    };
    peerReview: {
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
    publicationFrequency: {
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
    openAccess: {
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
    archiving: {
      title: string;
      icon: string;
      description: string;
    };
    plagiarism: {
      title: string;
      icon: string;
      description: string;
      tolerancePolicy: {
        title: string;
        description: string;
      };
    };
    authorFees: {
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
  
  // About Page Configuration
  aboutPage: {
    journalDescription: {
      paragraphs: ${JSON.stringify(config.aboutPage.journalDescription.paragraphs, null, 8)},
      focusScope: {
        title: ${JSON.stringify(config.aboutPage.journalDescription.focusScope.title)},
        items: ${JSON.stringify(config.aboutPage.journalDescription.focusScope.items, null, 10)}
      },
      publicationDetails: {
        title: ${JSON.stringify(config.aboutPage.journalDescription.publicationDetails.title)},
        items: ${JSON.stringify(config.aboutPage.journalDescription.publicationDetails.items, null, 10)}
      }
    },
    contact: {
      title: ${JSON.stringify(config.aboutPage.contact.title)},
      email: ${JSON.stringify(config.aboutPage.contact.email)},
      phone: ${JSON.stringify(config.aboutPage.contact.phone)},
      website: ${JSON.stringify(config.aboutPage.contact.website)},
      editorialOffice: {
        name: ${JSON.stringify(config.aboutPage.contact.editorialOffice.name)},
        address: ${JSON.stringify(config.aboutPage.contact.editorialOffice.address, null, 10)}
      }
    },
    policies: ${JSON.stringify(config.aboutPage.policies, null, 6)},
    submissions: ${JSON.stringify(config.aboutPage.submissions, null, 6)},
    otherInfo: ${JSON.stringify(config.aboutPage.otherInfo, null, 6)}
  },
  
  // Main Content Configuration
  mainContent: {
    heroSection: {
      title: ${JSON.stringify(config.mainContent.heroSection.title)},
      subtitle: ${JSON.stringify(config.mainContent.heroSection.subtitle)},
      description: ${JSON.stringify(config.mainContent.heroSection.description, null, 8)},
      focusAreas: {
        title: ${JSON.stringify(config.mainContent.heroSection.focusAreas.title)},
        description: ${JSON.stringify(config.mainContent.heroSection.focusAreas.description)}
      },
      openAccessPolicy: {
        title: ${JSON.stringify(config.mainContent.heroSection.openAccessPolicy.title)},
        description: ${JSON.stringify(config.mainContent.heroSection.openAccessPolicy.description)}
      },
      badges: ${JSON.stringify(config.mainContent.heroSection.badges, null, 8)}
    },
    recentPublications: {
      title: ${JSON.stringify(config.mainContent.recentPublications.title)},
      subtitle: ${JSON.stringify(config.mainContent.recentPublications.subtitle)}
    }
  },
  
  // Footer Configuration
  footer: {
    description: ${JSON.stringify(config.footer.description)},
    badges: ${JSON.stringify(config.footer.badges, null, 6)},
    quickLinks: ${JSON.stringify(config.footer.quickLinks, null, 6)},
    contact: {
      email: ${JSON.stringify(config.footer.contact.email)},
      phone: ${JSON.stringify(config.footer.contact.phone)}, 
      responseTime: ${JSON.stringify(config.footer.contact.responseTime)},
      publisher: {
        name: ${JSON.stringify(config.footer.contact.publisher.name)},
        fullName: ${JSON.stringify(config.footer.contact.publisher.fullName)}
      }
    },
    copyright: {
      year: ${config.footer.copyright.year},
      text: ${JSON.stringify(config.footer.copyright.text)}
    },
    bottomLinks: ${JSON.stringify(config.footer.bottomLinks, null, 6)},
    poweredBy: ${JSON.stringify(config.footer.poweredBy)}
  },
  
  // Meta
  lastUpdated: new Date().toISOString(),
  
  // Sidebar Configuration
  sidebar: {
    submitSection: {
      title: ${JSON.stringify(config.sidebar.submitSection.title)},
      description: ${JSON.stringify(config.sidebar.submitSection.description)},
      submitButtonText: ${JSON.stringify(config.sidebar.submitSection.submitButtonText)},
      submitButtonUrl: ${JSON.stringify(config.sidebar.submitSection.submitButtonUrl)},
      guidelinesButtonText: ${JSON.stringify(config.sidebar.submitSection.guidelinesButtonText)},
      guidelinesButtonUrl: ${JSON.stringify(config.sidebar.submitSection.guidelinesButtonUrl)}
    },
    journalInfo: {
      title: ${JSON.stringify(config.sidebar.journalInfo.title)},
      items: ${JSON.stringify(config.sidebar.journalInfo.items, null, 8)}
    },
    quickLinks: {
      title: ${JSON.stringify(config.sidebar.quickLinks.title)},
      links: ${JSON.stringify(config.sidebar.quickLinks.links, null, 8)}
    },
    qualityStandards: {
      title: ${JSON.stringify(config.sidebar.qualityStandards.title)},
      badges: ${JSON.stringify(config.sidebar.qualityStandards.badges, null, 8)},
      description: ${JSON.stringify(config.sidebar.qualityStandards.description)}
    },
    statistics: {
      title: ${JSON.stringify(config.sidebar.statistics.title)},
      publishedArticles: ${config.sidebar.statistics.publishedArticles},
      countries: ${config.sidebar.statistics.countries},
      avgReviewTime: ${JSON.stringify(config.sidebar.statistics.avgReviewTime)},
      authorDistribution: ${JSON.stringify(config.sidebar.statistics.authorDistribution, null, 8)}
    },
    editorialContact: {
      title: ${JSON.stringify(config.sidebar.editorialContact.title)},
      email: ${JSON.stringify(config.sidebar.editorialContact.email)},
      editorInChief: ${JSON.stringify(config.sidebar.editorialContact.editorInChief)},
      responseTime: ${JSON.stringify(config.sidebar.editorialContact.responseTime)},
      contactButtonText: ${JSON.stringify(config.sidebar.editorialContact.contactButtonText)},
      contactButtonUrl: ${JSON.stringify(config.sidebar.editorialContact.contactButtonUrl)}
    }
  },
  
  // Editorial Policies Configuration
  editorialPolicies: ${config.editorialPolicies ? JSON.stringify(config.editorialPolicies, null, 2) : 'undefined'}
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