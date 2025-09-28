"use client";

import { useState, useEffect } from 'react';
import { verifyToken, getCurrentUser, logout, type UnifiedUser } from '@/lib/auth-config';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useUnifiedAuth = (requiredRole?: string) => {
  const [user, setUser] = useState<UnifiedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verifyUserToken = async () => {
      try {
        // First check localStorage
        const localUser = getCurrentUser();
        if (!localUser) {
          throw new Error("No user data found");
        }

        // Verify token with backend
        const verifiedUser = await verifyToken();

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
          await logout();
        } catch (logoutErr) {
          console.warn('Logout failed during auth error:', logoutErr);
        }

        toast.error(errorMessage);
        router.push('/?message=auth-failed');
      } finally {
        setLoading(false);
      }
    };

    verifyUserToken();
  }, [requiredRole, router]);

  return { user, loading, error };
};