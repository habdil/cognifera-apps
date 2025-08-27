import { 
  LayananData, 
  IklanData, 
  TestimonialData, 
  BeritaData, 
  ApiResponse, 
  FilterOptions, 
  AdminStats 
} from '../types';
import { mockLayanan } from '../mock-data/layanan';
import { mockIklan } from '../mock-data/iklan';
import { mockTestimonial } from '../mock-data/testimonial';
import { mockBerita } from '../mock-data/berita';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 11);

// Local storage keys
const STORAGE_KEYS = {
  layanan: 'cognifera_layanan',
  iklan: 'cognifera_iklan',
  testimonial: 'cognifera_testimonial',
  berita: 'cognifera_berita'
};

// Initialize local storage with mock data
const initializeStorage = () => {
  if (typeof window !== 'undefined') {
    if (!localStorage.getItem(STORAGE_KEYS.layanan)) {
      localStorage.setItem(STORAGE_KEYS.layanan, JSON.stringify(mockLayanan));
    }
    if (!localStorage.getItem(STORAGE_KEYS.iklan)) {
      localStorage.setItem(STORAGE_KEYS.iklan, JSON.stringify(mockIklan));
    }
    if (!localStorage.getItem(STORAGE_KEYS.testimonial)) {
      localStorage.setItem(STORAGE_KEYS.testimonial, JSON.stringify(mockTestimonial));
    }
    if (!localStorage.getItem(STORAGE_KEYS.berita)) {
      localStorage.setItem(STORAGE_KEYS.berita, JSON.stringify(mockBerita));
    }
  }
};

// Get data from localStorage with fallback to mock data
const getStorageData = <T>(key: string, fallback: T[]): T[] => {
  if (typeof window === 'undefined') return fallback;
  
  const stored = localStorage.getItem(key);
  if (!stored) return fallback;
  
  try {
    const parsed = JSON.parse(stored);
    // Convert date strings back to Date objects
    return parsed.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
      ...(item.publicationDate && { publicationDate: new Date(item.publicationDate) }),
      ...(item.tanggalMulai && { tanggalMulai: new Date(item.tanggalMulai) }),
      ...(item.tanggalBerakhir && { tanggalBerakhir: new Date(item.tanggalBerakhir) })
    }));
  } catch {
    return fallback;
  }
};

// Save data to localStorage
const saveStorageData = (key: string, data: any[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

// Filter and sort data
const filterAndSort = <T extends Record<string, any>>(
  data: T[], 
  filters: FilterOptions = {}
): T[] => {
  let filtered = [...data];

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(item => 
      Object.values(item).some(value => 
        typeof value === 'string' && value.toLowerCase().includes(searchLower)
      )
    );
  }

  // Status filter
  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(item => item.status === filters.status);
  }

  // Category filter (for berita)
  if (filters.category) {
    filtered = filtered.filter(item => 
      item.category === filters.category || 
      (item.tags && item.tags.includes(filters.category))
    );
  }

  // Sort
  if (filters.sortBy) {
    filtered.sort((a, b) => {
      let aValue = a[filters.sortBy!];
      let bValue = b[filters.sortBy!];

      if (filters.sortBy === 'date') {
        aValue = a.updatedAt || a.publicationDate || a.createdAt;
        bValue = b.updatedAt || b.publicationDate || b.createdAt;
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return filters.sortOrder === 'desc' ? bValue.getTime() - aValue.getTime() : aValue.getTime() - bValue.getTime();
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return filters.sortOrder === 'desc' ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
      }

      return filters.sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });
  }

  return filtered;
};

// LAYANAN API
export const layananAPI = {
  getAll: async (filters?: FilterOptions): Promise<ApiResponse<LayananData[]>> => {
    await delay(300);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.layanan, mockLayanan);
      const filtered = filterAndSort(data, filters);
      
      return {
        success: true,
        data: filtered,
        message: `${filtered.length} layanan found`
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch layanan'
      };
    }
  },

  getById: async (id: string): Promise<ApiResponse<LayananData>> => {
    await delay(200);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.layanan, mockLayanan);
      const item = data.find(item => item.id === id);
      
      if (!item) {
        return {
          success: false,
          error: 'Layanan not found'
        };
      }
      
      return {
        success: true,
        data: item,
        message: 'Layanan found'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch layanan'
      };
    }
  },

  create: async (layananData: Omit<LayananData, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<LayananData>> => {
    await delay(500);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.layanan, mockLayanan);
      const newLayanan: LayananData = {
        ...layananData,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      data.push(newLayanan);
      saveStorageData(STORAGE_KEYS.layanan, data);
      
      return {
        success: true,
        data: newLayanan,
        message: 'Layanan created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create layanan'
      };
    }
  },

  update: async (id: string, layananData: Partial<LayananData>): Promise<ApiResponse<LayananData>> => {
    await delay(500);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.layanan, mockLayanan);
      const index = data.findIndex(item => item.id === id);
      
      if (index === -1) {
        return {
          success: false,
          error: 'Layanan not found'
        };
      }
      
      const updatedLayanan = {
        ...data[index],
        ...layananData,
        updatedAt: new Date()
      };
      
      data[index] = updatedLayanan;
      saveStorageData(STORAGE_KEYS.layanan, data);
      
      return {
        success: true,
        data: updatedLayanan,
        message: 'Layanan updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update layanan'
      };
    }
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    await delay(300);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.layanan, mockLayanan);
      const index = data.findIndex(item => item.id === id);
      
      if (index === -1) {
        return {
          success: false,
          error: 'Layanan not found'
        };
      }
      
      data.splice(index, 1);
      saveStorageData(STORAGE_KEYS.layanan, data);
      
      return {
        success: true,
        message: 'Layanan deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to delete layanan'
      };
    }
  }
};

