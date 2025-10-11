"use client";

import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload } from 'lucide-react';
import { newGetCurrentUser, newUpdateProfile } from '@/lib/auth-new';
import { uploadAvatar } from '@/lib/api/upload';

interface AvatarUploadSectionProps {
  avatarUrl: string;
  fullName: string;
  onAvatarUpdate: (newUrl: string) => void;
}

export const AvatarUploadSection = ({ avatarUrl, fullName, onAvatarUpdate }: AvatarUploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Step 1: Upload file to storage
      const response = await uploadAvatar(file);

      if (!response?.data?.url) {
        throw new Error('Failed to upload file to storage');
      }

      const newAvatarUrl = response.data.url;

      // Step 2: Update profile with new avatar URL
      const currentUser = newGetCurrentUser();

      if (!currentUser) {
        throw new Error('User not found. Please login again.');
      }

      // Send all required fields for backend compatibility
      const updateData = {
        full_name: currentUser.full_name,
        username: currentUser.username || '',
        bio: currentUser.bio || '',
        avatar_url: newAvatarUrl,
      };

      await newUpdateProfile(updateData);

      // Notify parent component
      onAvatarUpdate(newAvatarUrl);

      toast.success('Avatar updated successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload avatar';

      // Distinguish between upload vs profile update errors
      if (errorMessage.includes('storage') || errorMessage.includes('upload')) {
        toast.error('Upload failed: ' + errorMessage);
      } else if (errorMessage.includes('profile') || errorMessage.includes('update')) {
        toast.error('Profile update failed: ' + errorMessage);
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
          <Camera className="w-4 h-4 md:w-5 md:h-5" />
          <span>Profile Picture</span>
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Update your avatar to personalize your profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <Avatar className="h-20 w-20 md:h-24 md:w-24 cursor-pointer flex-shrink-0" onClick={handleAvatarClick}>
            <AvatarImage src={avatarUrl} alt={fullName} />
            <AvatarFallback className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-xl md:text-2xl">
              {getInitials(fullName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center sm:text-left w-full sm:w-auto">
            <p className="text-xs md:text-sm text-[var(--color-muted-foreground)] mb-3">
              <span className="hidden sm:inline">Click avatar or button to upload a new picture</span>
              <span className="sm:hidden">Tap avatar or button to upload photo</span>
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAvatarClick}
              disabled={isUploading}
              className="w-full sm:w-auto text-sm"
            >
              <Upload className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{isUploading ? 'Uploading...' : 'Upload New Photo'}</span>
              <span className="sm:hidden">{isUploading ? 'Uploading...' : 'Upload Photo'}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
