// app/fr/[term]/page.js
import { supabase } from '../../lib/supabaseClient'
import TranslationsList from '../../../components/TranslationsList'

export async function getData(term, userId) {
    const { data: allTermsData, error: allTermsError } = await supabase
      .from('strings')
      .select('*')
  
    if (allTermsError) {
      throw new Error(`Error fetching all terms: ${allTermsError.message}`)
    }
  
    if (!allTermsData || allTermsData.length === 0) {
      throw new Error('No terms found in the database')
    }
  
    const { data: termData, error: termError } = await supabase
      .from('strings')
      .select('id')
      .eq('term', term)
      .single()
  
    if (termError) {
      throw new Error(`Error fetching term: ${termError.message}`)
    }
  
    if (!termData) {
      throw new Error(`Term "${term}" not found`)
    }
  
    const termId = termData.id
  
    const { data: translationsData, error: translationsError } = await supabase
      .from('translations')
      .select('*, votes!inner(*)')
      .eq('term_id', termId)
  
    if (translationsError) {
      throw new Error(translationsError.message)
    }
  
    const translationsWithVotes = await Promise.all(translationsData.map(async (translation) => {
      const voteData = translation.votes
      let userVote = null
  
      if (userId) {
        const { data: userVoteData, error } = await supabase
          .from('votes')
          .select('vote')
          .eq('user_id', userId)
          .eq('translation_id', translation.id)
          .single()
  
        if (!error && userVoteData) {
          userVote = userVoteData.vote
        }
      }
  
      return {
        ...translation,
        votes: voteData.length ? voteData.reduce((acc, { vote }) => acc + vote, 0) : 0,
        userVote,
      }
    }))
  
    return {
      initialTranslations: translationsWithVotes,
      termId
    }
  }

// export async function getData(term) {
//   const { data: allTermsData, error: allTermsError } = await supabase
//     .from('strings')
//     .select('*')

//   if (allTermsError) {
//     throw new Error(`Error fetching all terms: ${allTermsError.message}`)
//   }

//   if (!allTermsData || allTermsData.length === 0) {
//     throw new Error('No terms found in the database')
//   }

//   const { data: termData, error: termError } = await supabase
//     .from('strings')
//     .select('id')
//     .eq('term', term)
//     .single()

//   if (termError) {
//     throw new Error(`Error fetching term: ${termError.message}`)
//   }

//   if (!termData) {
//     throw new Error(`Term "${term}" not found`)
//   }

//   const termId = termData.id

//   const { data: translationsData, error: translationsError } = await supabase
//     .from('translations')
//     .select('*')
//     .eq('term_id', termId)

//   if (translationsError) {
//     throw new Error(translationsError.message)
//   }

//   return {
//     initialTranslations: translationsData,
//     termId
//   }
// }

export default async function TermPage({ params }) {
  const { term } = params
  const { initialTranslations, termId } = await getData(term)

  return (
    <div className="p-4">
        <div className="flex">
            <div className='w-full'>
                <h1 className="text-2xl font-bold mb-4">Translations for "{term}"</h1>
                <TranslationsList initialTranslations={initialTranslations} termId={termId} />
            </div>
            <div className="w-80">
                Sidebar
            </div>
        </div>
    </div>
  )
}

