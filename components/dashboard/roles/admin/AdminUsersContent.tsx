import { memo } from 'react';

export const AdminUsersContent = memo(() => {
  return (
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
  );
});

AdminUsersContent.displayName = 'AdminUsersContent';