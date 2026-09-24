export interface BookData {
  id: string;
  slug: string;
  title: string;
  authors: string[];
  publisher: string;
  publicationYear: number;
  isbn: string;
  pages: number;
  pageLabel?: string;
  language: 'id' | 'en';
  category: 'textbook' | 'reference' | 'monograph' | 'proceedings';
  description: string;
  longDescription?: string[];
  keywords: string[];
  coverImage: string;
  coverAlt?: string;
  previewImages?: string[];
  price?: number;
  availability: 'available' | 'out-of-stock' | 'pre-order';
  format: 'print' | 'digital' | 'both';
  previewUrl?: string;
  purchaseUrl?: string;
  purchaseLabel?: string;
  tableOfContents?: string[];
  highlights?: string[];
}
