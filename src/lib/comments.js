import { supabase } from './supabaseClient'

export async function fetchComments(termId, languageId) {
  console.log('Fetching comments with termId:', termId, 'and languageId:', languageId)
  const { data, error } = await supabase
    .from('sidebarcomments')
    .select('*, profiles(display_name, avatar_url)')
    .eq('term_id', termId)
    .eq('language_id', languageId)
    .order('created_at', { ascending: true })

  console.log('Comments:', data)

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