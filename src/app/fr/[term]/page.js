import { getData } from '../../lib/fetchData'
import TranslationsList from '../../../components/TranslationsList'

export async function generateMetadata({ params }) {
  return {
    title: `Translations for "${params.term}"`,
  }
}

export default async function TermPage({ params }) {
  const { term } = params
  const { initialTranslations, termId } = await getData(term, null) // Pass null for userId

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Translations for "{term}"</h1>
      <TranslationsList initialTranslations={initialTranslations} termId={termId} />
    </div>
  )
}
