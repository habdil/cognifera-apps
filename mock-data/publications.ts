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

// Global Journal of Science Education publications
export const mockScienceEducationJournals: ResearchJournalData[] = [
  {
    id: "gse-001",
    title: "Innovative STEM Teaching Methods Using Virtual Reality in Indonesian Secondary Schools",
    authors: ["Dr. Sari Wijaya", "Prof. Ahmad Hendri", "Dr. Fitri Sari"],
    journal: "Global Journal of Science Education",
    year: 2024,
    volume: "12",
    issue: "2",
    pages: "45-62",
    doi: "10.1234/gjse.2024.002",
    abstract: "This study explores the implementation of virtual reality technology in STEM education across Indonesian secondary schools. We examine student engagement, learning outcomes, and teacher adaptation to VR-enhanced curricula, demonstrating significant improvements in scientific understanding and problem-solving skills.",
    keywords: ["STEM education", "virtual reality", "secondary education", "innovative teaching", "Indonesia"],
    category: "other",
    publicationDate: "2024-06-15",
    pdfUrl: "/journal/publications/vr-stem-education.pdf",
    citationCount: 8,
    isOpenAccess: true,
    
    conferenceLocation: "Surabaya, Indonesia",
    dateAddedToLibrary: "2024-06-20",
    fullTextViews: 245,
    conferenceDate: "2024-06-10",
    fundingAgency: "Ministry of Education, Culture, Research and Technology",
    
    introduction: "The integration of emerging technologies in science education has become crucial for preparing students for the digital age. Virtual reality offers immersive experiences that can enhance understanding of complex scientific concepts.",
    methodology: "We conducted a quasi-experimental study involving 240 students from 6 secondary schools across Java and Sumatra. Students were divided into control and experimental groups, with the latter receiving VR-enhanced STEM lessons.",
    results: "Students using VR technology showed 34% improvement in conceptual understanding, 28% increase in engagement levels, and 42% better retention rates compared to traditional teaching methods.",
    conclusion: "Virtual reality technology significantly enhances STEM education effectiveness in Indonesian secondary schools. However, teacher training and infrastructure development remain critical success factors.",
    
    figures: [
      {
        id: "fig-1",
        title: "Figure 1",
        caption: "Comparison of learning outcomes between traditional and VR-enhanced STEM education"
      },
      {
        id: "fig-2",
        title: "Figure 2",
        caption: "Student engagement levels during VR science lessons"
      }
    ],
    
    references: [
      {
        id: "ref-1",
        authors: ["Johnson, M.", "Smith, K."],
        title: "Virtual Reality in Science Education: A Systematic Review",
        publication: "Computers & Education",
        year: 2023,
        doi: "10.1016/j.compedu.2023.001"
      },
      {
        id: "ref-2",
        authors: ["Chen, L.", "Wang, H."],
        title: "STEM Education in Southeast Asia: Current Trends and Future Directions",
        publication: "International Journal of STEM Education",
        year: 2023,
        doi: "10.1186/s40594-023-001"
      }
    ],
    
    citations: [
      {
        id: "cit-1",
        authors: ["Rahman, A.", "Putri, D."],
        title: "Implementing VR Technology in Indonesian Classrooms: A Pilot Study",
        publication: "Educational Technology Research Indonesia",
        year: 2024,
        citedBy: 5
      }
    ]
  },
  {
    id: "gse-002",
    title: "Climate Change Education Through Project-Based Learning in Primary Schools",
    authors: ["Prof. Maya Kusuma", "Dr. Budi Hartono", "Devi Anggraini, M.Pd"],
    journal: "Global Journal of Science Education",
    year: 2024,
    volume: "12",
    issue: "1",
    pages: "12-28",
    doi: "10.1234/gjse.2024.001",
    abstract: "This research investigates the effectiveness of project-based learning approaches in teaching climate change concepts to primary school students. The study demonstrates how hands-on environmental projects enhance scientific literacy and environmental awareness among young learners.",
    keywords: ["climate change education", "project-based learning", "primary education", "environmental science", "scientific literacy"],
    category: "other",
    publicationDate: "2024-03-20",
    pdfUrl: "/journal/publications/climate-change-pbl.pdf",
    citationCount: 15,
    isOpenAccess: true,
    
    conferenceLocation: "Bandung, Indonesia",
    dateAddedToLibrary: "2024-03-25",
    fullTextViews: 387,
    conferenceDate: "2024-03-15",
    fundingAgency: "UNESCO Education for Sustainable Development Program",
    
    introduction: "Climate change education has become increasingly important in primary curricula worldwide. Project-based learning offers an engaging approach to help young students understand complex environmental concepts through hands-on experiences.",
    methodology: "A mixed-methods study was conducted with 180 primary students aged 9-11 years from 4 schools in West Java. Students participated in 8-week climate change projects including school gardens, weather monitoring, and waste reduction initiatives.",
    results: "Participating students showed 45% improvement in climate science knowledge, 38% increase in pro-environmental behavior, and significantly higher motivation to engage in environmental protection activities.",
    conclusion: "Project-based learning effectively enhances climate change education in primary schools. The approach not only improves scientific understanding but also develops environmental citizenship among young learners.",
    
    figures: [
      {
        id: "fig-1",
        title: "Figure 1",
        caption: "Pre- and post-assessment results of climate science knowledge"
      },
      {
        id: "fig-2",
        title: "Figure 2",
        caption: "Student engagement levels during different project activities"
      },
      {
        id: "fig-3",
        title: "Figure 3",
        caption: "Environmental behavior changes after project participation"
      }
    ],
    
    references: [
      {
        id: "ref-1",
        authors: ["Thompson, R.", "Green, S."],
        title: "Project-Based Learning in Environmental Education: A Meta-Analysis",
        publication: "Environmental Education Research",
        year: 2023,
        doi: "10.1080/13504622.2023.001"
      },
      {
        id: "ref-2",
        authors: ["Liu, X.", "Zhang, Y."],
        title: "Climate Change Education in Primary Schools: Global Perspectives",
        publication: "International Research in Geographical Education",
        year: 2022,
        doi: "10.1080/10382046.2022.001"
      }
    ]
  },
  {
    id: "gse-003",
    title: "Enhancing Mathematics Learning Through Gamification in Indonesian Elementary Education",
    authors: ["Dr. Andi Setiawan", "Prof. Ratna Dewi", "Sinta Maharani, S.Pd"],
    journal: "Global Journal of Science Education",
    year: 2023,
    volume: "11",
    issue: "4",
    pages: "78-95",
    doi: "10.1234/gjse.2023.004",
    abstract: "This study examines the impact of gamification strategies on mathematics learning outcomes in Indonesian elementary schools. Through the development and implementation of educational games, we explore how game-based learning can address common challenges in mathematics education and improve student performance.",
    keywords: ["mathematics education", "gamification", "elementary education", "educational games", "learning outcomes"],
    category: "mathematics",
    publicationDate: "2023-11-30",
    pdfUrl: "/journal/publications/math-gamification.pdf",
    citationCount: 22,
    isOpenAccess: true,
    
    conferenceLocation: "Jakarta, Indonesia",
    dateAddedToLibrary: "2023-12-05",
    fullTextViews: 512,
    conferenceDate: "2023-11-25",
    fundingAgency: "Indonesian Education Research Foundation",
    
    introduction: "Mathematics education faces persistent challenges in maintaining student engagement and achievement. Gamification offers promising solutions by incorporating game elements into learning processes, making abstract mathematical concepts more accessible and enjoyable.",
    methodology: "We developed and tested educational mathematics games with 320 elementary students (grades 3-5) across 8 schools in Jakarta and surrounding areas. The study employed a randomized controlled trial design comparing gamified versus traditional instruction methods.",
    results: "Students in the gamified group demonstrated 29% higher mathematics achievement scores, 41% increased engagement levels, and 35% improvement in problem-solving skills compared to the control group.",
    conclusion: "Gamification significantly enhances mathematics learning in Indonesian elementary education. The approach shows particular promise for addressing math anxiety and improving computational fluency among young learners.",
    
    figures: [
      {
        id: "fig-1",
        title: "Figure 1",
        caption: "Mathematics achievement scores comparison between gamified and traditional groups"
      },
      {
        id: "fig-2",
        title: "Figure 2",
        caption: "Student engagement metrics throughout the intervention period"
      }
    ],
    
    references: [
      {
        id: "ref-1",
        authors: ["Martinez, A.", "Rodriguez, C."],
        title: "Gamification in Mathematics Education: A Systematic Review",
        publication: "Educational Psychology Review",
        year: 2023,
        doi: "10.1007/s10648-023-001"
      }
    ]
  }
];

