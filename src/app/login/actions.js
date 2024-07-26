'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function oAuthSignIn(provider) {
  if (!provider) {
    return redirect('/login?message=No provider selected')
  }

  const supabase = createClient()
  const redirectUrl = '/auth/callback'
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    },
  })

  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }

  return redirect(data.url)
}
