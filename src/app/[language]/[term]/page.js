import TranslationsSection from '@/components/translations/TranslationsSection'
import CommentsPanel from '@/components/comments/CommentsPanel'
import TermsModal from '@/components/modals/TermsModal'
import CommentsModal from '@/components/modals/CommentsModal'
import { fetchTerms } from '@/lib/fetchTerms'
import { fetchTranslations } from '@/lib/translations'
import { fetchComments } from '@/lib/comments'
import { fetchLanguages } from '@/lib/fetchLanguages'
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
  } = await createSupabaseServerComponentClient().auth.getSession()

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

  // Fetch term ID
  const terms = await fetchTerms()
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

  // // Fetch translations and comments
  // const [translations, { comments, count: commentCount }] = await Promise.all([
  //   fetchTranslations(termId, languageId),
  //   fetchComments(termId, languageId),
  // ])

  // Fetch at once to improve performance
  const [
    { translationsWithVotes, hasSubmittedTranslation },
    { comments, count: commentCount },
  ] = await Promise.all([
    fetchTranslations(termId, languageId, userId),
    fetchComments(termId, languageId),
  ])

  // console.log('Translations on server', allTranslations)
  // console.log('Comments on server', comments)

  // console.log('ALL TRANSLATIONS', translationsWithVotes)

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
        <div className="flex-1 p-4">
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="w-full md:w-2/3">
              <h1 className="text-2xl font-bold mb-4">
                Translations for "{term}" in {language}
              </h1>
              <div className="mb-2 p-4 border rounded bg-gray-200">
                An ethereum transaction requires gas
              </div>
              <div className="mb-4 p-4 border rounded bg-gray-200">
                Gas is the fee required to successfully conduct a transaction or
                execute a contract on the Ethereum blockchain platform
              </div>
              <hr className="my-4" />
              <TranslationsSection
                initialTranslations={translationsWithVotes}
                termId={termId}
                languageId={languageId}
                user={user}
                hasSubmittedTranslation={hasSubmittedTranslation}
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
