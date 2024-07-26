'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getURL } from '../../utils/getUrl'

export async function oAuthSignIn(provider) {
  if (!provider) {
    return redirect('/login?message=No provider selected')
  }

  const supabase = createClient()
  const redirectUrl = getUrl('/auth/callback')
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    },
  })

  if (error) {
    return redirect('/auth/login?message=Could not authenticate user')
  }

  return redirect(data.url)
}

export async function discordSignIn() {
  const supabase = createClient()
  const redirectUrl = getURL('/auth/callback')
  console.log('redirect', redirectUrl)
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: redirectUrl,
    },
  })

  if (error) {
    return redirect('/auth/login?message=Could not authenticate user')
  }

  return redirect(data.url)
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/')
}
