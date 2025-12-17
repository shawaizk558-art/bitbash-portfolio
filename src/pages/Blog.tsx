import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, User, X } from "@/lib/icons";
import { HeroBackground } from "@/components/HeroBackground";

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  slug: string;
}

// Sample blog posts data - Replace with your actual blog posts
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The accidental click that changed everything: the Bitbash origin story",
    excerpt: "10 years ago, on October 20, 2015, Bitbash launched on Hacker News. This is chapter 1 from our new book chronicling Bitbash's first decade - from side project to processing billions of web pages.",
    author: "Stuart William Godwin",
    date: "Oct 20, 2025",
    category: "Life at Bitbash",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    slug: "bitbash-origin-story"
  },
  {
    id: 2,
    title: "How My AskAI achieved 98% scraping success and 20-minute processing times",
    excerpt: "AI customer service agents that handle 1.2 million inquiries need current, accurate data. My AskAI wanted to optimize their customer onboarding experience with faster, more reliable scraping.",
    author: "Daniel Lee",
    date: "Sep 22, 2025",
    category: "AI agents",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    slug: "myaskai-scraping-success"
  },
  {
    id: 3,
    title: "Rapid API vs. Apidog: Comparison for developers",
    excerpt: "A comprehensive comparison of RapidAPI and Apidog to help developers choose the right API platform for their needs.",
    author: "Magda Rýdová",
    date: "Oct 31, 2025",
    category: "Tool comparisons",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    slug: "rapidapi-vs-apidog"
  },
  {
    id: 4,
    title: "How to identify TikTok trends for businesses",
    excerpt: "Learn how to leverage TikTok trend analysis to boost your business marketing strategy and stay ahead of competitors.",
    author: "Magda Rýdová",
    date: "Oct 30, 2025",
    category: "Social media intelligence",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop",
    slug: "tiktok-trends-business"
  },
  {
    id: 5,
    title: "AI web scraping is exposing fake discounts across Europe",
    excerpt: "The EU Commission is using AI-powered web scraping to identify and fight against fake discount practices in e-commerce.",
    author: "Theo Vasilis",
    date: "Oct 27, 2025",
    category: "Case studies",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    slug: "eu-fake-discounts"
  },
  {
    id: 6,
    title: "Best job scraping tools for talent acquisition",
    excerpt: "Discover the top job scraping tools that help HR teams and recruiters automate job posting collection and analysis.",
    author: "Magda Rýdová",
    date: "Oct 24, 2025",
    category: "Tool comparisons",
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
    slug: "best-job-scraping-tools"
  },
  {
    id: 7,
    title: "How to easily find influencers on Instagram",
    excerpt: "A step-by-step guide to identifying and connecting with Instagram influencers using web scraping and automation tools.",
    author: "Magda Rýdová",
    date: "Oct 23, 2025",
    category: "Social media intelligence",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop",
    slug: "find-instagram-influencers"
  },
  {
    id: 8,
    title: "Woflow: Real-time merchant data across 100s of platforms with Bitbash",
    excerpt: "How Woflow uses Bitbash to aggregate real-time merchant data from hundreds of platforms, enabling seamless data synchronization.",
    author: "Daniel Lee",
    date: "Oct 22, 2025",
    category: "Case studies",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    slug: "woflow-merchant-data"
  },
  {
    id: 9,
    title: "RapidAPI vs. Postman: A guide for developers",
    excerpt: "Compare RapidAPI and Postman to understand which tool better suits your API development and testing workflow.",
    author: "Magda Rýdová",
    date: "Oct 21, 2025",
    category: "Tool comparisons",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    slug: "rapidapi-vs-postman"
  },
  {
    id: 10,
    title: "Introducing general resource access to improve control",
    excerpt: "New feature update: Learn how general resource access improves control over resource sharing in automation workflows.",
    author: "Tobiáš Potoček",
    date: "Oct 20, 2025",
    category: "Updates",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    slug: "general-resource-access"
  },
  {
    id: 11,
    title: "Getting started with web scraping in Python",
    excerpt: "A beginner-friendly tutorial on web scraping using Python, covering libraries like BeautifulSoup and Scrapy.",
    author: "Magda Rýdová",
    date: "Oct 15, 2025",
    category: "Tutorials",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4d18fdb?w=800&h=400&fit=crop",
    slug: "python-web-scraping-tutorial"
  },
  {
    id: 12,
    title: "Understanding AI agents in automation",
    excerpt: "Explore how AI agents are revolutionizing automation workflows and making intelligent decisions in complex scenarios.",
    author: "Daniel Lee",
    date: "Oct 10, 2025",
    category: "AI",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    slug: "ai-agents-automation"
  },
];

