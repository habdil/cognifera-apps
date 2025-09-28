"use client";

import { useState, memo, useMemo, useCallback } from 'react';
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
  Target,
  BookOpen,
  Eye
} from 'lucide-react';
import { useUnifiedAuth } from '@/hooks/useUnifiedAuth';
import { logout } from '@/lib/auth-config';
import { toast } from 'sonner';

// Content Components by Role
const DashboardContent = memo(({ user }: { user: any }) => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">Dashboard</h1>
      <p className="text-[var(--color-muted-foreground)]">Welcome back, {user?.fullName || user?.name || 'User'}</p>
    </div>

    {user?.role === 'ADMIN' && (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Users', value: '234', desc: 'Registered users' },
          { title: 'Articles', value: '89', desc: 'Published articles' },
          { title: 'Comments', value: '456', desc: 'Total comments' },
          { title: 'Analytics', value: '12K', desc: 'Monthly views' }
        ].map((stat, i) => (
          <div key={i} className="bg-[var(--color-background)] p-6 rounded-lg border border-[var(--color-border)]">
            <h3 className="font-medium text-[var(--color-foreground)]">{stat.title}</h3>
            <p className="text-2xl font-bold text-[var(--color-primary)] mt-2">{stat.value}</p>
            <p className="text-sm text-[var(--color-muted-foreground)] mt-1">{stat.desc}</p>
          </div>
        ))}
      </div>
    )}

    {user?.role === 'AUTHOR' && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Total Articles', value: '12', desc: 'Published articles' },
          { title: 'Views', value: '1,234', desc: 'This month' },
          { title: 'Comments', value: '56', desc: 'Pending review' }
        ].map((stat, i) => (
          <div key={i} className="bg-[var(--color-background)] p-6 rounded-lg border border-[var(--color-border)]">
            <h3 className="font-medium text-[var(--color-foreground)]">{stat.title}</h3>
            <p className="text-2xl font-bold text-[var(--color-primary)] mt-2">{stat.value}</p>
            <p className="text-sm text-[var(--color-muted-foreground)] mt-1">{stat.desc}</p>
          </div>
        ))}
      </div>
    )}

    {user?.role === 'READER' && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'Articles Read', value: '23', desc: 'This month' },
          { title: 'Bookmarks', value: '8', desc: 'Saved articles' }
        ].map((stat, i) => (
          <div key={i} className="bg-[var(--color-background)] p-6 rounded-lg border border-[var(--color-border)]">
            <h3 className="font-medium text-[var(--color-foreground)]">{stat.title}</h3>
            <p className="text-2xl font-bold text-[var(--color-primary)] mt-2">{stat.value}</p>
            <p className="text-sm text-[var(--color-muted-foreground)] mt-1">{stat.desc}</p>
          </div>
        ))}
      </div>
    )}
  </div>
));

const ArticlesContent = memo(({ userRole }: { userRole: string }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">
        {userRole === 'READER' ? 'My Library' : 'Articles'}
      </h1>
      {userRole !== 'READER' && (
        <button className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
          {userRole === 'ADMIN' ? 'Manage Articles' : 'New Article'}
        </button>
      )}
    </div>

    <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] p-6">
      <h3 className="font-medium text-[var(--color-foreground)] mb-4">
        {userRole === 'READER' ? 'Recently Read' : 'Recent Articles'}
      </h3>
      <div className="space-y-3">
        {[
          'Getting Started with Next.js',
          'Advanced React Patterns',
          'Building Scalable APIs'
        ].map((title, i) => (
          <div key={i} className="flex justify-between items-center p-3 hover:bg-[var(--color-muted)] rounded-lg transition-colors">
            <span className="text-[var(--color-foreground)]">{title}</span>
            <span className="text-sm text-[var(--color-muted-foreground)]">
              {userRole === 'READER' ? 'Read' : 'Published'}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
));

const CreateContent = memo(() => (
  <div className="space-y-6">
    <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">Create Content</h1>

    <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Title</label>
          <input
            type="text"
            className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)]"
            placeholder="Enter content title..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Content</label>
          <textarea
            rows={10}
            className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)]"
            placeholder="Write your content..."
          />
        </div>
        <button className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
          Publish
        </button>
      </div>
    </div>
  </div>
));

