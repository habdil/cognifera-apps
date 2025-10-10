// Author Analytics API - For author dashboard analytics
// Backend API: Ready to use ✅

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Log API URL on initialization
if (typeof window !== 'undefined') {
  console.log('🔧 [Author Analytics API] Base URL:', API_BASE_URL);
}

// Types based on backend documentation
export interface AnalyticsOverview {
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  publishedArticles: number;
  draftArticles: number;
  trends: {
    viewsTrend: number;        // Percentage: positive = increase, negative = decrease
    likesTrend: number;
    commentsTrend: number;
    sharesTrend: number;
  };
  recentActivity: {
    thisWeek: {
      views: number;
      likes: number;
      comments: number;
    };
    thisMonth: {
      views: number;
      likes: number;
      comments: number;
    };
  };
}

export interface TopArticle {
  id: string;
  title: string;
  slug: string;
  category: string | { id: string; name: string; slug: string };  // Backend may return object
  views: number;
  likes: number;
  comments: number;
  shares: number;
  engagementRate: number;     // Percentage
  publishedAt: string;
}

export interface ViewsTimelineItem {
  date: string;               // Format: YYYY-MM-DD
  views: number;
  uniqueViews: number;
  likes: number;
  comments: number;
}

export interface ViewsTimelineResponse {
  timeline: ViewsTimelineItem[];
  summary: {
    totalViews: number;
    totalUniqueViews: number;
    averageViewsPerDay: number;
    peak: {
      date: string;
      views: number;
    };
  };
}

export interface CategoryStat {
  category: string;              // Backend uses: categoryName
  categoryName?: string;         // Backend field name
  articleCount: number;          // Backend uses: articlesCount
  articlesCount?: number;        // Backend field name
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  avgViewsPerArticle: number;
  engagementRate: number;        // Percentage
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export type PeriodType = '7days' | '30days' | '90days' | '1year';
export type SortByType = 'views' | 'likes' | 'comments' | 'engagement';

/**
 * Get auth token from localStorage
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  // Check new auth system first
  const newToken = localStorage.getItem('cognifera_new_access_token');
  if (newToken) return newToken;

  // Fallback to old auth system
  const oldToken = localStorage.getItem('cognifera_access_token');
  if (oldToken) return oldToken;

  return localStorage.getItem('token') || sessionStorage.getItem('token');
}

/**
 * Get analytics overview with trends
 * GET /api/author/analytics/overview
 */
export async function getAnalyticsOverview(
  period: PeriodType = '30days'
): Promise<ApiResponse<AnalyticsOverview>> {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Login required to view analytics'
      };
    }

    const url = `${API_BASE_URL}/author/analytics/overview?period=${period}`;
    console.log('📤 [Analytics] GET Request:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ [Analytics] Overview fetch failed:', result);
      return {
        success: false,
        error: result.error || 'FETCH_FAILED',
        message: result.message || 'Failed to fetch analytics overview'
      };
    }

    console.log('✅ [Analytics] Overview fetched successfully');
    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    console.error('❌ [Analytics] Network error:', error);
    return {
      success: false,
      error: 'NETWORK_ERROR',
      message: 'Failed to fetch analytics. Please try again.'
    };
  }
}

/**
 * Get top performing articles
 * GET /api/author/analytics/top-articles
 */
