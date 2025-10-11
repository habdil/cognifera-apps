"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  formatRelativeTime,
  type GetCommentsParams
} from '@/lib/api/author-comments';
import { useAuthorComments, useCommentStats, useFlagComment, useDeleteComment } from '@/hooks/useAuthorComments';
import { useDebounce } from '@/hooks/useDebounce';
import {
  MessageSquare,
  ThumbsUp,
  Flag,
  Trash2,
  Search,
  CheckCircle,
  TrendingUp,
  Clock,
  MessageCircle,
  Filter
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuthorCommentsContent() {
  const [filters, setFilters] = useState<GetCommentsParams>({
    status: 'all',
    page: 1,
    limit: 10,
    sortBy: 'newest',
    search: ''
  });

  // Debounce search query (500ms delay)
  const debouncedSearch = useDebounce(filters.search, 500);

  // Update filters with debounced search
  const effectiveFilters = { ...filters, search: debouncedSearch };

  // Use React Query hooks - automatic caching & background refetch
  const { data: commentsData, isLoading: loading } = useAuthorComments(effectiveFilters);
  const { data: stats } = useCommentStats();
  const flagCommentMutation = useFlagComment();
  const deleteCommentMutation = useDeleteComment();

  const comments = commentsData?.comments || [];
  const pagination = commentsData?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  };

  const handleFlagComment = async (commentId: string) => {
    if (!confirm('Apakah Anda yakin ingin melaporkan komentar ini sebagai tidak pantas?')) {
      return;
    }
    flagCommentMutation.mutate({ commentId, reason: 'Inappropriate content' });
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus komentar ini? Tindakan ini tidak dapat dibatalkan.')) {
      return;
    }
    deleteCommentMutation.mutate(commentId);
  };

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, search: value, page: 1 }));
  };

  const handleStatusChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      status: value as 'approved' | 'flagged' | 'all',
      page: 1
    }));
  };

  const handleSortChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      sortBy: value as 'newest' | 'oldest' | 'most_liked',
      page: 1
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Statistics Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24 bg-gray-200" />
                <Skeleton className="h-4 w-4 rounded-full bg-gray-200" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2 bg-gray-200" />
                <Skeleton className="h-3 w-32 bg-gray-200" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Komentar</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalComments}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalReplies} balasan dari Anda
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Minggu Ini</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.commentsThisWeek}</div>
              <p className="text-xs text-muted-foreground">
                {stats.commentsThisMonth} bulan ini
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approvedComments}</div>
              <p className="text-xs text-muted-foreground">
                {stats.flaggedComments} dilaporkan
              </p>
            </CardContent>
          </Card>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 md:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari komentar..."
            value={filters.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        {/* Status Filter */}
        <Select value={filters.status || "all"} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full md:w-[200px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="approved">Disetujui</SelectItem>
            <SelectItem value="flagged">Dilaporkan</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={filters.sortBy || "newest"} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full md:w-[200px]">
            <Clock className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Terbaru</SelectItem>
            <SelectItem value="oldest">Terlama</SelectItem>
            <SelectItem value="most_liked">Paling Disukai</SelectItem>
          </SelectContent>
        </Select>
      </div>


      {/* Comments List */}
      <Card>
        <CardContent className="pt-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-10 w-10 rounded-full bg-gray-200" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32 bg-gray-200" />
                      <Skeleton className="h-3 w-48 bg-gray-200" />
                      <Skeleton className="h-3 w-24 bg-gray-200" />
                      <Skeleton className="h-16 w-full mt-2 bg-gray-200" />
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-4">
                          <Skeleton className="h-4 w-12 bg-gray-200" />
                          <Skeleton className="h-4 w-12 bg-gray-200" />
                        </div>
                        <div className="flex gap-2">
                          <Skeleton className="h-8 w-20 bg-gray-200" />
                          <Skeleton className="h-8 w-20 bg-gray-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Belum ada komentar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border border-border rounded-lg p-3 md:p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    {/* Avatar */}
                    <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
                      <AvatarImage src={comment.user.avatarUrl || undefined} />
                      <AvatarFallback>
                        {comment.user.fullName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2 min-w-0">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground text-sm md:text-base">
                            {comment.user.fullName}
                          </p>
                          <p className="text-xs md:text-sm text-muted-foreground truncate">
                            Di artikel: <span className="font-medium">{comment.article.title}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatRelativeTime(comment.createdAt)}
                          </p>
                        </div>

                        {/* Badges */}
                        <div className="flex gap-2 flex-shrink-0">
                          {comment.isFlagged && (
                            <Badge variant="destructive" className="gap-1 text-xs h-fit">
                              <Flag className="h-3 w-3" />
                              <span className="hidden sm:inline">Dilaporkan</span>
                            </Badge>
                          )}
                          {comment.isApproved && (
                            <Badge variant="default" className="gap-1 bg-green-600 text-xs h-fit">
                              <CheckCircle className="h-3 w-3" />
                              <span className="hidden sm:inline">Disetujui</span>
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <p className="text-sm md:text-base text-foreground break-words">{comment.content}</p>

                      {/* Meta & Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                        <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3 md:h-4 md:w-4" />
                            {comment.likesCount}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3 md:h-4 md:w-4" />
                            {comment.repliesCount}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          {!comment.isFlagged && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleFlagComment(comment.id)}
                              disabled={flagCommentMutation.isPending || deleteCommentMutation.isPending}
                              className="gap-1 md:gap-2 hover:text-destructive text-xs md:text-sm h-8"
                            >
                              <Flag className="h-3 w-3 md:h-4 md:w-4" />
                              <span className="hidden sm:inline">Laporkan</span>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteComment(comment.id)}
                            disabled={flagCommentMutation.isPending || deleteCommentMutation.isPending}
                            className="gap-1 md:gap-2 border text-destructive hover:text-white hover:bg-destructive text-xs md:text-sm h-8"
                          >
                            <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                            <span className="hidden sm:inline">Hapus</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {!loading && comments.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs md:text-sm text-muted-foreground text-center sm:text-left">
            Menampilkan {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} - {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} dari {pagination.totalItems} komentar
          </p>
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="text-xs md:text-sm"
            >
              <span className="hidden sm:inline">Sebelumnya</span>
              <span className="sm:hidden">Prev</span>
            </Button>
            <div className="flex items-center gap-2 px-2 md:px-4">
              <span className="text-xs md:text-sm whitespace-nowrap">
                Hal {pagination.currentPage}/{pagination.totalPages}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="text-xs md:text-sm"
            >
              <span className="hidden sm:inline">Selanjutnya</span>
              <span className="sm:hidden">Next</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
