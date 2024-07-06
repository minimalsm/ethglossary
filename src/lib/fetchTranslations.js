import { supabase } from './supabaseClient'

export async function fetchTranslations(termId, languageId) {
  const { data, error } = await supabase
    .from('translations')
    .select('*, votes(*)')
    .eq('term_id', termId)
    .eq('language_id', languageId)

  if (error) {
    throw new Error(`Error fetching translations: ${error.message}`)
  }

  // console.log('translatoins data', data)

  const translationsWithVotes = data.map(translation => {
    const voteData = translation.votes
    let votes = voteData.length ? voteData.reduce((acc, { vote }) => acc + vote, 0) : 0

    return {
      ...translation,
      votes,
    }
  })

  return translationsWithVotes
}
