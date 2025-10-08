// Public Articles API - No Authentication Required
// Menggunakan endpoint public dari backend untuk artikel yang sudah dipublish

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Author {
  id: string;
  fullName: string;
  email?: string;
  avatar?: string;
  bio?: string;
}

export interface Category {
  name: string;
  description: string;
}

export interface PublicArticle {
  id: string;
  judul: string;
  konten: string;
  category: Category | string; // Support both object and string for backward compatibility
  featuredImage?: string;
  tags: string[];
  status: 'aktif';
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  views?: number; // View count from backend (optional for backward compatibility)
  likes?: number; // Like count from backend (optional)
  isLiked?: boolean; // Whether current user liked this article (only if authenticated)
}

export interface PublicArticlesParams {
  page?: number;      // Frontend uses page (will be converted to offset)
  limit?: number;
  offset?: number;    // Backend uses offset
  search?: string;
  category?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    total: number;
    limit: number;
    offset: number;    // Backend returns offset, NOT page or totalPages
  };
}

export interface SingleArticleResponse {
  success: boolean;
  data: PublicArticle;
}

/**
 * Fetch published articles (public, no auth required)
 * GET /api/public/articles
 */
export async function fetchPublicArticles(
  params: PublicArticlesParams = {}
): Promise<PaginatedResponse<PublicArticle>> {
  const queryParams = new URLSearchParams();

  // Convert page to offset (backend uses offset-based pagination)
  // offset = (page - 1) * limit
  const limit = params.limit || 10;
  const offset = params.offset !== undefined
    ? params.offset
    : params.page
      ? (params.page - 1) * limit
      : 0;

  queryParams.append('limit', limit.toString());
  queryParams.append('offset', offset.toString());

  if (params.search) queryParams.append('search', params.search);
  if (params.category) queryParams.append('category', params.category);

  const url = `${API_BASE_URL}/public/articles?${queryParams.toString()}`;

  // Debug: Log the actual URL being called
  console.log('🌐 Calling API URL:', url);
  console.log('📄 Pagination:', { page: params.page, limit, offset });

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // cache: 'no-store', // For dynamic SSR data
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Failed to fetch articles'
    }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to fetch articles`);
  }

  const data = await response.json();

  // Debug: Log API response to check category structure
  if (typeof window !== 'undefined') {
    console.log('📰 Public Articles API Response:', data);
    if (data.data && data.data.length > 0) {
      console.log('📋 First Article Category:', data.data[0].category);
      console.log('📋 Category Type:', typeof data.data[0].category);
    }
  }

  return data;
}

/**
 * Get single published article by ID (public, no auth required)
 * GET /api/public/articles/:id
 */
export async function fetchPublicArticleById(
  articleId: string
): Promise<SingleArticleResponse> {
  const response = await fetch(`${API_BASE_URL}/public/articles/${articleId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // cache: 'no-store', // For dynamic SSR data
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Article not found'
    }));
    throw new Error(error.message || `HTTP ${response.status}: Article not found`);
  }

  const data = await response.json();

  // Debug: Log article detail response
  if (typeof window !== 'undefined') {
    console.log('📄 Public Article Detail API Response:', data);
    if (data.data) {
      console.log('📋 Article Category:', data.data.category);
      console.log('📋 Category Type:', typeof data.data.category);
    }
  }

  return data;
}

/**
 * Helper: Get category label in Indonesian
 * Supports both string (old) and object (new) category format
 */
export function getCategoryLabel(category: Category | string): string {
  // If category is an object with name property, use it
  if (typeof category === 'object' && category !== null && 'name' in category) {
    return category.name;
  }

  // Otherwise treat as string and map it
  const categoryString = category as string;
  const categoryMap: { [key: string]: string } = {
    industry: 'Industri',
    research: 'Penelitian',
    company: 'Perusahaan',
    announcement: 'Pengumuman',
  };
  return categoryMap[categoryString] || categoryString;
}

/**
 * Helper: Get category name (for filtering/comparison)
 */
export function getCategoryName(category: Category | string): string {
  if (typeof category === 'object' && category !== null && 'name' in category) {
    return category.name;
  }
  return category as string;
}

/**
 * Helper: Format date to Indonesian locale
 */
export function formatPublishedDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Increment article view count
 * POST /api/public/articles/:id/view
 * Call this when user opens an article
 */
export async function incrementArticleView(articleId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/articles/${articleId}/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn('Failed to increment article view count');
    }
  } catch (error) {
    // Silent fail - views are not critical
    console.warn('Error incrementing article view:', error);
  }
}

/**
 * Helper: Format view count for display
 * Examples: 1234 → "1.2K", 1500000 → "1.5M"
 */
export function formatViewCount(views: number | undefined): string {
  if (!views) return '0';

  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

/**
 * Helper: Calculate total pages from offset-based pagination
 * Used to convert backend's offset response to page-based UI
 */
export function calculateTotalPages(total: number, limit: number): number {
  return Math.ceil(total / limit);
}

/**
 * Helper: Calculate current page from offset
 * offset = (page - 1) * limit  →  page = (offset / limit) + 1
 */
export function offsetToPage(offset: number, limit: number): number {
  return Math.floor(offset / limit) + 1;
}

/**
 * Helper: Calculate offset from page
 * offset = (page - 1) * limit
 */
export function pageToOffset(page: number, limit: number): number {
  return (page - 1) * limit;
}
