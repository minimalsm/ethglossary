import { supabase } from './supabaseClient'

export async function fetchComments(termId) {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('term_id', termId)
    .order('created_at', { ascending: true })

  if (error) {
    throw new Error(`Error fetching comments: ${error.message}`)
  }

  return data
}
