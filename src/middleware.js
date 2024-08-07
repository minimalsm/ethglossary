import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/middleware'

export async function middleware(request) {
  const { supabase, response } = createClient(request)
  const { data: user } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  if (
    !user.user &&
    pathname !== '/auth/login' &&
    pathname !== '/auth/callback' &&
    pathname !== '/'
  ) {
    console.log('redirecting to login')
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
