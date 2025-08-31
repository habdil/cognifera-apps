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
  
  // About Page Configuration
  aboutPage: {
    journalDescription: {
      paragraphs: [
        "Cognifera Journal adalah platform publikasi ilmiah berbasis Open Journal System (OJS) yang berfokus pada penelitian-penelitian berkualitas tinggi dalam bidang teknologi pendidikan, ilmu komputer, matematika terapan, dan bidang interdisipliner terkait.",
        "Journal ini berkomitmen untuk menyediakan akses terbuka (Open Access) terhadap semua publikasi, mendukung penyebaran pengetahuan ilmiah yang lebih luas dan demokratisasi akses terhadap hasil penelitian."
],
      focusScope: {
        title: "Focus & Scope",
        items: [
          "Biology Education",
          "Technology Education"
]
      },
      publicationDetails: {
        title: "Publication Details",
        items: [
          {
                    "label": "Frequency",
                    "value": "Quarterly (4 issues per year)"
          },
          {
                    "label": "Publisher",
                    "value": "Cognifera Education Academy"
          },
          {
                    "label": "Language",
                    "value": "Indonesian & English"
          },
          {
                    "label": "Access",
                    "value": "Open Access (Free)"
          },
          {
                    "label": "Review",
                    "value": "Double-blind peer review"
          },
          {
                    "label": "DOI",
                    "value": "Assigned to all articles"
          }
]
      }
    },
    contact: {
      title: "Contact",
      email: "journal@cognifera.co.id",
      phone: "+62 21 1234 5678",
      website: "journal.cognifera.co.id",
      editorialOffice: {
        name: "Cognifera Education Academy",
        address: [
          "Jl. Teknologi No. 123",
          "Jakarta 12345, Indonesia"
]
      }
    },
    policies: [
      {
            "title": "Focus and Scope",
            "description": "Areas of research covered by the journal",
            "href": "/journal/focus-scope"
      },
      {
            "title": "Section Policies",
            "description": "Policies for different article types",
            "href": "/journal/section-policies"
      },
      {
            "title": "Peer Review Process",
            "description": "Double-blind peer review guidelines",
            "href": "/journal/peer-review-process"
      },
      {
            "title": "Publication Frequency",
            "description": "Quarterly publication schedule",
            "href": "/journal/publication-frequency"
      },
      {
            "title": "Open Access Policy",
            "description": "Free access to all published content",
            "href": "/journal/open-access-policy"
      },
      {
            "title": "Archiving",
            "description": "Digital preservation policies",
            "href": "/journal/archiving"
      },
      {
            "title": "Publication Ethics",
            "description": "Ethical guidelines for authors and reviewers",
            "href": "/journal/ethics"
      }
],
    submissions: [
      {
            "title": "Author Guidelines",
            "description": "Complete submission guidelines for authors",
            "href": "/journal/author-guidelines"
      },
      {
            "title": "Copyright Notice",
            "description": "Copyright and licensing information",
            "href": "/journal/copyright-notice"
      },
      {
            "title": "Privacy Statement",
            "description": "How we handle author and reviewer data",
            "href": "/journal/privacy-statement"
      }
],
    otherInfo: [
      {
            "title": "Journal Sponsorship",
            "description": "Support and partnership opportunities",
            "href": "/journal/sponsorship"
      },
      {
            "title": "Site Map",
            "description": "Navigate through all journal sections",
            "href": "/journal/sitemap"
      }
]
  },
  
  // Main Content Configuration
  mainContent: {
    heroSection: {
      title: "Cognifera Journal",
      subtitle: "Open Journal System for Academic Publications",
      description: [
        "Cognifera Journal adalah platform publikasi ilmiah berbasis Open Journal System (OJS) yang menyediakan akses terbuka untuk artikel-artikel penelitian berkualitas tinggi dalam berbagai bidang keilmuan termasuk teknologi pendidikan, ilmu komputer, dan matematika terapan."
],
      focusAreas: {
        title: "Publication Focus",
        description: "Educational Technology, Computer Science, Applied Mathematics, Data Science, Engineering, dan bidang interdisipliner terkait."
      },
      openAccessPolicy: {
        title: "Open Access Policy",
        description: "Semua artikel dapat diakses secara gratis tanpa biaya berlangganan, mendukung penyebaran pengetahuan yang lebih luas."
      },
      badges: [
        {
                "text": "Open Access",
                "variant": "primary"
        },
        {
                "text": "Peer Reviewed",
                "variant": "secondary"
        },
        {
                "text": "Digital First",
                "variant": "tertiary"
        },
        {
                "text": "Fleksible",
                "variant": "tertiary"
        }
]
    },
    recentPublications: {
      title: "Recent Publications",
      subtitle: "Latest research articles published in Cognifera Journal"
    }
  },
  
  // Footer Configuration
  footer: {
    description: "Platform publikasi ilmiah terkemuka yang menyediakan akses terbuka untuk penelitian berkualitas tinggi dalam bidang teknologi pendidikan, ilmu komputer, dan matematika terapan.",
    badges: [
      {
            "text": "Open Access",
            "variant": "primary"
      },
      {
            "text": "Peer Reviewed",
            "variant": "secondary"
      }
],
    quickLinks: [
      {
            "title": "Quick Links",
            "links": [
                  {
                        "text": "Submit Article",
                        "href": "/journal/submit"
                  },
                  {
                        "text": "Author Guidelines",
                        "href": "/journal/author-guidelines"
                  },
                  {
                        "text": "Review Process",
                        "href": "/journal/peer-review-process"
                  },
                  {
                        "text": "Editorial Board",
                        "href": "/journal/editorial"
                  },
                  {
                        "text": "All Publications",
                        "href": "/publications"
                  }
            ]
      }
],
    contact: {
      email: "journal@cognifera.co.id",
      phone: "+62 21 1234 5678", 
      responseTime: "Within 48 hours",
      publisher: {
        name: "Cognifera Education Academy",
        fullName: "Cognifera Education Academy"
      }
    },
    copyright: {
      year: 2024,
      text: "Cognifera Journal. All rights reserved."
    },
    bottomLinks: [
      {
            "text": "Back to Cognifera",
            "href": "/"
      }
],
    poweredBy: "Powered by OJS"
  },
  
  // Meta
  lastUpdated: new Date().toISOString(),
  
  // Sidebar Configuration
  sidebar: {
    submitSection: {
      title: "Submit Your Research",
      description: "Publikasikan penelitian Anda di Cognifera Journal dengan proses review yang berkualitas.",
      submitButtonText: "Submit Article",
      submitButtonUrl: "/journal/submit",
      guidelinesButtonText: "Author Guidelines",
      guidelinesButtonUrl: "/journal/guidelines"
    },
    journalInfo: {
      title: "Journal Information",
      items: [
        {
                "label": "Publication",
                "value": "Quarterly (4 issues/year)"
        },
        {
                "label": "Focus Area",
                "value": "Educational Technology, Computer Science, Applied Mathematics"
        },
        {
                "label": "Publisher",
                "value": "Cognifera Education Academy"
        },
        {
                "label": "Open Access",
                "value": "Free submission & publication"
        }
]
    },
    quickLinks: {
      title: "Quick Links",
      links: [
        {
                "text": "About Journal",
                "href": "/journal/about"
        },
        {
                "text": "Editorial Board",
                "href": "/journal/editorial"
        },
        {
                "text": "Author Guidelines",
                "href": "/journal/guidelines"
        },
        {
                "text": "Review Process",
                "href": "/journal/review-process"
        },
        {
                "text": "Publication Ethics",
                "href": "/journal/ethics"
        },
        {
                "text": "Journal Archives",
                "href": "/journal/archives"
        },
        {
                "text": "Contact Us",
                "href": "/journal/contact"
        }
]
    },
    qualityStandards: {
      title: "Quality Standards",
      badges: [
        {
                "text": "Open Access",
                "variant": "primary"
        },
        {
                "text": "Peer Review",
                "variant": "secondary"
        },
        {
                "text": "Fast Track",
                "variant": "tertiary"
        },
        {
                "text": "DOI Assigned",
                "variant": "success"
        }
],
      description: "Semua artikel mendapat DOI dan terindeks secara otomatis"
    },
    statistics: {
      title: "Journal Statistics",
      publishedArticles: 124,
      countries: 18,
      avgReviewTime: "2.4",
      authorDistribution: [
        {
                "country": "Indonesia",
                "flag": "🇮🇩",
                "percentage": "65%"
        },
        {
                "country": "Malaysia",
                "flag": "🇲🇾",
                "percentage": "15%"
        },
        {
                "country": "Singapore",
                "flag": "🇸🇬",
                "percentage": "8%"
        },
        {
                "country": "Others",
                "flag": "🌏",
                "percentage": "12%"
        }
]
    },
    editorialContact: {
      title: "Editorial Contact",
      email: "cognifera.edu@gmail.com",
      editorInChief: "Dr. Hardianto, S.Pd., M.Pd.",
      responseTime: "Within 48 hours",
      contactButtonText: "Contact Editorial Team",
      contactButtonUrl: "/journal/contact"
    }
  },
  
  // Editorial Policies Configuration
  editorialPolicies: {
  "pageTitle": "Editorial Policies",
  "pageSubtitle": "Comprehensive guidelines and policies for Cognifera Journal",
  "navigation": [
    {
      "id": "focus-scope",
      "title": "Focus and Scope",
      "href": "#focus-scope"
    },
    {
      "id": "section-policies",
      "title": "Section Policies",
      "href": "#section-policies"
    },
    {
      "id": "peer-review",
      "title": "Peer Review Process",
      "href": "#peer-review"
    },
    {
      "id": "publication-frequency",
      "title": "Publication Frequency",
      "href": "#publication-frequency"
    },
    {
      "id": "open-access",
      "title": "Open Access Policy",
      "href": "#open-access"
    },
    {
      "id": "archiving",
      "title": "Archiving",
      "href": "#archiving"
    },
    {
      "id": "plagiarism",
      "title": "Plagiarism Policy",
      "href": "#plagiarism"
    },
    {
      "id": "author-fees",
      "title": "Author Fees",
      "href": "#author-fees"
    }
  ],
  "focusScope": {
    "title": "Focus and Scope",
    "icon": "BookOpen",
    "description": "Cognifera Journal mempublikasikan artikel original tentang isu-isu terkini dan mengutamakan internasionalitas dalam pendidikan, metodologi, pelatihan guru, dan persiapan guru sains dengan tujuan untuk memajukan pengetahuan tentang teori dan praktik pendidikan sains.",
    "researchAreas": {
      "title": "Ruang Lingkup Penelitian:",
      "items": [
        {
          "title": "Learning consisting of theoretical and empirical research",
          "description": "Pembelajaran yang terdiri dari penelitian teoretis dan empiris dalam pembelajaran sains"
        },
        {
          "title": "Teacher education and development",
          "description": "Pendidikan dan pengembangan guru sains"
        },
        {
          "title": "Educational technology",
          "description": "Teknologi pendidikan dalam pembelajaran sains"
        },
        {
          "title": "Science curriculum development",
          "description": "Pengembangan kurikulum sains"
        },
        {
          "title": "Environmental education",
          "description": "Pendidikan lingkungan dan sains lingkungan"
        }
      ]
    },
    "contributionTypes": {
      "title": "Jenis Kontribusi:",
      "items": [
        {
          "title": "Original Research Articles",
          "description": "Artikel penelitian original"
        },
        {
          "title": "Review Articles",
          "description": "Artikel tinjauan komprehensif"
        },
        {
          "title": "Case Studies",
          "description": "Studi kasus dalam pendidikan sains"
        },
        {
          "title": "Educational Innovations",
          "description": "Inovasi dalam pendidikan sains"
        },
        {
          "title": "Technology Integration",
          "description": "Integrasi teknologi dalam pembelajaran"
        },
        {
          "title": "Cross-cultural Studies",
          "description": "Studi lintas budaya dalam pendidikan sains"
        }
      ]
    }
  },
  "sectionPolicies": {
    "title": "Section Policies",
    "icon": "FileText",
    "subtitle": "Articles",
    "policies": [
      {
        "title": "Open Submissions",
        "description": "Submission terbuka untuk semua peneliti dan akademisi",
        "status": "open"
      },
      {
        "title": "Indexed",
        "description": "Semua artikel terindeks dengan DOI assignment",
        "status": "indexed"
      },
      {
        "title": "Peer Reviewed",
        "description": "Double-blind peer review process",
        "status": "reviewed"
      }
    ]
  },
  "peerReview": {
    "title": "Peer Review Process",
    "icon": "Users",
    "description": "Cognifera Journal menggunakan sistem double-blind review untuk menjamin kualitas dan objektivitas proses evaluasi. Manuscript yang diterima akan melalui proses review berikut:",
    "process": [
      {
        "step": 1,
        "title": "Initial Review",
        "description": "Editor melakukan review awal untuk memastikan manuscript sesuai dengan scope journal dan memenuhi standar format yang ditetapkan."
      },
      {
        "step": 2,
        "title": "Peer Review Assignment",
        "description": "Manuscript dikirim kepada minimal 2 reviewer ahli dalam bidang terkait. Review dilakukan secara anonymous (double-blind)."
      },
      {
        "step": 3,
        "title": "Review Decision",
        "description": "Berdasarkan feedback reviewer, editor akan membuat keputusan: Accept, Minor Revision, Major Revision, atau Reject."
      },
      {
        "step": 4,
        "title": "Final Publication",
        "description": "Manuscript yang diterima akan melalui proses copyediting dan published online dengan DOI assignment."
      }
    ],
    "timeline": {
      "title": "Review Timeline",
      "description": "Proses review biasanya memakan waktu 4-8 minggu setelah submission. Authors akan mendapat notifikasi update setiap tahap review."
    }
  },
  "publicationFrequency": {
    "title": "Publication Frequency",
    "icon": "Clock",
    "description": "Cognifera Journal dipublikasikan 4 kali dalam setahun (Quarterly) dengan jadwal sebagai berikut:",
    "schedule": {
      "title": "Jadwal Publikasi 2024:",
      "issues": [
        {
          "volume": "Vol 1, No 1",
          "month": "Maret 2024"
        },
        {
          "volume": "Vol 1, No 2",
          "month": "Juni 2024"
        },
        {
          "volume": "Vol 1, No 3",
          "month": "September 2024"
        },
        {
          "volume": "Vol 1, No 4",
          "month": "Desember 2024"
        }
      ]
    },
    "targets": {
      "title": "Target Publikasi:",
      "items": [
        {
          "title": "Minimal 20 artikel per tahun"
        },
        {
          "title": "5-8 artikel per issue"
        },
        {
          "title": "Online first publication",
          "description": "Artikel dipublikasikan online segera setelah diterima"
        },
        {
          "title": "DOI assignment",
          "description": "Setiap artikel mendapat DOI"
        },
        {
          "title": "Indexing",
          "description": "Semua artikel terindeks di database akademik"
        }
      ]
    }
  },
  "openAccess": {
    "title": "Open Access Policy",
    "icon": "Eye",
    "description": "Cognifera Journal menerapkan kebijakan Open Access yang memungkinkan akses gratis terhadap seluruh konten yang dipublikasikan, mendukung pertukaran pengetahuan yang lebih luas.",
    "benefits": {
      "title": "Keuntungan Open Access:",
      "items": [
        {
          "title": "Akses gratis",
          "description": "untuk semua pembaca"
        },
        {
          "title": "Visibilitas tinggi",
          "description": "dan potensi sitasi lebih besar"
        },
        {
          "title": "Distribusi global",
          "description": "tanpa batasan geografis"
        },
        {
          "title": "Archiving permanen",
          "description": "untuk preservasi jangka panjang"
        },
        {
          "title": "Compliance",
          "description": "dengan policy funding agency"
        }
      ]
    },
    "copyright": {
      "title": "Copyright & Licensing:",
      "items": [
        {
          "title": "Creative Commons License",
          "description": "CC BY 4.0"
        },
        {
          "title": "Author retains copyright",
          "description": ""
        },
        {
          "title": "Attribution required",
          "description": "untuk penggunaan kembali"
        },
        {
          "title": "Commercial use allowed",
          "description": "dengan proper attribution"
        },
        {
          "title": "Derivative works permitted",
          "description": ""
        }
      ]
    }
  },
  "archiving": {
    "title": "Archiving",
    "icon": "Archive",
    "description": "Cognifera Journal menggunakan sistem LOCKSS untuk membuat distributed archiving system di antara library berpartisipasi dan memungkinkan library tersebut untuk menciptakan arsip permanen dari journal untuk tujuan preservasi dan restorasi."
  },
  "plagiarism": {
    "title": "Policy of Screening for Plagiarism",
    "icon": "AlertCircle",
    "description": "Semua manuscript harus bebas dari plagiarisme. Authors diharuskan untuk menggunakan software deteksi plagiarisme untuk mengecek originalitas manuscript sebelum submission.",
    "tolerancePolicy": {
      "title": "Toleransi Plagiarisme",
      "description": "Manuscript dengan similarity index lebih dari 25% akan ditolak tanpa review lebih lanjut. Gunakan tools seperti Turnitin atau Grammarly untuk mengecek sebelum submission."
    }
  },
  "authorFees": {
    "title": "Author Fees",
    "icon": "DollarSign",
    "policyStatement": {
      "title": "No Publication Charges",
      "description": "Cognifera Journal TIDAK mengenakan biaya apapun untuk submission, review process, dan publication. Semua layanan tersedia secara gratis.",
      "fees": [
        {
          "type": "Submission Fee:",
          "amount": "GRATIS (0 IDR)"
        },
        {
          "type": "Article Processing Charge:",
          "amount": "GRATIS (0 IDR)"
        },
        {
          "type": "Review Process:",
          "amount": "GRATIS (0 IDR)"
        },
        {
          "type": "Publication Fee:",
          "amount": "GRATIS (0 IDR)"
        }
      ]
    },
    "commitment": {
      "title": "Commitment to Open Science",
      "description": "Sebagai bagian dari komitmen terhadap Open Science, kami percaya bahwa knowledge sharing harus dapat diakses oleh semua kalangan tanpa barrier finansial."
    }
  }
}
};
