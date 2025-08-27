import { ResearchJournalData, CommunityServiceJournalData, BookData, DocumentSection, Reference, Figure, Citation } from "@/types/publications";

export const mockResearchJournals: ResearchJournalData[] = [
  {
    id: "rj-001",
    title: "Advanced Machine Learning Techniques for Data Analysis in Educational Systems",
    authors: ["Dr. Ahmad Fauzi", "Prof. Sari Indira", "Dr. Budi Santoso"],
    journal: "International Journal of Educational Technology",
    year: 2024,
    volume: "15",
    issue: "3",
    pages: "45-62",
    doi: "10.1234/ijet.2024.003",
    abstract: "This research explores the application of advanced machine learning techniques in educational data analysis. We propose novel algorithms for predicting student performance and personalizing learning experiences. The study demonstrates significant improvements in prediction accuracy compared to traditional methods, with potential applications in adaptive learning systems.",
    keywords: ["machine learning", "educational technology", "data analysis", "personalization"],
    category: "computer-science",
    publicationDate: "2024-03-15",
    pdfUrl: "/publications/research/advanced-ml-education.pdf",
    citationCount: 12,
    isOpenAccess: true,
    
    // Detail page specific fields
    conferenceLocation: "Jakarta, Indonesia",
    dateAddedToLibrary: "2024-03-20",
    fullTextViews: 340,
    conferenceDate: "2024-03-10",
    fundingAgency: "Ministry of Education and Culture, Republic of Indonesia",
    
    // Document sections
    introduction: "The integration of machine learning in educational systems has become increasingly important in the digital age. With the growing volume of educational data, there is a need for sophisticated analytical tools that can provide insights into student learning patterns and performance.",
    methodology: "We employed a multi-layered approach combining supervised learning algorithms, neural networks, and statistical analysis. The dataset consisted of 10,000 student records from various educational institutions across Indonesia.",
    results: "Our proposed algorithm achieved 94.2% accuracy in predicting student performance, compared to 78.5% for traditional methods. The system successfully identified at-risk students with 89% precision.",
    conclusion: "The study demonstrates the effectiveness of advanced machine learning techniques in educational data analysis. Future work will focus on real-time implementation and expansion to other educational contexts.",
    
    sections: [
      {
        id: "sec-1",
        title: "I. Introduction",
        content: "The rapid digitization of education has generated vast amounts of data that require sophisticated analysis techniques..."
      },
      {
        id: "sec-2", 
        title: "II. Related Work",
        content: "Previous research in educational data mining has focused primarily on traditional statistical methods..."
      },
      {
        id: "sec-3",
        title: "III. Methodology",
        content: "Our approach combines multiple machine learning algorithms to create a comprehensive analysis framework..."
      }
    ],
    
    figures: [
      {
        id: "fig-1",
        title: "Figure 1",
        caption: "Performance comparison of different machine learning algorithms in educational data analysis"
      },
      {
        id: "fig-2",
        title: "Figure 2", 
        caption: "Student performance prediction accuracy over time"
      }
    ],
    
    references: [
      {
        id: "ref-1",
        authors: ["Smith, J.", "Johnson, A."],
        title: "Machine Learning in Education: A Comprehensive Review",
        publication: "Educational Technology Research",
        year: 2023,
        doi: "10.1234/etr.2023.001"
      },
      {
        id: "ref-2",
        authors: ["Chen, L.", "Wang, M.", "Liu, S."],
        title: "Predictive Analytics in Student Performance Assessment",
        publication: "Journal of Educational Data Mining",
        year: 2022,
        doi: "10.1234/jedm.2022.015"
      }
    ],
    
    citations: [
      {
        id: "cit-1",
        authors: ["Rahman, A.", "Sari, D."],
        title: "Implementing AI-driven Educational Systems in Indonesian Universities",
        publication: "Asian Journal of Educational Technology",
        year: 2024,
        citedBy: 8
      }
    ]
  },
  {
    id: "rj-002", 
    title: "Sustainable Energy Management in Smart Cities: A Comprehensive Framework",
    authors: ["Prof. Lisa Wijaya", "Dr. Rahmat Hidayat"],
    journal: "IEEE Transactions on Smart Cities",
    year: 2024,
    volume: "8",
    issue: "2",
    pages: "123-140",
    doi: "10.1109/tsc.2024.002",
    abstract: "This paper presents a comprehensive framework for sustainable energy management in smart cities, incorporating IoT devices and artificial intelligence for optimal resource allocation. The proposed system demonstrates significant improvements in energy efficiency and cost reduction while maintaining reliable power distribution across urban infrastructures.",
    keywords: ["smart cities", "energy management", "IoT", "sustainability"],
    category: "engineering",
    publicationDate: "2024-02-28",
    pdfUrl: "/publications/research/smart-cities-energy.pdf",
    citationCount: 23,
    isOpenAccess: false,
    
    conferenceLocation: "Bandung, Indonesia",
    dateAddedToLibrary: "2024-03-05",
    fullTextViews: 576,
    conferenceDate: "2024-02-20",
    fundingAgency: "Indonesian Institute of Sciences (LIPI)",
    
    introduction: "Urban areas consume approximately 78% of global energy and produce more than 60% of greenhouse gas emissions. Smart city technologies offer promising solutions for sustainable energy management through integrated IoT systems and AI-driven optimization.",
    methodology: "We developed a multi-agent system architecture integrating renewable energy sources, smart grid technology, and predictive analytics. The framework was tested in a simulation environment modeling a mid-sized Indonesian city.",
    results: "Implementation of our framework resulted in 32% reduction in energy consumption, 45% improvement in renewable energy utilization, and 28% decrease in operational costs over a 12-month simulation period.",
    conclusion: "The comprehensive framework successfully demonstrates the potential for sustainable energy management in smart cities. The integration of IoT and AI technologies provides a scalable solution for urban energy challenges.",
    
    figures: [
      {
        id: "fig-1",
        title: "Figure 1",
        caption: "Smart city energy management system architecture"
      },
      {
        id: "fig-2",
        title: "Figure 2",
        caption: "Energy consumption patterns before and after framework implementation"
      },
      {
        id: "fig-3",
        title: "Figure 3",
        caption: "Cost-benefit analysis of renewable energy integration"
      }
    ],
    
    references: [
      {
        id: "ref-1",
        authors: ["Zhang, X.", "Liu, Y.", "Chen, W."],
        title: "IoT-Based Energy Management Systems: A Survey",
        publication: "IEEE Internet of Things Journal",
        year: 2023,
        doi: "10.1109/jiot.2023.001"
      },
      {
        id: "ref-2",
        authors: ["Kumar, S.", "Patel, R."],
        title: "AI Applications in Smart Grid Technology",
        publication: "Energy and AI",
        year: 2023,
        doi: "10.1016/j.egyai.2023.002"
      }
    ],
    
    citations: [
      {
        id: "cit-1",
        authors: ["Tanaka, H.", "Suzuki, M."],
        title: "Comparative Analysis of Smart City Energy Frameworks",
        publication: "Journal of Sustainable Cities",
        year: 2024,
        citedBy: 15
      }
    ]
  },
  {
    id: "rj-003",
    title: "Mathematical Modeling of COVID-19 Transmission Dynamics in Indonesia",
    authors: ["Dr. Maya Sari", "Prof. Andi Kurniawan", "Dr. Fitri Yanti"],
    journal: "Applied Mathematical Modelling",
    year: 2023,
    volume: "112",
    pages: "89-105",
    doi: "10.1016/j.apm.2023.003",
    abstract: "We develop and analyze mathematical models to understand COVID-19 transmission dynamics in Indonesian population, considering vaccination rates and public health interventions. The study provides crucial insights for policy makers in designing effective pandemic response strategies and resource allocation.",
    keywords: ["mathematical modeling", "epidemiology", "COVID-19", "public health"],
    category: "mathematics",
    publicationDate: "2023-11-20",
    pdfUrl: "/publications/research/covid-modeling.pdf",
    citationCount: 45,
    isOpenAccess: true,
    
    conferenceLocation: "Yogyakarta, Indonesia",
    dateAddedToLibrary: "2023-11-25",
    fullTextViews: 1248,
    conferenceDate: "2023-11-15",
    fundingAgency: "Indonesian Academy of Sciences and Ministry of Health",
    
    introduction: "The COVID-19 pandemic has highlighted the critical importance of mathematical modeling in understanding disease transmission dynamics. In Indonesia, with its diverse population and geographical challenges, accurate modeling is essential for effective public health responses.",
    methodology: "We employed SEIR (Susceptible-Exposed-Infected-Recovered) models with modifications to account for vaccination rates, variant emergence, and behavioral changes. The model parameters were calibrated using data from 34 Indonesian provinces.",
    results: "Our model successfully predicted transmission patterns with 92% accuracy. The analysis revealed that vaccination coverage of 70% combined with moderate social distancing measures could reduce transmission by 85%.",
    conclusion: "Mathematical modeling provides valuable tools for pandemic preparedness and response. The Indonesian-specific model offers insights that can guide future public health interventions and policy decisions.",
    
    sections: [
      {
        id: "sec-1",
        title: "I. Introduction",
        content: "The unprecedented global impact of COVID-19 necessitated rapid development of mathematical models to understand transmission dynamics..."
      },
      {
        id: "sec-2",
        title: "II. Model Development", 
        content: "We developed a compartmental SEIR model adapted to Indonesian demographic and epidemiological characteristics..."
      },
      {
        id: "sec-3",
        title: "III. Parameter Estimation",
        content: "Model parameters were estimated using maximum likelihood estimation based on reported case data from Indonesian provinces..."
      },
      {
        id: "sec-4",
        title: "IV. Results and Validation",
        content: "The model validation was performed using cross-validation techniques and comparison with observed data..."
      }
    ],
    
    figures: [
      {
        id: "fig-1",
        title: "Figure 1",
        caption: "SEIR model compartments and transition rates for COVID-19 transmission"
      },
      {
        id: "fig-2",
        title: "Figure 2",
        caption: "Predicted vs. observed COVID-19 cases in major Indonesian cities"
      },
      {
        id: "fig-3",
        title: "Figure 3", 
        caption: "Impact of vaccination rates on transmission dynamics"
      },
      {
        id: "fig-4",
        title: "Figure 4",
        caption: "Sensitivity analysis of model parameters"
      }
    ],
    
    references: [
      {
        id: "ref-1",
        authors: ["Anderson, R.M.", "May, R.M."],
        title: "Infectious Diseases of Humans: Dynamics and Control",
        publication: "Oxford University Press",
        year: 2020
      },
      {
        id: "ref-2",
        authors: ["Kucharski, A.J.", "Russell, T.W.", "Diamond, C."],
        title: "Early dynamics of transmission and control of COVID-19: a mathematical modelling study",
        publication: "The Lancet Infectious Diseases",
        year: 2020,
        doi: "10.1016/S1473-3099(20)30144-4"
      },
      {
        id: "ref-3",
        authors: ["Diekmann, O.", "Heesterbeek, J.A.P."],
        title: "Mathematical Epidemiology of Infectious Diseases",
        publication: "Wiley Series in Mathematical Biology",
        year: 2020
      }
    ],
    
    citations: [
      {
        id: "cit-1",
        authors: ["Wilson, P.", "Johnson, K."],
        title: "Comparative Analysis of COVID-19 Models in Southeast Asia",
        publication: "Epidemiological Modeling Journal",
        year: 2024,
        citedBy: 28
      },
      {
        id: "cit-2",
        authors: ["Lee, S.H.", "Kim, M.J."],
        title: "Application of Indonesian COVID-19 Model to Korean Population",
        publication: "Korean Journal of Epidemiology",
        year: 2024,
        citedBy: 12
      }
    ]
  }
];

