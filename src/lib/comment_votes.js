import { supabase } from './supabaseClient'

export async function voteOnComment(userId, commentId, vote) {
  const { data, error } = await supabase
    .from('comment_votes')
    .upsert({ user_id: userId, comment_id: commentId, vote }, { onConflict: ['user_id', 'comment_id'] })
    .select()

  if (error) {
    throw new Error(`Error voting on comment: ${error.message}`)
  }

  return data[0]
}

export async function fetchVotes(commentId) {
    const { data, error } = await supabase
      .from('comment_votes')
      .select('vote')
      .eq('comment_id', commentId)
  
    if (error) {
      throw new Error(`Error fetching votes: ${error.message}`)
    }
  
    const upvotes = data.filter(({ vote }) => vote === 1).length
    const downvotes = data.filter(({ vote }) => vote === -1).length
  
    return { upvotes, downvotes }
  }

export async function hasUserVoted(userId, commentId) {
  const { data, error } = await supabase
    .from('comment_votes')
    .select('*')
    .eq('user_id', userId)
    .eq('comment_id', commentId)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Error checking vote: ${error.message}`)
  }

  return data
}
