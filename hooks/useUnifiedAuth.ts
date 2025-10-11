"use client";

import { useState, useEffect, useCallback } from 'react';
import { newVerifyToken, newGetCurrentUser, newLogoutUser, type NewUser } from '@/lib/auth-new';
import { authEvents } from '@/lib/events/auth-events';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useUnifiedAuth = (requiredRole?: string) => {
  const [user, setUser] = useState<NewUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const verifyUserToken = useCallback(async () => {
    try {
      // First check localStorage
      const localUser = newGetCurrentUser();
      if (!localUser) {
        throw new Error("No user data found");
      }

      // Verify token with backend
      const verifiedUser = await newVerifyToken();

      // Check role if specified
      if (requiredRole && verifiedUser.role !== requiredRole) {
        throw new Error(`Access denied. Required role: ${requiredRole}`);
      }

      setUser(verifiedUser);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      setError(errorMessage);

      // Clear local storage and redirect to home
      try {
        await newLogoutUser();
      } catch (logoutErr) {
        console.warn('Logout failed during auth error:', logoutErr);
      }

      toast.error(errorMessage);
      router.push('/?message=auth-failed');
    } finally {
      setLoading(false);
    }
  }, [requiredRole, router]);

  // Initial verification
  useEffect(() => {
    verifyUserToken();
  }, [verifyUserToken]);

  // Listen to user update events
  useEffect(() => {
    const handleUserUpdated = () => {
      const updatedUser = newGetCurrentUser();
      if (updatedUser) {
        setUser(updatedUser);
      }
    };

    const handleUserLoggedOut = () => {
      setUser(null);
      router.push('/?message=logged-out');
    };

    // Subscribe to events
    authEvents.on('user-updated', handleUserUpdated);
    authEvents.on('user-logged-out', handleUserLoggedOut);

    // Cleanup subscriptions
    return () => {
      authEvents.off('user-updated', handleUserUpdated);
      authEvents.off('user-logged-out', handleUserLoggedOut);
    };
  }, [router]);

  return { user, loading, error };
};