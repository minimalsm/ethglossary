import Link from 'next/link'
import { fetchLanguagesWithStats } from '@/lib/fetchLanguages'
import { getLanguageData } from '@/lib/languageUtils'
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { getUserProfile } from '@/lib/userProfile'

export default async function LanguagesPage() {
  const languages = await fetchLanguagesWithStats()
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
    <>
      <TranslatingNowBanner defaultLocalLanguage={defaultLocalLanguage} />
      <div className="max-w-screen-sm mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Languages</h1>
        <div className="flex flex-col gap-3">
          <p>
            Join our community of translators making the Ethereum glossary
            accessible to everyone.
          </p>
          <p>
            Select a language below to translate the glossary into your
            preferred language.
          </p>
          <p>
            <span className="font-semibold">Don’t see your language?</span>{' '}
            Contact us and let us know!
          </p>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col gap-3">
          {languages.map(language => (
            <LanguageLinkCard key={language.code} language={language} />
          ))}
        </div>
      </div>
    </>
  )
}

const TranslatingNowBanner = ({ defaultLocalLanguage }) => {
  return (
    <div className="flex items-center justify-center gap-1 py-4 bg-gray-100">
      <GlobeIcon />
      <p className="text-sm">
        Translating now:{' '}
        <span className="font-semibold">{defaultLocalLanguage}</span>
      </p>
    </div>
  )
}

const LanguageLinkCard = ({ language }) => {
  const capitalisedEnglishName =
    language.name.charAt(0).toUpperCase() + language.name.slice(1)
  const localLanguageName = getLanguageData(language.code).localName

  return (
    <Link
      href={`/${language.code}/hello`}
      className="flex gap-4 justify-between border border-[#D1D1D1] hover:bg-[#F4F4F4] hover:border-[#000] p-4"
    >
      <div id="content" className="flex flex-col space-y-0.5">
        <div id="langs" className="flex items-center">
          <div className="text-xl font-semibold mr-2">{localLanguageName}</div>
          <div className="text-sm">{capitalisedEnglishName}</div>
        </div>
        <div id="countries" className="flex text-xs">
          France, Canada (Quebec), Belgium, Switzerland
        </div>
      </div>
      <div id="stats" className="flex flex-col space-y-2">
        <div className="text-sm flex items-center gap-1">
          <TranslateIcon />
          {language.translationsCount}
        </div>
        <div className="text-sm flex items-center gap-1">
          <CommentsIcon /> {language.commentsCount}
        </div>
      </div>
    </Link>
  )
}

const TranslateIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.58033 10.0493L6.88699 8.37594L6.90699 8.35594C8.06699 7.0626 8.89366 5.57594 9.38033 4.0026H11.3337V2.66927H6.66699V1.33594H5.33366V2.66927H0.666992V4.0026H8.11366C7.66699 5.2826 6.96033 6.5026 6.00033 7.56927C5.38033 6.8826 4.86699 6.12927 4.46033 5.33594H3.12699C3.61366 6.4226 4.28033 7.44927 5.11366 8.37594L1.72033 11.7226L2.66699 12.6693L6.00033 9.33594L8.07366 11.4093L8.58033 10.0493ZM12.3337 6.66927H11.0003L8.00033 14.6693H9.33366L10.0803 12.6693H13.247L14.0003 14.6693H15.3337L12.3337 6.66927ZM10.587 11.3359L11.667 8.44927L12.747 11.3359H10.587Z"
        fill="black"
      />
    </svg>
  )
}

const CommentsIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.00065 14.6688C5.82384 14.6688 5.65427 14.5985 5.52925 14.4735C5.40422 14.3485 5.33398 14.1789 5.33398 14.0021V12.0021H2.66732C2.3137 12.0021 1.97456 11.8616 1.72451 11.6116C1.47446 11.3615 1.33398 11.0224 1.33398 10.6688V2.66878C1.33398 1.92878 1.93398 1.33545 2.66732 1.33545H13.334C13.6876 1.33545 14.0267 1.47592 14.2768 1.72597C14.5268 1.97602 14.6673 2.31516 14.6673 2.66878V10.6688C14.6673 11.0224 14.5268 11.3615 14.2768 11.6116C14.0267 11.8616 13.6876 12.0021 13.334 12.0021H9.26732L6.80065 14.4754C6.66732 14.6021 6.50065 14.6688 6.33398 14.6688H6.00065ZM6.66732 10.6688V12.7221L8.72065 10.6688H13.334V2.66878H2.66732V10.6688H6.66732ZM11.334 7.33545H10.0007V6.00212H11.334V7.33545ZM8.66732 7.33545H7.33398V6.00212H8.66732V7.33545ZM6.00065 7.33545H4.66732V6.00212H6.00065V7.33545Z"
        fill="black"
      />
    </svg>
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
