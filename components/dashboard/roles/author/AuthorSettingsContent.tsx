"use client";

import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import type { UnifiedUser } from '@/components/dashboard/shared/types';
import { AvatarUploadSection, ProfileFormSection, PasswordChangeSection } from './settings';

interface AuthorSettingsContentProps {
  user: UnifiedUser | null;
}

export default function AuthorSettingsContent({ user }: AuthorSettingsContentProps) {
  const [profileData, setProfileData] = useState({
    fullName: '',
    username: '',
    email: '',
    bio: '',
    avatarUrl: ''
  });

  // Initialize profile data from user prop
  useEffect(() => {
    if (user) {
      // Handle different field name formats for backward compatibility
      const fullName = user.full_name || user.fullName || user.name || '';
      const avatarUrl = user.avatar_url || user.avatarUrl || '';

      setProfileData({
        fullName,
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        avatarUrl
      });
    }
  }, [user]);

  const handleAvatarUpdate = (newUrl: string) => {
    setProfileData(prev => ({ ...prev, avatarUrl: newUrl }));
  };

  const handleProfileUpdate = (data: { fullName: string; username: string; bio: string }) => {
    setProfileData(prev => ({ ...prev, ...data }));
  };

  if (!user) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Settings</h2>
        <p className="text-[var(--color-muted-foreground)] mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <Separator />

      {/* Avatar Upload Section */}
      <AvatarUploadSection
        avatarUrl={profileData.avatarUrl}
        fullName={profileData.fullName}
        onAvatarUpdate={handleAvatarUpdate}
      />

      {/* Profile Form Section */}
      <ProfileFormSection
        initialData={{
          fullName: profileData.fullName,
          username: profileData.username,
          email: profileData.email,
          bio: profileData.bio
        }}
        onProfileUpdate={handleProfileUpdate}
      />

      {/* Password Change Section */}
      <PasswordChangeSection />
    </div>
  );
}
