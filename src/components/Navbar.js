// components/NavBar.js
'use client'
import { useAuth } from '../app/context/AuthContext'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'

export default function NavBar() {
  const { user, avatarUrl } = useAuth()
  const supabase = createClientComponentClient()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    await supabase.auth.signOut()
    setIsLoading(false)
  }

  return (
    <header className="flex items-center justify-between h-16 px-4 bg-gray-200">
      <h1 className="text-xl font-bold">EthGlossary</h1>
      <nav className="flex space-x-4 items-center">
        <a href="#" className="text-gray-700" prefetch={false}>
          Languages
        </a>
        <a href="#" className="text-gray-700" prefetch={false}>
          Leaderboard
        </a>
        {user ? (
          <>
            <button 
              onClick={handleSignOut} 
              className="text-gray-700"
              disabled={isLoading}
            >
              {isLoading ? 'Signing out...' : 'Sign Out'}
            </button>
            {avatarUrl && (
              <img src={avatarUrl} alt="User Avatar" className="w-8 h-8 rounded-full" />
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
