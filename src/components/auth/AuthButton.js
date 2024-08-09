import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import { FaDiscord } from 'react-icons/fa'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { cn } from '@/lib/utils'

export default async function AuthButton({ className, size, children }) {
  const signIn = async () => {
    'use server'
    console.log('Starting sign-in process...')
    const supabase = createClient()
    const origin = headers().get('origin')
    // console.log('Origin:', origin)
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      console.log('Error during sign-in:', error)
    } else {
      console.log('Redirecting to:', data.url)
      return redirect(data.url)
    }
  }

  if (children) {
    return (
      <form className="" action={signIn}>
        <Button type="submit" className={className}>
          {children}
        </Button>
      </form>
    )
  }

  return (
    <form className="" action={signIn}>
      <Button type="submit" className={className}>
        <FaDiscord className={cn('mr-2 size-[20px]', size)} />
        Sign in with Discord
      </Button>
    </form>
  )
}
