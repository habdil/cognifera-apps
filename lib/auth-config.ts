// Authentication Configuration
// Use this file to switch between old and new auth systems

type AuthSystem = 'old' | 'new';

// Change this to switch between authentication systems
const USE_AUTH_SYSTEM: AuthSystem = process.env.NEXT_PUBLIC_AUTH_SYSTEM as AuthSystem || 'new';

// Old auth imports
import {
  loginUser as oldLoginUser,
  registerUser as oldRegisterUser,
  getCurrentUser as oldGetCurrentUser,
  verifyToken as oldVerifyToken,
  logoutUser as oldLogoutUser,
  getDashboardUrl as oldGetDashboardUrl,
  type User as OldUser
} from './auth';

// New auth imports
import {
  newLoginUser,
  newRegisterUser,
  newGetCurrentUser,
  newVerifyToken,
  newLogoutUser,
  newGetDashboardUrl,
  newVerifyEmail,
  newForgotPassword,
  newResetPassword,
  newChangePassword,
  newUpdateProfile,
  newGetUserProfile,
  convertNewUserToOldFormat,
  type NewUser
} from './auth-new';

// Unified user type (compatible with both systems)
export type UnifiedUser = {
  id: string;
  name?: string; // Backward compatibility
  fullName: string;
  email: string;
  role: string;
  status?: string;
  // New system specific fields (optional)
  username?: string;
  is_verified?: boolean;
  avatar_url?: string;
  bio?: string;
};

// Unified authentication functions
export const login = async (email: string, password: string, rememberMe?: boolean): Promise<UnifiedUser> => {
  if (USE_AUTH_SYSTEM === 'new') {
    const newUser = await newLoginUser(email, password, rememberMe || false);
    return convertNewUserToOldFormat(newUser);
  } else {
    return await oldLoginUser(email, password);
  }
};

export const register = async (
  nameOrEmail: string,
  emailOrPassword: string,
  passwordOrConfirmPassword?: string,
  confirmPassword?: string,
  username?: string,
  bio?: string
): Promise<UnifiedUser | { user: UnifiedUser; needsVerification: boolean }> => {
  if (USE_AUTH_SYSTEM === 'new') {
    // New system: (email, password, fullName, username?, bio?)
    const result = await newRegisterUser(nameOrEmail, emailOrPassword, passwordOrConfirmPassword || '', username, bio);
    return {
      user: convertNewUserToOldFormat(result.user),
      needsVerification: result.needsVerification
    };
  } else {
    // Old system: (name, email, password, confirmPassword)
    return await oldRegisterUser(nameOrEmail, emailOrPassword, passwordOrConfirmPassword || '', confirmPassword || '');
  }
};

export const getCurrentUser = (): UnifiedUser | null => {
  if (USE_AUTH_SYSTEM === 'new') {
    const newUser = newGetCurrentUser();
    return newUser ? convertNewUserToOldFormat(newUser) : null;
  } else {
    return oldGetCurrentUser();
  }
};

export const verifyToken = async (): Promise<UnifiedUser> => {
  if (USE_AUTH_SYSTEM === 'new') {
    const newUser = await newVerifyToken();
    return convertNewUserToOldFormat(newUser);
  } else {
    return await oldVerifyToken();
  }
};

export const logout = async (): Promise<void> => {
  if (USE_AUTH_SYSTEM === 'new') {
    await newLogoutUser();
  } else {
    await oldLogoutUser();
  }
};

export const getDashboardUrl = (role: string): string => {
  const roleRoutes: Record<string, string> = {
    'AUTHOR': '/dashboard/author',
    'ADMIN': '/dashboard/admin',
    'READER': '/', // READER (default from registration) stays on main page with updated navbar
    'CLIENT': '/' // Same as READER - backward compatibility
  };

  return roleRoutes[role] || '/';
};

// New system specific functions (only available when using new system)
export const verifyEmail = async (token: string): Promise<UnifiedUser | null> => {
  if (USE_AUTH_SYSTEM === 'new') {
    const newUser = await newVerifyEmail(token);
    return convertNewUserToOldFormat(newUser);
  }
  return null;
};

export const forgotPassword = async (email: string): Promise<void> => {
  if (USE_AUTH_SYSTEM === 'new') {
    await newForgotPassword(email);
  } else {
    throw new Error('Forgot password not supported in old auth system');
  }
};

export const resetPassword = async (token: string, password: string): Promise<void> => {
  if (USE_AUTH_SYSTEM === 'new') {
    await newResetPassword(token, password);
  } else {
    throw new Error('Reset password not supported in old auth system');
  }
};

export const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  if (USE_AUTH_SYSTEM === 'new') {
    await newChangePassword(currentPassword, newPassword);
  } else {
    throw new Error('Change password not supported in old auth system');
  }
};

export const updateProfile = async (profileData: {
  full_name?: string;
  username?: string;
  bio?: string;
  avatar_url?: string;
}): Promise<UnifiedUser | null> => {
  if (USE_AUTH_SYSTEM === 'new') {
    const newUser = await newUpdateProfile(profileData);
    return convertNewUserToOldFormat(newUser);
  }
  return null;
};

export const getUserProfile = async (): Promise<UnifiedUser | null> => {
  if (USE_AUTH_SYSTEM === 'new') {
    const newUser = await newGetUserProfile();
    return convertNewUserToOldFormat(newUser);
  }
  return getCurrentUser();
};

// Utility functions
export const isNewAuthSystem = (): boolean => USE_AUTH_SYSTEM === 'new';
export const getAuthSystemType = (): AuthSystem => USE_AUTH_SYSTEM;

// Feature availability checks
export const hasEmailVerification = (): boolean => USE_AUTH_SYSTEM === 'new';
export const hasForgotPassword = (): boolean => USE_AUTH_SYSTEM === 'new';
export const hasProfileUpdate = (): boolean => USE_AUTH_SYSTEM === 'new';
export const hasPasswordChange = (): boolean => USE_AUTH_SYSTEM === 'new';