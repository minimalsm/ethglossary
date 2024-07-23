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

export async function generateMetadata({ params }) {
  return {
    title: `Translations for "${params.term}" in ${params.language}`,
  }
}

export default async function TermPage({ params }) {
  const supabase = createSupabaseServerComponentClient()

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

  const { language, term } = params
  const userId = session?.user?.id

  // todo: handle not signed in user
  // const terms = await fetchTerms()
  // Fetch terms with user translation status
  const terms = await fetchTermsWithUserTranslations(userId)
  const termData = terms.find(t => t.term === term)
  if (!termData) {
    console.error('Term not found:', term)
    return {
      notFound: true,
    }
  }
  const termId = termData.id

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

  let hasTranslatedNextTerm = false
  if (userId && nextTerm) {
    hasTranslatedNextTerm = await hasUserTranslatedTerm(
      nextTerm.id,
      languageId,
      userId,
    )
  }

  return (
    <div>
      <div className="bg-gray-100 flex justify-between md:hidden">
        <TermsModal terms={terms} languageCode={language} />
        <CommentsModal
          termId={termId}
          languageId={languageId}
          initialComments={comments}
          commentCount={commentCount}
        />
      </div>

      <div className="flex flex-col md:flex-row">
        <Sidebar
          className="hidden md:block p-4"
          terms={terms}
          languageCode={language}
        />
        <div className="flex-1 p-4 ">
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="w-full md:w-2/3">
              {/* <h1 className="text-sm mb-4">Translate</h1>
              <p className="text-3xl mb-8">{term}</p>
              <span className="text "></span>
              <div className="mb-2 px-2 py-1 border bg-gray-200 text-sm">
                An ethereum transaction requires gas
              </div>
              <div className="mb-4 px-2 py-1 border bg-gray-200 text-sm">
                Gas is the fee required to successfully conduct a transaction or
                execute a contract on the Ethereum blockchain platform
              </div>
              <hr className="my-4" /> */}
              {/* pass to section below: Translations for "{term}" in {language} */}
              <TranslationsSection
                initialTranslations={translationsWithVotes}
                termId={termId}
                languageId={languageId}
                user={user}
                hasSubmittedTranslation={hasSubmittedTranslation}
                language={language}
                nextTerm={nextTerm.term}
                nextTermIndex={currentTermIndex + 1}
                termsLength={totalTerms}
                hasTranslatedNextTerm={hasTranslatedNextTerm}
              />
            </div>
            <div className="hidden md:block w-1/3">
              <CommentsPanel
                termId={termId}
                languageId={languageId}
                initialComments={comments}
                user={user}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
