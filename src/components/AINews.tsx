// src/components/AINews.tsx
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Search, Tag, Calendar, Clock, 
  ArrowLeft, Share2, Bookmark, ExternalLink, 
  RefreshCw, TrendingUp, AlertTriangle, Star
} from 'lucide-react';
import axios from 'axios';

// Types
interface AINewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  source?: string;
  isBreaking?: boolean;
  isTrending?: boolean;
  url?: string;
  author?: string;
}

// API configuration
const NEWS_API_CONFIG = {
  NEWSAPI_KEY: import.meta.env.VITE_NEWSAPI_KEY,
  GNEWS_KEY: import.meta.env.VITE_GNEWS_KEY,
  NEWSAPI_URL: 'https://newsapi.org/v2/everything',
  GNEWS_URL: 'https://gnews.io/api/v4/top-headlines',
  DEFAULT_PARAMS: {
    q: 'Artificial Intelligence OR Machine Learning OR AI',
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: 10
  }
};

// Helper functions
const generateSlug = (title: string) => 
  title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');

const formatDate = (dateString: string) => 
  new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

const estimateReadTime = (content: string) => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return `${Math.ceil(wordCount / wordsPerMinute)} min read`;
};

// Categories with icons and colors
const CATEGORIES = [
  { name: 'All', icon: null, color: 'gray' },
  { name: 'Gen AI', icon: null, color: 'purple' },
  { name: 'AI Agents', icon: null, color: 'blue' },
  { name: 'ML Breakthroughs', icon: null, color: 'green' },
  { name: 'Industry Trends', icon: TrendingUp, color: 'orange' },
  { name: 'Ethics & Policy', icon: AlertTriangle, color: 'red' },
  { name: 'Emerging Tech', icon: Star, color: 'pink' }
];

