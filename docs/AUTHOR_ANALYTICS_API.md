# Author Analytics API Documentation

API untuk Author melihat analytics dan statistik performa artikel mereka.

## Base URL
```
/api/author/analytics
```

## Authentication
Semua endpoint memerlukan:
- **Authorization Header**: `Bearer <access_token>`
- **Role**: `AUTHOR` atau `ADMIN`

---

## Endpoints

### 1. Get Overview Statistics

**Priority**: 0 (Must Have)

```http
GET /api/author/analytics/overview
```

**Description**: Mendapatkan overview statistik untuk dashboard author (total views, likes, comments, trends, dll).

#### Response Success (200)

```json
{
  "success": true,
  "data": {
    "totalViews": 15420,
    "totalLikes": 1250,
    "totalComments": 380,
    "totalShares": 245,
    "totalArticles": 42,
    "publishedArticles": 35,
    "draftArticles": 7,
    "trends": {
      "viewsTrend": 15,
      "likesTrend": -5,
      "commentsTrend": 23,
      "sharesTrend": 10
    },
    "recentActivity": {
      "viewsThisWeek": 1250,
      "viewsThisMonth": 4800,
      "likesThisWeek": 95,
      "likesThisMonth": 380,
      "commentsThisWeek": 28,
      "commentsThisMonth": 115
    }
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `totalViews` | number | Total views across all articles |
| `totalLikes` | number | Total likes across all articles |
| `totalComments` | number | Total comments across all articles |
| `totalShares` | number | Total shares across all articles |
| `totalArticles` | number | Total number of articles (all statuses) |
| `publishedArticles` | number | Number of published articles |
| `draftArticles` | number | Number of draft articles |
| `trends.viewsTrend` | number | % change in views (last 30 days vs previous 30 days) |
| `trends.likesTrend` | number | % change in likes (positive/negative) |
| `trends.commentsTrend` | number | % change in comments |
| `trends.sharesTrend` | number | % change in shares |
| `recentActivity.*` | number | Activity counts for recent periods |

#### Example Request

```javascript
GET /api/author/analytics/overview
Authorization: Bearer <token>
```

---

### 2. Get Top Articles

**Priority**: 0 (Must Have)

```http
GET /api/author/analytics/top-articles
```

**Description**: Mendapatkan artikel dengan performa terbaik berdasarkan metrics tertentu.

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `limit` | number | No | `10` | Jumlah artikel yang ditampilkan (max 50) |
| `sortBy` | enum | No | `views` | Sort by: `views`, `likes`, `comments`, `engagement` |

#### Response Success (200)

```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": "clxxx123",
        "title": "Introduction to React Hooks",
        "slug": "introduction-to-react-hooks",
        "coverImageUrl": "https://example.com/cover.jpg",
        "views": 5420,
        "likes": 380,
        "comments": 95,
        "shares": 67,
        "publishedAt": "2024-01-15T10:00:00Z",
        "engagementRate": 8.76,
        "category": {
          "id": "clxxx789",
          "name": "Programming",
          "slug": "programming"
        }
      }
    ],
    "totalArticles": 10
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `engagementRate` | number | (likes + comments) / views * 100 |
| `category` | object \| null | Article category info |

#### Example Requests

```javascript
// Get top 10 by views (default)
GET /api/author/analytics/top-articles

// Get top 5 by engagement rate
GET /api/author/analytics/top-articles?limit=5&sortBy=engagement

// Get top 20 by likes
GET /api/author/analytics/top-articles?limit=20&sortBy=likes
```

---

### 3. Get Views Timeline

**Priority**: 1 (Should Have)

```http
GET /api/author/analytics/views-timeline
```

**Description**: Mendapatkan data timeline views untuk chart/graph.

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `period` | enum | No | `30days` | Period: `7days`, `30days`, `90days`, `1year` |
| `articleId` | string | No | - | Filter untuk artikel tertentu (optional) |

#### Response Success (200)

```json
{
  "success": true,
  "data": {
    "period": "30days",
    "data": [
      {
        "date": "2024-01-15",
        "views": 145,
        "uniqueViews": 98
      },
      {
        "date": "2024-01-16",
        "views": 189,
        "uniqueViews": 121
      }
    ],
    "total": 4520,
    "average": 150,
    "peak": {
      "date": "2024-01-20",
      "views": 340
    }
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `data` | array | Array of daily view counts |
| `data[].date` | string | Date in YYYY-MM-DD format |
| `data[].views` | number | Total views for that day |
| `data[].uniqueViews` | number | Unique visitors (by user_id or IP) |
| `total` | number | Total views in period |
| `average` | number | Average views per day |
| `peak` | object | Day with highest views |

#### Example Requests

```javascript
// Get last 30 days views for all articles
GET /api/author/analytics/views-timeline

