'use client'
import { Button } from '@/components/ui/button'
import { oAuthSignIn } from '../../app/login/actions'

export default function OAuthButtons() {
  const oAuthProviders = [
    {
      name: 'google',
      displayName: 'Google',
    },
  ]

  return (
    <>
      {oAuthProviders.map(provider => (
        <Button
          key={provider.name}
          className="w-full flex items-center justify-center gap-2"
          variant="outline"
          onClick={async () => {
            await oAuthSignIn(provider.name)
          }}
        >
          Login with {provider.displayName}
        </Button>
      ))}
    </>
  )
}
