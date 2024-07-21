import { createClient } from './supabase/server'

export async function fetchUserTranslation(termId, languageId, userId) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('translations')
    .select('id')
    .eq('term_id', termId)
    .eq('language_id', languageId)
    .eq('user_id', userId)
    .maybeSingle()

  if (error) {
    throw new Error(`Error fetching user translation: ${error.message}`)
  }

  return data
}
