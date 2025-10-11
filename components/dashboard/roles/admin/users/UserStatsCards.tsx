import { memo } from 'react';
import { Users, UserPlus, Ban } from 'lucide-react';

interface UserStats {
  totalUsers: number;
  activeAuthors: number;
  activeClients: number;
  blockedUsers: number;
}

interface UserStatsCardsProps {
  stats: UserStats;
}

export const UserStatsCards = memo(({ stats }: UserStatsCardsProps) => {
  const cards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'var(--color-primary)',
      bgColor: 'var(--color-primary)',
      iconBg: 'bg-[var(--color-primary)]/10'
    },
    {
      title: 'Active Authors',
      value: stats.activeAuthors,
      icon: UserPlus,
      color: '#16a34a',
      bgColor: 'green',
      iconBg: 'bg-green-100'
    },
    {
      title: 'Active Clients',
      value: stats.activeClients,
      icon: Users,
      color: '#2563eb',
      bgColor: 'blue',
      iconBg: 'bg-blue-100'
    },
    {
      title: 'Blocked Users',
      value: stats.blockedUsers,
      icon: Ban,
      color: '#dc2626',
      bgColor: 'red',
      iconBg: 'bg-red-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-[var(--color-background)] p-6 rounded-lg border border-[var(--color-border)] hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-muted-foreground)]">{card.title}</p>
                <p
                  className="text-3xl font-bold mt-2"
                  style={{ color: card.color }}
                >
                  {card.value}
                </p>
              </div>
              <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center`}>
                <Icon className="w-6 h-6" style={{ color: card.color }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

UserStatsCards.displayName = 'UserStatsCards';