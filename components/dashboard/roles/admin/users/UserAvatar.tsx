import { memo } from 'react';
import { getInitials, getAvatarColor } from './utils';

interface UserAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base'
};

export const UserAvatar = memo(({ name, size = 'md' }: UserAvatarProps) => {
  return (
    <div
      className={`${sizeClasses[size]} ${getAvatarColor(name)} rounded-full flex items-center justify-center text-white font-semibold`}
    >
      {getInitials(name)}
    </div>
  );
});

UserAvatar.displayName = 'UserAvatar';