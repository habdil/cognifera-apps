"use client";

import { useState, useEffect } from 'react';
import {
  newVerifyToken,
  newGetCurrentUser,
  newLogoutUser,
  type NewUser,
  convertNewUserToOldFormat
} from '@/lib/auth-new';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useNewAuth = (requiredRole?: string) => {
  const [user, setUser] = useState<NewUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verifyUserToken = async () => {
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
    };

    verifyUserToken();
  }, [requiredRole, router]);

  // Return user in both new and old format for compatibility
  return {
    user,
    oldFormatUser: user ? convertNewUserToOldFormat(user) : null,
    loading,
    error
  };
};