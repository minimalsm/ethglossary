import { supabase } from './supabaseClient'

export async function fetchComments(termId, languageId) {
  const { data, error } = await supabase
    .from('sidebarcomments')
    .select('*')
    .eq('term_id', termId)
    .eq('language_id', languageId)
    .order('created_at', { ascending: true })

  if (error) {
    throw new Error(`Error fetching comments: ${error.message}`)
  }

  return data
}