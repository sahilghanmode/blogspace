import React from 'react';

export default function Hero() {
  return (
    <section className="bg-yellow-400 border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl">
          <h1 className="text-6xl md:text-7xl font-bold text-black mb-6">
            Human
            <br />
            stories & ideas
          </h1>
          <p className="text-xl text-black mb-8 leading-relaxed">
            A place to read, write, and deepen your understanding
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer">
            Start reading
          </button>
        </div>
      </div>
    </section>
  );
}