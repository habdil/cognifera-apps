/**
 * Persistent anonymous visitor ID, used by the self-hosted analytics.
 * Stored in localStorage so it survives across sessions on the same browser.
 */

const DEVICE_ID_KEY = 'cognifera_device_id';

function generateDeviceId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `guest_${timestamp}_${random}`;
}

export function getDeviceId(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  let deviceId = localStorage.getItem(DEVICE_ID_KEY);

  if (!deviceId) {
    deviceId = generateDeviceId();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }

  return deviceId;
}
