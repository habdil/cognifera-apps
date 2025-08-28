export interface JournalSubmissionData {
  id: string;
  title: string;
  authors: Array<{
    name: string;
    email: string;
    affiliation: string;
    isCorresponding: boolean;
  }>;
  abstract: string;
  keywords: string[];
  category: 'computer-science' | 'engineering' | 'mathematics' | 'physics' | 'other';
  manuscriptFile?: string;
  supplementaryFiles?: Array<{
    filename: string;
    description: string;
    fileUrl: string;
  }>;
  submissionDate: string;
  status: 'submitted' | 'under-review' | 'revision-required' | 'accepted' | 'rejected' | 'published';
  reviewComments?: string[];
  estimatedPublicationDate?: string;
}

export interface EditorialBoardMember {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  specialization: string[];
  email: string;
  photo?: string;
  role: 'editor-in-chief' | 'associate-editor' | 'editorial-board' | 'reviewer';
}

export interface JournalAnnouncement {
  id: string;
  title: string;
  content: string;
  type: 'call-for-papers' | 'new-issue' | 'editorial-change' | 'system-update' | 'general';
  priority: 'high' | 'medium' | 'low';
  publishDate: string;
  expiryDate?: string;
  isActive: boolean;
}

export interface JournalIssue {
  id: string;
  volume: string;
  number: string;
  year: string;
  title: string;
  publishDate: string;
  description: string;
  articleCount: number;
  pageCount: number;
  coverColor: string;
  isCurrentIssue: boolean;
  articles: any[]; // Will reference mockResearchJournals
}

export const mockJournalSubmissions: JournalSubmissionData[] = [
  {
    id: "sub-001",
    title: "Implementation of Adaptive Learning Systems using Machine Learning",
    authors: [
      {
        name: "Dr. Andi Wijaya",
        email: "andi.wijaya@university.ac.id",
        affiliation: "Computer Science Department, University of Indonesia",
        isCorresponding: true
      },
      {
        name: "Prof. Sari Indra",
        email: "sari.indra@itb.ac.id",
        affiliation: "Institute of Technology Bandung",
        isCorresponding: false
      }
    ],
    abstract: "This study presents a novel approach to adaptive learning systems using machine learning algorithms...",
    keywords: ["adaptive learning", "machine learning", "educational technology", "personalization"],
    category: "computer-science",
    submissionDate: "2024-08-15",
    status: "under-review",
    estimatedPublicationDate: "2024-12-01"
  },
  {
    id: "sub-002",
    title: "Mathematical Modeling of Sustainable Energy Systems",
    authors: [
      {
        name: "Dr. Bambang Susanto",
        email: "bambang.susanto@ugm.ac.id",
        affiliation: "Mathematics Department, Gadjah Mada University",
        isCorresponding: true
      }
    ],
    abstract: "A comprehensive mathematical framework for modeling sustainable energy systems in urban environments...",
    keywords: ["mathematical modeling", "sustainable energy", "optimization", "urban planning"],
    category: "mathematics",
    submissionDate: "2024-07-22",
    status: "revision-required",
    reviewComments: [
      "Please expand the methodology section with more details on the optimization algorithms used.",
      "Consider adding a comparative analysis with existing models."
    ]
  }
];

export const mockEditorialBoard: EditorialBoardMember[] = [
  {
    id: "eb-001",
    name: "Dr. Hardianto, S.Pd., M.Pd",
    title: "Editor-in-Chief",
    affiliation: "Cognifera Education Academy",
    specialization: ["Educational Technology", "Computer Science", "Machine Learning"],
    email: "antoali98@gmail.com",
    role: "editor-in-chief"
  },
  {
    id: "eb-002",
    name: "Dr. Sari Indira",
    title: "Associate Editor",
    affiliation: "Institute of Technology Bandung",
    specialization: ["Data Science", "Artificial Intelligence", "Statistical Modeling"],
    email: "sari.indira@itb.ac.id",
    role: "associate-editor"
  },
  {
    id: "eb-003",
    name: "Prof. Dr. Bambang Supriyono",
    title: "Editorial Board Member",
    affiliation: "University of Indonesia",
    specialization: ["Applied Mathematics", "Optimization", "Numerical Analysis"],
    email: "bambang.supriyono@ui.ac.id",
    role: "editorial-board"
  },
  {
    id: "eb-004",
    name: "Dr. Maya Sari",
    title: "Editorial Board Member",
    affiliation: "Gadjah Mada University",
    specialization: ["Engineering", "Systems Design", "Renewable Energy"],
    email: "maya.sari@ugm.ac.id",
    role: "editorial-board"
  }
];

