/**
 * Performance Monitoring Utility
 * 
 * Tracks and logs performance metrics for:
 * - API response times
 * - Data transfer sizes
 * - Cache hit rates
 * - Page load times
 * - Navigation times
 */

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private enabled: boolean = true;

  constructor() {
    // Enable in both development and production
    // In development, it logs to console; in production, also sends to analytics
    this.enabled = typeof window !== 'undefined';
  }

  /**
   * Track API request performance
   */
  trackAPIRequest(
    endpoint: string,
    startTime: number,
    endTime: number,
    dataSize?: number,
    cached?: boolean
  ) {
    if (!this.enabled) return;

    const duration = endTime - startTime;
    const metric: PerformanceMetric = {
      name: `api.${endpoint}`,
      value: duration,
      unit: 'ms',
      timestamp: Date.now(),
      metadata: {
        endpoint,
        dataSize: dataSize || 0,
        cached: cached || false,
        sizeKB: dataSize ? (dataSize / 1024).toFixed(2) : 0,
      },
    };

    this.metrics.push(metric);
    this.logMetric(metric);

    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'api_performance', {
        endpoint,
        duration_ms: Math.round(duration),
        data_size_kb: dataSize ? Math.round(dataSize / 1024) : 0,
        cached: cached || false,
      });
    }
  }

  /**
   * Track page load performance
   */
  trackPageLoad(pageName: string, loadTime: number) {
    if (!this.enabled) return;

    const metric: PerformanceMetric = {
      name: `page.${pageName}.load`,
      value: loadTime,
      unit: 'ms',
      timestamp: Date.now(),
    };

    this.metrics.push(metric);
    this.logMetric(metric);

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_load', {
        page_name: pageName,
        load_time_ms: Math.round(loadTime),
      });
    }
  }

  /**
   * Track navigation performance (click to page ready)
   */
  trackNavigation(from: string, to: string, duration: number) {
    if (!this.enabled) return;

    const metric: PerformanceMetric = {
      name: 'navigation',
      value: duration,
      unit: 'ms',
      timestamp: Date.now(),
      metadata: { from, to },
    };

    this.metrics.push(metric);
    this.logMetric(metric);

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'navigation', {
        from,
        to,
        duration_ms: Math.round(duration),
      });
    }
  }

  /**
   * Track cache hit/miss
   */
  trackCacheEvent(type: 'hit' | 'miss', endpoint: string) {
    if (!this.enabled) return;

    const metric: PerformanceMetric = {
      name: `cache.${type}`,
      value: 1,
      unit: 'count',
      timestamp: Date.now(),
      metadata: { endpoint },
    };

    this.metrics.push(metric);

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cache_event', {
        cache_type: type,
        endpoint,
      });
    }
  }

  /**
   * Get performance summary
   */
  getSummary() {
    const summary = {
      totalMetrics: this.metrics.length,
      apiMetrics: this.metrics.filter(m => m.name.startsWith('api.')),
      pageMetrics: this.metrics.filter(m => m.name.startsWith('page.')),
      cacheHits: this.metrics.filter(m => m.name === 'cache.hit').length,
      cacheMisses: this.metrics.filter(m => m.name === 'cache.miss').length,
      averageAPITime: 0,
      averagePageLoad: 0,
      cacheHitRate: 0,
    };

    const apiTimes = summary.apiMetrics.map(m => m.value);
    const pageTimes = summary.pageMetrics.map(m => m.value);

    if (apiTimes.length > 0) {
      summary.averageAPITime = apiTimes.reduce((a, b) => a + b, 0) / apiTimes.length;
    }

    if (pageTimes.length > 0) {
      summary.averagePageLoad = pageTimes.reduce((a, b) => a + b, 0) / pageTimes.length;
    }

    const totalCacheEvents = summary.cacheHits + summary.cacheMisses;
    if (totalCacheEvents > 0) {
      summary.cacheHitRate = (summary.cacheHits / totalCacheEvents) * 100;
    }

    return summary;
  }

  /**
   * Export metrics as JSON
   */
  exportMetrics() {
    return JSON.stringify({
      metrics: this.metrics,
      summary: this.getSummary(),
      timestamp: Date.now(),
    }, null, 2);
  }

  /**
   * Clear all metrics
   */
  clearMetrics() {
    this.metrics = [];
  }

  /**
   * Log metric to console (always in development, optionally in production)
   */
  private logMetric(metric: PerformanceMetric) {
    // Always log in development, or if explicitly enabled in production
    const shouldLog = process.env.NODE_ENV === 'development' || 
                     localStorage.getItem('perf-logging') === 'true';
    
    if (shouldLog) {
      console.log(`[Performance] ${metric.name}: ${metric.value}${metric.unit}`, metric.metadata || '');
    }
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Expose to window for easy access in browser console
if (typeof window !== 'undefined') {
  (window as any).performanceMonitor = performanceMonitor;
  (window as any).getPerformanceMetrics = () => {
    const summary = performanceMonitor.getSummary();
    console.table({
      'Average API Time': `${summary.averageAPITime.toFixed(2)}ms`,
      'Average Page Load': `${summary.averagePageLoad.toFixed(2)}ms`,
      'Cache Hit Rate': `${summary.cacheHitRate.toFixed(2)}%`,
      'Total Metrics': summary.totalMetrics,
      'Cache Hits': summary.cacheHits,
      'Cache Misses': summary.cacheMisses,
    });
    console.log('Full metrics:', performanceMonitor.exportMetrics());
    return summary;
  };
}

/**
 * Helper function to measure API request performance
 */
export async function measureAPIRequest<T>(
  endpoint: string,
  requestFn: () => Promise<Response>
): Promise<Response> {
  const startTime = performance.now();
  let cached = false;
  let dataSize = 0;

  try {
    const response = await requestFn();
    const endTime = performance.now();

    // Check if response was cached
    cached = response.headers.get('x-cache') === 'HIT' || 
             response.headers.get('cf-cache-status') === 'HIT';

    // Try to get content length
    const contentLength = response.headers.get('content-length');
    if (contentLength) {
      dataSize = parseInt(contentLength, 10);
    } else {
      // If no content-length, clone and measure
      const clonedResponse = response.clone();
      const blob = await clonedResponse.blob();
      dataSize = blob.size;
    }

    performanceMonitor.trackAPIRequest(
      endpoint,
      startTime,
      endTime,
      dataSize,
      cached
    );

    if (cached) {
      performanceMonitor.trackCacheEvent('hit', endpoint);
    } else {
      performanceMonitor.trackCacheEvent('miss', endpoint);
    }

    return response;
  } catch (error) {
    const endTime = performance.now();
    performanceMonitor.trackAPIRequest(endpoint, startTime, endTime, 0, false);
    throw error;
  }
}

/**
 * Helper to measure page load time
 */
export function measurePageLoad(pageName: string) {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const loadTime = performance.now();
    performanceMonitor.trackPageLoad(pageName, loadTime);
  });
}

/**
 * Helper to measure navigation time
 */
export function measureNavigation(from: string, to: string, startTime: number) {
  if (typeof window === 'undefined') return;

  const endTime = performance.now();
  performanceMonitor.trackNavigation(from, to, endTime - startTime);
}

