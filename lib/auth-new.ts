// New Authentication API implementation for Cognifera
// Backend API Documentation: http://localhost:5000/api

const NEW_API_BASE_URL = process.env.NEXT_PUBLIC_NEW_API_BASE_URL || "http://localhost:5000/api";

export interface NewUser {
  id: string;
  email: string;
  full_name: string;
  username?: string;
  role: 'READER' | 'AUTHOR' | 'ADMIN';
  status: 'PENDING' | 'ACTIVE' | 'SUSPENDED';
  is_verified: boolean;
  avatar_url?: string | null;
  bio?: string;
  created_at: string;
  last_login_at?: string | null;
}

interface NewAuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface NewAuthResponse {
  success: boolean;
  message: string;
  data: {
    user: NewUser;
    tokens?: NewAuthTokens; // Optional for registration response
  };
}

interface NewApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      message: string;
    }>;
  };
}

// Storage keys for new auth system
const NEW_STORAGE_KEYS = {
  user: 'cognifera_new_user',
  accessToken: 'cognifera_new_access_token',
  refreshToken: 'cognifera_new_refresh_token'
};

// Helper functions for API calls
const makeAuthRequest = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${NEW_API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || data.message || 'Request failed');
  }

  return data;
};

// Cookie management helpers
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

const setTokensInStorage = (tokens: NewAuthTokens, user: NewUser) => {
  if (typeof window === 'undefined') return;

  // Store in localStorage
  localStorage.setItem(NEW_STORAGE_KEYS.accessToken, tokens.accessToken);
  localStorage.setItem(NEW_STORAGE_KEYS.refreshToken, tokens.refreshToken);
  localStorage.setItem(NEW_STORAGE_KEYS.user, JSON.stringify(user));

  // Store in cookies for middleware
  setCookie(NEW_STORAGE_KEYS.accessToken, tokens.accessToken, 900); // 15 minutes
  setCookie(NEW_STORAGE_KEYS.refreshToken, tokens.refreshToken, 604800); // 7 days
};

// Authentication functions
export const newRegisterUser = async (
  email: string,
  password: string,
  fullName: string,
  username?: string,
  bio?: string
): Promise<{ user: NewUser; needsVerification: boolean }> => {
  const response = await makeAuthRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      full_name: fullName,
      username,
      bio
    }),
  });

  return {
    user: response.data.user,
    needsVerification: !response.data.user.is_verified
  };
};

export const newVerifyEmail = async (token: string): Promise<NewUser> => {
  const response = await makeAuthRequest('/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });

  return response.data.user;
};

export const newLoginUser = async (
  email: string,
  password: string,
  rememberMe: boolean = false
): Promise<NewUser> => {
  const response: NewAuthResponse = await makeAuthRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      remember_me: rememberMe
    }),
  });

  // Store tokens and user data - tokens should exist for login
  if (response.data.tokens) {
    setTokensInStorage(response.data.tokens, response.data.user);
  }

  return response.data.user;
};

export const newGetCurrentUser = (): NewUser | null => {
  if (typeof window === 'undefined') return null;

  const userStr = localStorage.getItem(NEW_STORAGE_KEYS.user);
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const newGetAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(NEW_STORAGE_KEYS.accessToken);
};

export const newGetRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(NEW_STORAGE_KEYS.refreshToken);
};

export const newGetUserProfile = async (): Promise<NewUser> => {
  const accessToken = newGetAccessToken();
  if (!accessToken) {
    throw new Error("No access token available");
  }

  const response = await makeAuthRequest('/auth/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  // Update stored user data
  if (typeof window !== 'undefined') {
    localStorage.setItem(NEW_STORAGE_KEYS.user, JSON.stringify(response.data.user));
  }

  return response.data.user;
};

export const newUpdateProfile = async (profileData: {
  full_name?: string;
  username?: string;
  bio?: string;
  avatar_url?: string;
}): Promise<NewUser> => {
  const accessToken = newGetAccessToken();
  if (!accessToken) {
    throw new Error("No access token available");
  }

  const response = await makeAuthRequest('/auth/profile', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(profileData),
  });

  // Update stored user data
  if (typeof window !== 'undefined') {
    localStorage.setItem(NEW_STORAGE_KEYS.user, JSON.stringify(response.data.user));
  }

  return response.data.user;
};

