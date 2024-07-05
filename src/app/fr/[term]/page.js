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
      <h1 className="text-2xl font-bold mb-4">Translations for "{term}"</h1>
      <div className="flex">
        <div className="w-2/3">
          <TranslationsList initialTranslations={initialTranslations} termId={termId} />
        </div>
        <div className="w-1/3">
          <CommentsSidebar termId={termId} />
        </div>
      </div>
    </div>
  )
}
