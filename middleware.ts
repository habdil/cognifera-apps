import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected routes that require authentication
const protectedRoutes = [
  '/dashboard/author-journal',
  '/dashboard/reviewer-journal', 
  '/dashboard/editor-journal',
  '/dashboard/manager-journal',
  '/dashboard/author-book',
  '/dashboard/editor-book',
  '/dashboard/manager-book',
  '/dashboard/author-news',
  '/dashboard/admin'
]

export function middleware(request: NextRequest) {
  // Temporarily disable middleware for debugging
  // TODO: Re-enable after fixing redirect issue
  console.log(`Middleware: Accessing ${request.nextUrl.pathname}`)
  return NextResponse.next()

  /*
  const { pathname } = request.nextUrl
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (isProtectedRoute) {
    // Check for access token in cookies or headers
    const accessToken = request.cookies.get('cognifera_access_token')?.value ||
                       request.headers.get('authorization')?.replace('Bearer ', '')
    
    // Allow if coming from login redirect (temporary bypass)
    const fromAuth = request.nextUrl.searchParams.get('from') === 'auth'
    
    // If no token found and not from auth redirect, redirect to home page
    if (!accessToken && !fromAuth) {
      console.log(`Access denied to ${pathname}: No token found`)
      const url = request.nextUrl.clone()
      url.pathname = '/'
      url.searchParams.set('message', 'login-required')
      return NextResponse.redirect(url)
    }
  }
  
  return NextResponse.next()
  */
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}