const Blog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("All posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(12);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const categories = [
    "All posts",
    "Updates",
    "Tutorials",
    "AI",
    "Programming",
    "Case studies",
    "Tool comparisons",
    "Use cases",
    "Web automation",
    "Social media intelligence",
    "Ecommerce and retail",
    "Market research",
  ];

  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All posts" || post.category === selectedCategory;
    const matchesSearch = searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedPosts = filteredPosts.slice(0, displayCount);
  const featuredPosts = displayedPosts.slice(0, 2);
  const regularPosts = displayedPosts.slice(2);
  const hasMore = filteredPosts.length > displayCount;

  const loadMore = () => {
    setDisplayCount(prev => prev + 12);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Blog - BitBash"
        description="Latest news, tutorials, and insights about automation, web scraping, and development. Stay updated with the latest trends and best practices."
        canonical="/blog"
      />
      <Navigation />

      {/* Blog Hero Section */}
      <section className="relative min-h-[clamp(320px,52vh,420px)] sm:min-h-[clamp(370px,57vh,470px)] md:min-h-[clamp(440px,67vh,560px)] lg:min-h-[clamp(380px,67vh,540px)] 2xl:min-h-[clamp(380px,66vh,580px)] flex items-center justify-center overflow-hidden pt-12 sm:pt-16 pb-6 sm:pb-8 lg:pb-12">
        {/* Match homepage purple animated gradient */}
        <HeroBackground />
        <div className="container-responsive relative z-20">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center 2xl:-mt-4">
            {/* Heading - Always visible */}
            <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-16 mb-3 sm:mb-4 md:mb-5 lg:mb-6 px-4 sm:px-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                BitBash <span className="text-purple-600">Blog</span>
              </h1>
            </div>

            {/* Subtitle Lines - Hidden on mobile, visible on larger screens */}
            <div className="hidden sm:block space-responsive-sm mb-4 sm:mb-5 md:mb-6 lg:mb-8 px-4 md:px-6 lg:px-0">
              <div className="space-y-1 sm:space-y-1.5">
                <p className="text-sm sm:text-base md:text-lg lg:text-[21px] text-black font-semibold md:whitespace-nowrap break-words">
                  Latest news, tutorials, and insights about <span className="text-purple-600 font-semibold">automation</span>, web scraping, and development
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-[21px] text-black md:whitespace-nowrap break-words">
                  Stay updated with the latest trends and best practices from our team of experts.
                </p>
              </div>
            </div>

            {/* Search Bar - Smaller size */}
            <div className="max-w-xl mx-auto w-full px-4 sm:px-6 md:px-0 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base bg-white/90 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Category Filters - Show 6 options + "..." button */}
            <div className="w-full px-4 sm:px-6 md:px-0 max-w-5xl mx-auto">
              {showAllCategories ? (
                <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3 justify-center items-center">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setDisplayCount(12);
                      }}
                      className={`px-2.5 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full text-xs sm:text-xs md:text-sm lg:text-base font-medium transition-colors whitespace-nowrap flex-shrink-0 min-h-[32px] sm:min-h-[36px] md:min-h-0 ${selectedCategory === category
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200"
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                  <button
                    onClick={() => setShowAllCategories(false)}
                    className="px-2.5 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full text-xs sm:text-xs md:text-sm lg:text-base font-medium transition-colors whitespace-nowrap flex-shrink-0 min-h-[32px] sm:min-h-[36px] md:min-h-0 bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200 flex items-center justify-center"
                    aria-label="Close all categories"
                  >
                    <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3 justify-center items-center overflow-x-auto lg:overflow-visible">
                  <div className="flex flex-nowrap sm:flex-nowrap md:flex-nowrap lg:flex-nowrap gap-2 sm:gap-2.5 md:gap-3 items-center flex-shrink-0">
                    {categories.slice(0, 6).map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setDisplayCount(12);
                        }}
                        className={`px-2.5 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full text-xs sm:text-xs md:text-sm lg:text-base font-medium transition-colors whitespace-nowrap flex-shrink-0 min-h-[32px] sm:min-h-[36px] md:min-h-0 ${selectedCategory === category
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200"
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                    {categories.length > 6 && (
                      <button
                        onClick={() => setShowAllCategories(true)}
                        className="px-2.5 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full text-xs sm:text-xs md:text-sm lg:text-base font-medium transition-colors whitespace-nowrap flex-shrink-0 min-h-[32px] sm:min-h-[36px] md:min-h-0 bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200"
                      >
                        ...
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Subtle divider at bottom to separate sections */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200/60 to-transparent" />
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container-responsive">
          {displayedPosts.length > 0 ? (
            <>
              {/* Featured Posts - First 2 posts, larger size */}
              {featuredPosts.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-6 sm:mb-8">
                  {featuredPosts.map((post) => (
                    <article
                      key={post.id}
                      onClick={() => navigate(`/blog/${post.slug}`)}
                      className="bg-white rounded-xl overflow-hidden group cursor-pointer"
                    >
                      {/* Featured Image */}
                      <div className="relative aspect-video overflow-hidden bg-gray-100 rounded-xl">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-xl"
                        />
                      </div>

                      {/* Post Content */}
                      <div className="pt-2 pb-1 sm:pt-2 sm:pb-2">
                        <Badge className="bg-gray-100 text-gray-900 hover:bg-gray-200 text-xs mb-1.5">
                          {post.category}
                        </Badge>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-gray-600 mb-3 line-clamp-3 text-sm sm:text-base">
                          {post.excerpt}
                        </p>

                        {/* Author and Date */}
                        <div className="flex items-center gap-3 text-sm sm:text-base text-gray-500 mb-3">
                          <div className="flex items-center gap-1.5">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Regular Posts - 3 columns */}
              {regularPosts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {regularPosts.map((post) => (
                    <article
                      key={post.id}
                      onClick={() => navigate(`/blog/${post.slug}`)}
                      className="bg-white rounded-xl overflow-hidden group cursor-pointer"
                    >
                      {/* Featured Image */}
                      <div className="relative aspect-video overflow-hidden bg-gray-100 rounded-xl">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-xl"
                        />
                      </div>

                      {/* Post Content */}
                      <div className="pt-3 pb-2">
                        <Badge className="bg-gray-100 text-gray-900 hover:bg-gray-200 mb-2">
                          {post.category}
                        </Badge>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        {/* Author and Date */}
                        <div className="flex items-center gap-4 text-sm sm:text-base text-gray-500 mb-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-12">
                  <Button
                    onClick={loadMore}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-base font-semibold"
                  >
                    Load more posts
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">
                No posts found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer isHomepage={false} />
    </div>
  );
};

export default Blog;

