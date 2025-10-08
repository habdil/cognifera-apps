// Author Comments API - For author to manage comments on their articles
// Backend API: Ready to use ✅

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Log API URL on initialization
if (typeof window !== 'undefined') {
  console.log('🔧 [Author Comments API] Base URL:', API_BASE_URL);
}

export interface CommentUser {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  email: string;
}

export interface CommentArticle {
  id: string;
  title: string;
  slug: string;
}

export interface AuthorComment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isApproved: boolean;
  isFlagged: boolean;
  likesCount: number;
  repliesCount: number;
  article: CommentArticle;
  user: CommentUser;
  parent: {
    id: string;
    content: string;
  } | null;
  replies?: AuthorComment[];
}

export interface CommentListResponse {
  comments: AuthorComment[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface CommentStats {
  totalComments: number;
  approvedComments: number;
  flaggedComments: number;
  totalReplies: number;
  commentsThisWeek: number;
  commentsThisMonth: number;
}

export interface GetCommentsParams {
  articleId?: string;
  status?: 'approved' | 'flagged' | 'all';
  page?: number;
  limit?: number;
  sortBy?: 'newest' | 'oldest' | 'most_liked';
  search?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

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
 * Get all comments on author's articles with filters
 * GET /api/author/comments
 */
export async function getAuthorComments(
  params?: GetCommentsParams
): Promise<ApiResponse<CommentListResponse>> {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Login required to view comments'
      };
    }

    const queryParams = new URLSearchParams();
    if (params?.articleId) queryParams.append('articleId', params.articleId);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.search) queryParams.append('search', params.search);

    const url = `${API_BASE_URL}/author/comments${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    console.log('📤 [Author Comments] GET Request:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ [Author Comments] Get failed:', result);
      return {
        success: false,
        error: result.error || 'FETCH_FAILED',
        message: result.message || 'Failed to fetch comments'
      };
    }

    console.log('✅ [Author Comments] Get successful!');
    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    console.error('❌ [Author Comments] Network error:', error);
    return {
      success: false,
      error: 'NETWORK_ERROR',
      message: 'Failed to fetch comments. Please try again.'
    };
  }
}

/**
 * Get comment statistics for author dashboard
 * GET /api/author/comments/stats
 */
export async function getCommentStats(): Promise<ApiResponse<CommentStats>> {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Login required to view statistics'
      };
    }

    const response = await fetch(`${API_BASE_URL}/author/comments/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'STATS_FETCH_FAILED',
        message: result.message || 'Failed to fetch statistics'
      };
    }

    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    console.error('Error fetching comment stats:', error);
    return {
      success: false,
      error: 'NETWORK_ERROR',
      message: 'Failed to fetch statistics. Please try again.'
    };
  }
}

/**
 * Get detailed comment with nested replies
 * GET /api/author/comments/:id
 */
export async function getCommentDetail(commentId: string): Promise<ApiResponse<AuthorComment>> {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Login required to view comment details'
      };
    }

    const response = await fetch(`${API_BASE_URL}/author/comments/${commentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'FETCH_FAILED',
        message: result.message || 'Failed to fetch comment details'
      };
    }

    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    console.error('Error fetching comment detail:', error);
    return {
      success: false,
      error: 'NETWORK_ERROR',
      message: 'Failed to fetch comment details. Please try again.'
    };
  }
}

/**
 * Flag a comment as inappropriate
 * PATCH /api/author/comments/:id/flag
 */
export async function flagComment(commentId: string, reason?: string): Promise<ApiResponse<null>> {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Login required to flag comment'
      };
    }

    const response = await fetch(`${API_BASE_URL}/author/comments/${commentId}/flag`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ reason: reason || '' }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'FLAG_FAILED',
        message: result.message || 'Failed to flag comment'
      };
    }

    return {
      success: true,
      data: null,
      message: result.message || 'Comment flagged successfully'
    };
  } catch (error) {
    console.error('Error flagging comment:', error);
    return {
      success: false,
      error: 'NETWORK_ERROR',
      message: 'Failed to flag comment. Please try again.'
    };
  }
}

/**
 * Delete a comment (soft delete)
 * DELETE /api/author/comments/:id
 */
export async function deleteAuthorComment(commentId: string): Promise<ApiResponse<null>> {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Login required to delete comment'
      };
    }

    const response = await fetch(`${API_BASE_URL}/author/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'DELETE_FAILED',
        message: result.message || 'Failed to delete comment'
      };
    }

    return {
      success: true,
      data: null,
      message: result.message || 'Comment deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting comment:', error);
    return {
      success: false,
      error: 'NETWORK_ERROR',
      message: 'Failed to delete comment. Please try again.'
    };
  }
}

/**
 * Helper: Format relative time
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'baru saja';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} menit yang lalu`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} jam yang lalu`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} hari yang lalu`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} minggu yang lalu`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} bulan yang lalu`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} tahun yang lalu`;
}
