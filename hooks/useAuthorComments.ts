"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAuthorComments,
  getCommentStats,
  flagComment,
  deleteAuthorComment,
  type GetCommentsParams
} from '@/lib/api/author-comments';
import { toast } from 'sonner';

// Query keys
export const authorCommentsKeys = {
  all: ['author-comments'] as const,
  list: (params: GetCommentsParams) => [...authorCommentsKeys.all, 'list', params] as const,
  stats: () => [...authorCommentsKeys.all, 'stats'] as const,
};

// Hook untuk fetch comments
export function useAuthorComments(params: GetCommentsParams) {
  return useQuery({
    queryKey: authorCommentsKeys.list(params),
    queryFn: async () => {
      const result = await getAuthorComments(params);
      console.log('🔍 useAuthorComments result:', result);
      if (!result.success) throw new Error(result.message || 'Failed to fetch comments');
      console.log('✅ useAuthorComments data:', result.data);
      return result.data;
    },
    staleTime: 30 * 1000, // 30 seconds - comments lebih sering update
  });
}

// Hook untuk comment stats
export function useCommentStats() {
  return useQuery({
    queryKey: authorCommentsKeys.stats(),
    queryFn: async () => {
      const result = await getCommentStats();
      if (!result.success) throw new Error(result.message || 'Failed to fetch stats');
      return result.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Hook untuk flag comment
export function useFlagComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ commentId, reason }: { commentId: string; reason: string }) => {
      const result = await flagComment(commentId, reason);
      if (!result.success) throw new Error(result.message || 'Failed to flag comment');
      return result;
    },
    onSuccess: () => {
      toast.success('Komentar berhasil dilaporkan');
      queryClient.invalidateQueries({ queryKey: authorCommentsKeys.all });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Gagal melaporkan komentar');
    },
  });
}

// Hook untuk delete comment
export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: string) => {
      const result = await deleteAuthorComment(commentId);
      if (!result.success) throw new Error(result.message || 'Failed to delete comment');
      return commentId;
    },
    onSuccess: () => {
      toast.success('Komentar berhasil dihapus');
      queryClient.invalidateQueries({ queryKey: authorCommentsKeys.all });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Gagal menghapus komentar');
    },
  });
}
