// From: https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app
import { createServerClient, CookieOptions } from '@supabase/ssr'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  )
}

export function createSupabaseServerClient(component = false) {
  cookies().getAll()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return getCookie(name, { cookies })
        },
        set(name, value, options) {
          if (component) return
          setCookie(name, value, { cookies, ...options })
        },
        remove(name, options) {
          if (component) return
          deleteCookie(name, { cookies, ...options })
        },
      },
    },
  )
}

export function createSupabaseServerComponentClient() {
  cookies().getAll()
  return createSupabaseServerClient(true)
}