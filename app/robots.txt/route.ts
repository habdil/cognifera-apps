import { NextResponse } from 'next/server'

export async function GET() {
  const robots = `User-agent: *
Allow: /

# Google bots
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Bing bots
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Block admin pages from indexing
Disallow: /admin/

# Sitemap location
Sitemap: https://www.cognifera.web.id/sitemap.xml

# Preferred domain
Host: https://www.cognifera.web.id`

  return new NextResponse(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}