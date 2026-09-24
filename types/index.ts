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
  kategori?: 'analisis-data' | 'bimbingan' | 'publikasi' | 'hibah' | 'penerbitan-buku';
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

export interface ContactFormData {
  name: string;
  email: string;
  layananInterest: string;
  message: string;
}
