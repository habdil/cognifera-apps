"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Eye,
  ThumbsUp,
  MessageSquare,
  FileText,
  TrendingUp,
  TrendingDown,
  Minus,
  PlusCircle,
  BarChart3,
  MessageCircle,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { DashboardContentProps } from '../../shared/types';
import {
  getAnalyticsOverview,
  getTopArticles,
  formatNumber,
  formatDate,
  getTrendDirection,
  type AnalyticsOverview,
  type TopArticle
} from '@/lib/api/author-analytics';
import {
  getAuthorComments,
  formatRelativeTime,
  type AuthorComment
} from '@/lib/api/author-comments';

export function AuthorDashboard({ user }: DashboardContentProps) {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [topArticles, setTopArticles] = useState<TopArticle[]>([]);
  const [recentComments, setRecentComments] = useState<AuthorComment[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleNewArticle = () => {
    if (onNavigate) {
      onNavigate('create');
    }
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const [overviewResult, topArticlesResult, commentsResult] = await Promise.all([
        getAnalyticsOverview('30days'),
        getTopArticles({ limit: 3, sortBy: 'views' }),
        getAuthorComments({ limit: 5, sortBy: 'newest' })
      ]);

      if (overviewResult.success && overviewResult.data) {
        setOverview(overviewResult.data);
      }

      if (topArticlesResult.success && topArticlesResult.data) {
        setTopArticles(topArticlesResult.data);
      }

      if (commentsResult.success && commentsResult.data) {
        setRecentComments(commentsResult.data.comments);
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      toast.error('Gagal memuat data dashboard');
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trendValue: number) => {
    const direction = getTrendDirection(trendValue);
    if (direction === 'up') return <TrendingUp className="h-3 w-3" />;
    if (direction === 'down') return <TrendingDown className="h-3 w-3" />;
    return <Minus className="h-3 w-3" />;
  };

  const getTrendColor = (trendValue: number) => {
    const direction = getTrendDirection(trendValue);
    if (direction === 'up') return 'text-green-600';
    if (direction === 'down') return 'text-red-600';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user?.fullName || user?.name || 'Author'}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s what&apos;s happening with your articles
        </p>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : overview ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {formatNumber(overview.totalViews)}
              </div>
              <p className="text-xs flex items-center gap-1 mt-1">
                {getTrendIcon(overview.trends.viewsTrend)}
                <span className={getTrendColor(overview.trends.viewsTrend)}>
                  {overview.trends.viewsTrend >= 0 ? '+' : ''}{overview.trends.viewsTrend.toFixed(1)}%
                </span>
                <span className="text-muted-foreground">vs last month</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {formatNumber(overview.totalLikes)}
              </div>
              <p className="text-xs flex items-center gap-1 mt-1">
                {getTrendIcon(overview.trends.likesTrend)}
                <span className={getTrendColor(overview.trends.likesTrend)}>
                  {overview.trends.likesTrend >= 0 ? '+' : ''}{overview.trends.likesTrend.toFixed(1)}%
                </span>
                <span className="text-muted-foreground">vs last month</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comments</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {formatNumber(overview.totalComments)}
              </div>
              <p className="text-xs flex items-center gap-1 mt-1">
                {getTrendIcon(overview.trends.commentsTrend)}
                <span className={getTrendColor(overview.trends.commentsTrend)}>
                  {overview.trends.commentsTrend >= 0 ? '+' : ''}{overview.trends.commentsTrend.toFixed(1)}%
                </span>
                <span className="text-muted-foreground">vs last month</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Articles</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {overview.publishedArticles}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {overview.draftArticles} draft{overview.draftArticles !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Articles */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Articles</CardTitle>
            <CardDescription>Your best articles this month</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                    <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : topArticles.length > 0 ? (
              <div className="space-y-3">
                {topArticles.map((article, index) => (
                  <div
                    key={article.id}
                    className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm line-clamp-1">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {formatNumber(article.views)}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {formatNumber(article.likes)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {article.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No articles yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Comments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Comments</CardTitle>
            <CardDescription>Latest feedback from readers</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                    <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentComments.length > 0 ? (
              <div className="space-y-3">
                {recentComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src={comment.user.avatarUrl || undefined} />
                      <AvatarFallback className="text-xs">
                        {comment.user.fullName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground text-sm">
                          {comment.user.fullName}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatRelativeTime(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-1">
                        on: {comment.article.title}
                      </p>
                      <p className="text-sm text-foreground line-clamp-2">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No comments yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump to common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              className="gap-2"
              onClick={handleNewArticle}
            >
              <PlusCircle className="h-4 w-4" />
              Create New Article
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                const event = new CustomEvent('dashboard-navigate', { detail: { tab: 'analytics' } });
                window.dispatchEvent(event);
              }}
            >
              <BarChart3 className="h-4 w-4" />
              View Analytics
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                const event = new CustomEvent('dashboard-navigate', { detail: { tab: 'comments' } });
                window.dispatchEvent(event);
              }}
            >
              <MessageSquare className="h-4 w-4" />
              Manage Comments
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

AuthorDashboard.displayName = 'AuthorDashboard';
function onNavigate(arg0: string) {
  throw new Error('Function not implemented.');
}

