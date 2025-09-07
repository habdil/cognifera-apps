import { JournalConfig } from "./journal-config";

export const journalSocialConfig: JournalConfig = {
  // Basic Information
  title: "Journal of Social Responsibility and Service",
  subtitle: "Community Service and Social Impact Research",
  description: "Open Journal System for publications in social responsibility, community service, and social impact research.",
  
  // Branding
  logo: {
    type: "image",
    value: "/logo.png",
    size: 64
  },
  colors: {
    primary: "#16a085",
    secondary: "#3498db"
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
      "href": "/journal-social",
      "type": "normal"
    },
    {
      "label": "About",
      "href": "/journal-social/about",
      "type": "normal"
    },
    {
      "label": "Current Issue",
      "href": "/journal-social/current",
      "type": "normal"
    },
    {
      "label": "Archives",
      "href": "/journal-social/archives",
      "type": "normal"
    },
    {
      "label": "Editorial Policies",
      "href": "/journal-social/editorial",
      "type": "normal"
    },
    {
      "label": "Submit Article",
      "href": "/journal-social/submit",
      "type": "button"
    }
  ],
  
  // Search
  searchPlaceholder: "Search community service research, social impact studies...",
  
  // Categories
  categories: [
    "Community Service",
    "Social Responsibility",
    "Social Impact",
    "Community Development"
  ],
  
  // About Page Configuration
  aboutPage: {
    journalDescription: {
      paragraphs: [
        "Journal of Social Responsibility and Service adalah platform publikasi ilmiah yang berfokus pada penelitian-penelitian berkualitas tinggi dalam bidang tanggung jawab sosial, layanan masyarakat, dan dampak sosial.",
        "Journal ini berkomitmen untuk menyediakan akses terbuka terhadap semua publikasi yang berkaitan dengan pengabdian masyarakat, pemberdayaan komunitas, dan inovasi sosial untuk menciptakan dampak positif bagi masyarakat."
      ],
      focusScope: {
        title: "Focus & Scope",
        items: [
          "Community Service Research",
          "Social Responsibility Studies",
          "Community Development",
          "Social Impact Assessment",
          "Public Service Innovation",
          "Social Entrepreneurship"
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
      email: "social@cognifera.co.id",
      phone: "+62 21 1234 5678",
      website: "social.cognifera.co.id",
      editorialOffice: {
        name: "Cognifera Community Service Center",
        address: [
          "Jl. Pengabdian Masyarakat No. 456",
          "Jakarta 12345, Indonesia"
        ]
      }
    },
    policies: [
      {
        "title": "Focus and Scope",
        "description": "Areas of social responsibility research covered",
        "href": "/journal-social/focus-scope"
      },
      {
        "title": "Section Policies",
        "description": "Policies for different article types",
        "href": "/journal-social/section-policies"
      },
      {
        "title": "Peer Review Process",
        "description": "Double-blind peer review guidelines",
        "href": "/journal-social/peer-review-process"
      },
      {
        "title": "Publication Frequency",
        "description": "Quarterly publication schedule",
        "href": "/journal-social/publication-frequency"
      },
      {
        "title": "Open Access Policy",
        "description": "Free access to all published content",
        "href": "/journal-social/open-access-policy"
      },
      {
        "title": "Community Impact Ethics",
        "description": "Ethical guidelines for community research",
        "href": "/journal-social/ethics"
      }
    ],
    submissions: [
      {
        "title": "Author Guidelines",
        "description": "Complete submission guidelines for authors",
        "href": "/journal-social/author-guidelines"
      },
      {
        "title": "Community Impact Statement",
        "description": "Guidelines for describing social impact",
        "href": "/journal-social/impact-statement"
      },
      {
        "title": "Privacy Statement",
        "description": "How we handle community data and privacy",
        "href": "/journal-social/privacy-statement"
      }
    ],
    otherInfo: [
      {
        "title": "Community Partnerships",
        "description": "Collaboration with community organizations",
        "href": "/journal-social/partnerships"
      },
      {
        "title": "Site Map",
        "description": "Navigate through all journal sections",
        "href": "/journal-social/sitemap"
      }
    ]
  },
  
  // Main Content Configuration
  mainContent: {
    heroSection: {
      title: "Journal of Social Responsibility and Service",
      subtitle: "Advancing Community Impact Through Research",
      description: [
        "Journal of Social Responsibility and Service adalah platform publikasi ilmiah yang menyediakan akses terbuka untuk penelitian-penelitian berkualitas tinggi dalam bidang tanggung jawab sosial, pengabdian masyarakat, dan dampak sosial untuk menciptakan perubahan positif di masyarakat."
      ],
      focusAreas: {
        title: "Research Focus",
        description: "Community Service, Social Responsibility, Social Impact Assessment, Community Development, Public Service Innovation, dan Social Entrepreneurship."
      },
      openAccessPolicy: {
        title: "Open Access for Community",
        description: "Semua artikel dapat diakses secara gratis untuk mendukung penyebaran pengetahuan dan praktik terbaik dalam pengabdian masyarakat."
      },
      badges: [
        {
          "text": "Community Focused",
          "variant": "primary"
        },
        {
          "text": "Social Impact",
          "variant": "secondary"
        },
        {
          "text": "Open Access",
          "variant": "tertiary"
        },
        {
          "text": "Peer Reviewed",
          "variant": "tertiary"
        }
      ]
    },
    recentPublications: {
      title: "Recent Publications",
      subtitle: "Latest community service and social responsibility research"
    }
  },
  
  // Footer Configuration
  footer: {
    description: "Platform publikasi ilmiah terkemuka yang menyediakan akses terbuka untuk penelitian berkualitas tinggi dalam bidang tanggung jawab sosial, pengabdian masyarakat, dan dampak sosial.",
    badges: [
      {
        "text": "Community Impact",
        "variant": "primary"
      },
      {
        "text": "Social Responsibility",
        "variant": "secondary"
      }
    ],
    quickLinks: [
      {
        "title": "Quick Links",
        "links": [
          {
            "text": "Submit Article",
            "href": "/journal-social/submit"
          },
          {
            "text": "Author Guidelines",
            "href": "/journal-social/author-guidelines"
          },
          {
            "text": "Review Process",
            "href": "/journal-social/peer-review-process"
          },
          {
            "text": "Editorial Board",
            "href": "/journal-social/editorial"
          },
          {
            "text": "Community Partnerships",
            "href": "/journal-social/partnerships"
          }
        ]
      }
    ],
    contact: {
      email: "social@cognifera.co.id",
      phone: "+62 21 1234 5678", 
      responseTime: "Within 48 hours",
      publisher: {
        name: "Cognifera Community Service Center",
        fullName: "Cognifera Community Service Center"
      }
    },
    copyright: {
      year: 2024,
      text: "Journal of Social Responsibility and Service. All rights reserved."
    },
    bottomLinks: [
      {
        "text": "Back to Cognifera",
        "href": "/"
      }
    ],
    poweredBy: "Powered by Open Community Science"
  },
  
  // Meta
  lastUpdated: new Date().toISOString(),
  
  // Sidebar Configuration
  sidebar: {
    submitSection: {
      title: "Submit Your Community Research",
      description: "Publikasikan penelitian pengabdian masyarakat Anda dan berbagi dampak sosial yang telah diciptakan.",
      submitButtonText: "Submit Article",
      submitButtonUrl: "/journal-social/submit",
      guidelinesButtonText: "Author Guidelines",
      guidelinesButtonUrl: "/journal-social/guidelines"
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
          "value": "Social Responsibility, Community Service, Social Impact"
        },
        {
          "label": "Publisher",
          "value": "Cognifera Community Service Center"
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
          "href": "/journal-social/about"
        },
        {
          "text": "Editorial Board",
          "href": "/journal-social/editorial"
        },
        {
          "text": "Author Guidelines",
          "href": "/journal-social/guidelines"
        },
        {
          "text": "Review Process",
          "href": "/journal-social/review-process"
        },
        {
          "text": "Community Ethics",
          "href": "/journal-social/ethics"
        },
        {
          "text": "Journal Archives",
          "href": "/journal-social/archives"
        },
        {
          "text": "Contact Us",
          "href": "/journal-social/contact"
        }
      ]
    },
    qualityStandards: {
      title: "Quality Standards",
      badges: [
        {
          "text": "Community Impact",
          "variant": "primary"
        },
        {
          "text": "Social Responsibility",
          "variant": "secondary"
        },
        {
          "text": "Open Access",
          "variant": "tertiary"
        },
        {
          "text": "DOI Assigned",
          "variant": "success"
        }
      ],
      description: "Semua artikel mendapat DOI dan berdampak langsung pada komunitas"
    },
    statistics: {
      title: "Journal Statistics",
      publishedArticles: 89,
      countries: 15,
      avgReviewTime: "3.2",
      authorDistribution: [
        {
          "country": "Indonesia",
          "flag": "🇮🇩",
          "percentage": "70%"
        },
        {
          "country": "Malaysia",
          "flag": "🇲🇾",
          "percentage": "12%"
        },
        {
          "country": "Philippines",
          "flag": "🇵🇭",
          "percentage": "8%"
        },
        {
          "country": "Others",
          "flag": "🌏",
          "percentage": "10%"
        }
      ]
    },
    editorialContact: {
      title: "Editorial Contact",
      email: "social@cognifera.co.id",
      editorInChief: "Dr. Sari Wijaya, S.Sos., M.Si.",
      responseTime: "Within 48 hours",
      contactButtonText: "Contact Editorial Team",
      contactButtonUrl: "/journal-social/contact"
    }
  },
  
  // Editorial Policies Configuration
  editorialPolicies: {
    "pageTitle": "Editorial Policies",
    "pageSubtitle": "Comprehensive guidelines and policies for Journal of Social Responsibility and Service",
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
        "id": "community-ethics",
        "title": "Community Ethics",
        "href": "#community-ethics"
      },
      {
        "id": "author-fees",
        "title": "Author Fees",
        "href": "#author-fees"
      }
    ],
    "focusScope": {
      "title": "Focus and Scope",
      "icon": "Heart",
      "description": "Journal of Social Responsibility and Service mempublikasikan artikel original tentang tanggung jawab sosial, pengabdian masyarakat, dan dampak sosial dengan tujuan untuk memajukan pengetahuan tentang praktik terbaik dalam pelayanan komunitas.",
      "researchAreas": {
        "title": "Ruang Lingkup Penelitian:",
        "items": [
          {
            "title": "Community service and outreach programs",
            "description": "Program pengabdian masyarakat dan jangkauan komunitas"
          },
          {
            "title": "Social responsibility in education and business",
            "description": "Tanggung jawab sosial dalam pendidikan dan bisnis"
          },
          {
            "title": "Community development and empowerment",
            "description": "Pengembangan dan pemberdayaan masyarakat"
          },
          {
            "title": "Social impact assessment and measurement",
            "description": "Penilaian dan pengukuran dampak sosial"
          },
          {
            "title": "Public service innovation",
            "description": "Inovasi dalam pelayanan publik"
          },
          {
            "title": "Social entrepreneurship and innovation",
            "description": "Kewirausahaan dan inovasi sosial"
          }
        ]
      },
      "contributionTypes": {
        "title": "Jenis Kontribusi:",
        "items": [
          {
            "title": "Community Service Research",
            "description": "Penelitian program pengabdian masyarakat"
          },
          {
            "title": "Social Impact Studies",
            "description": "Studi dampak sosial dan evaluasi program"
          },
          {
            "title": "Best Practice Case Studies",
            "description": "Studi kasus praktik terbaik dalam pengabdian"
          },
          {
            "title": "Community Development Models",
            "description": "Model pengembangan masyarakat"
          },
          {
            "title": "Social Innovation Reports",
            "description": "Laporan inovasi sosial"
          },
          {
            "title": "Cross-sector Collaboration Studies",
            "description": "Studi kolaborasi lintas sektor"
          }
        ]
      }
    },
    "sectionPolicies": {
      "title": "Section Policies",
      "icon": "FileText",
      "subtitle": "Community Research Articles",
      "policies": [
        {
          "title": "Open Submissions",
          "description": "Submission terbuka untuk semua praktisi dan peneliti komunitas",
          "status": "open"
        },
        {
          "title": "Community Impact Focus",
          "description": "Semua artikel harus menunjukkan dampak nyata pada komunitas",
          "status": "indexed"
        },
        {
          "title": "Peer Reviewed",
          "description": "Double-blind peer review dengan fokus pada relevansi sosial",
          "status": "reviewed"
        }
      ]
    },
    "peerReview": {
      "title": "Peer Review Process",
      "icon": "Users",
      "description": "Journal of Social Responsibility and Service menggunakan sistem double-blind review dengan penekanan khusus pada dampak sosial dan relevansi komunitas.",
      "process": [
        {
          "step": 1,
          "title": "Community Impact Assessment",
          "description": "Editor melakukan review awal untuk memastikan manuscript menunjukkan dampak nyata pada komunitas dan sesuai dengan scope journal."
        },
        {
          "step": 2,
          "title": "Practitioner-Academic Review",
          "description": "Manuscript direview oleh kombinasi akademisi dan praktisi komunitas untuk memastikan relevansi teoretis dan praktis."
        },
        {
          "step": 3,
          "title": "Social Impact Validation",
          "description": "Review khusus untuk memvalidasi klaim dampak sosial dan metodologi pengukuran yang digunakan."
        },
        {
          "step": 4,
          "title": "Publication and Dissemination",
          "description": "Artikel yang diterima dipublikasikan dengan strategi disseminasi khusus untuk menjangkau komunitas praktisi."
        }
      ],
      "timeline": {
        "title": "Review Timeline",
        "description": "Proses review memakan waktu 6-10 minggu mengingat kompleksitas validasi dampak sosial. Authors akan mendapat feedback komprehensif."
      }
    },
    "publicationFrequency": {
      "title": "Publication Frequency",
      "icon": "Clock",
      "description": "Journal of Social Responsibility and Service dipublikasikan 4 kali dalam setahun dengan fokus pada isu-isu sosial terkini:",
      "schedule": {
        "title": "Jadwal Publikasi 2024:",
        "issues": [
          {
            "volume": "Vol 1, No 1",
            "month": "Maret 2024 - Community Education Focus"
          },
          {
            "volume": "Vol 1, No 2", 
            "month": "Juni 2024 - Environmental Sustainability"
          },
          {
            "volume": "Vol 1, No 3",
            "month": "September 2024 - Digital Inclusion"
          },
          {
            "volume": "Vol 1, No 4",
            "month": "Desember 2024 - Social Entrepreneurship"
          }
        ]
      },
      "targets": {
        "title": "Target Publikasi:",
        "items": [
          {
            "title": "Minimal 15 artikel per tahun dengan fokus dampak sosial"
          },
          {
            "title": "3-5 artikel per issue"
          },
          {
            "title": "Community-first publication",
            "description": "Prioritas pada artikel dengan implementasi langsung di komunitas"
          },
          {
            "title": "Social impact metrics",
            "description": "Setiap artikel disertai pengukuran dampak sosial"
          },
          {
            "title": "Practitioner accessibility",
            "description": "Format yang mudah diakses oleh praktisi komunitas"
          }
        ]
      }
    },
    "openAccess": {
      "title": "Open Access Policy",
      "icon": "Eye",
      "description": "Journal of Social Responsibility and Service menerapkan kebijakan Open Access dengan komitmen khusus untuk aksesibilitas komunitas dan praktisi lapangan.",
      "benefits": {
        "title": "Keuntungan Open Access untuk Komunitas:",
        "items": [
          {
            "title": "Akses gratis",
            "description": "untuk semua praktisi dan komunitas"
          },
          {
            "title": "Penyebaran praktik terbaik",
            "description": "tanpa hambatan finansial"
          },
          {
            "title": "Replikasi program",
            "description": "memudahkan adaptasi di komunitas lain"
          },
          {
            "title": "Kolaborasi lintas sektor",
            "description": "mendorong partnership yang lebih luas"
          },
          {
            "title": "Pembelajaran berkelanjutan",
            "description": "untuk pengembangan kapasitas komunitas"
          }
        ]
      },
      "copyright": {
        "title": "Copyright & Community Use:",
        "items": [
          {
            "title": "Creative Commons License",
            "description": "CC BY 4.0 dengan adaptasi komunitas"
          },
          {
            "title": "Community use encouraged",
            "description": "penggunaan bebas untuk tujuan sosial"
          },
          {
            "title": "Attribution to community",
            "description": "pengakuan pada komunitas yang terlibat"
          },
          {
            "title": "Non-commercial priority",
            "description": "prioritas pada penggunaan non-komersial"
          },
          {
            "title": "Adaptation permitted",
            "description": "adaptasi sesuai konteks lokal"
          }
        ]
      }
    },
    "archiving": {
      "title": "Archiving",
      "icon": "Archive",
      "description": "Journal of Social Responsibility and Service menggunakan sistem community-centered archiving yang memastikan preservation pengetahuan pengabdian masyarakat untuk generasi mendatang."
    },
    "plagiarism": {
      "title": "Community Ethics and Originality",
      "icon": "Shield",
      "description": "Selain bebas plagiarisme, semua manuscript harus menghormati etika komunitas dan memastikan consent dari komunitas yang terlibat dalam penelitian.",
      "tolerancePolicy": {
        "title": "Etika Penelitian Komunitas",
        "description": "Manuscript harus menyertakan ethical clearance dan community consent. Similarity index maksimal 20% dengan penekanan pada orisinalitas kontribusi sosial."
      }
    },
    "authorFees": {
      "title": "Author Fees",
      "icon": "DollarSign",
      "policyStatement": {
        "title": "No Publication Charges for Community Service",
        "description": "Journal of Social Responsibility and Service TIDAK mengenakan biaya apapun karena berkomitmen pada aksesibilitas penelitian pengabdian masyarakat.",
        "fees": [
          {
            "type": "Submission Fee:",
            "amount": "GRATIS (0 IDR)"
          },
          {
            "type": "Community Impact Review:",
            "amount": "GRATIS (0 IDR)"
          },
          {
            "type": "Peer Review Process:",
            "amount": "GRATIS (0 IDR)"
          },
          {
            "type": "Publication & Dissemination:",
            "amount": "GRATIS (0 IDR)"
          }
        ]
      },
      "commitment": {
        "title": "Commitment to Community Access",
        "description": "Sebagai journal yang fokus pada pengabdian masyarakat, kami percaya bahwa pengetahuan tentang praktik sosial harus dapat diakses tanpa hambatan finansial."
      }
    }
  }
};