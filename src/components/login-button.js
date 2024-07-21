'use client'

import { createClient } from '@/lib/supabase/client'

export default function LoginButton(props) {
  const supabase = createClient()

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${
          props.nextUrl || ''
        }`,
      },
    })
  }

  return <button onClick={handleLogin}>Login</button>
}
