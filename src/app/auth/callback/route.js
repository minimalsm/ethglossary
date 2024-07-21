import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  const next = searchParams.get('next') || '/'

  if (code) {
    console.log('code passed', code)
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value
          },
          set(name, value, options) {
            cookieStore.set(name, value, {
              ...options,
              httpOnly: true, // ensures the cookie is only accessible by the server
              secure: process.env.NODE_ENV === 'production', // ensures the cookie is only sent over HTTPS
              sameSite: 'lax', // or 'strict' depending on your requirements
            })
          },
        },
        remove(name, options) {
          cookieStore.delete({ name, ...options })
        },
      },
    )

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    console.log('data', data)

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }
  return NextResponse.redirect(`${origin}/auth/error`)
}
