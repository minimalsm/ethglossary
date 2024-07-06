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

export async function addComment(termId, languageId, userId, commentText) {
  const { data, error } = await supabase
    .from('sidebarcomments')
    .insert([{ term_id: termId, language_id: languageId, user_id: userId, comment: commentText }])
    .select()

  if (error) {
    throw new Error(`Error adding comment: ${error.message}`)
  }

  return data[0]
}