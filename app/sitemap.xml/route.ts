import { NextResponse } from 'next/server'
import { getActiveServices } from '@/content/services'
import { listPublishedBooks } from '@/lib/books'
import { listPublishedArticles } from '@/lib/articles'

export const revalidate = 3600

export async function GET() {
  const books = await listPublishedBooks()
  const { articles } = await listPublishedArticles({ limit: 500 })
  const baseUrl = 'https://www.cognifera.web.id'
  const currentDate = new Date().toISOString()

  // Static high-priority pages
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/our-team`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/visi-misi`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/profile`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/publications`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/news`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.8
    }
  ]

  // Dynamic news pages
  const newsPages = articles.map(article => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastmod: (article.publishedAt ?? article.updatedAt).toISOString(),
    changefreq: 'monthly',
    priority: 0.7
  }))

  // Dynamic service pages
  const servicePages = getActiveServices().map(service => ({
    url: `${baseUrl}/services/${service.id}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: 0.8
  }))

  // Dynamic book pages
  const bookPages = books.map(book => ({
    url: `${baseUrl}/publications/books/${book.slug}`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: 0.6
  }))

  // Combine all pages
  const allPages = [...staticPages, ...newsPages, ...servicePages, ...bookPages]

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <mobile:mobile/>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache 1 hour
      'X-Robots-Tag': 'index, follow'
    },
  })
}
