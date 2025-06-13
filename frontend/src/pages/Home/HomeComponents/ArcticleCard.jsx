import React from 'react';
import { Heart, MessageCircle, Bookmark, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ArticleCard({
  author,
  title,
  excerpt,
  imageUrl,
  readTime,
  publishedDate,
  claps,
  comments,
  topic,
}) {
  const articleSlug=title.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');

  const navigate=useNavigate()
  return (
    <article className="py-8 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer" onClick={()=>navigate(`/${articleSlug}`)}>
      <div className="flex items-start space-x-4">
        <div className="flex-1">
          {/* Author info */}
          <div className="flex items-center space-x-2 mb-3">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-900 font-medium">
              {author.name}
            </span>
            {!author.isFollowing && (
              <>
                <span className="text-gray-400">·</span>
                <button className="text-sm text-green-600 hover:text-green-700 font-medium cursor-pointer">
                  Follow
                </button>
              </>
            )}
          </div>

          {/* Article content */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
              {title}
            </h2>
            <p className="text-gray-600 line-clamp-2 leading-relaxed">
              {excerpt}
            </p>
          </div>

          {/* Article meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
                {topic}
              </span>
              <span>{publishedDate}</span>
              <span>·</span>
              <span>{readTime}</span>
            </div>

            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors cursor-pointer">
                <Heart className="w-4 h-4 " />
                <span className="text-sm">{claps}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{comments}</span>
              </button>
              <button className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Article image */}
        {imageUrl && (
          <div className="w-28 h-28 md:w-32 md:h-32 flex-shrink-0">
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover rounded"
            />
          </div>
        )}
      </div>
    </article>
  );
}
