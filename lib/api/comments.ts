// Comments API - For article comments
// Backend API: READY TO USE ✅

const API_BASE_URL = process.env.NEXT_PUBLIC_NEW_API_BASE_URL;

// Log API URL on initialization
if (typeof window !== 'undefined') {
  console.log('🔧 [Comments API] Base URL:', API_BASE_URL);
  console.log('🔧 [Comments API] NEXT_PUBLIC_NEW_API_BASE_URL:', process.env.NEXT_PUBLIC_NEW_API_BASE_URL);
}

export interface CommentAuthor {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
}

export interface Comment {
  id: string;
  articleId: string;
  content: string;
  author: CommentAuthor;
  createdAt: string;
  updatedAt: string;
  parentId?: string | null; // For nested replies
  likes: number;
  isLiked?: boolean; // Current user liked this comment
  replies?: Comment[]; // Nested replies
}

export interface CreateCommentData {
  articleId: string;
  content: string;
  parentId?: string | null;
}

export interface CommentsResponse {
  success: boolean;
  data: Comment[];
  meta: {
    total: number;
    articleId: string;
  };
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
    console.log('🔒 [Auth] Running on server side, no token available');
    return null;
  }

  const token = localStorage.getItem('cognifera_new_access_token');
  console.log('🔒 [Auth] Token from localStorage:', token ? `${token.substring(0, 20)}...` : 'null');

  return token;
}

/**
 * Fetch comments for an article
 * GET /api/public/articles/:articleId/comments
 * Authentication: Optional (isLiked field populated if authenticated)
 */
export async function fetchComments(articleId: string): Promise<CommentsResponse> {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/public/articles/${articleId}/comments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    // Return empty data on error
    return {
      success: true,
      data: [],
      meta: {
        total: 0,
        articleId,
      },
    };
  }
}

/**
 * Post a new comment or reply to a comment
 * POST /api/public/articles/:articleId/comments
 * Authentication: Required
 * Max content length: 2000 characters
 */
