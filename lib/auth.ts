// Authentication functions using real backend API

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

export interface User {
  id: string;
  name?: string; // Keep for backward compatibility
  fullName: string;
  email: string;
  role: string;
  status?: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    tokens: AuthTokens;
  };
}

interface ApiError {
  success: false;
  message: string;
  error: string;
}

export const loginUser = async (email: string, password: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data: AuthResponse | ApiError = await response.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  const authData = data as AuthResponse;
  
  // Store tokens and user data
  setTokensInStorage(authData.data.tokens, authData.data.user);
  
  return authData.data.user;
};

export const registerUser = async (name: string, email: string, password: string, confirmPassword: string): Promise<User> => {
  if (password !== confirmPassword) {
    throw new Error("Password tidak cocok");
  }

  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      email, 
      password, 
      name, 
      role: "CLIENT" // Default role for registration
    }),
  });

  const data: AuthResponse | ApiError = await response.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  const authData = data as AuthResponse;
  
  // Store tokens and user data
  setTokensInStorage(authData.data.tokens, authData.data.user);
  
  return authData.data.user;
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem("cognifera_user");
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem("cognifera_access_token");
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem("cognifera_refresh_token");
};

// Helper functions for cookie management
const setCookie = (name: string, value: string, maxAge: number) => {
  if (typeof window !== 'undefined') {
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=strict`;
  }
};

const deleteCookie = (name: string) => {
  if (typeof window !== 'undefined') {
    document.cookie = `${name}=; path=/; max-age=0`;
  }
};

const setTokensInStorage = (tokens: AuthTokens, user: User) => {
  // Store in localStorage
  localStorage.setItem("cognifera_access_token", tokens.accessToken);
  localStorage.setItem("cognifera_refresh_token", tokens.refreshToken);
  localStorage.setItem("cognifera_user", JSON.stringify(user));
  
  // Store in cookies for middleware
  setCookie("cognifera_access_token", tokens.accessToken, 900); // 15 minutes
  setCookie("cognifera_refresh_token", tokens.refreshToken, 604800); // 7 days
};

export const verifyToken = async (): Promise<User> => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error("No access token available");
  }

  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    // Token expired, try to refresh
    try {
      const newToken = await refreshAccessToken();
      // Retry with new token
      const retryResponse = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${newToken}`,
        },
      });
      
      const retryData: { success: boolean; message: string; data: { user: User } } | ApiError = await retryResponse.json();
      
      if (!retryData.success) {
        throw new Error(retryData.message);
      }
      
      const userData = retryData as { success: boolean; message: string; data: { user: User } };
      
      // Update stored user data  
      localStorage.setItem("cognifera_user", JSON.stringify(userData.data.user));
      
      return userData.data.user;
    } catch (refreshError) {
      // Refresh failed, clear all data
      await logoutUser();
      throw new Error("Session expired. Please login again.");
    }
  }

  const data: { success: boolean; message: string; data: { user: User } } | ApiError = await response.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  const userData = data as { success: boolean; message: string; data: { user: User } };
  
  // Update stored user data
  localStorage.setItem("cognifera_user", JSON.stringify(userData.data.user));
  
  return userData.data.user;
};

export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  const data: { success: boolean; message: string; data: { tokens: AuthTokens } } | ApiError = await response.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  const tokenData = data as { success: boolean; message: string; data: { tokens: AuthTokens } };
  
  // Store new tokens
  const currentUser = getCurrentUser();
  if (currentUser) {
    setTokensInStorage(tokenData.data.tokens, currentUser);
  }
  
  return tokenData.data.tokens.accessToken;
};

export const logoutUser = async (): Promise<void> => {
  const accessToken = getAccessToken();
  
  if (accessToken) {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.warn('Logout API call failed:', error);
    }
  }

  // Clear all stored data
  localStorage.removeItem("cognifera_user");
  localStorage.removeItem("cognifera_access_token");
  localStorage.removeItem("cognifera_refresh_token");
  
  // Clear cookies
  deleteCookie("cognifera_access_token");
  deleteCookie("cognifera_refresh_token");
};

export const getDashboardUrl = (role: string): string => {
  const roleRoutes: Record<string, string> = {
    'AUTHOR_JOURNAL': '/dashboard/author-journal',
    'REVIEWER_JOURNAL': '/dashboard/reviewer-journal',
    'EDITOR_JOURNAL': '/dashboard/editor-journal',
    'MANAGER_JOURNAL': '/dashboard/manager-journal',
    'AUTHOR_BOOK': '/dashboard/author-book',
    'EDITOR_BOOK': '/dashboard/editor-book',
    'MANAGER_BOOK': '/dashboard/manager-book',
    'AUTHOR_NEWS': '/dashboard/author-news',
    'ADMIN_COGNIFERA': '/dashboard/admin',
    'CLIENT': '/' // CLIENT stays on main page with updated navbar
  };

  return roleRoutes[role] || '/';
};