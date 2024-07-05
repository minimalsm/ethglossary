import { getData } from '../../lib/fetchData'
import TranslationsList from '../../../components/TranslationsList'
import CommentsSidebar from '../../../components/CommentsSidebar'

export async function generateMetadata({ params }) {
  return {
    title: `Translations for "${params.term}"`,
  }
}

export default async function TermPage({ params }) {
  const { term } = params
  const { initialTranslations, termId } = await getData(term, null)

  return (
    <div className="p-4">
      <div className="flex">
        <div className="w-2/3">
      <h1 className="text-2xl font-bold mb-4">Translations for "{term}"</h1>
      <h3 className="mb-2 text-lg font-semibold">Examples</h3>
          <div className="mb-2 p-4 border rounded bg-gray-200">An ethereum transaction requires gas</div>
          <div className="mb-4 p-4 border rounded bg-gray-200">
            Gas is the fee required to successfully conduct a transaction or execute a contract on the Ethereum
            blockchain platform
          </div>
      
          <TranslationsList initialTranslations={initialTranslations} termId={termId} />
        </div>
        <div className="w-1/3 p-4">
          <CommentsSidebar termId={termId} />
        </div>
      </div>
    </div>
  )
}
