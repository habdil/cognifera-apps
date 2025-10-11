"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAuthorArticles, deleteArticle, updateArticle, type Article, type FetchArticlesParams, type CreateArticleData } from '@/lib/api/author-articles';
import { toast } from 'sonner';

// Query keys
export const authorArticlesKeys = {
  all: ['author-articles'] as const,
  list: (params?: FetchArticlesParams) => [...authorArticlesKeys.all, 'list', params] as const,
  detail: (id: string) => [...authorArticlesKeys.all, 'detail', id] as const,
};

// Hook untuk fetch articles dengan React Query
export function useAuthorArticles(params: FetchArticlesParams = { status: 'all', limit: 20 }) {
  return useQuery({
    queryKey: authorArticlesKeys.list(params),
    queryFn: async () => {
      const result = await fetchAuthorArticles(params);
      console.log('🔍 useAuthorArticles result:', result);
      if (!result.success) throw new Error(result.message || 'Failed to fetch articles');
      console.log('✅ useAuthorArticles data:', result.data);
      return result.data;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Hook untuk delete article dengan optimistic update
export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (articleId: string) => {
      await deleteArticle(articleId);
      return articleId;
    },
    onMutate: async (articleId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: authorArticlesKeys.all });

      // Snapshot previous value
      const previousArticles = queryClient.getQueryData(authorArticlesKeys.list({ status: 'all', limit: 20 }));

      // Optimistically remove article from cache
      queryClient.setQueryData<Article[]>(
        authorArticlesKeys.list({ status: 'all', limit: 20 }),
        (old) => old?.filter(a => a.id !== articleId) || []
      );

      return { previousArticles };
    },
    onError: (error, articleId, context) => {
      // Rollback on error
      if (context?.previousArticles) {
        queryClient.setQueryData(authorArticlesKeys.list({ status: 'all', limit: 20 }), context.previousArticles);
      }
      toast.error('Delete Failed', {
        description: error instanceof Error ? error.message : 'Failed to delete article',
      });
    },
    onSuccess: () => {
      toast.success('Article Deleted', {
        description: 'Article has been deleted successfully',
      });
    },
    onSettled: () => {
      // Refetch after success or error
      queryClient.invalidateQueries({ queryKey: authorArticlesKeys.all });
    },
  });
}

// Hook untuk update article (publish, edit, etc)
export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ articleId, payload }: { articleId: string; payload: CreateArticleData }) => {
      const result = await updateArticle(articleId, payload);
      if (!result.success) throw new Error(result.message || 'Failed to update article');
      return result.data;
    },
    onSuccess: (updatedArticle) => {
      // Update cache
      queryClient.setQueryData<Article[]>(
        authorArticlesKeys.list({ status: 'all', limit: 20 }),
        (old) => {
          if (!old) return old;
          return old.map(a => a.id === updatedArticle.id ? updatedArticle : a);
        }
      );

      // Invalidate to refetch
      queryClient.invalidateQueries({ queryKey: authorArticlesKeys.all });
    },
    onError: (error) => {
      toast.error('Update Failed', {
        description: error instanceof Error ? error.message : 'Failed to update article',
      });
    },
  });
}
