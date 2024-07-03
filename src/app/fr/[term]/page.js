// app/fr/[term]/page.js
import { supabase } from '../../lib/supabaseClient'
import CommentsList from '../../../components/CommentsList'
import AddTranslation from '../../../components/AddTranslation'
import AddComment from '../../../components/AddComment'

const PAGE_SIZE = 10

export async function getData(term, page) {
    
    // Fetch all data from the terms table
    const { data: allTermsData, error: allTermsError } = await supabase
      .from('strings')
      .select()
  
    // Log all terms data
    // console.log('All Terms Data:', allTermsData)
    // console.log('All Terms Error:', allTermsError)
  
    if (allTermsError) {
      throw new Error(`Error fetching all terms: ${allTermsError.message}`)
    }
  
    // Check if there are any terms in the table
    if (!allTermsData || allTermsData.length === 0) {
      throw new Error('No terms found in the database')
    }
  
    // Log the term being queried
    console.log(`Querying term: "${term}"`)
  
    const { data: termData, error: termError } = await supabase
      .from('strings')
      .select('id')
      .eq('term', term)
      .single()
  
    // Log the results of the term query
    // console.log('Term Data:', termData)
    // console.log('Term Error:', termError)
  
    if (termError) {
      throw new Error(`Error fetching term: ${termError.message}`)
    }
  
    if (!termData) {
      throw new Error(`Term "${term}" not found`)
    }
  
    const termId = termData.id
  
    const { count: translationCount } = await supabase
      .from('translations')
      .select('*', { count: 'exact', head: true })
      .eq('term_id', termId)
  
    const { data: translationsData, error } = await supabase
      .from('translations')
      .select('*')
      .eq('term_id', termId)
    //   .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)
  
    if (error) {
      throw new Error(error.message)
    }
  
    return {
      initialTranslations: translationsData,
      totalPages: Math.ceil(translationCount / PAGE_SIZE),
      termId
    }
  }

export default async function TermPage({ params, searchParams }) {
  const { term } = params
  const page = parseInt(searchParams.page) || 1
  const { initialTranslations, termId } = await getData(term, page)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Translations for "{term}"</h1>
      <AddTranslation termId={termId} />
      {initialTranslations.map((translation) => (
        <div key={translation.id} className="mb-4 p-4 border rounded-md">
          <p>{translation.translation}</p>
          <CommentsList translationId={translation.id} /> 
          <AddComment translationId={translation.id} />
        </div>
      ))}
    </div>
  )
}
