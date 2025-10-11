// Authentication Configuration
// Simplified version - only uses new auth system

// Auth imports
import {
  newLoginUser,
  newRegisterUser,
  newGetCurrentUser,
  newVerifyToken,
  newLogoutUser,
  newVerifyEmail,
  newForgotPassword,
  newResetPassword,
  newChangePassword,
  newUpdateProfile,
  newGetUserProfile,
  convertNewUserToOldFormat,
  type NewUser
} from './auth-new';

// Unified user type (compatible with both old and new systems)
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
  avatar_url?: string | null;
  avatarUrl?: string | null; // Alias for backward compatibility
  bio?: string;
};

// Alias for backward compatibility
export type User = UnifiedUser;

// Unified authentication functions
export const login = async (email: string, password: string, rememberMe?: boolean): Promise<UnifiedUser> => {
  const newUser = await newLoginUser(email, password, rememberMe || false);
  return convertNewUserToOldFormat(newUser);
};

export const register = async (
  nameOrEmail: string,
  emailOrPassword: string,
  passwordOrConfirmPassword?: string,
  confirmPassword?: string,
  username?: string,
  bio?: string
): Promise<UnifiedUser | { user: UnifiedUser; needsVerification: boolean }> => {
  // New system: (email, password, fullName, username?, bio?)
  const result = await newRegisterUser(nameOrEmail, emailOrPassword, passwordOrConfirmPassword || '', username, bio);
  return {
    user: convertNewUserToOldFormat(result.user),
    needsVerification: result.needsVerification
  };
};

export const getCurrentUser = (): UnifiedUser | null => {
  const newUser = newGetCurrentUser();
  return newUser ? convertNewUserToOldFormat(newUser) : null;
};

export const verifyToken = async (): Promise<UnifiedUser> => {
  const newUser = await newVerifyToken();
  return convertNewUserToOldFormat(newUser);
};

export const logout = async (): Promise<void> => {
  await newLogoutUser();
};

// Alias for backward compatibility
export const logoutUser = logout;

export const getDashboardUrl = (role: string): string => {
  const roleRoutes: Record<string, string> = {
    'AUTHOR': '/dashboard/author',
    'ADMIN': '/dashboard/admin',
    'READER': '/', // READER (default from registration) stays on main page with updated navbar
    'CLIENT': '/' // Same as READER - backward compatibility
  };

  return roleRoutes[role] || '/';
};

// Auth system specific functions
export const verifyEmail = async (token: string): Promise<UnifiedUser | null> => {
  const newUser = await newVerifyEmail(token);
  return convertNewUserToOldFormat(newUser);
};

export const forgotPassword = async (email: string): Promise<void> => {
  await newForgotPassword(email);
};

export const resetPassword = async (token: string, password: string): Promise<void> => {
  await newResetPassword(token, password);
};

export const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  await newChangePassword(currentPassword, newPassword);
};

export const updateProfile = async (profileData: {
  full_name?: string;
  username?: string;
  bio?: string;
  avatar_url?: string;
}): Promise<UnifiedUser | null> => {
  const newUser = await newUpdateProfile(profileData);
  return convertNewUserToOldFormat(newUser);
};

export const getUserProfile = async (): Promise<UnifiedUser | null> => {
  const newUser = await newGetUserProfile();
  return convertNewUserToOldFormat(newUser);
};

// Utility functions
export const isNewAuthSystem = (): boolean => true;
export const getAuthSystemType = () => 'new' as const;

// Feature availability checks (all features available)
export const hasEmailVerification = (): boolean => true;
export const hasForgotPassword = (): boolean => true;
export const hasProfileUpdate = (): boolean => true;
export const hasPasswordChange = (): boolean => true;