// IKLAN API
export const iklanAPI = {
  getAll: async (filters?: FilterOptions): Promise<ApiResponse<IklanData[]>> => {
    await delay(300);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.iklan, mockIklan);
      const filtered = filterAndSort(data, filters);
      
      return {
        success: true,
        data: filtered,
        message: `${filtered.length} iklan found`
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch iklan'
      };
    }
  },

  getById: async (id: string): Promise<ApiResponse<IklanData>> => {
    await delay(200);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.iklan, mockIklan);
      const item = data.find(item => item.id === id);
      
      if (!item) {
        return {
          success: false,
          error: 'Iklan not found'
        };
      }
      
      return {
        success: true,
        data: item,
        message: 'Iklan found'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch iklan'
      };
    }
  },

  create: async (iklanData: Omit<IklanData, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<IklanData>> => {
    await delay(500);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.iklan, mockIklan);
      const newIklan: IklanData = {
        ...iklanData,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      data.push(newIklan);
      saveStorageData(STORAGE_KEYS.iklan, data);
      
      return {
        success: true,
        data: newIklan,
        message: 'Iklan created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create iklan'
      };
    }
  },

  update: async (id: string, iklanData: Partial<IklanData>): Promise<ApiResponse<IklanData>> => {
    await delay(500);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.iklan, mockIklan);
      const index = data.findIndex(item => item.id === id);
      
      if (index === -1) {
        return {
          success: false,
          error: 'Iklan not found'
        };
      }
      
      const updatedIklan = {
        ...data[index],
        ...iklanData,
        updatedAt: new Date()
      };
      
      data[index] = updatedIklan;
      saveStorageData(STORAGE_KEYS.iklan, data);
      
      return {
        success: true,
        data: updatedIklan,
        message: 'Iklan updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update iklan'
      };
    }
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    await delay(300);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.iklan, mockIklan);
      const index = data.findIndex(item => item.id === id);
      
      if (index === -1) {
        return {
          success: false,
          error: 'Iklan not found'
        };
      }
      
      data.splice(index, 1);
      saveStorageData(STORAGE_KEYS.iklan, data);
      
      return {
        success: true,
        message: 'Iklan deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to delete iklan'
      };
    }
  }
};

// TESTIMONIAL API
export const testimonialAPI = {
  getAll: async (filters?: FilterOptions): Promise<ApiResponse<TestimonialData[]>> => {
    await delay(300);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.testimonial, mockTestimonial);
      const filtered = filterAndSort(data, filters);
      
      return {
        success: true,
        data: filtered,
        message: `${filtered.length} testimonial found`
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch testimonial'
      };
    }
  },

  getById: async (id: string): Promise<ApiResponse<TestimonialData>> => {
    await delay(200);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.testimonial, mockTestimonial);
      const item = data.find(item => item.id === id);
      
      if (!item) {
        return {
          success: false,
          error: 'Testimonial not found'
        };
      }
      
      return {
        success: true,
        data: item,
        message: 'Testimonial found'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch testimonial'
      };
    }
  },

  create: async (testimonialData: Omit<TestimonialData, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<TestimonialData>> => {
    await delay(500);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.testimonial, mockTestimonial);
      const newTestimonial: TestimonialData = {
        ...testimonialData,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      data.push(newTestimonial);
      saveStorageData(STORAGE_KEYS.testimonial, data);
      
      return {
        success: true,
        data: newTestimonial,
        message: 'Testimonial created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create testimonial'
      };
    }
  },

  update: async (id: string, testimonialData: Partial<TestimonialData>): Promise<ApiResponse<TestimonialData>> => {
    await delay(500);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.testimonial, mockTestimonial);
      const index = data.findIndex(item => item.id === id);
      
      if (index === -1) {
        return {
          success: false,
          error: 'Testimonial not found'
        };
      }
      
      const updatedTestimonial = {
        ...data[index],
        ...testimonialData,
        updatedAt: new Date()
      };
      
      data[index] = updatedTestimonial;
      saveStorageData(STORAGE_KEYS.testimonial, data);
      
      return {
        success: true,
        data: updatedTestimonial,
        message: 'Testimonial updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update testimonial'
      };
    }
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    await delay(300);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.testimonial, mockTestimonial);
      const index = data.findIndex(item => item.id === id);
      
      if (index === -1) {
        return {
          success: false,
          error: 'Testimonial not found'
        };
      }
      
      data.splice(index, 1);
      saveStorageData(STORAGE_KEYS.testimonial, data);
      
      return {
        success: true,
        message: 'Testimonial deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to delete testimonial'
      };
    }
  }
};