// Journal of Social Responsibility and Service publications
// Journal staff and editorial data
export interface JournalStaff {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  email: string;
  expertise: string[];
  imageUrl?: string;
  bio: string;
}

export interface JournalIssue {
  id: string;
  volume: number;
  issue: number;
  year: number;
  publishDate: string;
  coverImage?: string;
  description: string;
  articles: string[]; // Article IDs
  downloadUrl?: string;
}

export interface JournalAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: "news" | "call-for-papers" | "event" | "update";
  urgent?: boolean;
}

export const mockJournalStaff: JournalStaff[] = [
  {
    id: "editor-001",
    name: "Prof. Dr. Indira Sari, M.Pd",
    title: "Editor-in-Chief",
    affiliation: "Cognifera Academy",
    email: "editor.chief@cognifera.org",
    expertise: ["Community Development", "Social Responsibility", "Educational Leadership"],
    bio: "Prof. Dr. Indira Sari is a distinguished academic with over 20 years of experience in community development and social responsibility research. She has led numerous community engagement projects across Indonesia and published extensively on sustainable development practices.",
    imageUrl: "/staff/indira-sari.jpg"
  },
  {
    id: "editor-002",
    name: "Dr. Budi Prasetyo, M.Si",
    title: "Associate Editor",
    affiliation: "University of Indonesia",
    email: "budi.prasetyo@ui.ac.id",
    expertise: ["Social Innovation", "Community Health", "Public Policy"],
    bio: "Dr. Budi Prasetyo specializes in social innovation and community health initiatives. His research focuses on sustainable healthcare delivery systems in rural and underserved communities.",
    imageUrl: "/staff/budi-prasetyo.jpg"
  },
  {
    id: "editor-003",
    name: "Dr. Maya Putri, M.A",
    title: "Managing Editor",
    affiliation: "Cognifera Academy",
    email: "managing.editor@cognifera.org",
    expertise: ["Women Empowerment", "Microfinance", "Rural Development"],
    bio: "Dr. Maya Putri is an expert in women empowerment and microfinance programs. She has worked extensively with rural communities to develop sustainable economic development initiatives.",
    imageUrl: "/staff/maya-putri.jpg"
  },
  {
    id: "board-001",
    name: "Prof. Dr. Ahmad Fauzi, Ph.D",
    title: "Editorial Board Member",
    affiliation: "Bandung Institute of Technology",
    email: "ahmad.fauzi@itb.ac.id",
    expertise: ["Environmental Sustainability", "Green Technology", "Climate Action"],
    bio: "Prof. Ahmad Fauzi is a leading researcher in environmental sustainability and green technology applications in community development projects."
  },
  {
    id: "board-002",
    name: "Dr. Sari Kusuma, M.Sc",
    title: "Editorial Board Member",
    affiliation: "Gadjah Mada University",
    email: "sari.kusuma@ugm.ac.id",
    expertise: ["Agricultural Development", "Food Security", "Rural Innovation"],
    bio: "Dr. Sari Kusuma focuses on agricultural development and food security initiatives, working with farming communities to implement sustainable practices."
  },
  {
    id: "reviewer-001",
    name: "Dr. Eko Susanto, M.A",
    title: "Senior Reviewer",
    affiliation: "Jakarta State University",
    email: "eko.susanto@unj.ac.id",
    expertise: ["Urban Development", "Waste Management", "Community Planning"],
    bio: "Dr. Eko Susanto specializes in urban development and waste management solutions for urban communities."
  }
];