const UsersContent = memo(() => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">Users Management</h1>
      <button className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
        Add User
      </button>
    </div>

    <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] p-6">
      <h3 className="font-medium text-[var(--color-foreground)] mb-4">Recent Users</h3>
      <div className="space-y-3">
        {[
          { name: 'John Doe', email: 'john@example.com', role: 'AUTHOR' },
          { name: 'Jane Smith', email: 'jane@example.com', role: 'READER' },
          { name: 'Bob Johnson', email: 'bob@example.com', role: 'AUTHOR' }
        ].map((user, i) => (
          <div key={i} className="flex justify-between items-center p-3 hover:bg-[var(--color-muted)] rounded-lg transition-colors">
            <div>
              <span className="text-[var(--color-foreground)] font-medium">{user.name}</span>
              <p className="text-sm text-[var(--color-muted-foreground)]">{user.email}</p>
            </div>
            <span className="text-sm bg-[var(--color-muted)] px-2 py-1 rounded">{user.role}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
));

const AnalyticsContent = memo(() => (
  <div className="space-y-6">
    <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">Analytics</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-[var(--color-background)] p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="font-medium text-[var(--color-foreground)] mb-4">Page Views</h3>
        <div className="h-48 flex items-center justify-center text-[var(--color-muted-foreground)]">
          Chart placeholder
        </div>
      </div>
      <div className="bg-[var(--color-background)] p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="font-medium text-[var(--color-foreground)] mb-4">User Engagement</h3>
        <div className="h-48 flex items-center justify-center text-[var(--color-muted-foreground)]">
          Chart placeholder
        </div>
      </div>
    </div>
  </div>
));

const CommentsContent = memo(() => (
  <div className="space-y-6">
    <h1 className="text-2xl font-semibent text-[var(--color-foreground)]">Comments</h1>

    <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] p-6">
      <h3 className="font-medium text-[var(--color-foreground)] mb-4">Recent Comments</h3>
      <div className="space-y-4">
        {[
          { author: 'John Doe', comment: 'Great article! Very helpful.', article: 'Getting Started with Next.js' },
          { author: 'Jane Smith', comment: 'Thanks for sharing this.', article: 'Advanced React Patterns' },
          { author: 'Bob Johnson', comment: 'Could you add more examples?', article: 'Building Scalable APIs' }
        ].map((item, i) => (
          <div key={i} className="border border-[var(--color-border)] p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium text-[var(--color-foreground)]">{item.author}</span>
              <span className="text-sm text-[var(--color-muted-foreground)]">2 hours ago</span>
            </div>
            <p className="text-[var(--color-foreground)] mb-2">{item.comment}</p>
            <p className="text-sm text-[var(--color-muted-foreground)]">On: {item.article}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
));

const SettingsContent = memo(({ user, onUpdateProfile }: { user: any; onUpdateProfile: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || user?.name || '',
    email: user?.email || '',
    username: user?.username || '',
    bio: user?.bio || ''
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!formData.fullName || !formData.email) {
      toast.error('Name and email are required');
      return;
    }

    setIsSaving(true);
    try {
      await onUpdateProfile(formData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">Settings</h1>

      <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-[var(--color-foreground)] mb-4">Profile Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)]"
                />
              </div>
              {user?.username !== undefined && (
                <div>
                  <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)]"
                  />
                </div>
              )}
              {user?.bio !== undefined && (
                <div>
                  <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)]"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-[var(--color-foreground)] mb-4">Preferences</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-[var(--color-foreground)]">Email notifications</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-[var(--color-foreground)]">Auto-save drafts</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-6 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
});

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
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'comments', label: 'Comments', icon: MessageSquare },
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
      { id: 'articles', label: 'My Library', icon: BookOpen },
      ...baseItems.slice(1) // Settings
    ];
  }

  return baseItems;
};

// Main component
export const UnifiedDashboard = memo(() => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter();

  // Use auth hook with fallback to mock user for testing
  const { user: authUser, loading, error } = useUnifiedAuth();

  // Fallback to mock user when auth fails (for testing)
  const user = authUser || {
    id: 'mock-user-001',
    fullName: 'Test User',
    email: 'user@test.com',
    role: 'AUTHOR' // Default fallback role
  };

  const menuItems = useMemo(() => getMenuItems(user?.role || 'READER'), [user?.role]);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
      router.push('/');
    }
  }, [router]);

  const handleUpdateProfile = useCallback(async (profileData: any) => {
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
    switch (activeTab) {
      case 'dashboard': return <DashboardContent user={user} />;
      case 'articles': return <ArticlesContent userRole={user?.role || 'READER'} />;
      case 'create': return <CreateContent />;
      case 'users': return <UsersContent />;
      case 'analytics': return <AnalyticsContent />;
      case 'comments': return <CommentsContent />;
      case 'settings': return <SettingsContent user={user} onUpdateProfile={handleUpdateProfile} />;
      default: return <DashboardContent user={user} />;
    }
  }, [activeTab, user, handleUpdateProfile]);

  return (
    <div className="flex h-screen bg-[var(--color-muted)]">
      {/* Sidebar - Always visible, never reloads */}
      <div className="w-64 bg-[var(--color-background)] border-r border-[var(--color-border)] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[var(--color-border)]">
          <h2 className="text-xl font-bold text-[var(--color-primary)]">Cognifera</h2>
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
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
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