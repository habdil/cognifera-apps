import { memo } from 'react';
import { DashboardContentProps } from '../../shared/types';

export const AdminDashboard = memo(({ user }: DashboardContentProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">Admin Dashboard</h1>
        <p className="text-[var(--color-muted-foreground)]">Welcome back, {user?.fullName || user?.name || 'Admin'}</p>
      </div>

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
    </div>
  );
});

AdminDashboard.displayName = 'AdminDashboard';