export const AllNews = () => {
  const [articles, setArticles] = useState<AINewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookmarkedArticles, setBookmarkedArticles] = useState<AINewsArticle[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
  
    try {
      // Fetch data from APIs
      const newsApiData = await fetchNewsApi();
      const gnewsData = await fetchGNews();
  
      // Combine results with mock data
      const allArticles = [
        ...(newsApiData || []),
        ...(gnewsData || []),
        ...aiNewsArticles
      ];
  
      // Store articles in localStorage
      localStorage.setItem('newsArticles', JSON.stringify(allArticles));
      setArticles(allArticles);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Error fetching news:", error);
      setError('Failed to fetch news. Using saved articles.');
  
      // Safely load saved articles from localStorage
      const saved = localStorage.getItem('newsArticles');
      try {
        const savedArticles = saved ? JSON.parse(saved) : [];
        setArticles(Array.isArray(savedArticles) ? savedArticles : aiNewsArticles);
      } catch (e) {
        console.error("Error parsing saved articles:", e);
        setArticles(aiNewsArticles); // Fallback to mock data
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchNewsApi = async () => {
    try {
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const apiUrl = `${NEWS_API_CONFIG.NEWSAPI_URL}?q=${encodeURIComponent(NEWS_API_CONFIG.DEFAULT_PARAMS.q)}&apiKey=${NEWS_API_CONFIG.NEWSAPI_KEY}`;
      
      const response = await axios.get(proxyUrl + apiUrl, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      return response.data.articles.map((article: any) => ({
        id: `newsapi-${article.publishedAt}-${article.title.substring(0, 10)}`,
        title: article.title,
        slug: generateSlug(article.title),
        excerpt: article.description || 'No description available',
        content: article.content || 
                `This is a summary of the article. For full content, please visit the <a href="${article.url}" target="_blank">original source</a>.`,
        coverImage: article.urlToImage,
        date: formatDate(article.publishedAt),
        readTime: estimateReadTime(article.content || article.description || ''),
        category: getRandomCategory(),
        tags: article.source?.name ? [article.source.name] : [],
        source: article.source?.name,
        url: article.url,
        author: article.author,
        isTrending: Math.random() > 0.7,
        isBreaking: Math.random() > 0.9
      }));
    } catch (error) {
      console.error("NewsAPI Error:", error);
      return null;
    }
  };

  const fetchGNews = async () => {
    try {
      const response = await axios.get(NEWS_API_CONFIG.GNEWS_URL, {
        params: {
          q: NEWS_API_CONFIG.DEFAULT_PARAMS.q,
          lang: 'en',
          max: 10,
          token: NEWS_API_CONFIG.GNEWS_KEY
        }
      });

      return response.data.articles.map((article: any) => ({
        id: `gnews-${article.publishedAt}-${article.title.substring(0, 10)}`,
        title: article.title,
        slug: generateSlug(article.title),
        excerpt: article.description || 'No description available',
        content: article.content || 
                `This is a summary of the article. For full content, please visit the <a href="${article.url}" target="_blank">original source</a>.`,
        coverImage: article.image,
        date: formatDate(article.publishedAt),
        readTime: estimateReadTime(article.content || article.description || ''),
        category: getRandomCategory(),
        tags: article.source?.name ? [article.source.name] : [],
        source: article.source?.name,
        url: article.url,
        author: article.source?.name,
        isTrending: Math.random() > 0.7,
        isBreaking: Math.random() > 0.9
      }));
    } catch (error) {
      console.error("GNews Error:", error);
      return null;
    }
  };

  const getRandomCategory = () => {
    const categories = CATEGORIES.filter(c => c.name !== 'All').map(c => c.name);
    return categories[Math.floor(Math.random() * categories.length)];
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const bookmarkArticle = (id: string) => {
    const article = articles.find(a => a.id === id);
    if (article) {
      const isBookmarked = bookmarkedArticles.some(a => a.id === id);
      const updatedBookmarks = isBookmarked
        ? bookmarkedArticles.filter(a => a.id !== id)
        : [...bookmarkedArticles, article];
      
      setBookmarkedArticles(updatedBookmarks);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(updatedBookmarks));
    }
  };

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedArticles');
    if (savedBookmarks) {
      try {
        const parsed = JSON.parse(savedBookmarks);
        if (Array.isArray(parsed)) {
          setBookmarkedArticles(parsed);
        } else {
          console.warn("Invalid bookmarks format in localStorage.");
        }
      } catch (e) {
        console.error("Error parsing bookmarks:", e);
      }
    }
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesCategory = 
      selectedCategory === 'All' || 
      article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const shareArticle = async (article: AINewsArticle) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.origin + `/news/${article.slug}`
        });
      } else {
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.origin + `/news/${article.slug}`)}`;
        window.open(shareUrl, '_blank');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-spin"></div>
              <div className="text-lg text-gray-400">Fetching the latest AI news...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading News</h2>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={fetchNews}
              className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors text-white"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI & Tech News
            </h1>
            <p className="text-gray-400 mt-2">Latest advancements in AI and emerging technologies</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Last updated: {lastUpdated}</span>
            <button 
              onClick={fetchNews}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4 space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-4 backdrop-blur-sm border border-gray-800">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search news, tags..."
                  className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
                />
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 backdrop-blur-sm border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map(({ name, icon: Icon, color }) => (
                  <button
                    key={name}
                    onClick={() => setSelectedCategory(name)}
                    className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === name 
                        ? `bg-${color}-600 text-white` 
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    {Icon && <Icon size={16} />}
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {bookmarkedArticles.length > 0 && (
              <div className="bg-gray-900/50 rounded-lg p-4 backdrop-blur-sm border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-yellow-400" />
                  Bookmarks
                </h3>
                <div className="space-y-2">
                  {bookmarkedArticles.map(article => (
                    <Link
                      key={article.id}
                      to={`/news/${article.slug}`}
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors truncate flex items-center gap-2"
                    >
                      {article.isBreaking && <AlertTriangle size={14} className="text-red-400" />}
                      {article.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-900/50 rounded-lg p-4 backdrop-blur-sm border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(articles.flatMap(article => article.tags)))
                  .slice(0, 15)
                  .map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchTerm(tag)}
                      className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full hover:bg-purple-600 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <Tag size={12} />
                      {tag}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Articles List */}
          <div className="lg:w-3/4">
            {filteredArticles.length === 0 ? (
              <div className="bg-gray-900/50 rounded-lg p-8 text-center backdrop-blur-sm border border-gray-800">
                <p className="text-gray-400">No articles found matching your criteria</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="mt-4 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors text-white"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Breaking News Banner */}
                {filteredArticles.some(a => a.isBreaking) && (
                  <div className="bg-gradient-to-r from-red-900/50 to-purple-900/50 rounded-lg p-4 border border-red-800/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-red-400 mb-2">
                      <AlertTriangle size={18} />
                      <span className="font-bold">BREAKING NEWS</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {filteredArticles
                        .filter(a => a.isBreaking)
                        .slice(0, 2)
                        .map(article => (
                          <Link 
                            key={article.id} 
                            to={`/news/${article.slug}`}
                            className="group"
                          >
                            <div className="p-3 bg-gray-900/70 rounded-lg hover:bg-gray-800 transition-colors">
                              <div className="flex justify-between items-start">
                                <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">
                                  {article.title}
                                </h3>
                                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                                  Breaking
                                </span>
                              </div>
                              <p className="text-sm text-gray-300 mt-1 line-clamp-2">{article.excerpt}</p>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                )}

                {/* Trending Articles */}
                {filteredArticles.some(a => a.isTrending) && (
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-orange-400 mb-4">
                      <TrendingUp size={18} />
                      <span className="font-bold">TRENDING NOW</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      {filteredArticles
                        .filter(a => a.isTrending)
                        .slice(0, 3)
                        .map(article => (
                          <Link 
                            key={article.id} 
                            to={`/news/${article.slug}`}
                            className="group"
                          >
                            <div className="h-full flex flex-col bg-gray-800/30 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                              {article.coverImage && (
                                <img 
                                  src={article.coverImage} 
                                  alt={article.title}
                                  className="w-full h-32 object-cover"
                                />
                              )}
                              <div className="p-4 flex-grow">
                                <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full mb-2 inline-block">
                                  Trending
                                </span>
                                <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                                  {article.title}
                                </h3>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                )}

                {/* All Articles */}
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredArticles.map(article => (
                    <div key={article.id} className="bg-gray-900/50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow backdrop-blur-sm border border-gray-800">
                      {article.coverImage && (
                        <Link to={`/news/${article.slug}`}>
                          <img 
                            src={article.coverImage} 
                            alt={article.title}
                            className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                          />
                        </Link>
                      )}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            article.isBreaking 
                              ? 'bg-red-500/20 text-red-400' 
                              : article.isTrending 
                                ? 'bg-orange-500/20 text-orange-400' 
                                : `bg-${CATEGORIES.find(c => c.name === article.category)?.color}-500/20 text-${CATEGORIES.find(c => c.name === article.category)?.color}-400`
                          }`}>
                            {article.category}
                          </span>
                          <div className="flex gap-1">
                            <button 
                              onClick={() => bookmarkArticle(article.id)}
                              className={`p-1 rounded-full ${bookmarkedArticles.some(a => a.id === article.id) ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
                              title={bookmarkedArticles.some(a => a.id === article.id) ? 'Remove bookmark' : 'Bookmark this article'}
                            >
                              <Bookmark 
                                size={16} 
                                fill={bookmarkedArticles.some(a => a.id === article.id) ? 'currentColor' : 'none'} 
                              />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                shareArticle(article);
                              }}
                              className="p-1 rounded-full text-gray-400 hover:text-purple-400"
                              title="Share this article"
                            >
                              <Share2 size={16} />
                            </button>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          <Link to={`/news/${article.slug}`} className="hover:text-purple-400 transition-colors">
                            {article.title}
                          </Link>
                        </h3>
                        <p className="text-gray-300 mb-4 line-clamp-2">{article.excerpt}</p>
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center text-gray-400">
                            {article.source && (
                              <span className="bg-gray-800 px-2 py-1 rounded mr-2">
                                {article.source}
                              </span>
                            )}
                            <Calendar size={12} className="mr-1" />
                            {article.date}
                          </div>
                          <span className="text-gray-400 flex items-center">
                            <Clock size={12} className="mr-1" />
                            {article.readTime}
                          </span>
                        </div>
                        {article.tags && article.tags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {article.tags.slice(0, 3).map(tag => (
                              <span 
                                key={tag} 
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSearchTerm(tag);
                                }}
                                className="cursor-pointer text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded hover:bg-purple-600 hover:text-white transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const NewsArticle = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<AINewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<AINewsArticle[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        // Safely get saved articles from localStorage
        const saved = localStorage.getItem('newsArticles');
        const savedArticles = saved ? JSON.parse(saved) : [];

        const savedArticle = Array.isArray(savedArticles)
          ? savedArticles.find((a: AINewsArticle) => a.slug === slug)
          : null;

        if (savedArticle) {
          setArticle(savedArticle);

          // Check if the article is bookmarked
          const bookmarks = localStorage.getItem('bookmarkedArticles');
          const bookmarkedArticles = bookmarks ? JSON.parse(bookmarks) : [];
          setBookmarked(
            Array.isArray(bookmarkedArticles) &&
            bookmarkedArticles.some((a: AINewsArticle) => a.id === savedArticle.id)
          );

          // Find related articles
          const related = savedArticles
            .filter((a: AINewsArticle) => a.slug !== slug && a.category === savedArticle.category)
            .slice(0, 3);
          setRelatedArticles(related);
        } else {
          // Fallback to mock data
          const mockArticle = aiNewsArticles.find(a => a.slug === slug);
          if (mockArticle) {
            setArticle(mockArticle);

            // Check if the article is bookmarked
            const bookmarks = localStorage.getItem('bookmarkedArticles');
            const bookmarkedArticles = bookmarks ? JSON.parse(bookmarks) : [];
            setBookmarked(
              Array.isArray(bookmarkedArticles) &&
              bookmarkedArticles.some((a: AINewsArticle) => a.id === mockArticle.id)
            );

            // Find related articles
            const related = aiNewsArticles
              .filter(a => a.slug !== slug && a.category === mockArticle.category)
              .slice(0, 3);
            setRelatedArticles(related);
          } else {
            setError('Article not found');
          }
        }
      } catch (err) {
        console.error("Error loading article:", err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const toggleBookmark = () => {
    if (!article) return;
    
    const bookmarkedArticles = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
    let updatedBookmarks;
    
    if (bookmarked) {
      updatedBookmarks = bookmarkedArticles.filter((a: AINewsArticle) => a.id !== article.id);
    } else {
      updatedBookmarks = [...bookmarkedArticles, article];
    }
    
    localStorage.setItem('bookmarkedArticles', JSON.stringify(updatedBookmarks));
    setBookmarked(!bookmarked);
  };

  const shareArticle = async () => {
    if (!article) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href
        });
      } else {
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`;
        window.open(shareUrl, '_blank');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-spin"></div>
              <div className="text-lg text-gray-400">Loading article...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-950 pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Article not found</h2>
          <Link 
            to="/news" 
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/news" 
          className="inline-flex items-center text-gray-400 hover:text-purple-400 mb-8 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to News
        </Link>

        <article className="bg-gray-900/50 rounded-xl p-8 backdrop-blur-sm border border-gray-800">
          <header className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  article.isBreaking 
                    ? 'bg-red-500/20 text-red-400' 
                    : article.isTrending 
                      ? 'bg-orange-500/20 text-orange-400' 
                      : `bg-${CATEGORIES.find(c => c.name === article.category)?.color}-500/20 text-${CATEGORIES.find(c => c.name === article.category)?.color}-400`
                }`}>
                  {article.category}
                </span>
                {article.isBreaking && (
                  <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-400 flex items-center gap-1">
                    <AlertTriangle size={12} />
                    Breaking
                  </span>
                )}
                {article.isTrending && (
                  <span className="px-2 py-1 rounded-full text-xs bg-orange-500/20 text-orange-400 flex items-center gap-1">
                    <TrendingUp size={12} />
                    Trending
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={toggleBookmark}
                  className={`p-2 rounded-full ${bookmarked ? 'text-yellow-400' : 'text-gray-400'} hover:bg-gray-800 transition-colors`}
                  title={bookmarked ? 'Remove bookmark' : 'Bookmark this article'}
                >
                  <Bookmark size={18} fill={bookmarked ? 'currentColor' : 'none'} />
                </button>
                <button 
                  onClick={shareArticle}
                  className="p-2 rounded-full text-gray-400 hover:bg-gray-800 hover:text-purple-400 transition-colors"
                  title="Share this article"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{article.title}</h1>
            
            <div className="flex flex-wrap items-center text-gray-400 text-sm mb-6 gap-4">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{article.readTime}</span>
              </div>
              {article.author && (
                <div className="flex items-center">
                  <span className="text-gray-500 mr-1">By</span>
                  <span>{article.author}</span>
                </div>
              )}
              {article.source && (
                <div className="flex items-center">
                  <span className="text-gray-500 mr-1">Source:</span>
                  <span>{article.source}</span>
                </div>
              )}
            </div>

            {article.coverImage && (
              <img 
                src={article.coverImage} 
                alt={article.title}
                className="w-full rounded-lg mb-8 border border-gray-800"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
          </header>

          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />

          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-800">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-full hover:bg-purple-600 hover:text-white transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {article.url && (
            <div className="mt-8 pt-6 border-t border-gray-800">
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
              >
                Read original source <ExternalLink size={16} className="ml-1" />
              </a>
            </div>
          )}
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map(article => (
                <Link 
                  key={article.id} 
                  to={`/news/${article.slug}`}
                  className="group"
                >
                  <div className="h-full bg-gray-900/50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow backdrop-blur-sm border border-gray-800">
                    {article.coverImage && (
                      <img 
                        src={article.coverImage} 
                        alt={article.title}
                        className="w-full h-32 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full mb-2 inline-block ${
                        article.isBreaking 
                          ? 'bg-red-500/20 text-red-400' 
                          : article.isTrending 
                            ? 'bg-orange-500/20 text-orange-400' 
                            : `bg-${CATEGORIES.find(c => c.name === article.category)?.color}-500/20 text-${CATEGORIES.find(c => c.name === article.category)?.color}-400`
                      }`}>
                        {article.category}
                      </span>
                      <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center text-gray-400 text-xs mt-2">
                        <Calendar size={12} className="mr-1" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Mock Data - Fallback if APIs fail