export const mockJournalIssues: JournalIssue[] = [
  {
    id: "issue-2024-1",
    volume: 8,
    issue: 1,
    year: 2024,
    publishDate: "2024-03-15",
    description: "Community Resilience and Disaster Preparedness",
    articles: ["jsr-001", "jsr-003"],
    downloadUrl: "/journal-social/issues/vol8-issue1.pdf"
  },
  {
    id: "issue-2023-4",
    volume: 7,
    issue: 4,
    year: 2023,
    publishDate: "2023-12-20",
    description: "Women Empowerment and Economic Development",
    articles: ["jsr-002"],
    downloadUrl: "/journal-social/issues/vol7-issue4.pdf"
  },
  {
    id: "issue-2023-3",
    volume: 7,
    issue: 3,
    year: 2023,
    publishDate: "2023-09-15",
    description: "Healthcare Access and Telemedicine",
    articles: ["jsr-003"],
    downloadUrl: "/journal-social/issues/vol7-issue3.pdf"
  },
  {
    id: "issue-2023-2",
    volume: 7,
    issue: 2,
    year: 2023,
    publishDate: "2023-06-30",
    description: "Sustainable Agriculture and Rural Development",
    articles: ["jsr-004"],
    downloadUrl: "/journal-social/issues/vol7-issue2.pdf"
  },
  {
    id: "issue-2023-1",
    volume: 7,
    issue: 1,
    year: 2023,
    publishDate: "2023-03-15",
    description: "Youth Empowerment and Digital Skills",
    articles: ["jsr-005"],
    downloadUrl: "/journal-social/issues/vol7-issue1.pdf"
  }
];

