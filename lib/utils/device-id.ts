/**
 * Device ID Management for Guest User Likes
 *
 * This utility manages a unique device identifier for anonymous users
 * to enable liking articles without authentication.
 */

const DEVICE_ID_KEY = 'cognifera_device_id';

/**
 * Generate a unique device ID for this browser/device
 * Format: guest_[timestamp]_[random]
 * Example: guest_1234567890_abc123def
 */
function generateDeviceId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `guest_${timestamp}_${random}`;
}

/**
 * Get or create device ID from localStorage
 * This ID persists across sessions on the same browser/device
 */
export function getDeviceId(): string {
  if (typeof window === 'undefined') {
    // Server-side rendering - return temporary ID
    return '';
  }

  let deviceId = localStorage.getItem(DEVICE_ID_KEY);

  if (!deviceId) {
    deviceId = generateDeviceId();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
    console.log('🆔 Generated new device ID:', deviceId);
  }

  return deviceId;
}

/**
 * Clear device ID (useful for testing or logout)
 */
export function clearDeviceId(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(DEVICE_ID_KEY);
    console.log('🗑️ Device ID cleared');
  }
}

/**
 * Check if current user is a guest (no auth token)
 */
export function isGuestUser(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }

  const token = localStorage.getItem('cognifera_new_access_token');
  return !token;
}