const aiNewsArticles: AINewsArticle[] = [
  {
    id: '1',
    title: "OpenAI Unveils GPT-5 with Multimodal Capabilities",
    slug: "openai-gpt5",
    excerpt: "The next-generation model demonstrates advanced reasoning and multimodal understanding, setting new benchmarks in AI performance.",
    content: `
      <p>OpenAI has officially announced GPT-5, their most advanced AI model to date. The new version shows significant improvements in several key areas:</p>
      <ul>
        <li>30% better performance on complex reasoning tasks</li>
        <li>Native multimodal capabilities (text, images, audio)</li>
        <li>Improved context window of 128k tokens</li>
        <li>Reduced hallucination rates by 40%</li>
      </ul>
      <p>The model also introduces new safety features designed to prevent misuse while maintaining creative potential. Early testers report the model demonstrates more human-like understanding of nuanced requests.</p>
      <p>"GPT-5 represents a fundamental shift in how AI systems understand and interact with the world," said OpenAI's CTO during the announcement.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    date: formatDate(new Date().toISOString()),
    readTime: "4 min read",
    category: "Gen AI",
    tags: ["GPT-5", "OpenAI", "LLM", "Multimodal"],
    source: "OpenAI Blog",
    isBreaking: true,
    isTrending: true,
    url: "https://openai.com/blog/gpt-5"
  },
  {
    id: '2',
    title: "Microsoft's New AI Agent Framework Revolutionizes Enterprise Automation",
    slug: "microsoft-ai-agents",
    excerpt: "The new framework enables AI systems to collaborate on complex tasks with minimal human intervention.",
    content: `
      <p>Microsoft has introduced a new AI Agent Framework that allows multiple specialized AI agents to work together on complex business processes. Key features include:</p>
      <ul>
        <li>Dynamic task delegation between agents</li>
        <li>Built-in verification mechanisms</li>
        <li>Enterprise-grade security protocols</li>
        <li>Seamless integration with Microsoft 365</li>
      </ul>
      <p>Early adopters in the financial sector have reported 60% reductions in process completion times for tasks like loan approvals and fraud detection.</p>
      <p>"This represents the next evolution of business process automation," said Microsoft's VP of AI Platforms. "Instead of automating individual tasks, we're now automating entire workflows with intelligent coordination."</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff",
    date: formatDate(new Date(Date.now() - 86400000).toISOString()), // Yesterday
    readTime: "5 min read",
    category: "AI Agents",
    tags: ["Microsoft", "Agents", "Automation", "Enterprise"],
    source: "Microsoft Developer Blog",
    url: "https://microsoft.com/ai"
  },
  {
    id: '3',
    title: "Breakthrough in Quantum Machine Learning Algorithms",
    slug: "quantum-ml-breakthrough",
    excerpt: "Researchers achieve 1000x speedup on certain machine learning tasks using hybrid quantum-classical algorithms.",
    content: `
      <p>A joint research team from MIT and Google Quantum AI has published a paper demonstrating dramatic speed improvements for specific machine learning tasks using quantum computing.</p>
      <p>The new hybrid approach combines:</p>
      <ul>
        <li>Quantum processing for optimization subroutines</li>
        <li>Classical computing for data handling</li>
        <li>Novel error correction techniques</li>
      </ul>
      <p>While currently limited to specialized hardware, the techniques show particular promise for:</p>
      <ul>
        <li>Drug discovery simulations</li>
        <li>Financial modeling</li>
        <li>Climate pattern analysis</li>
      </ul>
      <p>"This bridges the gap between theoretical quantum advantage and practical machine learning applications," said the lead researcher.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
    date: formatDate(new Date(Date.now() - 172800000).toISOString()), // 2 days ago
    readTime: "6 min read",
    category: "ML Breakthroughs",
    tags: ["Quantum", "Machine Learning", "Research", "Algorithms"],
    source: "Nature Journal",
    isTrending: true,
    url: "https://nature.com/articles/quantum-ml"
  }
];