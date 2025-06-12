import React from 'react';
import { TrendingUp, Users, Star } from 'lucide-react';

const trendingTopics = [
  'JavaScript',
  'React',
  'Artificial Intelligence',
  'Web Development',
  'Design',
  'Productivity'
];

const recommendedUsers = [
  {
    name: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    bio: 'Frontend Developer & Designer'
  },
  {
    name: 'John Anderson',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    bio: 'Tech Lead at Google'
  },
  {
    name: 'Maria Rodriguez',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    bio: 'UX Researcher'
  }
];

export default function Sidebar() {
  return (
    <aside className="w-80 sticky top-20 h-fit">
      <div className="space-y-8">
        {/* Trending Topics */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Trending Topics</h3>
          </div>
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <div key={topic} className="flex items-center justify-between">
                <button className="text-gray-700 hover:text-green-600 transition-colors font-medium cursor-pointer">
                  {topic}
                </button>
                <span className="text-sm text-gray-400">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Writers */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Who to Follow</h3>
          </div>
          <div className="space-y-4">
            {recommendedUsers.map((user) => (
              <div key={user.name} className="flex items-start space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user.bio}
                  </p>
                  <button className="mt-2 text-sm text-green-600 hover:text-green-700 font-medium cursor-pointer">
                    Follow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Saved */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Star className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Recently Saved</h3>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              You haven't saved any stories yet. When you do, they'll appear here.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}