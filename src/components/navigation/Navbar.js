// components/NavBar.js
import * as React from 'react'
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerOverlay,
} from '@/components/ui/drawer'
import TranslateLink from '@/components/navigation/TranslateLink'
import NavItems from '@/components/navigation/NavItems'

export default async function NavBar() {
  const {
    data: { session },
    error,
  } = await createSupabaseServerComponentClient().auth.getSession()
  const user = session?.user
  const avatarUrl = session?.user.user_metadata.avatar_url
  const defaultLanguage = user?.default_language

  if (user !== null) {
    console.log('user in navbar', user)
  } else {
    console.log('No user in navbar')
  }

  return (
    <header className="flex items-center justify-between h-16 px-8 md:px-12 shadow-sm">
      <h1 className="text-2xl font-bold">
        ETH<span className="font-normal">g</span>
      </h1>
      <nav className="hidden md:flex items-center gap-6">
        <NavItems
          user={user}
          avatarUrl={avatarUrl}
          translateLink={<TranslateLink userId={user.id} />}
        />
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
            {/* <NavItems user={user} avatarUrl={avatarUrl} /> */}
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  )
}
