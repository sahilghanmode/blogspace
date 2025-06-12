import React from 'react'
import Header from './HomeComponents/Header'
import Hero from './HomeComponents/Hero'
import ArticleCard from './HomeComponents/ArcticleCard'
import Sidebar from './HomeComponents/Sidebar'

const articles = [
  {
    id: 1,
    author: {
      name: 'Alex Thompson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isFollowing: false
    },
    title: 'The Future of Web Development: What to Expect in 2024',
    excerpt: 'As we move into 2024, web development continues to evolve at a rapid pace. From new JavaScript frameworks to revolutionary CSS features, developers have more tools than ever...',
    imageUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    readTime: '8 min read',
    publishedDate: 'Dec 15',
    claps: 234,
    comments: 42,
    topic: 'Technology'
  },
  {
    id: 2,
    author: {
      name: 'Emily Rodriguez',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isFollowing: true
    },
    title: 'Mastering React Hooks: A Complete Guide',
    excerpt: 'React Hooks revolutionized how we write React components. In this comprehensive guide, we\'ll explore all the essential hooks and learn how to build custom ones...',
    imageUrl: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    readTime: '12 min read',
    publishedDate: 'Dec 12',
    claps: 567,
    comments: 89,
    topic: 'React'
  },
  {
    id: 3,
    author: {
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isFollowing: false
    },
    title: 'Building Scalable APIs with Node.js and TypeScript',
    excerpt: 'Learn how to build robust, scalable APIs using Node.js and TypeScript. We\'ll cover best practices, error handling, testing, and deployment strategies...',
    readTime: '15 min read',
    publishedDate: 'Dec 10',
    claps: 423,
    comments: 67,
    topic: 'Backend'
  },
  {
    id: 4,
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isFollowing: false
    },
    title: 'The Art of Minimalist Web Design',
    excerpt: 'Minimalism in web design isn\'t just about using less elements. It\'s about making every element count. Discover how to create beautiful, functional designs...',
    imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    readTime: '6 min read',
    publishedDate: 'Dec 8',
    claps: 189,
    comments: 23,
    topic: 'Design'
  },
  {
    id: 5,
    author: {
      name: 'Michael Johnson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isFollowing: true
    },
    title: 'Understanding Machine Learning for Web Developers',
    excerpt: 'Machine learning is becoming increasingly important for web developers. Learn the basics and discover how to integrate ML models into your web applications...',
    readTime: '10 min read',
    publishedDate: 'Dec 5',
    claps: 678,
    comments: 124,
    topic: 'AI/ML'
  },
  {
    id: 6,
    author: {
      name: 'Lisa Wang',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isFollowing: false
    },
    title: 'CSS Grid vs Flexbox: When to Use What',
    excerpt: 'Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes. Learn when to use each one and how they can work together...',
    imageUrl: 'https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    readTime: '7 min read',
    publishedDate: 'Dec 3',
    claps: 345,
    comments: 56,
    topic: 'CSS'
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <div className="flex-1 max-w-4xl">
            <div className="mb-8">
              <div className="flex items-center space-x-6 border-b border-gray-200">
                <button className="pb-3 border-b-2 border-black font-medium text-black cursor-pointer">
                  For you
                </button>
                <button className="pb-3 text-gray-600 hover:text-black transition-colors cursor-pointer">
                  Following
                </button>
                <button className="pb-3 text-gray-600 hover:text-black transition-colors cursor-pointer">
                  React
                </button>
                <button className="pb-3 text-gray-600 hover:text-black transition-colors cursor-pointer">
                  JavaScript
                </button>
                <button className="pb-3 text-gray-600 hover:text-black transition-colors cursor-pointer">
                  Design
                </button>
              </div>
            </div>

            {/* Articles Feed */}
            <div className="space-y-0">
              {articles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center py-8">
              <button className="text-green-600 hover:text-green-700 font-medium cursor-pointer">
                Show more stories
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        </div>
      </main>

    </div>
  )
}

export default Home
