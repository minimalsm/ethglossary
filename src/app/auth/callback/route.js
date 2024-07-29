import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createClient } from './../../../lib/supabase/server'

export async function GET(request) {
  console.log('GET request received')

  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/'

  console.log('code:', code, 'next:', next)

  if (code) {
    console.log('Code received')

    const supabase = createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    console.log('Session data:', data, 'error:', error)

    // when a user logs in, update their profile in supabase
    if (!error && data?.user) {
      console.log('User data received')

      const { user } = data
      const discordUsername = user.user_metadata?.full_name

      console.log('Discord username:', discordUsername)

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

      return NextResponse.redirect(requestUrl.origin)
    } else {
      console.error('Error exchanging code for session:', error)
    }
    return NextResponse.redirect(`${origin}/auth/error`)
  }
}
