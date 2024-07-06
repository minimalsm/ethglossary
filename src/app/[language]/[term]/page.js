import TranslationsList from '../../../components/TranslationsList'
import CommentsSidebar from '../../../components/CommentsSidebar'
import { fetchTerms } from '../../lib/fetchTerms'
import { fetchTranslations } from '../../lib/fetchTranslations'
import { fetchComments } from '../../lib/fetchComments'
import { fetchLanguages } from '../../lib/fetchLanguages'

export async function generateMetadata({ params }) {
  return {
    title: `Translations for "${params.term}" in ${params.language}`,
  }
}

export default async function TermPage({ params }) {
  const { language, term } = params

//   console.log('term in params', term)

  // Fetch term ID
  const terms = await fetchTerms()
//   console.log('terms', terms)
  const termData = terms.find(t => t.term === term)
  if (!termData) {
    console.error('Term not found:', term)
    return {
      notFound: true
    }
  }
  const termId = termData.id

  // Fetch language ID
  const languages = await fetchLanguages()
  const languageData = languages.find(l => l.code === language)
  if (!languageData) {
    console.error('Language not found:', language)
    return {
      notFound: true
    }
  }
  const languageId = languageData.id

//   console.log('languageId', languageId)
//   console.log('termId', termId)

  // Fetch translations and comments
  const [translations] = await Promise.all([
    fetchTranslations(termId, languageId),
    // fetchComments(termId)
  ])

  console.log('translations before render', translations)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Translations for "{term}" in {language}</h1>
      <div className="flex">
        <div className="w-2/3">
          <TranslationsList translations={translations} termId={termId} languageId={languageId} />
        </div>
        <div className="w-1/3">
          {/* <CommentsSidebar comments={comments} termId={termId} /> */}
        </div>
      </div>
    </div>
  )
}
