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

export async function addTranslation(termId, languageId, translationText) {
  const { data, error } = await supabase
    .from('translations')
    .insert([{ term_id: termId, language_id: languageId, translation: translationText }])
    .select()

  if (error) {
    throw new Error(`Error adding translation: ${error.message}`)
  }

  return data[0]
}
