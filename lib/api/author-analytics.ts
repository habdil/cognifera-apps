// Author Analytics API - For author dashboard analytics
// Backend API: Ready to use ✅

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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
  category: string;
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
  category: string;
  articleCount: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  avgViewsPerArticle: number;
  engagementRate: number;     // Percentage
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
    return {
      success: true,
      data: result.data
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
    return {
      success: true,
      data: result.data
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
    return {
      success: true,
      data: result.data
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