// Get last 7 days
GET /api/author/analytics/views-timeline?period=7days

// Get views for specific article
GET /api/author/analytics/views-timeline?articleId=clxxx123&period=90days
```

---

### 4. Get Category Statistics

**Priority**: 1 (Should Have)

```http
GET /api/author/analytics/category-stats
```

**Description**: Mendapatkan performa artikel berdasarkan kategori.

#### Response Success (200)

```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "categoryId": "clxxx789",
        "categoryName": "Programming",
        "categorySlug": "programming",
        "articlesCount": 15,
        "totalViews": 8500,
        "totalLikes": 680,
        "totalComments": 195,
        "totalShares": 125,
        "avgViewsPerArticle": 567,
        "engagementRate": 10.29
      },
      {
        "categoryId": null,
        "categoryName": "Uncategorized",
        "categorySlug": null,
        "articlesCount": 3,
        "totalViews": 450,
        "totalLikes": 25,
        "totalComments": 8,
        "totalShares": 5,
        "avgViewsPerArticle": 150,
        "engagementRate": 7.33
      }
    ],
    "totalCategories": 5
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `avgViewsPerArticle` | number | Average views per article in category |
| `engagementRate` | number | (likes + comments) / views * 100 for category |
| Uncategorized | - | Articles without category akan digroup sebagai "Uncategorized" |

#### Example Request

```javascript
GET /api/author/analytics/category-stats
```

---

### 5. Get Single Article Analytics

**Priority**: 2 (Nice to Have)

```http
GET /api/author/analytics/articles/:id
```

**Description**: Mendapatkan analytics detail untuk 1 artikel tertentu (views timeline, referrers, device breakdown, dll).

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Article ID |

#### Response Success (200)

```json
{
  "success": true,
  "data": {
    "article": {
      "id": "clxxx123",
      "title": "Introduction to React Hooks",
      "slug": "introduction-to-react-hooks",
      "coverImageUrl": "https://example.com/cover.jpg",
      "publishedAt": "2024-01-15T10:00:00Z",
      "category": {
        "id": "clxxx789",
        "name": "Programming",
        "slug": "programming"
      }
    },
    "stats": {
      "totalViews": 5420,
      "totalLikes": 380,
      "totalComments": 95,
      "totalShares": 67,
      "engagementRate": 8.76,
      "avgReadingTime": 245
    },
    "viewsTimeline": [
      {
        "date": "2024-01-15",
        "views": 145,
        "uniqueViews": 98
      }
    ],
    "topReferrers": [
      {
        "referrer": "https://google.com",
        "count": 1250
      },
      {
        "referrer": "Direct",
        "count": 980
      },
      {
        "referrer": "https://twitter.com",
        "count": 340
      }
    ],
    "deviceBreakdown": [
      {
        "device": "Desktop",
        "count": 3200,
        "percentage": 59.04
      },
      {
        "device": "Mobile",
        "count": 1800,
        "percentage": 33.21
      },
      {
        "device": "Tablet",
        "count": 420,
        "percentage": 7.75
      }
    ],
    "countryBreakdown": [
      {
        "country": "Indonesia",
        "count": 2800,
        "percentage": 51.66
      },
      {
        "country": "United States",
        "count": 1200,
        "percentage": 22.14
      },
      {
        "country": "Singapore",
        "count": 580,
        "percentage": 10.70
      }
    ]
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `stats.avgReadingTime` | number | Average time spent reading (in seconds) |
| `viewsTimeline` | array | Last 30 days views data |
| `topReferrers` | array | Top 10 traffic sources |
| `deviceBreakdown` | array | Views by device type |
| `countryBreakdown` | array | Top 10 countries by views |

#### Response Error (404)

```json
{
  "success": false,
  "error": "Article not found or not accessible"
}
```

#### Example Request

```javascript
GET /api/author/analytics/articles/clxxx123
```

---

## Error Responses

### 401 Unauthorized

```json
{
  "error": "Unauthorized"
}
```

**Cause**: Token tidak valid atau tidak ada

---

### 403 Forbidden

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions"
  }
}
```

**Cause**: User bukan AUTHOR atau ADMIN

---

### 400 Validation Error

```json
{
  "success": false,
  "error": "Validation error",
  "details": [
    {
      "code": "invalid_enum_value",
      "options": ["7days", "30days", "90days", "1year"],
      "path": ["period"],
      "message": "Invalid enum value"
    }
  ]
}
```

**Cause**: Query params tidak valid

---

### 500 Internal Server Error

```json
{
  "success": false,
  "error": "Failed to get analytics"
}
```

**Cause**: Server error

---

## Frontend Integration Examples

### React/Next.js TypeScript Example

