'use client'

import { useEffect, useState } from 'react'
import { createSupabaseBrowserClient } from './browser-client'

export default function useSession() {
  const [session, setSession] = useState | null

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()

    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      setSession(session)
    }

    getSession()
  }, [])

  return session
}
