'use client'
import { Button } from '@/components/ui/button'
import { oAuthSignIn } from '../../app/login/actions'
import { createClient } from '@/lib/supabase/client'

export default function OAuthButtons(props) {
  const supabase = createClient()
  const oAuthProviders = [
    {
      name: 'google',
      displayName: 'Google',
    },
    {
      name: 'discord',
      displayName: 'Discord',
    },
  ]

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${
          props.nextUrl || ''
        }`,
      },
    })
  }

  return (
    <>
      {oAuthProviders.map(provider => (
        <Button
          key={provider.name}
          className="w-full flex items-center justify-center gap-2"
          variant="outline"
          onClick={handleLogin}
        >
          Login with {provider.displayName}
        </Button>
      ))}
    </>
  )
}
