import { supabase } from './supabaseClient'

export async function fetchTermsWithUserTranslations(userId, languageId) {
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

  // Fetch translations related to each term and check if the user has translated any of them
  const termsWithUserStatus = await Promise.all(
    terms.map(async term => {
      // Fetch translation IDs for the current term
      const { data: translations, error: translationsError } = await supabase
        .from('translations')
        .select('id')
        .eq('term_id', term.id)
        .eq('language_id', languageId)

      if (translationsError) {
        throw new Error(
          `Error fetching translations: ${translationsError.message}`,
        )
      }

      // Extract the translation IDs
      const translationIds = translations.map(t => t.id)

      if (translationIds.length === 0) {
        return {
          ...term,
          user_has_translated: false,
        }
      }

      // Check if there are any translation submissions by the user for these translation IDs
      const { data: userSubmissions, error: userSubmissionsError } =
        await supabase
          .from('translation_submissions')
          .select('id')
          .in('translation_id', translationIds)
          .eq('user_id', userId)

      if (userSubmissionsError) {
        throw new Error(
          `Error checking user submissions: ${userSubmissionsError.message}`,
        )
      }

      return {
        ...term,
        user_has_translated: userSubmissions.length > 0,
      }
    }),
  )

  return termsWithUserStatus
}
