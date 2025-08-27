import TranslationsSection from '@/components/translations/TranslationsSection'
import CommentsPanel from '@/components/comments/CommentsPanel'
import TermsModal from '@/components/modals/TermsModal'
import CommentsModal from '@/components/modals/CommentsModal'
import { fetchTerms } from '@/lib/fetchTerms'
import { fetchTranslations, hasUserTranslatedTerm } from '@/lib/translations'
import { Button } from '@/components/ui/button'
import { fetchComments } from '@/lib/comments'
import { fetchLanguages } from '@/lib/fetchLanguages'
import { fetchTermsWithUserTranslations } from '@/lib/fetchTermsWithUserTranslations'
import Sidebar from '@/components/navigation/Sidebar'
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { updateUserDefaultLanguage } from '@/lib/userProfile'
import { getLanguageData } from '@/lib/languageUtils'
import { cookies } from 'next/headers'
import { deslugify } from '@/utils/slugify'
import { getTermExamples } from '@/lib/termsUtils'

export async function generateMetadata({ params }) {
  const term = deslugify(params.term)
  console.log(term)
  return {
    title: `Translations for "${term}" in ${params.language}`,
  }
}

export default async function TermPage({ params }) {
  const supabase = createSupabaseServerComponentClient()
  const term = deslugify(params.term)
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  let user = null
  if (session?.user) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .maybeSingle()

    if (profileError) {
      console.error('Error fetching profile:', profileError)
    }
    user = profile
  }

  const { language } = params
  // const deslugifiedTerm = deslugify(term)
  // console.log('term afeer deslugify', term)
  const userId = session?.user?.id
  const localeLanguageData = getLanguageData(language)

  // Fetch terms with user translation status

  // Fetch language ID
  const languages = await fetchLanguages()
  const languageData = languages.find(l => l.code === language)
  if (!languageData) {
    console.error('Language not found:', language)
    return {
      notFound: true,
    }
  }
  const languageId = languageData.id

  const terms = await fetchTermsWithUserTranslations(userId, languageId)
  const termData = terms.find(t => t.term === term)
  if (!termData) {
    console.error('Term not found:', term)
    return {
      notFound: true,
    }
  }
  const termId = termData.id
  const examples = getTermExamples(termData.term)

  // Fetch translations and comments concurrently
  const [
    { translationsWithVotes, hasSubmittedTranslation },
    { comments, count: commentCount },
  ] = await Promise.all([
    fetchTranslations(termId, languageId, userId),
    fetchComments(termId, languageId),
  ])

  // Determine the current and next term
  const currentTermIndex = terms.findIndex(t => t.id === termId)
  const nextTerm = terms[currentTermIndex + 1]
  const totalTerms = terms.length
  const userHasTranslatedCount = terms.filter(
    term => term.user_has_translated,
  ).length

  let hasTranslatedNextTerm = false
  if (userId && nextTerm) {
    hasTranslatedNextTerm = await hasUserTranslatedTerm(
      nextTerm.id,
      languageId,
      userId,
    )
  }

  // Update user's default language if necessary
  if (user && user.default_language !== language) {
    await updateUserDefaultLanguage(user.id, language)
  }

  const cookieStore = cookies()
  const translatedTerms = userHasTranslatedCount
  let bannerKey = ''

  if (translatedTerms >= 0 && translatedTerms < 30) {
    bannerKey = 'bannerDismissed-0-29'
  } else if (translatedTerms >= 30 && translatedTerms < 60) {
    bannerKey = 'bannerDismissed-30-59'
  } else if (translatedTerms >= 60 && translatedTerms < totalTerms) {
    bannerKey = `bannerDismissed-60-${totalTerms - 1}`
  } else if (translatedTerms === totalTerms) {
    bannerKey = `bannerDismissed-${totalTerms}`
  }

  const isDismissedInitially = cookieStore.get(bannerKey)?.value === 'true'

  console.log(cookieStore.get(bannerKey))
  console.log(isDismissedInitially)
  console.log('Banner key:', bannerKey)

  return (
    <div className="container p-0">
      <div className="flex justify-between bg-banner text-banner-foreground md:hidden">
        <TermsModal
          terms={terms}
          languageCode={language}
          termsLength={totalTerms}
          userHasTranslatedCount={userHasTranslatedCount}
        >
          <Sidebar
            className=""
            terms={terms}
            languageCode={language}
            localeLanguageData={localeLanguageData}
            termsLength={totalTerms}
            userHasTranslatedCount={userHasTranslatedCount}
          />
        </TermsModal>
        <CommentsModal
          termId={termId}
          languageId={languageId}
          initialComments={comments}
          commentCount={commentCount}
          user={user}
        />
      </div>

      <div class="grid gap-4 md:grid-cols-[minmax(180px,288px)_minmax(320px,auto)_minmax(180px,288px)] md:gap-12">
        <Sidebar
          className="sticky top-24 hidden self-start md:block"
          terms={terms}
          languageCode={language}
          localeLanguageData={localeLanguageData}
          termsLength={totalTerms}
          userHasTranslatedCount={userHasTranslatedCount}
        />

        <TranslationsSection
          initialTranslations={translationsWithVotes}
          termId={termId}
          term={term}
          languageId={languageId}
          user={user}
          hasSubmittedTranslation={hasSubmittedTranslation}
          language={language}
          nextTerm={nextTerm?.term}
          nextTermIndex={currentTermIndex + 1}
          termsLength={totalTerms}
          hasTranslatedNextTerm={hasTranslatedNextTerm}
          localeLanguageData={localeLanguageData}
          completionPercentage={translatedTerms}
          isDismissedInitially={isDismissedInitially}
          examples={examples}
        />

        <div className="sticky top-24 hidden self-start overflow-hidden md:block">
          <CommentsPanel
            termId={termId}
            languageId={languageId}
            initialComments={comments}
            commentCount={commentCount}
            user={user}
          />
        </div>
      </div>
    </div>
  )
}
