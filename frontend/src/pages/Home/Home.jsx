import React from 'react'
import Header from './HomeComponents/Header'
import Hero from './HomeComponents/Hero'
import ArticleCard from './HomeComponents/ArcticleCard'
import Sidebar from './HomeComponents/Sidebar'
import { articles } from './HomeComponents/articles.js'

const Home = () => {
  return (
    <div className="min-h-screen bg-white overflow-visible">
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
