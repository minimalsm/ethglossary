// app/page.js
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const {
    data: { session },
    error,
  } = await createSupabaseServerComponentClient().auth.getSession()

  const user = session?.user

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md text-center">
        {user ? (
          <>
            <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
            <p className="mt-4">You are logged in as {user.email}</p>
          </>
        ) : (
          <h1 className="text-2xl font-bold">Welcome to the Translation App</h1>
        )}
      </div>
    </div>
  )
}