export const mockJournalAnnouncements: JournalAnnouncement[] = [
  {
    id: "ann-001",
    title: "Call for Papers: Special Issue on Climate Change and Community Adaptation",
    content: "We invite submissions for our special issue focusing on community-based climate change adaptation strategies. Deadline for submissions: December 31, 2024. We particularly welcome case studies from Southeast Asian communities.",
    date: "2024-09-01",
    type: "call-for-papers",
    urgent: true
  },
  {
    id: "ann-002",
    title: "New Open Access Policy Implementation",
    content: "Starting January 2024, all articles published in the Journal of Social Responsibility and Service will be available under our new open access policy, ensuring broader dissemination of community service research.",
    date: "2024-08-15",
    type: "update"
  },
  {
    id: "ann-003",
    title: "Community Service Research Conference 2024",
    content: "Join us at the inaugural Community Service Research Conference on November 15-17, 2024, in Jakarta. Submit your abstracts by October 1, 2024. Registration now open at conference.cognifera.org",
    date: "2024-08-01",
    type: "event"
  },
  {
    id: "ann-004",
    title: "New Editorial Board Members",
    content: "We are pleased to welcome three new members to our editorial board: Dr. Lisa Wijaya (Social Innovation), Prof. Rahmat Hidayat (Community Health), and Dr. Fitri Yanti (Youth Development).",
    date: "2024-07-20",
    type: "news"
  }
];

