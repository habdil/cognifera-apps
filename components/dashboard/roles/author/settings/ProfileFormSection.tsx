"use client";

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { User, Mail, Save } from 'lucide-react';
import { newGetCurrentUser, newUpdateProfile } from '@/lib/auth-new';

interface ProfileFormSectionProps {
  initialData: {
    fullName: string;
    username: string;
    email: string;
    bio: string;
  };
  onProfileUpdate: (data: { fullName: string; username: string; bio: string }) => void;
}

export const ProfileFormSection = ({ initialData, onProfileUpdate }: ProfileFormSectionProps) => {
  const [profileData, setProfileData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);

  // Update form when initialData changes (reactive to prop changes)
  useEffect(() => {
    setProfileData(initialData);
  }, [initialData]);

  const handleSaveProfile = async () => {
    if (!profileData.fullName) {
      toast.error('Full name is required');
      return;
    }

    const currentUser = newGetCurrentUser();

    // Send all fields (matching backend requirements)
    const updateData = {
      full_name: profileData.fullName,
      username: profileData.username || '',
      bio: profileData.bio || '',
      avatar_url: currentUser?.avatar_url || ''
    };

    setIsSaving(true);
    try {
      await newUpdateProfile(updateData);
      onProfileUpdate({
        fullName: profileData.fullName,
        username: profileData.username,
        bio: profileData.bio
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Profile Information</span>
        </CardTitle>
        <CardDescription>
          Update your personal information and username
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={profileData.fullName}
            onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={profileData.username}
            onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
            placeholder="Enter your username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={profileData.email}
            disabled
            className="bg-gray-50 cursor-not-allowed"
          />
          <p className="text-xs text-[var(--color-muted-foreground)]">
            Email cannot be changed
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={profileData.bio}
            onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
            placeholder="Tell us about yourself"
            rows={4}
          />
        </div>

        <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );
};
