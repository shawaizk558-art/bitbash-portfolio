/**
 * Performance Monitoring Library
 * 
 * Tracks API response times, page load times, navigation times, and cache metrics.
 * Works in both development (console logs) and production (Google Analytics).
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
  private pageLoadStartTimes: Map<string, number> = new Map();
  private navigationStartTimes: Map<string, number> = new Map();

  /**
   * Track an API request
   */
  async measureAPIRequest<T extends Response>(
    endpoint: string,
    requestFn: () => Promise<T>
  ): Promise<T> {
    const startTime = performance.now();
    const startTimestamp = Date.now();

    try {
      const response = await requestFn();
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Get response size if available
      const contentLength = response.headers.get('content-length');
      const dataSize = contentLength ? parseInt(contentLength, 10) : 0;
      const sizeKB = (dataSize / 1024).toFixed(2);

      // Check if response was cached
      const cached = response.headers.get('x-cache') === 'HIT' || 
                     response.status === 304 ||
                     (response as any).fromCache === true;

      const metric: PerformanceMetric = {
        name: `api.${endpoint}`,
        value: Math.round(duration),
        unit: 'ms',
        timestamp: startTimestamp,
        metadata: {
          endpoint,
          dataSize,
          sizeKB,
          cached,
          status: response.status,
        },
      };

      this.metrics.push(metric);
      this.logMetric(metric);

      // Send to Google Analytics if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'api_performance', {
          endpoint,
          duration: Math.round(duration),
          sizeKB,
          cached: cached ? 'true' : 'false',
          status: response.status,
        });
      }

      return response;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      const metric: PerformanceMetric = {
        name: `api.${endpoint}`,
        value: Math.round(duration),
        unit: 'ms',
        timestamp: startTimestamp,
        metadata: {
          endpoint,
          error: true,
          errorMessage: error instanceof Error ? error.message : String(error),
        },
      };

      this.metrics.push(metric);
      this.logMetric(metric);

      throw error;
    }
  }

  /**
   * Start tracking page load time
   */
  measurePageLoad(pageName: string): void {
    const startTime = performance.now();
    this.pageLoadStartTimes.set(pageName, startTime);

    // Track when page becomes interactive
    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        this.finishPageLoad(pageName);
      } else {
        window.addEventListener('load', () => {
          this.finishPageLoad(pageName);
        }, { once: true });
      }
    }
  }

  /**
   * Finish tracking page load time
   */
  private finishPageLoad(pageName: string): void {
    const startTime = this.pageLoadStartTimes.get(pageName);
    if (!startTime) return;

    const endTime = performance.now();
    const duration = endTime - startTime;

    const metric: PerformanceMetric = {
      name: `page_load.${pageName}`,
      value: Math.round(duration),
      unit: 'ms',
      timestamp: Date.now(),
      metadata: {
        pageName,
      },
    };

    this.metrics.push(metric);
    this.logMetric(metric);

    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_load', {
        page_name: pageName,
        duration: Math.round(duration),
      });
    }

    this.pageLoadStartTimes.delete(pageName);
  }

  /**
   * Start tracking navigation time
   */
  measureNavigation(from: string, to: string, startTime: number): void {
    const navigationKey = `${from}->${to}`;
    this.navigationStartTimes.set(navigationKey, startTime);

    // Finish tracking when page is ready
    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        this.finishNavigation(navigationKey, startTime);
      } else {
        window.addEventListener('load', () => {
          this.finishNavigation(navigationKey, startTime);
        }, { once: true });
      }
    }
  }

  /**
   * Finish tracking navigation time
   */
  private finishNavigation(navigationKey: string, startTime: number): void {
    const endTime = performance.now();
    const duration = endTime - startTime;

    const [from, to] = navigationKey.split('->');

    const metric: PerformanceMetric = {
      name: `navigation.${navigationKey}`,
      value: Math.round(duration),
      unit: 'ms',
      timestamp: Date.now(),
      metadata: {
        from,
        to,
      },
    };

    this.metrics.push(metric);
    this.logMetric(metric);

    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'navigation', {
        from,
        to,
        duration: Math.round(duration),
      });
    }

    this.navigationStartTimes.delete(navigationKey);
  }

  /**
   * Log metric to console (development only)
   * Suppressed to avoid console noise
   */
  private logMetric(metric: PerformanceMetric): void {
    // Suppressed - no console logging
  }

  /**
   * Get all metrics
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  /**
   * Get performance summary
   */
  getSummary(): {
    averageAPITime: number;
    averagePageLoad: number;
    cacheHitRate: number;
    totalMetrics: number;
    cacheHits: number;
    cacheMisses: number;
  } {
    const apiMetrics = this.metrics.filter(m => m.name.startsWith('api.'));
    const pageLoadMetrics = this.metrics.filter(m => m.name.startsWith('page_load.'));
    const cacheMetrics = this.metrics.filter(m => m.metadata?.cached !== undefined);

    const averageAPITime =
      apiMetrics.length > 0
        ? apiMetrics.reduce((sum, m) => sum + m.value, 0) / apiMetrics.length
        : 0;

    const averagePageLoad =
      pageLoadMetrics.length > 0
        ? pageLoadMetrics.reduce((sum, m) => sum + m.value, 0) / pageLoadMetrics.length
        : 0;

    const cacheHits = cacheMetrics.filter(m => m.metadata?.cached === true).length;
    const cacheMisses = cacheMetrics.filter(m => m.metadata?.cached === false).length;
    const cacheHitRate =
      cacheMetrics.length > 0 ? (cacheHits / cacheMetrics.length) * 100 : 0;

    return {
      averageAPITime: Math.round(averageAPITime),
      averagePageLoad: Math.round(averagePageLoad),
      cacheHitRate: Math.round(cacheHitRate * 100) / 100,
      totalMetrics: this.metrics.length,
      cacheHits,
      cacheMisses,
    };
  }

  /**
   * Export metrics as JSON
   */
  exportMetrics(): { metrics: PerformanceMetric[]; summary: ReturnType<typeof this.getSummary> } {
    return {
      metrics: this.getMetrics(),
      summary: this.getSummary(),
    };
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    this.metrics = [];
    this.pageLoadStartTimes.clear();
    this.navigationStartTimes.clear();
  }
}

// Singleton instance
const performanceMonitor = new PerformanceMonitor();

// Export functions that use the singleton
export function measureAPIRequest<T extends Response>(
  endpoint: string,
  requestFn: () => Promise<T>
): Promise<T> {
  return performanceMonitor.measureAPIRequest(endpoint, requestFn);
}

export function measurePageLoad(pageName: string): void {
  performanceMonitor.measurePageLoad(pageName);
}

export function measureNavigation(from: string, to: string, startTime: number): void {
  performanceMonitor.measureNavigation(from, to, startTime);
}

// Export utility functions for console access
if (typeof window !== 'undefined') {
  (window as any).getPerformanceMetrics = () => {
    const summary = performanceMonitor.getSummary();
    console.table(summary);
    return summary;
  };

  (window as any).performanceMonitor = performanceMonitor;
}

