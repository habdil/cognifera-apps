/**
 * Utility functions for processing images in HTML content
 * Extracts base64 images, uploads them, and replaces with URLs
 */

import { uploadArticleImage } from '@/lib/api/upload';

/**
 * Convert base64 string to File object
 */
function base64ToFile(base64String: string, filename: string): File {
  // Extract the base64 data and mime type
  const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 string');
  }

  const mimeType = matches[1];
  const base64Data = matches[2];

  // Convert base64 to binary
  const byteString = atob(base64Data);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  // Create blob and file
  const blob = new Blob([uint8Array], { type: mimeType });
  return new File([blob], filename, { type: mimeType });
}

/**
 * Extract all base64 images from HTML content
 * Returns array of objects with base64 string and their position in HTML
 */
export function extractBase64Images(htmlContent: string): Array<{ base64: string; index: number }> {
  const base64Images: Array<{ base64: string; index: number }> = [];
  // Updated regex to handle src attribute anywhere in the img tag
  const imgRegex = /<img[^>]*src=["'](data:image\/[^;]+;base64,[^"']+)["'][^>]*>/gi;

  let match;
  while ((match = imgRegex.exec(htmlContent)) !== null) {
    base64Images.push({
      base64: match[1],
      index: match.index
    });
  }

  return base64Images;
}

/**
 * Upload base64 images to server and get URLs
 * Returns mapping of base64 strings to uploaded URLs
 */
export async function uploadBase64Images(
  base64Images: string[],
  onProgress?: (current: number, total: number) => void
): Promise<Map<string, string>> {
  const urlMap = new Map<string, string>();

  for (let i = 0; i < base64Images.length; i++) {
    const base64 = base64Images[i];

    try {
      // Generate unique filename
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(7);
      const extension = base64.match(/data:image\/([^;]+);/)?.[1] || 'png';
      const filename = `content-image-${timestamp}-${randomId}.${extension}`;

      // Convert base64 to File
      const file = base64ToFile(base64, filename);

      // Upload to server
      const response = await uploadArticleImage(file);

      if (response.success) {
        urlMap.set(base64, response.data.url);
      }

      // Report progress
      if (onProgress) {
        onProgress(i + 1, base64Images.length);
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
      // Continue with other images even if one fails
    }
  }

  return urlMap;
}

/**
 * Replace base64 images in HTML with uploaded URLs
 * Preserves all img tag attributes including data-align
 */
export function replaceBase64WithUrls(
  htmlContent: string,
  urlMap: Map<string, string>
): string {
  let updatedHtml = htmlContent;

  // Replace each base64 with its corresponding URL
  urlMap.forEach((url, base64) => {
    // Escape special regex characters in base64 string for use in regex
    const escapedBase64 = base64.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Simply replace the base64 string with URL
    // This works because we're only replacing the src value, not the entire tag
    // All other attributes including data-align are preserved
    updatedHtml = updatedHtml.replace(
      new RegExp(escapedBase64, 'g'),
      url
    );
  });

  return updatedHtml;
}

/**
 * Process HTML content: extract base64 images, upload them, and replace with URLs
 * Main function to be called before publishing article
 */
export async function processContentImages(
  htmlContent: string,
  onProgress?: (current: number, total: number) => void
): Promise<string> {
  // Extract base64 images
  const base64ImagesData = extractBase64Images(htmlContent);

  if (base64ImagesData.length === 0) {
    // No base64 images found, return original content
    return htmlContent;
  }

  // Get unique base64 strings (avoid uploading duplicates)
  const uniqueBase64s = Array.from(new Set(base64ImagesData.map(img => img.base64)));

  // Upload all images and get URL mappings
  const urlMap = await uploadBase64Images(uniqueBase64s, onProgress);

  // Replace base64 with URLs in HTML
  const processedHtml = replaceBase64WithUrls(htmlContent, urlMap);

  return processedHtml;
}
