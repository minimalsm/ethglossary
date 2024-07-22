// components/NavBar.js
import * as React from 'react'
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import LogoutButton from '@/components/logout-button'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerOverlay,
} from '@/components/ui/drawer'

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
      <nav className="hidden md:flex space-x-4 items-center">
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
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <button
            className="p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden"
            aria-label="Open menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </DrawerTrigger>
        <DrawerContent className="my-auto fixed left-auto inset-y-0 right-0 z-50 h-full w-64 bg-background transition-transform transform translate-x-full md:translate-x-0">
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
            <DrawerClose>
              <button
                className="absolute top-4 right-4 p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </DrawerClose>
          </DrawerHeader>
          <div className="p-4">
            <a href="/languages" className="block text-gray-700 mb-4">
              Languages
            </a>
            <a href="#" className="block text-gray-700 mb-4">
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
              <a href="/auth/login" className="block text-gray-700 mb-4">
                Login
              </a>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  )
}