```typescript
// services/authorAnalyticsService.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Types
export interface OverviewStats {
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  trends: {
    viewsTrend: number;
    likesTrend: number;
    commentsTrend: number;
    sharesTrend: number;
  };
  recentActivity: {
    viewsThisWeek: number;
    viewsThisMonth: number;
    likesThisWeek: number;
    likesThisMonth: number;
    commentsThisWeek: number;
    commentsThisMonth: number;
  };
}

export interface TopArticle {
  id: string;
  title: string;
  slug: string;
  coverImageUrl: string | null;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  publishedAt: string | null;
  engagementRate: number;
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export interface ViewsTimelineDataPoint {
  date: string;
  views: number;
  uniqueViews: number;
}

export interface ViewsTimeline {
  period: string;
  data: ViewsTimelineDataPoint[];
  total: number;
  average: number;
  peak: {
    date: string;
    views: number;
  };
}

export interface CategoryStats {
  categoryId: string | null;
  categoryName: string;
  categorySlug: string | null;
  articlesCount: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  avgViewsPerArticle: number;
  engagementRate: number;
}

export interface ArticleAnalytics {
  article: {
    id: string;
    title: string;
    slug: string;
    coverImageUrl: string | null;
    publishedAt: string | null;
    category?: {
      id: string;
      name: string;
      slug: string;
    } | null;
  };
  stats: {
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    totalShares: number;
    engagementRate: number;
    avgReadingTime: number;
  };
  viewsTimeline: ViewsTimelineDataPoint[];
  topReferrers: Array<{
    referrer: string;
    count: number;
  }>;
  deviceBreakdown: Array<{
    device: string;
    count: number;
    percentage: number;
  }>;
  countryBreakdown: Array<{
    country: string;
    count: number;
    percentage: number;
  }>;
}

// API Functions

// 1. Get overview statistics
export const getOverviewStats = async (token: string): Promise<OverviewStats> => {
  const response = await axios.get(`${API_BASE_URL}/author/analytics/overview`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

// 2. Get top articles
export const getTopArticles = async (
  token: string,
  params?: {
    limit?: number;
    sortBy?: 'views' | 'likes' | 'comments' | 'engagement';
  }
): Promise<{ articles: TopArticle[]; totalArticles: number }> => {
  const response = await axios.get(`${API_BASE_URL}/author/analytics/top-articles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
  return response.data.data;
};

