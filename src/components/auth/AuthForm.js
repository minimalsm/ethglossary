import { Button } from '@/components/ui/button'
// import { oAuthSignIn } from '../../app/login/actions'
import { createClient } from '@/lib/supabase/server'
// import LoginWithDiscordButton from './LoginWithDiscordButton'
// import LoginWithGoogleButton from './LoginWithGoogleButton'
// import { getURL } from '../../utils/getUrl'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function AuthForm(props) {
  const signIn = async () => {
    'use server'
    console.log('Starting sign-in process...')
    const supabase = createClient()
    const origin = headers().get('origin')
    console.log('Origin:', origin)
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

  console.log('Rendering AuthForm...')
  return (
    <div>
      <form className="w-full" action={signIn}>
        <Button type="submit">Sign in with Discord</Button>
      </form>
    </div>
  )
}