export const mockJournalAnnouncements: JournalAnnouncement[] = [
  {
    id: "ann-001",
    title: "Call for Papers - Edisi Khusus 2024: AI dalam Pendidikan",
    content: "Kami mengundang submission artikel untuk edisi khusus tentang Artificial Intelligence dalam Pendidikan dan Pembelajaran. Deadline submission: 30 September 2024.",
    type: "call-for-papers",
    priority: "high",
    publishDate: "2024-08-15",
    expiryDate: "2024-09-30",
    isActive: true
  },
  {
    id: "ann-002",
    title: "Platform OJS Terbaru Diluncurkan",
    content: "Cognifera Journal telah mengupgrade ke sistem OJS versi terbaru dengan fitur-fitur enhanced untuk proses review dan publikasi yang lebih efisien.",
    type: "system-update",
    priority: "medium",
    publishDate: "2024-07-20",
    isActive: true
  },
  {
    id: "ann-003",
    title: "Kerjasama dengan Universitas Terkemuka",
    content: "Cognifera Journal telah menjalin kerjasama dengan beberapa universitas terkemuka di Indonesia untuk meningkatkan kualitas penelitian dan publikasi ilmiah.",
    type: "general",
    priority: "medium",
    publishDate: "2024-06-28",
    isActive: true
  }
];

export const journalStats = {
  totalPublishedArticles: 124,
  totalAuthors: 287,
  countriesRepresented: 18,
  averageReviewTime: 2.4,
  acceptanceRate: 0.68,
  citationIndex: 1.42,
  authorDistribution: {
    Indonesia: 65,
    Malaysia: 15,
    Singapore: 8,
    Thailand: 5,
    Philippines: 4,
    Others: 3
  }
};

// Function to create journal issues with dynamic article references
export const createJournalIssues = (mockResearchJournals: any[]): JournalIssue[] => {
  return [
    {
      id: "v1n4-2024",
      volume: "1",
      number: "4",
      year: "2024",
      title: "Educational Technology & Applied Sciences",
      publishDate: "December 2024",
      description: "This issue focuses on the latest developments in educational technology, applied mathematics, and interdisciplinary research in science education.",
      articleCount: mockResearchJournals.length,
      pageCount: 156,
      coverColor: "bg-[var(--color-primary)]",
      isCurrentIssue: true,
      articles: mockResearchJournals
    },
    {
      id: "v1n3-2024",
      volume: "1",
      number: "3",
      year: "2024", 
      title: "Machine Learning in Education",
      publishDate: "September 2024",
      description: "Exploring the integration of machine learning and artificial intelligence in educational systems and methodologies.",
      articleCount: 7,
      pageCount: 134,
      coverColor: "bg-[var(--color-secondary)]",
      isCurrentIssue: false,
      articles: mockResearchJournals.slice(0, 2)
    },
    {
      id: "v1n2-2024",
      volume: "1",
      number: "2",
      year: "2024",
      title: "Sustainable Education Systems",
      publishDate: "June 2024", 
      description: "Research on sustainable practices in education, environmental awareness, and green technology integration.",
      articleCount: 6,
      pageCount: 118,
      coverColor: "bg-[var(--color-tertiary)]",
      isCurrentIssue: false,
      articles: mockResearchJournals.slice(1, 2)
    },
    {
      id: "v1n1-2024",
      volume: "1",
      number: "1",
      year: "2024",
      title: "Inaugural Issue - Foundations of Science Education",
      publishDate: "March 2024",
      description: "The inaugural issue establishing the foundation for interdisciplinary research in science education and technology.",
      articleCount: 8,
      pageCount: 142,
      coverColor: "bg-[var(--color-primary)]",
      isCurrentIssue: false,
      articles: mockResearchJournals.slice(0, 1)
    }
  ];
};