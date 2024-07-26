import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') || '/'

  if (code) {
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

    console.log(data.session)

    // when a user logs in, update their profile in supabase
    if (!error && data?.user) {
      const { user } = data
      const discordUsername = user.user_metadata?.full_name

      const { error: profileError } = await supabase.from('profiles').upsert({
        id: user.id,
        user_id: user.id,
        username: user.email,
        display_name: discordUsername,
        avatar_url: user.user_metadata?.avatar_url,
      })

      if (profileError) {
        console.error('Error creating/updating profile:', profileError)
      } else {
        console.log('Profile created/updated successfully')
      }

      return NextResponse.redirect(`${origin}${next}`)
    } else {
      console.error('Error exchanging code for session:', error)
    }
  }
  return NextResponse.redirect(`${origin}/auth/error`)
}
