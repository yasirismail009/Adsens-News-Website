import React, { useState } from 'react';
import { NewsArticle } from '../services/newsService';
import Image from 'next/image';
import Link from 'next/link';

interface NewsSectionProps {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
}

const NewsSection: React.FC<NewsSectionProps> = ({ articles, loading, error }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (article.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                          article.source.name.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading news articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-500 mb-2">⚠️</div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (filteredArticles.length === 0) {
    return (
      <div className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search news..."
            className="w-full sm:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="w-full sm:w-48 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="education">Education</option>
            <option value="scholarship">Scholarships</option>
            <option value="university">Universities</option>
          </select>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-600">No articles found matching your criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search news..."
          className="w-full sm:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full sm:w-48 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="education">Education</option>
          <option value="scholarship">Scholarships</option>
          <option value="university">Universities</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article, index) => (
          <Link href={`/news/${encodeURIComponent(article.url)}`} key={index}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {article.urlToImage && (
                <div className="relative h-48 w-full">
                  <Image
                    src={article.urlToImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-3">{article.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{article.source.name}</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsSection; 