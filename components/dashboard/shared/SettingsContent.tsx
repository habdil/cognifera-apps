import { memo, useState } from 'react';
import { toast } from 'sonner';
import { SettingsContentProps, ProfileData } from './types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export const SettingsContent = memo(({ user, onUpdateProfile }: SettingsContentProps) => {
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
                <label htmlFor="fullName" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)]"
                />
              </div>
              {user?.username !== undefined && (
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Username</label>
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)]"
                  />
                </div>
              )}
              {user?.bio !== undefined && (
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Bio</label>
                  <Textarea
                    id="bio"
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
                <Input type="checkbox" className="rounded" />
                <span className="text-[var(--color-foreground)]">Email notifications</span>
              </label>
              <label className="flex items-center space-x-2">
                <Input type="checkbox" className="rounded" />
                <span className="text-[var(--color-foreground)]">Auto-save drafts</span>
              </label>
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-6 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
});

SettingsContent.displayName = 'SettingsContent';