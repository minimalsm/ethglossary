import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { DesktopNav } from '@/components/navigation/desktop/DesktopNav'
import { MobileNav } from '@/components/navigation/mobile/MobileNav'
import TranslatingNowBanner from '@/components/navigation/TranslatingNowBanner'
import { getLanguageData } from '@/lib/languageUtils'
import { getUserProfile } from '@/lib/userProfile'
import { getNavSections } from '../../utils/getNavSections'
import ThemeSwitch from '../ThemeSwitch'

export default async function NavBar() {
  const {
    data: { session },
    error,
  } = await createSupabaseServerComponentClient().auth.getSession()
  const user = session?.user
  const userId = user?.id
  let defaultLanguage = null

  const navSections = getNavSections(user)

  if (userId) {
    const profile = await getUserProfile(userId)
    if (profile?.default_language) {
      defaultLanguage = profile.default_language
    }
  }

  const defaultLocalLanguage = getLanguageData(defaultLanguage)?.localName

  return (
    <>
      <header className="flex h-16 items-center justify-between px-8 shadow-sm md:px-12">
        <h1 className="flex items-center gap-1 text-2xl font-bold">
          <img
            src="/images/icon.png"
            width={40}
            alt="Logo"
            className="object-contain"
          />
          <span>
            ETH<span className="font-normal">glossary</span>
          </span>
        </h1>
        <nav className="hidden items-center gap-6 md:flex md:self-center">
          <DesktopNav
            navSections={navSections}
            defaultLanguage={defaultLanguage}
          />
          <ThemeSwitch />
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