export async function postComment(data: CreateCommentData): Promise<ApiResponse<Comment>> {
  try {
    console.log('💬 [Comment] Attempting to post comment...');
    const token = getAuthToken();

    if (!token) {
      console.error('❌ [Comment] No token found - user not authenticated');
      return {
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Login required to post comment'
      };
    }

    // Validate content length (max 2000 characters)
    if (!data.content || data.content.trim().length === 0) {
      console.error('❌ [Comment] Content is empty');
      return {
        success: false,
        error: 'INVALID_CONTENT',
        message: 'Comment content is required'
      };
    }

    if (data.content.length > 2000) {
      console.error('❌ [Comment] Content too long:', data.content.length);
      return {
        success: false,
        error: 'CONTENT_TOO_LONG',
        message: 'Comment must be less than 2000 characters'
      };
    }

    const url = `${API_BASE_URL}/public/articles/${data.articleId}/comments`;
    console.log('📤 [Comment] POST Request:', url);
    console.log('📤 [Comment] Headers:', {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.substring(0, 20)}...`
    });
    console.log('📤 [Comment] Body:', { content: data.content, parentId: data.parentId });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        content: data.content,
        parentId: data.parentId || null
      }),
    });

    console.log('📥 [Comment] Response status:', response.status, response.statusText);

    const result = await response.json();
    console.log('📥 [Comment] Response data:', result);
    console.log('📥 [Comment] Full error details:', JSON.stringify(result, null, 2));

    if (!response.ok) {
      console.error('❌ [Comment] Post failed:', result);
      console.error('❌ [Comment] Error code:', result.error);
      console.error('❌ [Comment] Error message:', result.message);
      return {
        success: false,
        error: result.error || 'COMMENT_POST_FAILED',
        message: result.message || 'Failed to post comment'
      };
    }

    console.log('✅ [Comment] Post successful!');
    return {
      success: true,
      data: result.data,
      message: result.message
    };
  } catch (error) {
    console.error('❌ [Comment] Network error:', error);
    return {
      success: false,
      error: 'NETWORK_ERROR',
      message: 'Failed to post comment. Please try again.'
    };
  }
}

/**
 * Delete a comment (owner or admin only)
 * DELETE /api/public/articles/comments/:commentId
 * Authentication: Required
 * Soft delete - data is preserved
 */
export async function deleteComment(commentId: string): Promise<ApiResponse<null>> {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Login required to delete comment'
      };
    }

    const response = await fetch(`${API_BASE_URL}/public/articles/comments/${commentId}`, {
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
      message: result.message
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
 * Toggle like on a comment (like/unlike)
 * POST /api/public/articles/comments/:commentId/like
 * Authentication: Required
 * Returns updated like count and isLiked status
 */
export async function toggleCommentLike(commentId: string): Promise<ApiResponse<{ likes: number; isLiked: boolean }>> {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Login required to like comment'
      };
    }

    const response = await fetch(`${API_BASE_URL}/public/articles/comments/${commentId}/like`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'LIKE_FAILED',
        message: result.message || 'Failed to like comment'
      };
    }

    return {
      success: true,
      data: {
        likes: result.likes,
        isLiked: result.isLiked
      }
    };
  } catch (error) {
    console.error('Error toggling comment like:', error);
    return {
      success: false,
      error: 'NETWORK_ERROR',
      message: 'Failed to like comment. Please try again.'
    };
  }
}

/**
 * Toggle like on an article (like/unlike)
 * POST /api/public/articles/:id/like
 * Authentication: Optional
 * - If authenticated: like as logged-in user
 * - If not authenticated: like as guest with deviceId
 * Returns updated like count and isLiked status
 */
export async function toggleArticleLike(articleId: string, deviceId?: string): Promise<ApiResponse<{ likes: number; isLiked: boolean }>> {
  try {
    const token = getAuthToken();

    // Prepare request body and headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const body: { deviceId?: string } = {};

    if (token) {
      // Authenticated user - use token
      headers['Authorization'] = `Bearer ${token}`;
      console.log('👤 Toggling like as authenticated user');
    } else if (deviceId) {
      // Guest user - use deviceId
      body.deviceId = deviceId;
      console.log('🆔 Toggling like as guest with deviceId:', deviceId);
    } else {
      return {
        success: false,
        error: 'NO_IDENTIFIER',
        message: 'Unable to identify user or device'
      };
    }

    const response = await fetch(`${API_BASE_URL}/public/articles/${articleId}/like`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'LIKE_FAILED',
        message: result.message || 'Failed to like article'
      };
    }

    console.log('✅ Like toggled successfully:', result);

    return {
      success: true,
      data: {
        likes: result.likes,
        isLiked: result.isLiked
      }
    };
  } catch (error) {
    console.error('❌ Error toggling article like:', error);
    return {
      success: false,
      error: 'NETWORK_ERROR',
      message: 'Failed to like article. Please try again.'
    };
  }
}

/**
 * Helper: Build nested comment tree from flat array
 */
export function buildCommentTree(comments: Comment[]): Comment[] {
  const commentMap = new Map<string, Comment>();
  const rootComments: Comment[] = [];

  // First pass: create map of all comments
  comments.forEach(comment => {
    commentMap.set(comment.id, { ...comment, replies: [] });
  });

  // Second pass: build tree structure
  comments.forEach(comment => {
    const commentWithReplies = commentMap.get(comment.id)!;

    if (comment.parentId) {
      const parent = commentMap.get(comment.parentId);
      if (parent) {
        parent.replies = parent.replies || [];
        parent.replies.push(commentWithReplies);
      } else {
        rootComments.push(commentWithReplies);
      }
    } else {
      rootComments.push(commentWithReplies);
    }
  });

  return rootComments;
}

/**
 * Helper: Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}