export const newChangePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  const accessToken = newGetAccessToken();
  if (!accessToken) {
    throw new Error("No access token available");
  }

  await makeAuthRequest('/auth/change-password', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword
    }),
  });
};

export const newRefreshAccessToken = async (): Promise<string> => {
  const refreshToken = newGetRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await makeAuthRequest('/auth/refresh-token', {
    method: 'POST',
    body: JSON.stringify({
      refresh_token: refreshToken
    }),
  });

  // Store new tokens
  const currentUser = newGetCurrentUser();
  if (currentUser) {
    setTokensInStorage(response.data.tokens, currentUser);
  }

  return response.data.tokens.accessToken;
};

export const newForgotPassword = async (email: string): Promise<void> => {
  await makeAuthRequest('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

export const newResetPassword = async (token: string, password: string): Promise<void> => {
  await makeAuthRequest('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({
      token,
      password
    }),
  });
};

export const newVerifyToken = async (): Promise<NewUser> => {
  const accessToken = newGetAccessToken();
  if (!accessToken) {
    throw new Error("No access token available");
  }

  try {
    return await newGetUserProfile();
  } catch (error) {
    // Try to refresh token if profile fetch fails
    if (error instanceof Error && error.message.includes('401')) {
      try {
        const newToken = await newRefreshAccessToken();
        // Retry with new token
        return await newGetUserProfile();
      } catch (refreshError) {
        // Refresh failed, clear all data
        await newLogoutUser();
        throw new Error("Session expired. Please login again.");
      }
    }
    throw error;
  }
};

export const newLogoutUser = async (): Promise<void> => {
  const accessToken = newGetAccessToken();

  if (accessToken) {
    try {
      await makeAuthRequest('/auth/logout', {
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
  if (typeof window !== 'undefined') {
    localStorage.removeItem(NEW_STORAGE_KEYS.user);
    localStorage.removeItem(NEW_STORAGE_KEYS.accessToken);
    localStorage.removeItem(NEW_STORAGE_KEYS.refreshToken);

    // Clear cookies
    deleteCookie(NEW_STORAGE_KEYS.accessToken);
    deleteCookie(NEW_STORAGE_KEYS.refreshToken);
  }
};

// Role mapping for dashboard URLs (compatible with existing system)
export const newGetDashboardUrl = (role: string): string => {
  const roleRoutes: Record<string, string> = {
    'AUTHOR': '/dashboard/author',
    'ADMIN': '/dashboard/admin',
    'READER': '/' // Reader stays on main page
  };

  return roleRoutes[role] || '/';
};

// Utility function to convert new user format to old format (for compatibility)
export const convertNewUserToOldFormat = (newUser: NewUser) => {
  return {
    id: newUser.id,
    name: newUser.full_name, // Map full_name to name for backward compatibility
    fullName: newUser.full_name,
    email: newUser.email,
    role: newUser.role,
    status: newUser.status
  };
};

// Admin functions (for admin users only)
export const newGetAllUsers = async (): Promise<NewUser[]> => {
  const accessToken = newGetAccessToken();
  if (!accessToken) {
    throw new Error("No access token available");
  }

  const response = await makeAuthRequest('/users', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  return response.data.users;
};

export const newCreateUser = async (userData: {
  email: string;
  full_name: string;
  password: string;
  role?: 'READER' | 'AUTHOR' | 'ADMIN';
}): Promise<NewUser> => {
  const accessToken = newGetAccessToken();
  if (!accessToken) {
    throw new Error("No access token available");
  }

  const response = await makeAuthRequest('/users', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(userData),
  });

  return response.data.user;
};

// Health check function
export const newCheckHealth = async () => {
  return await makeAuthRequest('/health');
};