export const mockCommunityServiceJournals: CommunityServiceJournalData[] = [
  {
    id: "csj-001",
    title: "Digital Literacy Training Program for Rural Communities in Central Java",
    authors: ["Dr. Indira Sari", "Dr. Budi Prasetyo", "Andi Wijaya, S.Kom"],
    journal: "Journal of Community Engagement",
    year: 2024,
    volume: "6",
    issue: "1",
    pages: "15-28",
    abstract: "This community service project aimed to improve digital literacy skills among rural communities in Central Java through comprehensive training programs and hands-on workshops.",
    keywords: ["digital literacy", "rural communities", "training program", "empowerment"],
    community: "Rural Villages in Klaten Regency",
    location: "Klaten, Central Java",
    publicationDate: "2024-01-15",
    pdfUrl: "/publications/community/digital-literacy-training.pdf",
    impactDescription: "Successfully trained 150+ community members in basic computer skills and internet usage",
    beneficiaries: ["farmers", "small business owners", "housewives", "youth"]
  },
  {
    id: "csj-002",
    title: "Waste Management Education and Implementation in Urban Slums",
    authors: ["Prof. Maya Indah", "Dr. Eko Susanto"],
    journal: "Community Development Quarterly",
    year: 2023,
    volume: "12",
    issue: "4",
    pages: "67-82",
    abstract: "A comprehensive community service initiative focusing on waste management education and practical implementation in urban slum areas of Jakarta.",
    keywords: ["waste management", "urban slums", "environmental education", "sustainability"],
    community: "Kampung Melayu Slum Area",
    location: "East Jakarta, DKI Jakarta",
    publicationDate: "2023-12-10",
    pdfUrl: "/publications/community/waste-management-slums.pdf",
    impactDescription: "Reduced waste accumulation by 60% and established 3 community recycling centers",
    beneficiaries: ["slum residents", "children", "local government"]
  }
];

