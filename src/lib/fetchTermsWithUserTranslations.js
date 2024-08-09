import { supabase } from './supabaseClient'

// export async function fetchTermsWithUserTranslations(userId, languageId) {
//   // Fetch all terms
//   const { data: terms, error: termsError } = await supabase
//     .from('strings')
//     .select('*')

//   if (termsError) {
//     throw new Error(`Error fetching terms: ${termsError.message}`)
//   }

//   if (!userId) {
//     // If no user is logged in, return terms with user_has_translated set to false
//     return terms.map(term => ({
//       ...term,
//       user_has_translated: false,
//     }))
//   }

//   // Fetch translations related to each term and check if the user has translated any of them
//   const termsWithUserStatus = await Promise.all(
//     terms.map(async term => {
//       // Fetch translation IDs for the current term
//       const { data: translations, error: translationsError } = await supabase
//         .from('translations')
//         .select('id')
//         .eq('term_id', term.id)
//         .eq('language_id', languageId)

//       if (translationsError) {
//         throw new Error(
//           `Error fetching translations: ${translationsError.message}`,
//         )
//       }

//       // Extract the translation IDs
//       const translationIds = translations.map(t => t.id)

//       if (translationIds.length === 0) {
//         return {
//           ...term,
//           user_has_translated: false,
//         }
//       }

//       // Check if there are any translation submissions by the user for these translation IDs
//       const { data: userSubmissions, error: userSubmissionsError } =
//         await supabase
//           .from('translation_submissions')
//           .select('id')
//           .in('translation_id', translationIds)
//           .eq('user_id', userId)

//       if (userSubmissionsError) {
//         throw new Error(
//           `Error checking user submissions: ${userSubmissionsError.message}`,
//         )
//       }

//       return {
//         ...term,
//         user_has_translated: userSubmissions.length > 0,
//       }
//     }),
//   )

//   return termsWithUserStatus
// }

// 2nd implementaiton

// export async function fetchTermsWithUserTranslations(userId, languageId) {
//   // Fetch all terms
//   const { data: terms, error: termsError } = await supabase
//     .from('strings')
//     .select('*')

//   if (termsError) {
//     throw new Error(`Error fetching terms: ${termsError.message}`)
//   }

//   if (!userId) {
//     // If no user is logged in, return terms with user_has_translated set to false
//     return terms.map(term => ({
//       ...term,
//       user_has_translated: false,
//     }))
//   }

//   // Fetch all translations for the user in this language
//   const { data: userTranslations, error: userTranslationsError } =
//     await supabase
//       .from('translation_submissions')
//       .select('translation_id')
//       .eq('user_id', userId)
//   // .eq('language_id', languageId)

//   if (userTranslationsError) {
//     throw new Error(
//       `Error fetching user translations: ${userTranslationsError.message}`,
//     )
//   }

//   // Create a set of translation IDs the user has submitted
//   const userTranslationIds = new Set(
//     userTranslations.map(ut => ut.translation_id),
//   )

//   // Fetch all translations for the terms in this language
//   const { data: allTranslations, error: allTranslationsError } = await supabase
//     .from('translations')
//     .select('id, term_id')
//     .eq('language_id', languageId)

//   if (allTranslationsError) {
//     throw new Error(
//       `Error fetching translations: ${allTranslationsError.message}`,
//     )
//   }

//   // Map term ID to user_has_translated status
//   const termsWithUserStatus = terms.map(term => {
//     const termTranslationIds = allTranslations
//       .filter(t => t.term_id === term.id)
//       .map(t => t.id)

//     const userHasTranslated = termTranslationIds.some(id =>
//       userTranslationIds.has(id),
//     )

//     return {
//       ...term,
//       user_has_translated: userHasTranslated,
//     }
//   })

//   return termsWithUserStatus
// }

export async function fetchTermsWithUserTranslations(userId, languageId) {
  if (!userId) {
    // If no user is logged in, fetch all terms and set user_has_translated to false
    const { data: terms, error: termsError } = await supabase
      .from('strings')
      .select('*')

    if (termsError) {
      throw new Error(`Error fetching terms: ${termsError.message}`)
    }

    return terms.map(term => ({
      ...term,
      user_has_translated: false,
    }))
  }

  // Fetch terms with user translation status in one query
  const { data: termsWithStatus, error: termsWithStatusError } =
    await supabase.rpc('fetch_terms_with_user_status', {
      user_id: userId,
      language_id: languageId,
    })

  if (termsWithStatusError) {
    throw new Error(
      `Error fetching terms with user status: ${termsWithStatusError.message}`,
    )
  }

  return termsWithStatus
}

// runs off of the following SQL:
/**
```
CREATE OR REPLACE FUNCTION fetch_terms_with_user_status(user_id UUID, language_id int8)
RETURNS TABLE (id UUID, term TEXT, user_has_translated BOOLEAN) AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.id,
    s.term,
    EXISTS (
      SELECT 1 
      FROM translations t 
      JOIN translation_submissions ts 
      ON t.id = ts.translation_id
      WHERE t.term_id = s.id
      AND t.language_id = fetch_terms_with_user_status.language_id  -- Qualify with function's parameter
      AND ts.user_id = fetch_terms_with_user_status.user_id         -- Qualify with function's parameter
    ) AS user_has_translated
  FROM strings s;
END;
$$ LANGUAGE plpgsql;
```
**/
