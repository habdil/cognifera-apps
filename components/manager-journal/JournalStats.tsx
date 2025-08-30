"use client";

import { TrendingUp, Users, Eye, Download, BookOpen } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease";
  icon: React.ReactNode;
  description?: string;
}

function StatsCard({ title, value, change, changeType, icon, description }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--color-muted-foreground)]">{title}</p>
          <p className="text-3xl font-bold text-[var(--color-foreground)]">{value}</p>
          {change && (
            <p className={`text-sm flex items-center gap-1 mt-1 ${
              changeType === "increase" ? "text-green-600" : "text-red-600"
            }`}>
              <TrendingUp className="h-4 w-4" />
              {change}
            </p>
          )}
          {description && (
            <p className="text-xs text-[var(--color-muted-foreground)] mt-2">{description}</p>
          )}
        </div>
        <div className="text-[var(--color-primary)]">
          {icon}
        </div>
      </div>
    </div>
  );
}

export function JournalStats() {
  const stats = [
    {
      title: "Total Journals",
      value: "248",
      change: "+12.5%",
      changeType: "increase" as const,
      icon: <BookOpen className="h-8 w-8" />,
      description: "Active journals in database"
    },
    {
      title: "Total Views",
      value: "15.2K",
      change: "+8.1%",
      changeType: "increase" as const,
      icon: <Eye className="h-8 w-8" />,
      description: "This month"
    },
    {
      title: "Active Authors",
      value: "89",
      change: "+5.4%",
      changeType: "increase" as const,
      icon: <Users className="h-8 w-8" />,
      description: "Contributing authors"
    },
    {
      title: "Downloads",
      value: "3.8K",
      change: "+23.1%",
      changeType: "increase" as const,
      icon: <Download className="h-8 w-8" />,
      description: "Total downloads this month"
    }
  ];

  const recentActivities = [
    {
      id: "1",
      type: "published",
      title: "New journal published: 'AI in Healthcare'",
      author: "Dr. Smith",
      time: "2 hours ago"
    },
    {
      id: "2", 
      type: "submitted",
      title: "Journal submitted for review",
      author: "Prof. Johnson",
      time: "5 hours ago"
    },
    {
      id: "3",
      type: "updated",
      title: "Journal updated: 'Climate Change Research'",
      author: "Dr. Rahman",
      time: "1 day ago"
    },
    {
      id: "4",
      type: "approved",
      title: "Journal approved for publication",
      author: "Prof. Lee",
      time: "2 days ago"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "published": return "🟢";
      case "submitted": return "🟡";
      case "updated": return "🔵";
      case "approved": return "✅";
      default: return "📄";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Dashboard</h1>
        <p className="text-[var(--color-muted-foreground)]">Overview of journal management system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)]">Recent Activities</h3>
            <button className="text-sm text-[var(--color-primary)] hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-[var(--color-muted)]/50 rounded-lg transition-colors">
                <span className="text-lg">{getActivityIcon(activity.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-foreground)] truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-[var(--color-muted-foreground)]">
                    by {activity.author} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)]">Top Categories</h3>
            <button className="text-sm text-[var(--color-primary)] hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { name: "Computer Science", count: 45, percentage: 85 },
              { name: "Environmental Science", count: 32, percentage: 65 },
              { name: "Business", count: 28, percentage: 55 },
              { name: "Medicine", count: 24, percentage: 45 },
              { name: "Engineering", count: 19, percentage: 35 }
            ].map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-[var(--color-foreground)]">{category.name}</span>
                  <span className="text-[var(--color-muted-foreground)]">{category.count} journals</span>
                </div>
                <div className="w-full bg-[var(--color-muted)] rounded-full h-2">
                  <div 
                    className="bg-[var(--color-primary)] h-2 rounded-full" 
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/80 p-6 rounded-lg text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Ready to publish more journals?</h3>
            <p className="text-white/80">Start by creating a new journal or import existing ones.</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button className="px-6 py-3 bg-white text-[var(--color-primary)] rounded-lg font-medium hover:bg-white/90 transition-colors">
              Create New Journal
            </button>
            <button className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors">
              Import Journals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}