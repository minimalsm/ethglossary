import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createClient } from './../../../lib/supabase/server'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/'

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // if (code) {
  //   const supabase = createClient()
  //   const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  //   // when a user logs in, update their profile in supabase
  //   if (!error && data?.user) {
  //     const { user } = data
  //     const discordUsername = user.user_metadata?.full_name

  //     const { error: profileError } = await supabase.from('profiles').upsert({
  //       id: user.id,
  //       user_id: user.id,
  //       username: user.email,
  //       display_name: discordUsername,
  //       avatar_url: user.user_metadata?.avatar_url,
  //     })

  //     if (profileError) {
  //       console.error('Error creating/updating profile:', profileError)
  //     } else {
  //       console.log('Profile created/updated successfully')
  //     }

  //     return NextResponse.redirect(requestUrl.origin)
  //   } else {
  //     console.error('Error exchanging code for session:', error)
  //   }

  return NextResponse.redirect(`${origin}/auth/error`)
}
