import { NextResponse } from 'next/server'
import { createSupabaseReqResClient } from '@/lib/supabase/server'

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createSupabaseReqResClient(request, response)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const user = session?.user

  // protects the "/account" route and its sub-routes
  if (!user && request.nextUrl.pathname.startsWith('/account')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

export const config = {
  matcher: ['/', '/account/:path*'],
}
