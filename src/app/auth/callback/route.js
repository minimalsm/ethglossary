import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') || '/'

  if (code) {
    // console.log('Code passed:', code)
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookies) {
            cookies.forEach(({ name, value, options }) => {
              // console.log(`Setting cookie: ${name} = ${value}`, options)
              cookieStore.set(name, value, {
                ...options,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
              })
            })
          },
        },
      },
    )

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    // console.log('Data:', data, 'Error:', error)

    if (!error) {
      // console.log(`Redirecting to: ${origin}${next}`)
      return NextResponse.redirect(`${origin}${next}`)
    } else {
      // console.error('Error exchanging code for session:', error)
    }
  }
  // console.log(`Redirecting to: ${origin}/auth/error`)
  return NextResponse.redirect(`${origin}/auth/error`)
}
