import TranslationsList from '../../../components/TranslationsList'
import CommentsSidebar from '../../../components/CommentsSidebar'
import { fetchTerms } from '../../../lib/fetchTerms'
import { fetchTranslations } from '../../../lib/translations'
import { fetchComments } from '../../../lib/comments'
import { fetchLanguages } from '../../../lib/fetchLanguages'
import Sidebar from '@/components/Sidebar'

export async function generateMetadata({ params }) {
  return {
    title: `Translations for "${params.term}" in ${params.language}`,
  }
}

export default async function TermPage({ params }) {
  const { language, term } = params

//   console.log('term in params', term)
    console.log('language in params', language)

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
  const languageCode = languageData.code

//   console.log('languageId', languageId)
//   console.log('termId', termId)

  // Fetch translations and comments
  const [translations] = await Promise.all([
    fetchTranslations(termId, languageId),
    fetchComments(termId, languageId)
  ])

  console.log('translations before render', translations)

  return (
    <div className='flex'>
        <Sidebar className="p-4" terms={terms} languageCode={language} />
        <div className="flex-1 p-4">
      
        <div className="flex space-x-8">
            <div className="w-2/3 ">
            <h1 className="text-2xl font-bold mb-4">Translations for "{term}" in {language}</h1>
            <div className="mb-2 p-4 border rounded bg-gray-200">An ethereum transaction requires gas</div>
            <div className="mb-4 p-4 border rounded bg-gray-200">
                Gas is the fee required to successfully conduct a transaction or execute a contract on the Ethereum
                blockchain platform
            </div>
            <hr className="my-4" />
            <TranslationsList translations={translations} termId={termId} languageId={languageId} />
            </div>
            <div className="w-1/3">
            {/* <CommentsSidebar comments={comments} termId={termId} /> */}
            <CommentsSidebar termId={termId} languageId={languageId} />
            </div>
        </div>
        </div>
    </div>
  )
}
