// Frontend API Service Layer for User Management
// File ini untuk digunakan di Next.js frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface UserData {
  id: string;
  fullName: string;
  email: string;
  role: 'ADMIN' | 'AUTHOR' | 'READER';
  status: 'ACTIVE' | 'BLOCKED';
  joinDate: string;
  lastLogin: string;
  avatar?: string;
  bio?: string;
  articlesCount?: number;
  totalViews?: number;
}

export interface FetchUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}

export interface CreateUserData {
  fullName: string;
  email: string;
  role: string;
  password: string;
  bio?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedUsersResponse {
  users: UserData[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserStatsResponse {
  totalUsers: number;
  activeAuthors: number;
  activeClients: number;
  blockedUsers: number;
}

/**
 * Get authentication token from storage
 * Checks both old and new auth systems for compatibility
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;

  // Check new auth system first (primary)
  const newToken = localStorage.getItem('cognifera_new_access_token');
  if (newToken) return newToken;

  // Check old auth system (fallback)
  const oldToken = localStorage.getItem('cognifera_access_token');
  if (oldToken) return oldToken;

  // Legacy fallback
  return localStorage.getItem('token') || sessionStorage.getItem('token');
}

/**
 * Get auth headers
 */
function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}

/**
 * Fetch all users with filters and pagination
 * GET /api/users
 */
export async function fetchUsers(params: FetchUsersParams = {}): Promise<ApiResponse<PaginatedUsersResponse>> {
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.search) queryParams.append('search', params.search);
  if (params.role && params.role !== 'all') queryParams.append('role', params.role);
  if (params.status && params.status !== 'all') queryParams.append('status', params.status);

  const url = `${API_BASE_URL}/users?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
    credentials: 'include'
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to fetch users' }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to fetch users`);
  }

  return response.json();
}

/**
 * Create new user
 * POST /api/users
 */
export async function createUser(data: CreateUserData): Promise<ApiResponse<{ user: UserData; emailSent: boolean }>> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: getAuthHeaders(),
    credentials: 'include',
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to create user' }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to create user`);
  }

  return response.json();
}

/**
 * Toggle user status (Block/Unblock)
 * PATCH /api/users/:userId/status
 */
export async function toggleUserStatus(
  userId: string,
  status: 'ACTIVE' | 'BLOCKED'
): Promise<ApiResponse<{ user: UserData }>> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    credentials: 'include',
    body: JSON.stringify({ status })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to update user status' }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to update user status`);
  }

  return response.json();
}

/**
 * Delete user
 * DELETE /api/users/:userId
 */
export async function deleteUser(userId: string): Promise<ApiResponse<null>> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
    credentials: 'include'
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to delete user' }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to delete user`);
  }

  return response.json();
}

/**
 * Get user statistics
 * GET /api/users/stats
 */
export async function fetchUserStats(): Promise<ApiResponse<UserStatsResponse>> {
  const response = await fetch(`${API_BASE_URL}/users/stats`, {
    method: 'GET',
    headers: getAuthHeaders(),
    credentials: 'include'
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to fetch user stats' }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to fetch user stats`);
  }

  return response.json();
}

/**
 * Get single user by ID
 * GET /api/users/:id
 */
export async function fetchUserById(userId: string): Promise<ApiResponse<UserData>> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'GET',
    headers: getAuthHeaders(),
    credentials: 'include'
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to fetch user' }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to fetch user`);
  }

  return response.json();
}

/**
 * Get current logged-in user profile
 * GET /api/auth/me or /api/users/me
 */
export async function fetchCurrentUser(): Promise<ApiResponse<UserData>> {
  // Try /api/auth/me first (common pattern)
  let response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: getAuthHeaders(),
    credentials: 'include'
  });

  // Fallback to /api/users/me if 404
  if (!response.ok && response.status === 404) {
    response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include'
    });
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to fetch current user' }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to fetch current user`);
  }

  return response.json();
}

/**
 * Update user role (Admin only)
 * PATCH /api/users/:userId/role
 */
export async function updateUserRole(
  userId: string,
  role: 'AUTHOR' | 'READER'
): Promise<ApiResponse<{ user: UserData }>> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/role`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    credentials: 'include',
    body: JSON.stringify({ role })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to update user role' }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to update user role`);
  }

  return response.json();
}