// components/AuthContext.js
'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUserProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        const { user } = session
        setUser(user)
        setAvatarUrl(user.user_metadata.avatar_url)
      } else {
        setUser(null)
        setAvatarUrl(null)
      }

      supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const { user } = session
          setUser(user)
          setAvatarUrl(user.user_metadata.avatar_url)
        } else {
          setUser(null)
          setAvatarUrl(null)
        }
      })
    }

    getUserProfile()
  }, [supabase])

  return <AuthContext.Provider value={{ user, avatarUrl }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
