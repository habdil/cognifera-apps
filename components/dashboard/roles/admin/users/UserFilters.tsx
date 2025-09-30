import { memo } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UserFiltersProps {
  searchQuery: string;
  roleFilter: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onAddUserClick: () => void;
}

export const UserFilters = memo(({
  searchQuery,
  roleFilter,
  statusFilter,
  onSearchChange,
  onRoleFilterChange,
  onStatusFilterChange,
  onAddUserClick
}: UserFiltersProps) => {
  return (
    <div className="bg-[var(--color-background)] p-6 rounded-lg border border-[var(--color-border)]">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
          <Input
            placeholder="Cari user berdasarkan nama atau email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Role Filter */}
        <Select value={roleFilter} onValueChange={onRoleFilterChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Semua Role" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all" className='hover:bg-[var(--color-muted)]'>Semua Role</SelectItem>
            <SelectItem value="ADMIN" className='hover:bg-[var(--color-muted)]'>Admin</SelectItem>
            <SelectItem value="AUTHOR" className='hover:bg-[var(--color-muted)]'>Author</SelectItem>
            <SelectItem value="READER" className='hover:bg-[var(--color-muted)]'>Client</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectItem value="all" className='hover:bg-[var(--color-muted)]'>Semua Status</SelectItem>
            <SelectItem value="ACTIVE" className='hover:bg-[var(--color-muted)]'>Active</SelectItem>
            <SelectItem value="BLOCKED" className='hover:bg-[var(--color-muted)]'>Blocked</SelectItem>
          </SelectContent>
        </Select>

        {/* Add User Button */}
        <Button className="whitespace-nowrap" onClick={onAddUserClick}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>
    </div>
  );
});

UserFilters.displayName = 'UserFilters';