// 3. Get views timeline
export const getViewsTimeline = async (
  token: string,
  params?: {
    period?: '7days' | '30days' | '90days' | '1year';
    articleId?: string;
  }
): Promise<ViewsTimeline> => {
  const response = await axios.get(`${API_BASE_URL}/author/analytics/views-timeline`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
  return response.data.data;
};

// 4. Get category statistics
export const getCategoryStats = async (
  token: string
): Promise<{ categories: CategoryStats[]; totalCategories: number }> => {
  const response = await axios.get(`${API_BASE_URL}/author/analytics/category-stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

// 5. Get article analytics
export const getArticleAnalytics = async (
  token: string,
  articleId: string
): Promise<ArticleAnalytics> => {
  const response = await axios.get(
    `${API_BASE_URL}/author/analytics/articles/${articleId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};
```

### Usage in Component

```typescript
// components/AnalyticsDashboard.tsx
import { useEffect, useState } from 'react';
import {
  getOverviewStats,
  getTopArticles,
  getViewsTimeline,
  getCategoryStats,
  OverviewStats,
  TopArticle,
  ViewsTimeline,
  CategoryStats,
} from '@/services/authorAnalyticsService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function AnalyticsDashboard() {
  const [overview, setOverview] = useState<OverviewStats | null>(null);
  const [topArticles, setTopArticles] = useState<TopArticle[]>([]);
  const [timeline, setTimeline] = useState<ViewsTimeline | null>(null);
  const [categories, setCategories] = useState<CategoryStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'7days' | '30days' | '90days' | '1year'>('30days');

  const token = 'your-access-token'; // Get from auth context

  useEffect(() => {
    loadData();
  }, [period]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [overviewData, topArticlesData, timelineData, categoriesData] = await Promise.all([
        getOverviewStats(token),
        getTopArticles(token, { limit: 5, sortBy: 'views' }),
        getViewsTimeline(token, { period }),
        getCategoryStats(token),
      ]);

      setOverview(overviewData);
      setTopArticles(topArticlesData.articles);
      setTimeline(timelineData);
      setCategories(categoriesData.categories);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="analytics-dashboard">
      <h1>Analytics Dashboard</h1>

      {/* Overview Stats */}
      {overview && (
        <div className="overview-grid">
          <div className="stat-card">
            <h3>Total Views</h3>
            <p className="stat-value">{overview.totalViews.toLocaleString()}</p>
            <span className={`trend ${overview.trends.viewsTrend >= 0 ? 'positive' : 'negative'}`}>
              {overview.trends.viewsTrend >= 0 ? '↑' : '↓'} {Math.abs(overview.trends.viewsTrend)}%
            </span>
          </div>

          <div className="stat-card">
            <h3>Total Likes</h3>
            <p className="stat-value">{overview.totalLikes.toLocaleString()}</p>
            <span className={`trend ${overview.trends.likesTrend >= 0 ? 'positive' : 'negative'}`}>
              {overview.trends.likesTrend >= 0 ? '↑' : '↓'} {Math.abs(overview.trends.likesTrend)}%
            </span>
          </div>

          <div className="stat-card">
            <h3>Total Comments</h3>
            <p className="stat-value">{overview.totalComments.toLocaleString()}</p>
            <span className={`trend ${overview.trends.commentsTrend >= 0 ? 'positive' : 'negative'}`}>
              {overview.trends.commentsTrend >= 0 ? '↑' : '↓'} {Math.abs(overview.trends.commentsTrend)}%
            </span>
          </div>

          <div className="stat-card">
            <h3>Published Articles</h3>
            <p className="stat-value">{overview.publishedArticles}</p>
            <span className="text-muted">of {overview.totalArticles} total</span>
          </div>
        </div>
      )}

      {/* Views Timeline Chart */}
      {timeline && (
        <div className="chart-section">
          <div className="chart-header">
            <h2>Views Timeline</h2>
            <select value={period} onChange={(e) => setPeriod(e.target.value as any)}>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
            </select>
          </div>

          <LineChart width={800} height={300} data={timeline.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#8884d8" name="Total Views" />
            <Line type="monotone" dataKey="uniqueViews" stroke="#82ca9d" name="Unique Views" />
          </LineChart>

          <div className="chart-stats">
            <span>Total: {timeline.total.toLocaleString()}</span>
            <span>Average: {timeline.average.toLocaleString()}/day</span>
            <span>Peak: {timeline.peak.views.toLocaleString()} on {timeline.peak.date}</span>
          </div>
        </div>
      )}

      {/* Top Articles */}
      <div className="top-articles-section">
        <h2>Top Performing Articles</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Views</th>
              <th>Likes</th>
              <th>Comments</th>
              <th>Engagement Rate</th>
            </tr>
          </thead>
          <tbody>
            {topArticles.map((article) => (
              <tr key={article.id}>
                <td>
                  <div>
                    <strong>{article.title}</strong>
                    <span className="category">{article.category?.name || 'Uncategorized'}</span>
                  </div>
                </td>
                <td>{article.views.toLocaleString()}</td>
                <td>{article.likes.toLocaleString()}</td>
                <td>{article.comments.toLocaleString()}</td>
                <td>{article.engagementRate.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Category Performance */}
      <div className="category-stats-section">
        <h2>Performance by Category</h2>
        <div className="category-cards">
          {categories.map((category) => (
            <div key={category.categoryId || 'uncategorized'} className="category-card">
              <h3>{category.categoryName}</h3>
              <div className="category-stats">
                <span>{category.articlesCount} articles</span>
                <span>{category.totalViews.toLocaleString()} views</span>
                <span>{category.avgViewsPerArticle.toLocaleString()} avg/article</span>
                <span>{category.engagementRate.toFixed(2)}% engagement</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## Notes

1. **Performance**: Endpoint analytics melakukan aggregation yang berat. Implementasi caching sangat direkomendasikan.

2. **Trends Calculation**: Trend dihitung dengan membandingkan last 30 days vs previous 30 days.

3. **Unique Views**: Dihitung berdasarkan `user_id` (untuk logged in users) atau `ip_address` (untuk anonymous).

4. **Engagement Rate**: Formula = `(likes + comments) / views * 100`

5. **ArticleView Table**: Pastikan frontend/public API mencatat view dengan insert ke `article_views` table untuk tracking timeline yang akurat.

6. **Real-time**: Data tidak real-time. Untuk real-time analytics, pertimbangkan WebSocket atau polling interval.

7. **Date Format**: Semua date dalam format ISO 8601 (`YYYY-MM-DDTHH:mm:ssZ`)

---

## Testing with cURL

```bash
# Set your token
TOKEN="your-access-token-here"

# 1. Get overview
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/author/analytics/overview

# 2. Get top articles
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:5000/api/author/analytics/top-articles?limit=5&sortBy=engagement"

# 3. Get views timeline
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:5000/api/author/analytics/views-timeline?period=30days"

# 4. Get category stats
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/author/analytics/category-stats

# 5. Get single article analytics
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/author/analytics/articles/clxxx123
```

---

## Changelog

- **v1.0.0** (2024-01-15): Initial release
  - 5 analytics endpoints
  - Overview statistics with trends
  - Top articles ranking
  - Views timeline for charts
  - Category performance stats
  - Detailed article analytics
