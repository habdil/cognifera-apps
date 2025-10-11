export interface LayananData {
  id: string;
  nama: string;
  tagline: string;
  deskripsi: string;
  deskripsiLengkap: string;
  icon: string;
  hargaMulai: number;
  fiturUtama: string[];
  targetMarket: string[];
  successRate?: string;
  warna: string;
  status: 'aktif' | 'nonaktif';
  createdAt: Date;
  updatedAt: Date;
}

export interface IklanData {
  id: string;
  judul: string;
  deskripsi: string;
  discountPercentage: number;
  layananAffected: string[]; // Array of service IDs
  tanggalMulai: Date;
  tanggalBerakhir: Date;
  termsConditions: string;
  bannerImage?: string;
  status: 'aktif' | 'nonaktif';
  priority: number; // For carousel ordering
  createdAt: Date;
  updatedAt: Date;
}

export interface TestimonialData {
  id: string;
  clientName: string;
  position: string;
  institution: string;
  photo?: string;
  rating: number; // 1-5
  testimonialText: string;
  layananDigunakan: string[]; // Array of service IDs
  hasilDicapai: string;
  status: 'aktif' | 'nonaktif';
  featured: boolean; // For homepage display
  createdAt: Date;
  updatedAt: Date;
}

export interface BeritaData {
  id: string;
  judul: string;
  konten: string;
  featuredImage?: string;
  category: 'industry' | 'research' | 'company' | 'announcement';
  tags: string[];
  author: string;
  publicationDate: string;
  status: 'aktif' | 'nonaktif';
  featured?: boolean;
  metaDescription?: string;
  keywords?: string[];
  createdAt: string;
  updatedAt: string;
}

// Category interface (backend now returns object with name and description)
export interface CategoryData {
  name: string;
  description: string;
}

// New interface for public articles with author info
export interface PublicBeritaData {
  id: string;
  judul: string;
  konten: string;
  featuredImage?: string;
  category: CategoryData | string; // Support both object (new) and string (old) for backward compatibility
  tags: string[];
  status: 'aktif';
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    fullName: string;
    email?: string;
    avatar?: string;
    bio?: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  layananInterest: string;
  message: string;
}

export interface AdminStats {
  totalLayanan: number;
  activePromos: number;
  totalTestimonials: number;
  publishedNews: number;
  recentActivities: {
    id: string;
    type: 'layanan' | 'iklan' | 'testimonial' | 'berita';
    action: 'create' | 'update' | 'delete';
    title: string;
    timestamp: Date;
  }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface FilterOptions {
  search?: string;
  status?: 'aktif' | 'nonaktif' | 'all';
  category?: string;
  sortBy?: 'name' | 'date' | 'priority';
  sortOrder?: 'asc' | 'desc';
}