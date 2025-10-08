"use client";

import { useState, memo, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  BarChart3,
  FileText,
  MessageSquare,
  Settings,
  PlusCircle,
  User,
  LogOut,
  Home,
  Users,
  BookOpen,
  Newspaper,
  Megaphone,
  Briefcase,
  Star,
  Shield
} from 'lucide-react';
import { useUnifiedAuth } from '@/hooks/useUnifiedAuth';
import { Button } from '../ui/button';
import { Loading } from '../shared/Loading';
import Image from 'next/image';

// Import modular components
import { AdminDashboard, AdminUsersContent, AdminArticlesContent } from './roles/admin';
import { AuthorDashboard, AuthorArticlesContent, AuthorCreateContent } from './roles/author';
import AuthorCommentsContent from './roles/author/AuthorCommentsContent';
import AuthorAnalyticsContent from './roles/author/AuthorAnalyticsContent';
import { ReaderDashboard, ReaderLibraryContent, PublishBookContent, SavedNewsContent } from './roles/reader';
import { AnalyticsContent, CommentsContent, SettingsContent, ProfileData } from './shared';

// Menu items per role
const getMenuItems = (role: string) => {
  const baseItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (role === 'ADMIN') {
    return [
      ...baseItems.slice(0, 1), // Dashboard
      { id: 'users', label: 'Users', icon: Users },
      { id: 'articles', label: 'Articles', icon: FileText },
      { id: 'iklan', label: 'Iklan', icon: Megaphone },
      { id: 'layanan', label: 'Layanan', icon: Briefcase },
      { id: 'testimonial', label: 'Testimonial', icon: Star },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'comments', label: 'Comments', icon: MessageSquare },
      { id: 'security', label: 'Security', icon: Shield },
      ...baseItems.slice(1) // Settings
    ];
  }

  if (role === 'AUTHOR') {
    return [
      ...baseItems.slice(0, 1), // Dashboard
      { id: 'articles', label: 'Articles', icon: FileText },
      { id: 'create', label: 'Create', icon: PlusCircle },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'comments', label: 'Comments', icon: MessageSquare },
      ...baseItems.slice(1) // Settings
    ];
  }

  if (role === 'READER') {
    return [
      ...baseItems.slice(0, 1), // Dashboard
      { id: 'publish-book', label: 'Terbitkan Buku', icon: BookOpen },
      { id: 'saved-news', label: 'Berita Tersimpan', icon: Newspaper },
      ...baseItems.slice(1) // Settings
    ];
  }

  return baseItems;
};

// Main component
export const UnifiedDashboard = memo(() => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Use auth hook with fallback to mock user for testing
  const { user: authUser } = useUnifiedAuth();

  // Fallback to mock user when auth fails (for testing)
  const user = useMemo(() => authUser || {
    id: 'mock-user-001',
    fullName: 'Test User',
    email: 'user@test.com',
    role: 'AUTHOR' // Default fallback role
  }, [authUser]);

  // Simulate loading state on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second loading

    // Handle dashboard navigation events from child components
    const handleNavigationEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.tab) {
        setActiveTab(customEvent.detail.tab);
      }
    };

    window.addEventListener('dashboard-navigate', handleNavigationEvent);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('dashboard-navigate', handleNavigationEvent);
    };
  }, []);

  const menuItems = useMemo(() => getMenuItems(user?.role || 'READER'), [user?.role]);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  const handleLogout = useCallback(async () => {
      router.push('/');
  }, [router]);

  const handleUpdateProfile = useCallback(async (profileData: ProfileData) => {
    try {
      const { updateProfile } = await import('@/lib/auth-config');
      await updateProfile({
        full_name: profileData.fullName,
        username: profileData.username,
        bio: profileData.bio
      });
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  }, []);

  const renderContent = useMemo(() => {
    const userRole = user?.role || 'READER';

    switch (activeTab) {
      case 'dashboard':
        if (userRole === 'ADMIN') return <AdminDashboard user={user} />;
        if (userRole === 'AUTHOR') return <AuthorDashboard user={user} />;
        if (userRole === 'READER') return <ReaderDashboard user={user} />;
        return <ReaderDashboard user={user} />; // fallback

      case 'articles':
        if (userRole === 'ADMIN') return <AdminArticlesContent />;
        if (userRole === 'AUTHOR') return <AuthorArticlesContent onNavigate={handleTabChange} />;
        if (userRole === 'READER') return <ReaderLibraryContent />;
        return <ReaderLibraryContent />; // fallback

      case 'publish-book':
        return <PublishBookContent />;

      case 'saved-news':
        return <SavedNewsContent />;

      case 'create':
        return <AuthorCreateContent onNavigate={handleTabChange} />;

      case 'users':
        return <AdminUsersContent />;

      case 'iklan':
        return <div className="p-8"><h2 className="text-2xl font-bold">Iklan Management</h2><p className="text-muted-foreground mt-2">Content coming soon...</p></div>;

      case 'layanan':
        return <div className="p-8"><h2 className="text-2xl font-bold">Layanan Management</h2><p className="text-muted-foreground mt-2">Content coming soon...</p></div>;

      case 'testimonial':
        return <div className="p-8"><h2 className="text-2xl font-bold">Testimonial Management</h2><p className="text-muted-foreground mt-2">Content coming soon...</p></div>;

      case 'security':
        return <div className="p-8"><h2 className="text-2xl font-bold">Security & Moderation</h2><p className="text-muted-foreground mt-2">Content coming soon...</p></div>;

      case 'analytics':
        // Use AuthorAnalyticsContent for AUTHOR role, generic AnalyticsContent for others
        if (userRole === 'AUTHOR') {
          return <AuthorAnalyticsContent />;
        }
        return <AnalyticsContent />;

      case 'comments':
        // Use AuthorCommentsContent for AUTHOR role, generic CommentsContent for others
        if (userRole === 'AUTHOR') {
          return <AuthorCommentsContent />;
        }
        return <CommentsContent />;

      case 'settings':
        return <SettingsContent user={user} onUpdateProfile={handleUpdateProfile} />;

      default:
        if (userRole === 'ADMIN') return <AdminDashboard user={user} />;
        if (userRole === 'AUTHOR') return <AuthorDashboard user={user} />;
        return <ReaderDashboard user={user} />;
    }
  }, [activeTab, user, handleUpdateProfile]);

  // Show loading screen
  if (isLoading) {
    return <Loading message="Mempersiapkan halaman ..." />;
  }

  return (
    <div className="flex h-screen bg-[var(--color-muted)]">
      {/* Sidebar - Always visible, never reloads */}
      <div className="w-64 bg-[var(--color-background)] border-r border-[var(--color-border)] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-center">
          <Image
            src="/logo-sidebar.png"
            alt="Logo Cognifera"
            width={100}
            height={40}
            className="object-contain"
          />
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-[var(--color-border)]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-[var(--color-primary-foreground)]" />
            </div>
            <div>
              <p className="font-medium text-[var(--color-foreground)] text-sm">{user?.fullName || user?.name || 'User'}</p>
              <p className="text-xs text-[var(--color-muted-foreground)]">{user?.role || 'USER'}</p>
              {user?.email && (
                <p className="text-xs text-[var(--color-muted-foreground)] mt-1">{user.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* Navigation - Instant switching */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                    : 'text-[var(--color-foreground)] hover:bg-[var(--color-muted)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[var(--color-border)]">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Button>
        </div>
      </div>

      {/* Content Area - Instant content switching */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent}
        </div>
      </div>
    </div>
  );
});

UnifiedDashboard.displayName = 'UnifiedDashboard';