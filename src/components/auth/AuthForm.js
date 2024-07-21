// components/AuthForm.js
'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// export default function AuthForm() {
//   const supabase = createClientComponentClient()

//   return (

//     <Auth
//       supabaseClient={supabase}
//       appearance={{ theme: ThemeSupa }}
//       theme="light"
//       providers={['google']}
//       onlyThirdPartyProviders
//       redirectTo={`http://localhost:3000/auth/callback/`}
//     />
//   )
// }
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
