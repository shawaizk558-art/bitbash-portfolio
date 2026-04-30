import { useParams, useNavigate, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Menu, Share2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { blogPosts, type BlogPost } from "./Blog";

// Sample content for blog posts - in a real app, this would come from a CMS or markdown files
const getBlogContent = (slug: string): string => {
  const contentMap: Record<string, string> = {
    "bitbash-origin-story": `
# The accidental click that changed everything

10 years ago, on October 20, 2015, Bitbash launched on Hacker News. This is chapter 1 from our new book chronicling Bitbash's first decade - from side project to processing billions of web pages.

## The Beginning

It all started with a simple idea and an accidental click. What began as a side project has grown into a platform that processes billions of web pages for thousands of developers worldwide.

## The Journey

Over the past decade, we've seen incredible growth and transformation. From processing our first web page to handling millions of requests daily, the journey has been nothing short of remarkable.

## Looking Forward

As we celebrate 10 years, we're excited about what the future holds. The web scraping and automation landscape continues to evolve, and we're committed to staying at the forefront of innovation.
    `,
    "myaskai-scraping-success": `
# How My AskAI achieved 98% scraping success

AI customer service agents that handle 1.2 million inquiries need current, accurate data. My AskAI wanted to optimize their customer onboarding experience with faster, more reliable scraping.

## The Challenge

My AskAI needed to scrape data from multiple sources reliably and quickly to provide accurate information to their AI agents.

## The Solution

By implementing advanced scraping techniques and optimizing their data pipeline, My AskAI achieved 98% success rates and reduced processing times to just 20 minutes.

## The Results

The improvements led to better customer experiences, faster response times, and more reliable AI agent performance.
    `,
  };

  return contentMap[slug] || `
# ${slug}

This is sample content for the blog post. In a production environment, this content would be loaded from a CMS, markdown files, or a database.

## Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Main Content

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Conclusion

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  `;
};

const BlogPostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [tocItems, setTocItems] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [activeSection, setActiveSection] = useState<string>("");

  const post = blogPosts.find((p) => p.slug === slug);

  // Get related posts (exclude current post, prefer same category, then any other posts)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      // Prioritize posts with the same category
      if (a.category === post?.category && b.category !== post?.category) return -1;
      if (b.category === post?.category && a.category !== post?.category) return 1;
      return 0;
    })
    .slice(0, 3);

  useEffect(() => {
    if (!post || !contentRef.current) return;

    // Extract headings for table of contents
    const headings = contentRef.current.querySelectorAll("h2, h3");
    const items = Array.from(headings).map((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;
      return {
        id,
        text: heading.textContent || "",
        level: heading.tagName === "H2" ? 2 : 3,
      };
    });
    setTocItems(items);
    if (items.length > 0) {
      setActiveSection(items[0].id);
    }
  }, [post]);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const headings = contentRef.current.querySelectorAll("h2, h3");
      let currentSection = "";

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          currentSection = heading.id;
        }
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container-responsive py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
          <Link to="/blog" className="text-purple-600 hover:text-purple-700">
            Back to all posts
          </Link>
        </div>
        <Footer isHomepage={false} />
      </div>
    );
  }

  const content = getBlogContent(post.slug);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`,
  };

  // Split author string by comma for multiple authors
  const authors = post.author.split(",").map((a) => a.trim());

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`${post.title} - BitBash Blog`}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
      />
      <Navigation />

      <div className="pt-8 sm:pt-12 pb-0 relative">
        <div className="container-responsive">
          <div className="flex flex-col lg:flex-row items-stretch relative">
            {/* Main Content */}
            <div className="flex-1 lg:max-w-4xl px-8 relative">
              <div className="absolute inset-y-0 left-0 border-l border-gray-200 pointer-events-none" style={{ top: '-2rem', bottom: '-2rem' }}></div>
              <div className="relative z-10 px-12">
              {/* Back Navigation */}
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-6 text-sm"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to all posts
              </Link>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-gray-100 text-gray-900 hover:bg-gray-200">
                  {post.category}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-gray-600 mb-6">
                {post.excerpt}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <span className="text-gray-400">by</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {authors.map((author, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                        {author.charAt(0)}
                      </div>
                      <span>{author}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div
                ref={contentRef}
                className="prose prose-lg max-w-none"
              >
                {content.split("\n").map((line, index, array) => {
                  // Skip empty lines that come right after headings
                  const prevLine = index > 0 ? array[index - 1] : "";
                  const isAfterHeading = prevLine.trim().startsWith("#");
                  if (line.trim() === "" && isAfterHeading) {
                    return null;
                  }
                  
                  if (line.startsWith("# ")) {
                    return (
                      <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-1">
                        {line.replace("# ", "")}
                      </h1>
                    );
                  }
                  if (line.startsWith("## ")) {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-1">
                        {line.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (line.startsWith("### ")) {
                    return (
                      <h3 key={index} className="text-xl font-bold text-gray-900 mt-4 mb-1">
                        {line.replace("### ", "")}
                      </h3>
                    );
                  }
                  if (line.trim() === "") {
                    return null;
                  }
                  return (
                    <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-96 lg:ml-auto relative">
              <div className="absolute inset-y-0 left-0 right-0 border-l border-r border-gray-200 pointer-events-none" style={{ top: '-2rem', bottom: '-2rem' }}></div>
              <div className="sticky top-8 px-12 space-y-8 pt-16 pb-8 relative z-10">
                {/* Table of Contents */}
                {tocItems.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Menu className="w-6 h-6 text-gray-600" />
                      <h3 className="text-xl font-semibold text-gray-900">On this page</h3>
                    </div>
                    <nav className="space-y-2">
                      {tocItems.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className={`block text-base transition-colors ${
                            activeSection === item.id
                              ? "text-purple-600 border-l-2 border-purple-600 pl-3"
                              : "text-gray-600 hover:text-purple-600 pl-3"
                          } ${item.level === 3 ? "ml-4" : ""}`}
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Share Section */}
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-semibold text-gray-900 whitespace-nowrap">Share this article:</h3>
                    <div className="flex gap-2">
                      <a
                        href={shareLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        aria-label="Share on LinkedIn"
                      >
                        <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                      <a
                        href={shareLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        aria-label="Share on Facebook"
                      >
                        <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                      <a
                        href={shareLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        aria-label="Share on X (Twitter)"
                      >
                        <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: post.title,
                              text: post.excerpt,
                              url: currentUrl,
                            });
                          } else {
                            navigator.clipboard.writeText(currentUrl);
                            alert("Link copied to clipboard!");
                          }
                        }}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        aria-label="Share"
                      >
                        <Share2 className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* CTA Block */}
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6 relative overflow-hidden pb-6">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2">Build the tool for your Needs.</h3>
                    <p className="text-purple-100 text-sm mb-4">Explore our portfolio and see what we have already built</p>
                    <Button
                      onClick={() => navigate("/portfolio")}
                      className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                    >
                      See Our Work
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-200 pt-8"></div>
      </div>

      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
        <section className="container-responsive py-12 sm:py-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 sm:mb-12">Related articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {relatedPosts.map((relatedPost) => {
              const relatedAuthors = relatedPost.author.split(",").map((a) => a.trim());
              return (
                <article
                  key={relatedPost.id}
                  onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                  className="bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 group"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden bg-gray-100 rounded-t-xl">
                    <img
                      src={relatedPost.imageUrl}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-xl"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge className="bg-gray-100 text-gray-900 hover:bg-gray-200 text-xs">
                        {relatedPost.category}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>

                    {/* Author and Date */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {relatedAuthors.map((author, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                              {author.charAt(0)}
                            </div>
                            <span>{author}</span>
                          </div>
                        ))}
                      </div>
                      <span className="text-gray-400">·</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{relatedPost.date}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <Footer isHomepage={false} />
    </div>
  );
};

export default BlogPostDetail;
