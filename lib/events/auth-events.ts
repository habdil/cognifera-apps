/**
 * Auth Event Emitter
 * Digunakan untuk sync localStorage changes ke React components
 * tanpa perlu reload page
 */

type AuthEventType = 'user-updated' | 'user-logged-out';

type AuthEventListener = () => void;

class AuthEventEmitter {
  private listeners: Map<AuthEventType, Set<AuthEventListener>> = new Map();

  /**
   * Subscribe to auth events
   */
  on(event: AuthEventType, listener: AuthEventListener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);
  }

  /**
   * Unsubscribe from auth events
   */
  off(event: AuthEventType, listener: AuthEventListener) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(listener);
    }
  }

  /**
   * Emit auth event to all listeners
   */
  emit(event: AuthEventType) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(listener => listener());
    }
  }
}

// Singleton instance
export const authEvents = new AuthEventEmitter();

/**
 * Emit user-updated event after profile changes
 */
export const emitUserUpdated = () => {
  authEvents.emit('user-updated');
};

/**
 * Emit user-logged-out event after logout
 */
export const emitUserLoggedOut = () => {
  authEvents.emit('user-logged-out');
};
