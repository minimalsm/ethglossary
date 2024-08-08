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
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-background px-4 shadow-sm md:px-12">
        <nav className="mx-auto hidden w-full max-w-[1440px] items-center gap-6 md:flex md:self-center">
          <DesktopNav
            navSections={navSections}
            defaultLanguage={defaultLanguage}
          />
          {/* <ThemeSwitch /> */}
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
