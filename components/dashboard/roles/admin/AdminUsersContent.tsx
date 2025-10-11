"use client";

import { memo, useState, useMemo, useEffect } from 'react';
import { UserData } from '@/lib/api/users';
import { toast } from 'sonner';
import {
  UserStatsCards,
  UserFilters,
  UserTableRow,
  UserPagination,
  AddUserDialog,
  UserEmptyState
} from './users';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Loader2 } from 'lucide-react';
import {
  fetchUsers,
  createUser,
  toggleUserStatus,
  deleteUser,
  fetchUserStats,
  updateUserRole
} from '@/lib/api/users';

export const AdminUsersContent = memo(() => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeAuthors: 0,
    activeClients: 0,
    blockedUsers: 0
  });
  const itemsPerPage = 10;

  // Fetch users from API
  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const result = await fetchUsers({
          page: currentPage,
          limit: itemsPerPage,
          search: searchQuery,
          role: roleFilter,
          status: statusFilter
        });

        setUsers(result.data.users);
        setTotal(result.data.total);
      } catch (error) {
        console.error('Failed to load users:', error);
        toast.error('Gagal memuat data users', {
          description: error instanceof Error ? error.message : 'Terjadi kesalahan'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [currentPage, searchQuery, roleFilter, statusFilter]);

  // Fetch stats from API
  useEffect(() => {
    const loadStats = async () => {
      try {
        const result = await fetchUserStats();
        setStats(result.data);
      } catch (error) {
        console.error('Failed to load stats:', error);
      }
    };

    loadStats();
  }, [users]); // Reload stats when users change

  // Pagination
  const totalPages = Math.ceil(total / itemsPerPage);

  // Handlers
  const handleView = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      toast.info(`Viewing profile: ${user.fullName}`);
    }
  };

  const handleToggleBlock = async (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const newStatus = user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';

    try {
      const result = await toggleUserStatus(userId, newStatus);

      // Update local state
      setUsers(prev => prev.map(u =>
        u.id === userId ? result.data.user : u
      ));

      toast.success(
        newStatus === 'BLOCKED' ? 'User berhasil diblokir' : 'User berhasil diaktifkan kembali'
      );
    } catch (error) {
      console.error('Toggle block error:', error);
      toast.error('Gagal mengubah status user', {
        description: error instanceof Error ? error.message : 'Terjadi kesalahan'
      });
    }
  };

  const handleDelete = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete.id);

      // Remove from local state
      setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
      setIsDeleteDialogOpen(false);

      toast.success('User berhasil dihapus', {
        description: `${userToDelete.fullName} telah dihapus dari sistem`
      });

      setUserToDelete(null);

      // Reload first page if current page becomes empty
      if (users.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error('Delete user error:', error);
      toast.error('Gagal menghapus user', {
        description: error instanceof Error ? error.message : 'Terjadi kesalahan'
      });
    }
  };

  const handleAddUser = async (userData: { fullName: string; email: string; role: string; password: string; bio?: string }) => {
    try {
      const result = await createUser(userData);

      // Reload users from first page
      setCurrentPage(1);
      const usersResult = await fetchUsers({
        page: 1,
        limit: itemsPerPage,
        search: searchQuery,
        role: roleFilter,
        status: statusFilter
      });

      setUsers(usersResult.data.users);
      setTotal(usersResult.data.total);

      toast.success('User berhasil ditambahkan', {
        description: result.data.emailSent
          ? `${userData.fullName} telah ditambahkan sebagai ${userData.role === 'AUTHOR' ? 'Author' : 'Client'}. Credential akan dikirim ke email.`
          : `${userData.fullName} berhasil dibuat, namun email gagal terkirim`
      });

      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Add user error:', error);
      toast.error('Gagal menambahkan user', {
        description: error instanceof Error ? error.message : 'Terjadi kesalahan'
      });
    }
  };

  const handleUpdateRole = async (userId: string, newRole: 'AUTHOR' | 'READER') => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    try {
      const result = await updateUserRole(userId, newRole);

      // Update local state
      setUsers(prev => prev.map(u =>
        u.id === userId ? result.data.user : u
      ));

      toast.success('Role user berhasil diubah', {
        description: `${user.fullName} sekarang menjadi ${newRole === 'AUTHOR' ? 'Author' : 'Client'}`
      });
    } catch (error) {
      console.error('Update role error:', error);
      toast.error('Gagal mengubah role user', {
        description: error instanceof Error ? error.message : 'Terjadi kesalahan'
      });
    }
  };

  // Get existing emails for validation
  const existingEmails = useMemo(() => {
    return users.map(u => u.email.toLowerCase());
  }, [users]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setRoleFilter('all');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">User Management</h1>
          <p className="text-[var(--color-muted-foreground)] mt-1">Kelola semua akun pengguna</p>
        </div>
      </div>

      {/* Stats Cards */}
      <UserStatsCards stats={stats} />

      {/* Search & Filters */}
      <UserFilters
        searchQuery={searchQuery}
        roleFilter={roleFilter}
        statusFilter={statusFilter}
        onSearchChange={setSearchQuery}
        onRoleFilterChange={setRoleFilter}
        onStatusFilterChange={setStatusFilter}
        onAddUserClick={() => setIsAddDialogOpen(true)}
      />

      {/* Loading State */}
      {isLoading ? (
        <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] p-12 text-center">
          <Loader2 className="w-12 h-12 text-[var(--color-muted-foreground)] mx-auto mb-4 animate-spin" />
          <p className="text-[var(--color-muted-foreground)]">Memuat data users...</p>
        </div>
      ) : (
        <>
          {/* Users Table */}
          {users.length > 0 ? (
            <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[var(--color-muted)]">
                    <tr>
                      <th className="text-left p-4 text-sm font-semibold text-[var(--color-foreground)]">User</th>
                      <th className="text-left p-4 text-sm font-semibold text-[var(--color-foreground)]">Role</th>
                      <th className="text-left p-4 text-sm font-semibold text-[var(--color-foreground)]">Status</th>
                      <th className="text-left p-4 text-sm font-semibold text-[var(--color-foreground)]">Join Date</th>
                      <th className="text-left p-4 text-sm font-semibold text-[var(--color-foreground)]">Last Login</th>
                      <th className="text-left p-4 text-sm font-semibold text-[var(--color-foreground)]">Stats</th>
                      <th className="text-center p-4 text-sm font-semibold text-[var(--color-foreground)]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <UserTableRow
                        key={user.id}
                        user={user}
                        onView={handleView}
                        onToggleBlock={handleToggleBlock}
                        onDelete={handleDelete}
                        onUpdateRole={handleUpdateRole}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <UserPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={total}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            <UserEmptyState onReset={handleResetFilters} />
          )}
        </>
      )}

      {/* Add User Dialog */}
      <AddUserDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddUser={handleAddUser}
        existingEmails={existingEmails}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <DialogTitle>Hapus User?</DialogTitle>
                <DialogDescription className="mt-1">
                  Tindakan ini tidak dapat dibatalkan
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-[var(--color-foreground)]">
              Apakah Anda yakin ingin menghapus user{' '}
              <span className="font-semibold text-[var(--color-primary)]">
                &quot;{userToDelete?.fullName}&quot;
              </span>
              ?
            </p>
            <div className="mt-4 p-3 bg-[var(--color-muted)] rounded-md">
              <p className="text-xs text-[var(--color-muted-foreground)]">
                <strong>Info:</strong> Data berikut akan dihapus:
              </p>
              <ul className="mt-2 space-y-1 text-xs text-[var(--color-muted-foreground)]">
                <li>• Email: {userToDelete?.email}</li>
                <li>• Role: {userToDelete?.role === 'AUTHOR' ? 'Author' : 'Client'}</li>
                {userToDelete?.role === 'AUTHOR' && (
                  <li>• {userToDelete?.articlesCount} artikel yang dibuat</li>
                )}
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              Hapus User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
});

AdminUsersContent.displayName = 'AdminUsersContent';