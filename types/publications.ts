export interface DocumentSection {
  id: string;
  title: string;
  content: string;
}

export interface Reference {
  id: string;
  authors: string[];
  title: string;
  publication: string;
  year: number;
  doi?: string;
}

export interface Figure {
  id: string;
  title: string;
  caption: string;
  imageUrl?: string;
}

export interface Citation {
  id: string;
  authors: string[];
  title: string;
  publication: string;
  year: number;
  citedBy: number;
}

export interface ResearchJournalData {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  abstract: string;
  keywords: string[];
  category: 'computer-science' | 'engineering' | 'mathematics' | 'physics' | 'other';
  publicationDate: string;
  pdfUrl?: string;
  citationCount: number;
  isOpenAccess: boolean;
  
  // Detail page specific fields
  conferenceLocation?: string;
  dateAddedToLibrary?: string;
  fullTextViews?: number;
  
  // Document sections
  introduction?: string;
  methodology?: string;
  results?: string;
  conclusion?: string;
  sections?: DocumentSection[];
  
  // References and citations
  references?: Reference[];
  citations?: Citation[];
  figures?: Figure[];
  
  // Additional metadata
  isbn?: string;
  conferenceDate?: string;
  fundingAgency?: string;
}

export interface CommunityServiceJournalData {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  abstract: string;
  keywords: string[];
  community: string;
  location: string;
  publicationDate: string;
  pdfUrl?: string;
  impactDescription: string;
  beneficiaries: string[];
}

export interface BookData {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  publicationYear: number;
  isbn: string;
  pages: number;
  language: 'id' | 'en';
  category: 'textbook' | 'reference' | 'monograph' | 'proceedings';
  description: string;
  keywords: string[];
  coverImage: string;
  price?: number;
  availability: 'available' | 'out-of-stock' | 'pre-order';
  format: 'print' | 'digital' | 'both';
  previewUrl?: string;
}

export type PublicationType = 'journals' | 'books';