export async function getTopArticles(
  params: {
    limit?: number;
    sortBy?: SortByType;
  } = {}
): Promise<ApiResponse<TopArticle[]>> {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Login required to view analytics'
      };
    }

    const queryParams = new URLSearchParams();
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);

    const url = `${API_BASE_URL}/author/analytics/top-articles${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    console.log('📤 [Analytics] GET Request:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ [Analytics] Top articles fetch failed:', result);
      return {
        success: false,
        error: result.error || 'FETCH_FAILED',
        message: result.message || 'Failed to fetch top articles'
      };
    }

    console.log('✅ [Analytics] Top articles fetched successfully');
    console.log('📊 [Analytics] Top articles raw data:', result.data);

    // Backend returns nested structure: { articles: [...], totalArticles: X }
    // We need just the articles array
    const rawArticles = result.data?.articles || result.data || [];

    // Transform articles to normalize category field
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const articles: TopArticle[] = rawArticles.map((article: any) => ({
      ...article,
      // If category is object, extract name; otherwise use as-is
      category: typeof article.category === 'object' && article.category?.name
        ? article.category.name
        : article.category
    }));

    console.log('📊 [Analytics] Transformed articles array:', articles);

    return {
      success: true,
      data: articles
    };
  } catch (error) {
    console.error('❌ [Analytics] Network error:', error);
    return {
      success: false,
      error: 'NETWORK_ERROR',
      message: 'Failed to fetch top articles. Please try again.'
    };
  }
}

/**
 * Get views timeline (time series data)
 * GET /api/author/analytics/views-timeline
 */
export async function getViewsTimeline(
  params: {
    period?: PeriodType;
    articleId?: string;
  } = {}
): Promise<ApiResponse<ViewsTimelineResponse>> {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Login required to view analytics'
      };
    }

    const queryParams = new URLSearchParams();
    if (params.period) queryParams.append('period', params.period);
    if (params.articleId) queryParams.append('articleId', params.articleId);

    const url = `${API_BASE_URL}/author/analytics/views-timeline${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    console.log('📤 [Analytics] GET Request:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ [Analytics] Timeline fetch failed:', result);
      return {
        success: false,
        error: result.error || 'FETCH_FAILED',
        message: result.message || 'Failed to fetch views timeline'
      };
    }

    console.log('✅ [Analytics] Timeline fetched successfully');
    console.log('📊 [Analytics] Timeline raw data:', result.data);

    // Backend returns: { data: [...], period: "7days", total: X, average: Y, peak: {...} }
    // Transform to match ViewsTimelineResponse interface
    const transformedData: ViewsTimelineResponse = {
      timeline: result.data?.data || [],
      summary: {
        totalViews: result.data?.total || 0,
        totalUniqueViews: result.data?.total || 0, // Backend doesn't provide unique views in summary
        averageViewsPerDay: result.data?.average || 0,
        peak: result.data?.peak || { date: '', views: 0 }
      }
    };
    console.log('📊 [Analytics] Transformed timeline data:', transformedData);

    return {
      success: true,
      data: transformedData
    };
  } catch (error) {
    console.error('❌ [Analytics] Network error:', error);
    return {
      success: false,
      error: 'NETWORK_ERROR',
      message: 'Failed to fetch timeline. Please try again.'
    };
  }
}

/**
 * Get category performance statistics
 * GET /api/author/analytics/category-stats
 */
export async function getCategoryStats(
  limit: number = 10
): Promise<ApiResponse<CategoryStat[]>> {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Login required to view analytics'
      };
    }

    const url = `${API_BASE_URL}/author/analytics/category-stats?limit=${limit}`;
    console.log('📤 [Analytics] GET Request:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ [Analytics] Category stats fetch failed:', result);
      return {
        success: false,
        error: result.error || 'FETCH_FAILED',
        message: result.message || 'Failed to fetch category stats'
      };
    }

    console.log('✅ [Analytics] Category stats fetched successfully');
    console.log('📊 [Analytics] Category stats raw data:', result.data);

    // Backend returns nested structure: { categories: [...], totalCategories: X }
    // We need just the categories array, and transform field names
    const rawCategories = result.data?.categories || result.data || [];

    // Transform backend field names to match frontend interface
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const categories: CategoryStat[] = rawCategories.map((cat: any) => ({
      category: cat.categoryName || cat.category,
      categoryName: cat.categoryName,
      articleCount: cat.articlesCount || cat.articleCount || 0,
      articlesCount: cat.articlesCount,
      totalViews: cat.totalViews || 0,
      totalLikes: cat.totalLikes || 0,
      totalComments: cat.totalComments || 0,
      avgViewsPerArticle: cat.avgViewsPerArticle || 0,
      engagementRate: cat.engagementRate || 0
    }));

    console.log('📊 [Analytics] Transformed categories array:', categories);

    return {
      success: true,
      data: categories
    };
  } catch (error) {
    console.error('❌ [Analytics] Network error:', error);
    return {
      success: false,
      error: 'NETWORK_ERROR',
      message: 'Failed to fetch category stats. Please try again.'
    };
  }
}

/**
 * Helper: Format number with K/M suffix
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Helper: Get trend direction from percentage value
 */
export function getTrendDirection(value: number): 'up' | 'down' | 'stable' {
  if (value > 2) return 'up';
  if (value < -2) return 'down';
  return 'stable';
}

/**
 * Helper: Format date to readable format
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
}
