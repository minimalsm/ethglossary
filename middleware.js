import { NextResponse } from 'next/server'
// import { createSupabaseReqResClient } from '@/lib/supabase/server'
import { createClient } from '@/lib/supabase/middleware'

export async function middleware(request) {
  console.log('Middleware triggered')
  const { supabase, response } = createClient(request)
  const { data: user } = await supabase.auth.getUser()

  if (user) {
    console.log('User', user)
  }

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
//      * Feel free to modify this pattern to include more paths.
//      */
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// }

export const config = {
  matcher: '/(.*)',
}
