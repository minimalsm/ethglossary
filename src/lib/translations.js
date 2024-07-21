import { supabase } from './supabaseClient'

export async function fetchTranslations(termId, languageId, userId) {
  // Fetch translations
  const { data: allTranslations, error } = await supabase
    .from('translations')
    .select('*, votes(*)')
    .eq('term_id', termId)
    .eq('language_id', languageId)

  if (error) {
    throw new Error(`Error fetching translations: ${error.message}`)
  }

  let hasSubmittedTranslation = false

  if (userId) {
    // Check if the user has submitted a translation
    const { data: userTranslations, error: userError } = await supabase
      .from('translations')
      .select('*')
      .eq('term_id', termId)
      .eq('language_id', languageId)
      .eq('user_id', userId)

    if (userError) {
      throw new Error(`Error checking user translations: ${userError.message}`)
    }

    hasSubmittedTranslation = userTranslations.length > 0
  }

  const translationsWithVotes = allTranslations.map(translation => {
    const voteData = translation.votes
    console.log('Votedata', voteData)

    const upvotes = voteData.filter(({ vote }) => vote === 1).length
    const downvotes = voteData.filter(({ vote }) => vote === -1).length

    let votes = {
      upvotes,
      downvotes,
    }

    let x = voteData.length
      ? voteData.reduce((acc, { vote }) => acc + vote, 0)
      : 0

    return {
      ...translation,
      votes,
    }
  })

  return { translationsWithVotes, hasSubmittedTranslation }
}

export async function addTranslation(
  termId,
  languageId,
  translationText,
  userId,
) {
  const { data, error } = await supabase
    .from('translations')
    .insert([
      {
        term_id: termId,
        language_id: languageId,
        translation: translationText,
        user_id: userId,
      },
    ])
    .select()

  if (error) {
    throw new Error(`Error adding translation: ${error.message}`)
  }

  return data[0]
}
