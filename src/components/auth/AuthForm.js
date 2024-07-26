'use client'
import { Button } from '@/components/ui/button'
import { oAuthSignIn } from '../../app/login/actions'
import { createClient } from '@/lib/supabase/client'
import LoginWithDiscordButton from './LoginWithDiscordButton'
import LoginWithGoogleButton from './LoginWithGoogleButton'
import { getURL } from 'next/dist/shared/lib/utils'

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

  const path = getURL('/auth/callback')

  const handleLogin = async ({ provider }) => {
    await supabase.auth.signInWithOAuth({
      provider: provider.name,
      options: {
        redirectTo: `${path}k?next=${props.nextUrl || ''}`,
      },
    })
  }

  return (
    <>
      <LoginWithGoogleButton />
      <LoginWithDiscordButton />
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
