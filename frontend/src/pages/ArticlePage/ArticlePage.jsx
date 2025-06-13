import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, MessageCircle, Bookmark, Share, MoreHorizontal, Twitter, Facebook, Linkedin } from 'lucide-react';
import Header from '../Home/HomeComponents/Header';
import { articles } from '../Home/HomeComponents/articles.js';
import { getArticleContent } from '../Home/HomeComponents/ArticleContent.js';

export default function ArticlePage() {
  const { articleSlug } = useParams();
  
  // Find article by slug (convert title to slug format)
  const article = articles.find(a => 
    a.title.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-') === articleSlug
  );

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h1>
          <Link to="/" className="text-green-600 hover:text-green-700">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const content = getArticleContent(article.id);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>
          
          {/* Author Info */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900">{article.author.name}</h3>
                  {!article.author.isFollowing && (
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm cursor-pointer">
                      Follow
                    </button>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{article.publishedDate}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                <Share className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {article.imageUrl && (
          <div className="mb-8">
            <img
              src={article.imageUrl}
              alt=""
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {content.map((section, index) => {
            if (section.type === 'paragraph') {
              return (
                <p key={index} className="text-gray-800 leading-relaxed mb-6 text-lg">
                  {section.content}
                </p>
              );
            } else if (section.type === 'heading') {
              return (
                <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  {section.content}
                </h2>
              );
            } else if (section.type === 'quote') {
              return (
                <blockquote key={index} className="border-l-4 border-gray-300 pl-6 my-8 italic text-xl text-gray-700">
                  {section.content}
                </blockquote>
              );
            }
            return null;
          })}
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          {/* Tags */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                {article.topic}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                Web Development
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                Career
              </span>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors cursor-pointer">
                <Heart className="w-5 h-5" />
                <span>{article.claps}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">
                <MessageCircle className="w-5 h-5" />
                <span>{article.comments}</span>
              </button>
            </div>
            
            {/* Share Buttons */}
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>

        </footer>
      </article>

      {/* Related Articles */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">More from {article.author.name}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {articles.slice(0, 2).map((relatedArticle) => (
              <Link
                key={relatedArticle.id}
                to={`/${relatedArticle.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')}`}
                className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                  {relatedArticle.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {relatedArticle.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{relatedArticle.publishedDate}</span>
                  <span>{relatedArticle.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}