// BERITA API
export const beritaAPI = {
  getAll: async (filters?: FilterOptions): Promise<ApiResponse<BeritaData[]>> => {
    await delay(300);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.berita, mockBerita);
      const filtered = filterAndSort(data, filters);
      
      return {
        success: true,
        data: filtered,
        message: `${filtered.length} berita found`
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch berita'
      };
    }
  },

  getById: async (id: string): Promise<ApiResponse<BeritaData>> => {
    await delay(200);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.berita, mockBerita);
      const item = data.find(item => item.id === id);
      
      if (!item) {
        return {
          success: false,
          error: 'Berita not found'
        };
      }
      
      return {
        success: true,
        data: item,
        message: 'Berita found'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch berita'
      };
    }
  },

  create: async (beritaData: Omit<BeritaData, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<BeritaData>> => {
    await delay(500);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.berita, mockBerita);
      const newBerita: BeritaData = {
        ...beritaData,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      data.push(newBerita);
      saveStorageData(STORAGE_KEYS.berita, data);
      
      return {
        success: true,
        data: newBerita,
        message: 'Berita created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create berita'
      };
    }
  },

  update: async (id: string, beritaData: Partial<BeritaData>): Promise<ApiResponse<BeritaData>> => {
    await delay(500);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.berita, mockBerita);
      const index = data.findIndex(item => item.id === id);
      
      if (index === -1) {
        return {
          success: false,
          error: 'Berita not found'
        };
      }
      
      const updatedBerita = {
        ...data[index],
        ...beritaData,
        updatedAt: new Date().toISOString()
      };
      
      data[index] = updatedBerita;
      saveStorageData(STORAGE_KEYS.berita, data);
      
      return {
        success: true,
        data: updatedBerita,
        message: 'Berita updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update berita'
      };
    }
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    await delay(300);
    initializeStorage();
    
    try {
      const data = getStorageData(STORAGE_KEYS.berita, mockBerita);
      const index = data.findIndex(item => item.id === id);
      
      if (index === -1) {
        return {
          success: false,
          error: 'Berita not found'
        };
      }
      
      data.splice(index, 1);
      saveStorageData(STORAGE_KEYS.berita, data);
      
      return {
        success: true,
        message: 'Berita deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to delete berita'
      };
    }
  }
};

// ADMIN STATS API
export const adminAPI = {
  getStats: async (): Promise<ApiResponse<AdminStats>> => {
    await delay(400);
    initializeStorage();
    
    try {
      const layananData = getStorageData(STORAGE_KEYS.layanan, mockLayanan);
      const iklanData = getStorageData(STORAGE_KEYS.iklan, mockIklan);
      const testimonialData = getStorageData(STORAGE_KEYS.testimonial, mockTestimonial);
      const beritaData = getStorageData(STORAGE_KEYS.berita, mockBerita);
      
      // Generate recent activities
      const recentActivities = [
        ...layananData.slice(-3).map(item => ({
          id: item.id,
          type: 'layanan' as const,
          action: 'update' as const,
          title: item.nama,
          timestamp: new Date(item.updatedAt)
        })),
        ...iklanData.slice(-2).map(item => ({
          id: item.id,
          type: 'iklan' as const,
          action: 'create' as const,
          title: item.judul,
          timestamp: new Date(item.updatedAt)
        })),
        ...testimonialData.slice(-2).map(item => ({
          id: item.id,
          type: 'testimonial' as const,
          action: 'create' as const,
          title: `Testimonial dari ${item.clientName}`,
          timestamp: new Date(item.updatedAt)
        })),
        ...beritaData.slice(-3).map(item => ({
          id: item.id,
          type: 'berita' as const,
          action: 'update' as const,
          title: item.judul,
          timestamp: new Date(item.updatedAt)
        }))
      ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 10);

      const stats: AdminStats = {
        totalLayanan: layananData.filter(item => item.status === 'aktif').length,
        activePromos: iklanData.filter(item => item.status === 'aktif' && new Date() <= item.tanggalBerakhir).length,
        totalTestimonials: testimonialData.filter(item => item.status === 'aktif').length,
        publishedNews: beritaData.filter(item => item.status === 'aktif').length,
        recentActivities
      };
      
      return {
        success: true,
        data: stats,
        message: 'Stats fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch admin stats'
      };
    }
  }
};

// Initialize storage on import
if (typeof window !== 'undefined') {
  initializeStorage();
}