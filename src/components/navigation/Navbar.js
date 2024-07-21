// components/NavBar.js
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
// import LoginButton from '@/components/login-button'
import LogoutButton from '@/components/logout-button'

export default async function NavBar() {
  const {
    data: { session },
    error,
  } = await createSupabaseServerComponentClient().auth.getSession()
  const user = session?.user
  const avatarUrl = session?.user.user_metadata.avatar_url

  if (user !== null) {
    console.log('user in navbar', user)
  } else {
    console.log('No user in navbar')
  }

  return (
    <header className="flex items-center justify-between h-16 px-4 bg-gray-200">
      <h1 className="text-xl font-bold">EthGlossary</h1>
      <nav className="flex space-x-4 items-center">
        <a href="/languages" className="text-gray-700" prefetch={false}>
          Languages
        </a>
        <a href="#" className="text-gray-700" prefetch={false}>
          Leaderboard
        </a>
        {user ? (
          <>
            <LogoutButton />
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            )}
          </>
        ) : (
          <a href="/auth/login" className="text-gray-700" prefetch={false}>
            Login
          </a>
        )}
      </nav>
    </header>
  )
}