export const mockBooks: BookData[] = [
  {
    id: "book-001",
    title: "Fundamentals of Data Science and Analytics",
    authors: ["Prof. Dr. Ahmad Fauzi", "Dr. Sari Indira"],
    publisher: "Cognifera Academic Press",
    publicationYear: 2024,
    isbn: "978-602-123-456-7",
    pages: 342,
    language: "en",
    category: "textbook",
    description: "A comprehensive textbook covering fundamental concepts of data science, statistical analysis, and machine learning techniques with practical applications.",
    keywords: ["data science", "analytics", "machine learning", "statistics"],
    coverImage: "/books/covers/data-science-fundamentals.jpg",
    price: 125000,
    availability: "available",
    format: "both",
    previewUrl: "/books/preview/data-science-fundamentals"
  },
  {
    id: "book-002",
    title: "Sistem Informasi Manajemen: Teori dan Praktik",
    authors: ["Dr. Budi Santoso", "Prof. Lisa Wijaya"],
    publisher: "Penerbit Universitas Indonesia",
    publicationYear: 2023,
    isbn: "978-602-789-123-4",
    pages: 298,
    language: "id",
    category: "textbook",
    description: "Buku teks yang membahas konsep sistem informasi manajemen dari perspektif teoritis dan praktis dengan studi kasus perusahaan Indonesia.",
    keywords: ["sistem informasi", "manajemen", "teknologi informasi", "bisnis"],
    coverImage: "/books/covers/sim-teori-praktik.jpg",
    price: 95000,
    availability: "available",
    format: "print",
    previewUrl: "/books/preview/sim-teori-praktik"
  },
  {
    id: "book-003",
    title: "Smart Cities: Technology and Governance",
    authors: ["Prof. Dr. Maya Sari", "Dr. Rahmat Hidayat", "Dr. Eko Susanto"],
    publisher: "International Academic Publishers",
    publicationYear: 2024,
    isbn: "978-1-234-56789-0",
    pages: 428,
    language: "en",
    category: "monograph",
    description: "An in-depth analysis of smart city technologies and governance frameworks, exploring case studies from around the world including Indonesian cities.",
    keywords: ["smart cities", "governance", "technology", "urban planning"],
    coverImage: "/books/covers/smart-cities-governance.jpg",
    price: 185000,
    availability: "pre-order",
    format: "both",
    previewUrl: "/books/preview/smart-cities-governance"
  },
  {
    id: "book-004",
    title: "Proceedings of ICICT 2023: International Conference on Information and Communication Technology",
    authors: ["Conference Committee"],
    publisher: "Cognifera Conference Publications",
    publicationYear: 2023,
    isbn: "978-602-987-654-3",
    pages: 156,
    language: "en",
    category: "proceedings",
    description: "Collection of peer-reviewed papers presented at the International Conference on Information and Communication Technology 2023, hosted by Cognifera.",
    keywords: ["conference proceedings", "ICT", "information technology", "research"],
    coverImage: "/books/covers/icict-2023-proceedings.jpg",
    price: 75000,
    availability: "available",
    format: "digital",
    previewUrl: "/books/preview/icict-2023-proceedings"
  }
];