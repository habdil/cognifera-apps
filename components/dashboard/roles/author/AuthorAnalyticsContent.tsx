"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Eye,
  ThumbsUp,
  MessageSquare,
  FileText,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import {
  getAnalyticsOverview,
  getTopArticles,
  getViewsTimeline,
  getCategoryStats,
  formatNumber,
  formatDate,
  getTrendDirection,
  type AnalyticsOverview,
  type TopArticle,
  type ViewsTimelineResponse,
  type CategoryStat,
  type PeriodType
} from '@/lib/api/author-analytics';

export default function AuthorAnalyticsContent() {
  const [period, setPeriod] = useState<PeriodType>('7days');
  const [loading, setLoading] = useState(true);

  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [topArticles, setTopArticles] = useState<TopArticle[]>([]);
  const [timeline, setTimeline] = useState<ViewsTimelineResponse | null>(null);
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);

  useEffect(() => {
    loadAnalytics();
  }, [period]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      const [overviewResult, topArticlesResult, timelineResult, categoryResult] = await Promise.all([
        getAnalyticsOverview(period),
        getTopArticles({ limit: 5, sortBy: 'views' }),
        getViewsTimeline({ period }),
        getCategoryStats(4)
      ]);

      if (overviewResult.success && overviewResult.data) {
        setOverview(overviewResult.data);
      } else {
        toast.error(overviewResult.message || 'Gagal memuat overview');
      }

      if (topArticlesResult.success && topArticlesResult.data) {
        setTopArticles(topArticlesResult.data);
      } else {
        toast.error(topArticlesResult.message || 'Gagal memuat top articles');
      }

      if (timelineResult.success && timelineResult.data) {
        setTimeline(timelineResult.data);
      } else {
        toast.error(timelineResult.message || 'Gagal memuat timeline');
      }

      if (categoryResult.success && categoryResult.data) {
        setCategoryStats(categoryResult.data);
      } else {
        toast.error(categoryResult.message || 'Gagal memuat category stats');
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
      toast.error('Gagal memuat data analytics');
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trendValue: number) => {
    const direction = getTrendDirection(trendValue);
    if (direction === 'up') return <TrendingUp className="h-3 w-3 text-green-600" />;
    if (direction === 'down') return <TrendingDown className="h-3 w-3 text-red-600" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  const getTrendColor = (trendValue: number) => {
    const direction = getTrendDirection(trendValue);
    if (direction === 'up') return 'text-green-600';
    if (direction === 'down') return 'text-red-600';
    return 'text-muted-foreground';
  };

  const formatDateShort = (dateStr: string): string => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Header with Period Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics</h2>
          <p className="text-muted-foreground">Pantau performa artikel Anda</p>
        </div>
        <Select value={period} onValueChange={(value) => setPeriod(value as PeriodType)}>
          <SelectTrigger className="w-[180px]">
            <Calendar className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectItem value="7days">7 Hari Terakhir</SelectItem>
            <SelectItem value="30days">30 Hari Terakhir</SelectItem>
            <SelectItem value="90days">90 Hari Terakhir</SelectItem>
            <SelectItem value="1year">1 Tahun Terakhir</SelectItem>
          </SelectContent>
        </Select>
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
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                {getTrendIcon(overview.trends.viewsTrend)}
                <span className={getTrendColor(overview.trends.viewsTrend)}>
                  {overview.trends.viewsTrend >= 0 ? '+' : ''}{overview.trends.viewsTrend.toFixed(1)}%
                </span> dari period lalu
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
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                {getTrendIcon(overview.trends.likesTrend)}
                <span className={getTrendColor(overview.trends.likesTrend)}>
                  {overview.trends.likesTrend >= 0 ? '+' : ''}{overview.trends.likesTrend.toFixed(1)}%
                </span> dari period lalu
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {formatNumber(overview.totalComments)}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                {getTrendIcon(overview.trends.commentsTrend)}
                <span className={getTrendColor(overview.trends.commentsTrend)}>
                  {overview.trends.commentsTrend >= 0 ? '+' : ''}{overview.trends.commentsTrend.toFixed(1)}%
                </span> dari period lalu
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published Articles</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {overview.publishedArticles}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {overview.draftArticles} draft
              </p>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Views Over Time</CardTitle>
            <CardDescription>
              {timeline?.summary?.totalViews ? `Trend views ${timeline.summary.totalViews} total` : 'Trend views'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 flex-1" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                ))}
              </div>
            ) : timeline && timeline.timeline && timeline.timeline.length > 0 ? (
              <div className="space-y-3">
                {timeline.timeline.slice(0, 7).map((item, index) => {
                  const maxViews = Math.max(...(timeline.timeline?.map(d => d.views) || [0]));
                  const percentage = maxViews > 0 ? (item.views / maxViews) * 100 : 0;

                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-16 text-sm text-muted-foreground">{formatDateShort(item.date)}</div>
                      <div className="flex-1">
                        <div className="h-8 bg-muted rounded-md overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-16 text-right text-sm font-medium text-foreground">
                        {formatNumber(item.views)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                <p>Belum ada data views</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Categories</CardTitle>
            <CardDescription>Kategori dengan views tertinggi</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
            ) : categoryStats.length > 0 ? (
              <div className="space-y-4">
                {categoryStats.map((item, index) => {
                  const maxViews = Math.max(...categoryStats.map(c => c.totalViews));
                  const percentage = maxViews > 0 ? (item.totalViews / maxViews) * 100 : 0;

                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">{item.category}</span>
                        <span className="text-muted-foreground">{formatNumber(item.totalViews)} views</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                <p>Belum ada data kategori</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Articles */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Articles</CardTitle>
          <CardDescription>Artikel dengan engagement tertinggi</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4 p-4 border border-border rounded-lg">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-3 w-32" />
                    <div className="flex gap-6">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </div>
          ) : topArticles.length > 0 ? (
            <div className="space-y-3">
              {topArticles.map((article, index) => (
                <div
                  key={article.id}
                  className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    {index + 1}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-semibold text-foreground line-clamp-1">
                          {article.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Published: {formatDate(article.publishedAt)} • {article.category}
                        </p>
                      </div>
                      <Badge variant="secondary" className="gap-1">
                        {article.engagementRate.toFixed(1)}% engagement
                      </Badge>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {formatNumber(article.views)}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        {formatNumber(article.likes)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {article.comments}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <AlertCircle className="h-12 w-12 mx-auto mb-4" />
              <p>Belum ada artikel published</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
