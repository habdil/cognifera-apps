"use client";

import React, { useState } from "react";
import { ThumbsUp, Eye } from "lucide-react";
import { toast } from "sonner";
import { toggleArticleLike } from "@/lib/api/comments";
import { formatViewCount } from "@/lib/api/public-articles";
import { ShareButton } from "./ShareButton";

interface ArticleHeaderProps {
  articleId: string;
  title: string;
  author: string;
  publishedAt: string;
  views?: number;
  initialLikes?: number;
  initialIsLiked?: boolean;
  categoryLabel: string;
}

export function ArticleHeader({
  articleId,
  title,
  author,
  publishedAt,
  views,
  initialLikes = 0,
  initialIsLiked = false,
  categoryLabel,
}: ArticleHeaderProps) {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [likeLoading, setLikeLoading] = useState<boolean>(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleLike = async () => {
    setLikeLoading(true);
    try {
      const result = await toggleArticleLike(articleId);

      if (result.success && result.data) {
        // Update local state with response from backend
        setLikes(result.data.likes);
        setIsLiked(result.data.isLiked);

        // Show feedback
        toast.success(result.data.isLiked ? 'Article liked!' : 'Like removed');
      } else {
        // Handle error (e.g., not logged in)
        toast.error(result.message || 'Failed to like article');
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to like article');
    } finally {
      setLikeLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
        {title}
      </h1>

      {/* Author and Date */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <span className="font-medium">{author}</span>
        <span>•</span>
        <span>{formatDate(publishedAt)}</span>
      </div>

      {/* Social Actions */}
      <div className="flex items-center gap-4 py-3 border-y border-gray-200">
        {/* Like Button */}
        <button
          onClick={handleLike}
          disabled={likeLoading}
          className={`flex items-center gap-2 transition-colors ${
            isLiked
              ? 'text-blue-600 font-medium'
              : 'text-gray-600 hover:text-blue-600'
          } ${likeLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          <span className="text-sm">
            {likes > 0 ? `${likes} ${likes === 1 ? 'Like' : 'Likes'}` : 'Like'}
          </span>
        </button>

        {/* Share Button */}
        <ShareButton
          title={title}
          text={`${title} - ${categoryLabel}`}
        />

        {/* Views */}
        <div className="flex items-center gap-2 text-gray-500 ml-auto">
          <Eye className="w-4 h-4" />
          <span className="text-sm">
            {formatViewCount(views)} views
          </span>
        </div>
      </div>
    </div>
  );
}