export const mockSocialServiceJournals: CommunityServiceJournalData[] = [
  {
    id: "jsr-001",
    title: "Community-Based Disaster Preparedness Program in Coastal Areas of Central Java",
    authors: ["Prof. Indira Sari", "Dr. Eko Prasetyo", "Rina Handayani, S.Sos"],
    journal: "Journal of Social Responsibility and Service",
    year: 2024,
    volume: "8",
    issue: "1",
    pages: "15-32",
    abstract: "This community service initiative developed and implemented a comprehensive disaster preparedness program for coastal communities in Central Java, focusing on tsunami and flood risk reduction through education, early warning systems, and community organization.",
    keywords: ["disaster preparedness", "coastal communities", "tsunami risk", "community resilience", "early warning systems"],
    community: "Coastal Villages in Cilacap Regency",
    location: "Cilacap, Central Java",
    publicationDate: "2024-02-15",
    pdfUrl: "/journal-social/publications/disaster-preparedness.pdf",
    impactDescription: "Established early warning systems in 12 villages, trained 400+ community members in disaster response, and reduced potential casualty risk by 65%",
    beneficiaries: ["coastal residents", "fishermen", "local government", "school children", "elderly population"]
  },
  {
    id: "jsr-002",
    title: "Microfinance and Digital Literacy Program for Women Entrepreneurs in Rural Indonesia",
    authors: ["Dr. Maya Putri", "Prof. Budi Santoso", "Dewi Kartika, M.Si"],
    journal: "Journal of Social Responsibility and Service",
    year: 2024,
    volume: "7",
    issue: "4",
    pages: "45-63",
    abstract: "A comprehensive community service program combining microfinance support with digital literacy training for women entrepreneurs in rural areas, aimed at enhancing economic empowerment and business sustainability through technology adoption.",
    keywords: ["women empowerment", "microfinance", "digital literacy", "rural entrepreneurship", "economic development"],
    community: "Women Entrepreneur Groups in Gunungkidul",
    location: "Gunungkidul, Yogyakarta",
    publicationDate: "2023-12-20",
    pdfUrl: "/journal-social/publications/women-microfinance.pdf",
    impactDescription: "Provided microloans to 85 women entrepreneurs, achieved 78% business sustainability rate, and improved digital marketing skills for 120+ participants",
    beneficiaries: ["women entrepreneurs", "small business owners", "rural families", "local cooperatives"]
  },
  {
    id: "jsr-003",
    title: "Healthcare Access Improvement Initiative in Remote Island Communities",
    authors: ["Dr. Rahmat Hidayat", "Prof. Lisa Wijaya", "Ahmad Fauzi, dr."],
    journal: "Journal of Social Responsibility and Service",
    year: 2023,
    volume: "7",
    issue: "3",
    pages: "22-40",
    abstract: "This community service project addressed healthcare access challenges in remote island communities through telemedicine implementation, health worker training, and mobile clinic services, significantly improving health outcomes and emergency response capabilities.",
    keywords: ["healthcare access", "telemedicine", "remote communities", "health equity", "mobile clinics"],
    community: "Remote Island Communities",
    location: "Thousand Islands, Jakarta",
    publicationDate: "2023-09-15",
    pdfUrl: "/journal-social/publications/healthcare-access.pdf",
    impactDescription: "Established telemedicine services in 8 islands, reduced emergency medical transport needs by 45%, and provided regular health screening for 600+ residents",
    beneficiaries: ["island residents", "children", "elderly", "pregnant women", "fishermen families"]
  },
  {
    id: "jsr-004",
    title: "Sustainable Agriculture Training and Organic Farming Transition Program",
    authors: ["Prof. Andi Setiawan", "Dr. Sari Kusuma", "Teguh Wibowo, S.P"],
    journal: "Journal of Social Responsibility and Service",
    year: 2023,
    volume: "7",
    issue: "2",
    pages: "58-75",
    abstract: "A community-based agricultural development program focused on transitioning traditional farmers to sustainable organic farming practices, providing training, resources, and market linkage support to improve farm productivity and environmental sustainability.",
    keywords: ["sustainable agriculture", "organic farming", "farmer training", "environmental sustainability", "rural development"],
    community: "Traditional Farming Communities",
    location: "Magelang, Central Java",
    publicationDate: "2023-06-30",
    pdfUrl: "/journal-social/publications/sustainable-agriculture.pdf",
    impactDescription: "Successfully transitioned 45 farms to organic certification, increased average farm income by 32%, and reduced pesticide use by 80% across participating farms",
    beneficiaries: ["traditional farmers", "farming families", "local consumers", "agricultural cooperatives", "environment"]
  },
  {
    id: "jsr-005",
    title: "Youth Empowerment Through Digital Skills Training in Urban Slums",
    authors: ["Dr. Fitri Yanti", "Prof. Maya Indah", "Rizki Pratama, S.Kom"],
    journal: "Journal of Social Responsibility and Service",
    year: 2023,
    volume: "7",
    issue: "1",
    pages: "8-25",
    abstract: "This community service initiative provided comprehensive digital skills training to urban youth in slum areas, focusing on job-relevant technologies, entrepreneurship development, and creating pathways to formal employment and higher education.",
    keywords: ["youth empowerment", "digital skills", "urban slums", "job training", "social mobility"],
    community: "Youth in Urban Slum Areas",
    location: "North Jakarta, DKI Jakarta",
    publicationDate: "2023-03-15",
    pdfUrl: "/journal-social/publications/youth-digital-skills.pdf",
    impactDescription: "Trained 200+ young people in digital skills, achieved 60% employment rate among graduates, and established 5 youth-led digital service cooperatives",
    beneficiaries: ["urban youth", "unemployed teenagers", "school dropouts", "young parents", "local businesses"]
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