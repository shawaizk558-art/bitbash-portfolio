/**
 * Client-Side Cache Utility
 * 
 * Provides in-memory caching with TTL (Time To Live) for API responses
 * and computed data. Helps eliminate redundant network requests and
 * expensive computations.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class SimpleCache {
  private cache = new Map<string, CacheEntry<any>>();
  private defaultTTL: number;

  constructor(defaultTTL: number = 3600000) {
    // Default TTL: 1 hour (3600000ms)
    this.defaultTTL = defaultTTL;
  }

  /**
   * Get cached data if it exists and hasn't expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if entry has expired
    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      // Entry expired, remove it
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Set cached data with optional custom TTL
   */
  set<T>(key: string, data: T, ttl?: number): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    };
    
    this.cache.set(key, entry);
  }

  /**
   * Check if a key exists in cache and is valid
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return false;
    }

    // Check if entry has expired
    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      // Entry expired, remove it
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Remove a specific key from cache
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cached data
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const now = Date.now();
    let validEntries = 0;
    let expiredEntries = 0;

    for (const entry of this.cache.values()) {
      if (now - entry.timestamp > entry.ttl) {
        expiredEntries++;
      } else {
        validEntries++;
      }
    }

    return {
      total: this.cache.size,
      valid: validEntries,
      expired: expiredEntries,
    };
  }

  /**
   * Clean up expired entries (call periodically to free memory)
   */
  cleanup(): number {
    const now = Date.now();
    let removed = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
        removed++;
      }
    }

    return removed;
  }
}

// Singleton instance with 1 hour default TTL
export const cache = new SimpleCache(3600000); // 1 hour

// Cache keys
export const CACHE_KEYS = {
  MONGO_PROJECTS: 'mongo-projects',
  MONGO_PROJECT: (slug: string) => `mongo-project-${slug}`,
  ALL_PROJECTS: 'all-projects',
} as const;

/**
 * Request deduplication - tracks in-flight requests
 */
class RequestDeduplicator {
  private inFlight = new Map<string, Promise<any>>();

  /**
   * Get or create a request promise
   * If a request with the same key is already in flight, return that promise
   */
  async getOrCreate<T>(
    key: string,
    requestFn: () => Promise<T>
  ): Promise<T> {
    // If request is already in flight, return the existing promise
    if (this.inFlight.has(key)) {
      return this.inFlight.get(key)!;
    }

    // Create new request promise
    const promise = requestFn()
      .then((result) => {
        // Remove from in-flight when done
        this.inFlight.delete(key);
        return result;
      })
      .catch((error) => {
        // Remove from in-flight on error
        this.inFlight.delete(key);
        throw error;
      });

    // Store in-flight request
    this.inFlight.set(key, promise);

    return promise;
  }

  /**
   * Check if a request is currently in flight
   */
  isInFlight(key: string): boolean {
    return this.inFlight.has(key);
  }

  /**
   * Clear all in-flight requests (useful for testing or cleanup)
   */
  clear(): void {
    this.inFlight.clear();
  }
}

// Singleton instance for request deduplication
export const requestDeduplicator = new RequestDeduplicator();

// Auto-cleanup expired cache entries every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    cache.cleanup();
  }, 5 * 60 * 1000); // 5 minutes
}

