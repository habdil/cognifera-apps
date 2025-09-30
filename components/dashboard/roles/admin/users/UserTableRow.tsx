import { memo } from 'react';
import { Eye, Ban, Trash2, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserData } from '@/mock-data/users';
import { UserAvatar } from './UserAvatar';
import { formatDate, formatDateTime } from './utils';

interface UserTableRowProps {
  user: UserData;
  onView: (userId: string) => void;
  onToggleBlock: (userId: string) => void;
  onDelete: (userId: string) => void;
}

export const UserTableRow = memo(({
  user,
  onView,
  onToggleBlock,
  onDelete
}: UserTableRowProps) => {
  return (
    <tr className="border-t border-[var(--color-border)] hover:bg-[var(--color-muted)]/50 transition-colors">
      {/* User Info */}
      <td className="p-4">
        <div className="flex items-center gap-3">
          <UserAvatar name={user.fullName} size="md" />
          <div>
            <p className="font-medium text-[var(--color-foreground)]">{user.fullName}</p>
            <p className="text-sm text-[var(--color-muted-foreground)]">{user.email}</p>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="p-4">
        <Badge
          variant={
            user.role === 'ADMIN' ? 'subtle' :
            user.role === 'AUTHOR' ? 'default' :
            'secondary'
          }
          className="font-medium text-white"
        >
          {user.role === 'ADMIN' ? 'Admin' :
           user.role === 'AUTHOR' ? 'Author' :
           'Client'}
        </Badge>
      </td>

      {/* Status */}
      <td className="p-4">
        <Badge
          variant={user.status === 'ACTIVE' ? 'outline' : 'destructive'}
          className={user.status === 'ACTIVE' ? 'border-green-500 text-green-700' : ''}
        >
          {user.status === 'ACTIVE' ? (
            <>
              <CheckCircle className="w-3 h-3 mr-1" />
              Active
            </>
          ) : (
            <>
              <Ban className="w-3 h-3 mr-1" />
              Blocked
            </>
          )}
        </Badge>
      </td>

      {/* Join Date */}
      <td className="p-4">
        <p className="text-sm text-[var(--color-foreground)]">{formatDate(user.joinDate)}</p>
      </td>

      {/* Last Login */}
      <td className="p-4">
        <p className="text-sm text-[var(--color-foreground)]">{formatDateTime(user.lastLogin)}</p>
      </td>

      {/* Stats */}
      <td className="p-4">
        {user.role === 'AUTHOR' && (
          <div className="text-sm">
            <p className="text-[var(--color-foreground)]">{user.articlesCount} artikel</p>
            <p className="text-[var(--color-muted-foreground)]">
              {user.totalViews?.toLocaleString()} views
            </p>
          </div>
        )}
        {(user.role === 'READER' || user.role === 'ADMIN') && (
          <p className="text-sm text-[var(--color-muted-foreground)]">-</p>
        )}
      </td>

      {/* Actions */}
      <td className="p-4">
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-blue-100 hover:text-blue-600"
            onClick={() => onView(user.id)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={
              user.status === 'ACTIVE'
                ? 'hover:bg-red-100 hover:text-red-600'
                : 'hover:bg-green-100 hover:text-green-600'
            }
            onClick={() => onToggleBlock(user.id)}
          >
            {user.status === 'ACTIVE' ? (
              <Ban className="w-4 h-4" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-red-100 hover:text-red-600"
            onClick={() => onDelete(user.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
});

UserTableRow.displayName = 'UserTableRow';