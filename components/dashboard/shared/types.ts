// User interface - compatible with NewUser from auth-new.ts
export interface UnifiedUser {
  id: string;
  full_name: string;  // Primary field from new auth
  fullName?: string;  // Legacy compatibility
  name?: string;      // Legacy compatibility
  email: string;
  role: string;
  username?: string;
  bio?: string;
  avatar_url?: string | null;  // Match NewUser type
  avatarUrl?: string;           // Legacy compatibility
  status?: string;
  is_verified?: boolean;
  created_at?: string;
  last_login_at?: string | null;
}

// Profile data interface
export interface ProfileData {
  fullName: string;
  email: string;
  username: string;
  bio: string;
}

// Component props interfaces
export interface DashboardContentProps {
  user: UnifiedUser | null;
}

export interface RoleContentProps {
  userRole: string;
}

export interface SettingsContentProps {
  user: UnifiedUser | null;
  onUpdateProfile: (data: ProfileData) => void;
}