import "server-only";

import { getSql } from "@/lib/neon";

// One event is sent per navigation; its type encodes the page kind, so these
// four together are "pageviews".
const VIEW_TYPES = ["page_view", "book_view", "article_view", "service_view"];

export type AnalyticsStats = {
  visitorsToday: number;
  pageviewsToday: number;
  visitors7d: number;
  pageviews7d: number;
  visitors30d: number;
  pageviews30d: number;
};

export type TimelinePoint = {
  day: string; // YYYY-MM-DD
  visitors: number;
  pageviews: number;
};

export type PathCount = {
  path: string;
  views: number;
  visitors: number;
};

export type ReferrerCount = {
  referrer: string;
  visitors: number;
};

export type FunnelData = {
  visitors: number;
  keyViewers: number;
  intent: number;
  submits: number;
};

export async function getAnalyticsStats(): Promise<AnalyticsStats> {
  const sql = getSql();
  const rows = await sql`
    SELECT
      COUNT(DISTINCT device_id) FILTER (WHERE created_at >= date_trunc('day', NOW()))::int AS visitors_today,
      COUNT(*) FILTER (WHERE created_at >= date_trunc('day', NOW()))::int AS pageviews_today,
      COUNT(DISTINCT device_id) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days')::int AS visitors_7d,
      COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days')::int AS pageviews_7d,
      COUNT(DISTINCT device_id) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days')::int AS visitors_30d,
      COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days')::int AS pageviews_30d
    FROM analytics_events
    WHERE event_type = ANY(${VIEW_TYPES});
  `;
  const row = rows[0] ?? {};
  return {
    visitorsToday: row.visitors_today ?? 0,
    pageviewsToday: row.pageviews_today ?? 0,
    visitors7d: row.visitors_7d ?? 0,
    pageviews7d: row.pageviews_7d ?? 0,
    visitors30d: row.visitors_30d ?? 0,
    pageviews30d: row.pageviews_30d ?? 0,
  };
}

export async function getDailyTimeline(days = 30): Promise<TimelinePoint[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT
      to_char(d, 'YYYY-MM-DD') AS day,
      COALESCE(v.visitors, 0)::int AS visitors,
      COALESCE(v.pageviews, 0)::int AS pageviews
    FROM generate_series(
      date_trunc('day', NOW()) - (${days - 1} || ' days')::interval,
      date_trunc('day', NOW()),
      '1 day'
    ) AS d
    LEFT JOIN (
      SELECT
        date_trunc('day', created_at) AS day,
        COUNT(DISTINCT device_id)::int AS visitors,
        COUNT(*)::int AS pageviews
      FROM analytics_events
      WHERE created_at >= date_trunc('day', NOW()) - (${days - 1} || ' days')::interval
        AND event_type = ANY(${VIEW_TYPES})
      GROUP BY 1
    ) v ON v.day = d
    ORDER BY d;
  `;
  return rows as TimelinePoint[];
}

export async function getTopPages(days = 30, limit = 10): Promise<PathCount[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT
      path,
      COUNT(*)::int AS views,
      COUNT(DISTINCT device_id)::int AS visitors
    FROM analytics_events
    WHERE created_at >= NOW() - (${days} || ' days')::interval
      AND event_type = ANY(${VIEW_TYPES})
    GROUP BY path
    ORDER BY views DESC
    LIMIT ${limit};
  `;
  return rows as PathCount[];
}

export async function getTopReferrers(days = 30, limit = 10): Promise<ReferrerCount[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT
      referrer,
      COUNT(DISTINCT device_id)::int AS visitors
    FROM analytics_events
    WHERE created_at >= NOW() - (${days} || ' days')::interval
      AND referrer IS NOT NULL
      AND referrer NOT ILIKE '%cognifera.web.id%'
    GROUP BY referrer
    ORDER BY visitors DESC
    LIMIT ${limit};
  `;
  return rows as ReferrerCount[];
}

export async function getFunnel(days = 30): Promise<FunnelData> {
  const sql = getSql();
  const rows = await sql`
    SELECT
      COUNT(DISTINCT device_id) FILTER (WHERE event_type = ANY(${VIEW_TYPES}))::int AS visitors,
      COUNT(DISTINCT device_id) FILTER (
        WHERE event_type IN ('book_view', 'article_view', 'service_view')
      )::int AS key_viewers,
      COUNT(DISTINCT device_id) FILTER (
        WHERE event_type IN ('whatsapp_click', 'contact_submit')
      )::int AS intent,
      COUNT(DISTINCT device_id) FILTER (WHERE event_type = 'contact_submit')::int AS submits
    FROM analytics_events
    WHERE created_at >= NOW() - (${days} || ' days')::interval;
  `;
  const row = rows[0] ?? {};
  return {
    visitors: row.visitors ?? 0,
    keyViewers: row.key_viewers ?? 0,
    intent: row.intent ?? 0,
    submits: row.submits ?? 0,
  };
}
