import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import TranslateLink from '@/components/navigation/TranslateLink'
import NavItems from '@/components/navigation/NavItems'
import TranslatingNowBanner from '@/components/navigation/TranslatingNowBanner'
import { getLanguageData } from '@/lib/languageUtils'
import { getUserProfile } from '@/lib/userProfile'

export default async function NavBar() {
  const {
    data: { session },
    error,
  } = await createSupabaseServerComponentClient().auth.getSession()
  const user = session?.user
  const avatarUrl = session?.user.user_metadata.avatar_url
  let defaultLanguage = null
  const userId = user?.id

  if (userId) {
    const profile = await getUserProfile(userId)
    if (profile?.default_language) {
      defaultLanguage = profile.default_language
    }
  }

  console.log('default lang', defaultLanguage)

  const defaultLocalLanguage = getLanguageData(defaultLanguage)?.localName

  console.log(defaultLocalLanguage)

  return (
    <>
      <header className="flex items-center justify-between h-16 px-8 md:px-12 shadow-sm">
        <h1 className="text-2xl font-bold">
          ETH<span className="font-normal">g</span>
        </h1>
        <nav className="hidden md:flex items-center gap-6">
          <NavItems
            user={user}
            avatarUrl={avatarUrl}
            translateLink={<TranslateLink userId={user?.id} />}
          />
        </nav>
        <Sheet>
          <SheetTrigger asChild>
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
          </SheetTrigger>
          <SheetContent className="w-full">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetClose>
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
              </SheetClose>
            </SheetHeader>
            <div className="p-4">
              <NavItems user={user} avatarUrl={avatarUrl} />
            </div>
          </SheetContent>
        </Sheet>
      </header>
      <TranslatingNowBanner defaultLocalLanguage={defaultLocalLanguage} />
    </>
  )
}
