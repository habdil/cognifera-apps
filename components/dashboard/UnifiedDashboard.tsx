"use client";

import { useState, memo, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import {
  BarChart3,
  FileText,
  MessageSquare,
  Settings,
  PlusCircle,
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
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DashboardSkeleton } from '../shared/DashboardSkeleton';
import Image from 'next/image';

// Import query keys for prefetching
import { authorAnalyticsKeys } from '@/hooks/useAuthorAnalytics';
import { authorArticlesKeys } from '@/hooks/useAuthorArticles';
import { authorCommentsKeys } from '@/hooks/useAuthorComments';
import { getAnalyticsOverview, getTopArticles, getViewsTimeline, getCategoryStats } from '@/lib/api/author-analytics';
import { fetchAuthorArticles } from '@/lib/api/author-articles';
import { getAuthorComments, getCommentStats } from '@/lib/api/author-comments';

// Import modular components
import { AdminDashboard, AdminUsersContent, AdminArticlesContent } from './roles/admin';
import { AuthorDashboard, AuthorArticlesContent, AuthorCreateContent } from './roles/author';
import AuthorCommentsContent from './roles/author/AuthorCommentsContent';
import AuthorAnalyticsContent from './roles/author/AuthorAnalyticsContent';
import AuthorSettingsContent from './roles/author/AuthorSettingsContent';
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
    full_name: 'Test User',
    fullName: 'Test User', // Legacy compatibility
    email: 'user@test.com',
    role: 'AUTHOR', // Default fallback role
    avatar_url: null,
    status: 'ACTIVE',
    is_verified: true,
    created_at: new Date().toISOString()
  }, [authUser]);

  const queryClient = useQueryClient();

  // Initialize dashboard immediately + prefetch data for AUTHOR role
  useEffect(() => {
    setIsLoading(false);

    // Prefetch critical data for AUTHOR role on mount
    if (user?.role === 'AUTHOR') {
      // Prefetch analytics data for Analytics page (7 days period)
      queryClient.prefetchQuery({
        queryKey: authorAnalyticsKeys.overview('7days'),
        queryFn: async () => {
          const result = await getAnalyticsOverview('7days');
          return result.success ? result.data : null;
        },
      });

      queryClient.prefetchQuery({
        queryKey: [...authorAnalyticsKeys.topArticles(), 5, 'views'],
        queryFn: async () => {
          const result = await getTopArticles({ limit: 5, sortBy: 'views' });
          return result.success ? result.data || [] : [];
        },
      });

      queryClient.prefetchQuery({
        queryKey: authorAnalyticsKeys.timeline('7days'),
        queryFn: async () => {
          const result = await getViewsTimeline({ period: '7days' });
          return result.success ? result.data : null;
        },
      });

      queryClient.prefetchQuery({
        queryKey: [...authorAnalyticsKeys.categoryStats(), 4],
        queryFn: async () => {
          const result = await getCategoryStats(4);
          return result.success ? result.data || [] : [];
        },
      });

      // Prefetch analytics data for Dashboard (30 days period)
      queryClient.prefetchQuery({
        queryKey: authorAnalyticsKeys.overview('30days'),
        queryFn: async () => {
          const result = await getAnalyticsOverview('30days');
          return result.success ? result.data : null;
        },
      });

      queryClient.prefetchQuery({
        queryKey: [...authorAnalyticsKeys.topArticles(), 3, 'views'],
        queryFn: async () => {
          const result = await getTopArticles({ limit: 3, sortBy: 'views' });
          return result.success ? result.data || [] : [];
        },
      });

      // Prefetch articles (reduced limit)
      queryClient.prefetchQuery({
        queryKey: authorArticlesKeys.list({ status: 'all', limit: 20 }),
        queryFn: async () => {
          const result = await fetchAuthorArticles({ status: 'all', limit: 20 });
          if (!result.success) throw new Error(result.message || 'Failed to fetch articles');
          return result.data;
        },
      });

      // Prefetch comments for Comments page
      queryClient.prefetchQuery({
        queryKey: authorCommentsKeys.list({ status: 'all', page: 1, limit: 10, sortBy: 'newest', search: '' }),
        queryFn: async () => {
          const result = await getAuthorComments({ status: 'all', page: 1, limit: 10, sortBy: 'newest', search: '' });
          return result.success ? result.data : null;
        },
      });

      // Prefetch comments for Dashboard
      queryClient.prefetchQuery({
        queryKey: authorCommentsKeys.list({ status: 'all', page: 1, limit: 5, sortBy: 'newest', search: '' }),
        queryFn: async () => {
          const result = await getAuthorComments({ status: 'all', page: 1, limit: 5, sortBy: 'newest', search: '' });
          return result.success ? result.data : null;
        },
      });

      queryClient.prefetchQuery({
        queryKey: authorCommentsKeys.stats(),
        queryFn: async () => {
          const result = await getCommentStats();
          return result.success ? result.data : null;
        },
      });
    }

    // Handle dashboard navigation events from child components
    const handleNavigationEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.tab) {
        setActiveTab(customEvent.detail.tab);
      }
    };

    window.addEventListener('dashboard-navigate', handleNavigationEvent);

    return () => {
      window.removeEventListener('dashboard-navigate', handleNavigationEvent);
    };
  }, [user?.role, queryClient]);

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
        // Use AuthorSettingsContent for AUTHOR role, generic SettingsContent for others
        if (userRole === 'AUTHOR') {
          return <AuthorSettingsContent user={user} />;
        }
        return <SettingsContent user={user} onUpdateProfile={handleUpdateProfile} />;

      default:
        if (userRole === 'ADMIN') return <AdminDashboard user={user} />;
        if (userRole === 'AUTHOR') return <AuthorDashboard user={user} />;
        return <ReaderDashboard user={user} />;
    }
  }, [activeTab, user, handleUpdateProfile]);

  // Show skeleton loading
  if (isLoading) {
    return <DashboardSkeleton />;
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
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={'avatar_url' in user ? user.avatar_url || '' : ''}
                alt={'full_name' in user ? user.full_name : 'User'}
              />
              <AvatarFallback className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
                {('full_name' in user ? user.full_name : 'U')
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[var(--color-foreground)] text-sm truncate">
                {'full_name' in user ? user.full_name : 'User'}
              </p>
              <p className="text-xs text-[var(--color-muted-foreground)]">{user?.role || 'USER'}</p>
              {user?.email && (
                <p className="text-xs text-[var(--color-muted-foreground)] mt-1 truncate">{user.email}</p>
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