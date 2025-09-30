import { memo } from 'react';
import { DashboardContentProps } from '../../shared/types';

export const AuthorDashboard = memo(({ user }: DashboardContentProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">Author Dashboard</h1>
        <p className="text-[var(--color-muted-foreground)]">Welcome back, {user?.fullName || user?.name || 'Author'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Total Articles', value: '12', desc: 'Published articles' },
          { title: 'Views', value: '1,234', desc: 'This month' },
          { title: 'Comments', value: '56', desc: 'Pending review' }
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

AuthorDashboard.displayName = 'AuthorDashboard';