// components/AuthForm.js
'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa, ThemeMinimal } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthForm() {
  const supabase = createClientComponentClient()

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeMinimal }}
      theme="light"
      providers={['google']}
      onlyThirdPartyProviders
    />
  )
}
