// Frontend API Service Layer for File Upload
// File ini untuk digunakan di Next.js frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface UploadedFileData {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
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
 * Get auth headers for file upload
 * Note: Don't set Content-Type for FormData, browser will set it automatically with boundary
 */
function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  return {
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}

/**
 * Upload single article image
 * POST /api/upload/article-image
 *
 * @param file - Image file (max 5MB, JPG/PNG/WebP/GIF)
 * @returns Uploaded file data with public URL
 */
export async function uploadArticleImage(file: File): Promise<ApiResponse<UploadedFileData>> {
  // Validate file size (5 MB)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File terlalu besar! Maksimal 5 MB');
  }

  // Validate file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Tipe file tidak valid! Hanya JPG, PNG, WebP, dan GIF yang diperbolehkan');
  }

  const formData = new FormData();
  formData.append('image', file); // Field name MUST be 'image'

  const response = await fetch(`${API_BASE_URL}/upload/article-image`, {
    method: 'POST',
    headers: getAuthHeaders(),
    credentials: 'include',
    body: formData
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to upload image' }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to upload image`);
  }

  return response.json();
}

/**
 * Upload user avatar
 * POST /api/upload/avatar
 *
 * @param file - Image file (max 2MB, JPG/PNG/WebP)
 * @returns Uploaded file data with public URL
 */
export async function uploadAvatar(file: File): Promise<ApiResponse<UploadedFileData>> {
  // Validate file size (2 MB)
  if (file.size > 2 * 1024 * 1024) {
    throw new Error('File terlalu besar! Maksimal 2 MB untuk avatar');
  }

  // Validate file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Tipe file tidak valid! Hanya JPG, PNG, dan WebP yang diperbolehkan');
  }

  const formData = new FormData();
  formData.append('avatar', file); // Field name MUST be 'avatar'

  const response = await fetch(`${API_BASE_URL}/upload/avatar`, {
    method: 'POST',
    headers: getAuthHeaders(),
    credentials: 'include',
    body: formData
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to upload avatar' }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to upload avatar`);
  }

  return response.json();
}

/**
 * Upload multiple article images
 * POST /api/upload/images
 *
 * @param files - Array of image files (max 5 files, each max 5MB)
 * @returns Array of uploaded file data with public URLs
 */
export async function uploadMultipleImages(files: File[]): Promise<ApiResponse<UploadedFileData[]>> {
  // Validate number of files
  if (files.length > 5) {
    throw new Error('Maksimal 5 files!');
  }

  // Validate each file
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  for (const file of files) {
    if (file.size > 5 * 1024 * 1024) {
      throw new Error(`File ${file.name} terlalu besar! Maksimal 5 MB`);
    }
    if (!validTypes.includes(file.type)) {
      throw new Error(`File ${file.name} tipe tidak valid! Hanya JPG, PNG, WebP, dan GIF`);
    }
  }

  const formData = new FormData();
  files.forEach(file => {
    formData.append('images', file); // Field name MUST be 'images' (same for all files)
  });

  const response = await fetch(`${API_BASE_URL}/upload/images`, {
    method: 'POST',
    headers: getAuthHeaders(),
    credentials: 'include',
    body: formData
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to upload images' }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to upload images`);
  }

  return response.json();
}
