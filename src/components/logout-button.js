'use client'
// TODO: fix log out. not sure why but it isn't working

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    console.log('logging out start')
    await supabase.auth.signOut()
    console.log('logging out end')
    router.refresh()
    console.log('router', router)
  }

  return <button onClick={handleLogout}>Logout</button>
}
