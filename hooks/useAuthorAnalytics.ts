"use client";

import { useQuery } from '@tanstack/react-query';
import {
  getAnalyticsOverview,
  getTopArticles,
  getViewsTimeline,
  getCategoryStats,
  type PeriodType
} from '@/lib/api/author-analytics';

// Query keys
export const authorAnalyticsKeys = {
  overview: (period: PeriodType) => ['author-analytics', 'overview', period] as const,
  topArticles: () => ['author-analytics', 'top-articles'] as const,
  timeline: (period: PeriodType) => ['author-analytics', 'timeline', period] as const,
  categoryStats: () => ['author-analytics', 'category-stats'] as const,
};

// Hook untuk Analytics Overview
export function useAnalyticsOverview(period: PeriodType) {
  return useQuery({
    queryKey: authorAnalyticsKeys.overview(period),
    queryFn: async () => {
      const result = await getAnalyticsOverview(period);
      console.log('🔍 useAnalyticsOverview result:', result);
      if (!result.success) throw new Error(result.message);
      console.log('✅ useAnalyticsOverview data:', result.data);
      return result.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes - analytics data
  });
}

// Hook untuk Top Articles
export function useTopArticles(limit = 5, sortBy: 'views' | 'likes' | 'engagement' = 'views') {
  return useQuery({
    queryKey: [...authorAnalyticsKeys.topArticles(), limit, sortBy],
    queryFn: async () => {
      const result = await getTopArticles({ limit, sortBy });
      console.log('🔍 useTopArticles result:', result);
      if (!result.success) throw new Error(result.message);
      console.log('✅ useTopArticles data:', result.data);
      return result.data || [];
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
}

// Hook untuk Views Timeline
export function useViewsTimeline(period: PeriodType) {
  return useQuery({
    queryKey: authorAnalyticsKeys.timeline(period),
    queryFn: async () => {
      const result = await getViewsTimeline({ period });
      if (!result.success) throw new Error(result.message);
      return result.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Hook untuk Category Stats
export function useCategoryStats(limit = 4) {
  return useQuery({
    queryKey: [...authorAnalyticsKeys.categoryStats(), limit],
    queryFn: async () => {
      const result = await getCategoryStats(limit);
      if (!result.success) throw new Error(result.message);
      return result.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - category stats jarang berubah
  });
}
