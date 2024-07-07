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
        const { id, email } = session.user
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .maybeSingle() // Use maybeSingle to handle the case when no rows are returned, or when the user has no profile yetsingle()

        if (!profile && !error) {
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({ id, username: email }) // Default username to email for now
          if (insertError) {
            console.error('Error creating profile:', insertError)
          }
        }

        setUser(session.user)
        setAvatarUrl(session.user.user_metadata.avatar_url)
      } else {
        setUser(null)
        setAvatarUrl(null)
      }

      supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          const { id, email } = session.user
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .maybeSingle()

          console.log('data', profile)
          console.log(error)

          console.log('user', session.user)

          if (!profile && !error) {
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({
                id,
                display_name: session.user.user_metadata.name,
                avatar_url: session.user.user_metadata.avatar_url,
              }) // Default username to email for now
            if (insertError) {
              console.error('Error creating profile:', insertError)
            }
          }

          setUser(session.user)
          setAvatarUrl(session.user.user_metadata.avatar_url)
        } else {
          setUser(null)
          setAvatarUrl(null)
        }
      })
    }

    getUserProfile()
  }, [supabase])

  return (
    <AuthContext.Provider value={{ user, avatarUrl }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
