// User interface
export interface UnifiedUser {
  id: string;
  fullName?: string;
  name?: string;
  email?: string;
  role?: string;
  username?: string;
  bio?: string;
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