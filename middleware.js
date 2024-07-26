import { NextResponse } from 'next/server'
// import { createSupabaseReqResClient } from '@/lib/supabase/server'
import { createClient } from '@/lib/supabase/middleware'

export async function middleware(request) {
  const { supabase, response } = createClient(request)
  await supabase.auth.getUser()
  return response
}

export const config = {
  matcher: ['/', '/account/:path*'],
}
