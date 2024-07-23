// lib/fetchTermsWithUserTranslations.js
import { supabase } from './supabaseClient'

export async function fetchTermsWithUserTranslations(userId) {
  // Fetch all terms
  const { data: terms, error: termsError } = await supabase
    .from('strings')
    .select('*')

  if (termsError) {
    throw new Error(`Error fetching terms: ${termsError.message}`)
  }

  if (!userId) {
    // If no user is logged in, return terms with user_has_translated set to false
    return terms.map(term => ({
      ...term,
      user_has_translated: false,
    }))
  }

  // Fetch user's translations
  const { data: userTranslations, error: userTranslationsError } =
    await supabase.from('translations').select('term_id').eq('user_id', userId)

  if (userTranslationsError) {
    throw new Error(
      `Error fetching user translations: ${userTranslationsError.message}`,
    )
  }

  const userTranslatedTermIds = new Set(
    userTranslations.map(translation => translation.term_id),
  )

  // Combine data
  const termsWithUserStatus = terms.map(term => ({
    ...term,
    user_has_translated: userTranslatedTermIds.has(term.id),
  }))

  return termsWithUserStatus
}
