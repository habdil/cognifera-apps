"use client";

import React, { useState, useEffect } from "react";
import { Comment, fetchComments, postComment, toggleCommentLike, deleteComment, buildCommentTree, formatRelativeTime } from "@/lib/api/comments";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp, Reply, Trash2, Send, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CommentSectionProps {
  articleId: string;
}

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: string, authorName: string) => void;
  onDelete: (commentId: string) => void;
  onLike: (commentId: string) => void;
  depth?: number;
}

function CommentItem({ comment, onReply, onDelete, onLike, depth = 0 }: CommentItemProps) {
  const [showReplies, setShowReplies] = useState(true);
  const maxDepth = 3; // Maximum nesting level

  // Dynamic sizing based on depth
  const avatarSize = depth > 0 ? 'w-8 h-8' : 'w-10 h-10';
  const fontSize = depth > 0 ? 'text-sm' : 'text-base';

  return (
    <div className={`${depth > 0 ? 'mt-4' : 'mb-6'} relative`}>
      {/* Reply Thread Line */}
      {depth > 0 && (
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 to-transparent" />
      )}

      <div className={`flex gap-3 ${depth > 0 ? 'ml-6 pl-2' : ''}`}>
        {/* Avatar */}
        <div className="flex-shrink-0 relative z-10">
          <div className={`${avatarSize} rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center overflow-hidden ring-2 ring-white`}>
            {comment.author.avatar ? (
              <Image
                src={comment.author.avatar}
                alt={comment.author.name}
                width={depth > 0 ? 32 : 40}
                height={depth > 0 ? 32 : 40}
                className="object-cover"
              />
            ) : (
              <span className={`text-primary font-semibold ${depth > 0 ? 'text-xs' : 'text-sm'}`}>
                {comment.author.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className={`bg-gray-50 rounded-lg p-3 ${depth > 0 ? 'bg-gray-50/80' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className={`font-semibold text-gray-900 ${depth > 0 ? 'text-xs' : 'text-sm'}`}>
                  {comment.author.name}
                </span>
                {depth > 0 && (
                  <span className="text-xs text-primary/70 ml-1">• Reply</span>
                )}
                <span className="text-xs text-gray-500 ml-2">
                  {formatRelativeTime(comment.createdAt)}
                </span>
              </div>
            </div>
            <p className={`text-gray-700 ${depth > 0 ? 'text-xs' : 'text-sm'} leading-relaxed whitespace-pre-wrap`}>
              {comment.content}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-2 ml-2">
            <button
              onClick={() => onLike(comment.id)}
              className={`flex items-center gap-1 text-xs transition-colors ${
                comment.isLiked
                  ? 'text-primary font-medium'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${comment.isLiked ? 'fill-current' : ''}`} />
              <span>{comment.likes > 0 ? comment.likes : 'Like'}</span>
            </button>

            {/* {depth < maxDepth ? (
              <button
                onClick={() => onReply(comment.id, comment.author.name)}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors"
              >
                <Reply className="w-3.5 h-3.5" />
                <span>Reply</span>
              </button>
            ) : (
              <span className="text-xs text-gray-400 italic">Max reply depth reached</span>
            )} */}

            <button
              onClick={() => onDelete(comment.id)}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3">
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 font-medium mb-2 px-2 py-1 rounded hover:bg-primary/5 transition-colors"
              >
                <span className="text-base leading-none">{showReplies ? '−' : '+'}</span>
                <span>
                  {showReplies ? 'Hide' : 'Show'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                </span>
              </button>

              {showReplies && (
                <div className="space-y-0">
                  {comment.replies.map((reply, index) => (
                    <div key={reply.id} className="relative">
                      <CommentItem
                        comment={reply}
                        onReply={onReply}
                        onDelete={onDelete}
                        onLike={onLike}
                        depth={depth + 1}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentTree, setCommentTree] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<{ id: string; name: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [totalComments, setTotalComments] = useState(0);

  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadComments();
  }, [articleId]);

  const loadComments = async () => {
    setLoading(true);
    try {
      const response = await fetchComments(articleId);
      if (response.success) {
        setComments(response.data);
        setCommentTree(buildCommentTree(response.data));
        setTotalComments(response.meta.total);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    setSubmitting(true);
    try {
      const response = await postComment({
        articleId,
        content: newComment.trim(),
        parentId: replyingTo?.id || null,
      });

      if (response.success) {
        toast.success(replyingTo ? 'Reply posted!' : 'Comment posted!');
        setNewComment('');
        setReplyingTo(null);
        // Reload comments
        loadComments();
      } else {
        toast.error(response.message || 'Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = (commentId: string, authorName: string) => {
    setReplyingTo({ id: commentId, name: authorName });
    setNewComment(`@${authorName} `);
    // Focus on textarea
    document.getElementById('comment-input')?.focus();
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setNewComment('');
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      const response = await toggleCommentLike(commentId);
      if (response.success) {
        // Update local state
        loadComments();
      }
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleDeleteComment = (commentId: string) => {
    setCommentToDelete(commentId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!commentToDelete) return;

    setDeleting(true);
    try {
      const response = await deleteComment(commentToDelete);
      if (response.success) {
        toast.success('Comment deleted successfully');
        setDeleteDialogOpen(false);
        setCommentToDelete(null);
        loadComments();
      } else {
        toast.error(response.message || 'Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    } finally {
      setDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setCommentToDelete(null);
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-primary" />
          Comments ({totalComments})
        </h2>
      </div>

      {/* Comment Input */}
      <div className="mb-8">
        {replyingTo && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3 flex items-center justify-between">
            <span className="text-sm text-blue-800">
              Replying to <span className="font-semibold">{replyingTo.name}</span>
            </span>
            <button
              onClick={handleCancelReply}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
              <span className="text-primary font-semibold text-sm">U</span>
            </div>
          </div>

          <div className="flex-1">
            <textarea
              id="comment-input"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={3}
            />

            <div className="flex items-center justify-between mt-3">
              <span className={`text-xs ${newComment.length > 2000 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                {newComment.length}/2000 characters
              </span>
              <Button
                onClick={handleSubmitComment}
                disabled={submitting || !newComment.trim() || newComment.length > 2000}
                className="flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Posting...' : replyingTo ? 'Post Reply' : 'Post Comment'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="flex-1">
                <div className="bg-gray-200 rounded-lg h-24"></div>
              </div>
            </div>
          ))}
        </div>
      ) : commentTree.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 mb-2">No comments yet</p>
          <p className="text-sm text-gray-500">Be the first to comment!</p>
        </div>
      ) : (
        <div>
          {commentTree.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              onDelete={handleDeleteComment}
              onLike={handleLikeComment}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <DialogTitle>Delete Comment</DialogTitle>
                <DialogDescription className="mt-1">
                  Are you sure you want to delete this comment? This action cannot be undone.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-3">
            <Button
              variant="outline"
              onClick={cancelDelete}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleting}
              className="flex items-center gap-2"
            >
              {deleting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Delete Comment
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
