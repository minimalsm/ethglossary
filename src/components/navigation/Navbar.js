import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
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
import { Separator } from '@/components/ui/separator'
import TranslateLink from '@/components/navigation/TranslateLink'
import NavItems from '@/components/navigation/NavItems'
import TranslatingNowBanner from '@/components/navigation/TranslatingNowBanner'
import { getLanguageData } from '@/lib/languageUtils'
import { getUserProfile } from '@/lib/userProfile'
import { cn } from '@/lib/utils'
import MobileNavItem from '@/components/navigation/mobile/MobileNavItem'
import { getNavSections } from '../../utils/getNavSections'

export default async function NavBar() {
  const {
    data: { session },
    error,
  } = await createSupabaseServerComponentClient().auth.getSession()
  const user = session?.user
  const avatarUrl = session?.user.user_metadata.avatar_url
  let defaultLanguage = null
  const userId = user?.id

  const navSections = getNavSections(user)

  console.log('user', userId)

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
            navSections={navSections}
          />
        </nav>
        <MobileNav
          defaultLanguage={defaultLanguage}
          navSections={navSections}
        />
      </header>
      <TranslatingNowBanner defaultLocalLanguage={defaultLocalLanguage} />
    </>
  )
}

const MobileNav = ({ defaultLanguage, navSections }) => {
  return (
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
          <SheetTitle className="text-left font-sans">ETHglossary</SheetTitle>
          <SheetClose>
            <button
              className="absolute top-4 right-4 p-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
        <Separator className="mt-4 mb-20 " />
        {navSections.map((section, index) => (
          <MobileNavSection
            key={index}
            heading={section.heading}
            items={section.items}
            defaultLanguage={defaultLanguage}
          />
        ))}
      </SheetContent>
    </Sheet>
  )
}

const MobileNavSection = ({ heading, items, defaultLanguage }) => {
  return (
    <>
      <h3 className="text-xs text-[#71768A] uppercase tracking-[2px] mt-6">
        {heading}
      </h3>
      <MobileNavItemList items={items} defaultLanguage={defaultLanguage} />
    </>
  )
}

const MobileNavItemList = ({ items, defaultLanguage }) => {
  return (
    <div className="flex flex-col gap-6">
      {items.map((item, index) => (
        <MobileNavItem
          key={index}
          href={item.href}
          linkText={item.linkText}
          defaultLanguage={item.defaultLanguage ? defaultLanguage : undefined}
          translatingNow={item.translatingNow}
        />
      ))}
    </div>
  )
}
