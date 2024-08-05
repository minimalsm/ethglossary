import { fetchLanguagesWithStats } from '@/lib/fetchLanguages'
import { getLanguageData } from '@/lib/languageUtils'
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { getUserProfile } from '@/lib/userProfile'
import LanguagesFilterAndList from '@/components/languages/LanguagesFilterAndList'

export const revalidate = 3600 // revalidate the data at most every hour

export default async function LanguagesPage() {
  const languages = await fetchLanguagesWithStats()
  const languagesWithLocalAndCountries = languages.map(language => {
    const languageData = getLanguageData(language.code)
    return {
      ...language,
      localName: languageData?.localName,
      countries: languageData?.countries,
    }
  })

  const {
    data: { user },
  } = await createSupabaseServerComponentClient().auth.getUser()
  const userId = user?.id

  let defaultLanguage = null

  if (userId) {
    const userProfile = await getUserProfile(userId)
    defaultLanguage = userProfile?.default_language || null
  }

  const defaultLocalLanguage =
    getLanguageData(defaultLanguage)?.localName || 'Pick a language'

  return (
    <div className="mx-5 mt-8 max-w-screen-sm md:mx-auto">
      <h1 className="mb-4 text-[28px] font-bold">Languages</h1>
      <div className="flex flex-col gap-3 text-sm">
        <p>
          Join our community of translators making the Ethereum glossary
          accessible to everyone.
        </p>
        <p>
          Select a language below to translate the glossary into your preferred
          language.
        </p>
        <p>
          <span className="font-semibold">Don’t see your language?</span>{' '}
          Contact us and let us know!
        </p>
      </div>
      <LanguagesFilterAndList
        languages={languagesWithLocalAndCountries}
        defaultLanguage={defaultLanguage}
      />
    </div>
  )
}
const GlobeIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.933 11.5959C11.7597 11.0626 11.2597 10.6693 10.6663 10.6693H9.99967V8.66927C9.99967 8.49246 9.92944 8.32289 9.80441 8.19787C9.67939 8.07284 9.50982 8.0026 9.33301 8.0026H5.33301V6.66927H6.66634C6.84315 6.66927 7.01272 6.59903 7.13775 6.47401C7.26277 6.34898 7.33301 6.17941 7.33301 6.0026V4.66927H8.66634C9.01996 4.66927 9.3591 4.5288 9.60915 4.27875C9.8592 4.0287 9.99967 3.68956 9.99967 3.33594V3.0626C11.953 3.84927 13.333 5.7626 13.333 8.0026C13.333 9.38927 12.7997 10.6493 11.933 11.5959ZM7.33301 13.2893C4.69967 12.9626 2.66634 10.7226 2.66634 8.0026C2.66634 7.58927 2.71967 7.18927 2.80634 6.80927L5.99967 10.0026V10.6693C5.99967 11.0229 6.14015 11.362 6.3902 11.6121C6.64025 11.8621 6.97939 12.0026 7.33301 12.0026M7.99967 1.33594C7.1242 1.33594 6.25729 1.50838 5.44845 1.84341C4.63961 2.17844 3.90469 2.6695 3.28563 3.28856C2.03539 4.5388 1.33301 6.23449 1.33301 8.0026C1.33301 9.77071 2.03539 11.4664 3.28563 12.7166C3.90469 13.3357 4.63961 13.8268 5.44845 14.1618C6.25729 14.4968 7.1242 14.6693 7.99967 14.6693C9.76778 14.6693 11.4635 13.9669 12.7137 12.7166C13.964 11.4664 14.6663 9.77071 14.6663 8.0026C14.6663 7.12712 14.4939 6.26022 14.1589 5.45138C13.8238 4.64254 13.3328 3.90762 12.7137 3.28856C12.0947 2.6695 11.3597 2.17844 10.5509 1.84341C9.74206 1.50838 8.87515 1.33594 7.99967 1.33594Z"
        fill="black"
      />
    </svg>
  )
}
