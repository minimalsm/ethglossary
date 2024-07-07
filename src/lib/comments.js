import { supabase } from './supabaseClient'

// Function to fetch vote counts for comments
async function fetchCommentVotes(commentId) {
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

export async function fetchComments(termId, languageId) {
  console.log('Fetching comments with termId:', termId, 'and languageId:', languageId)

  const { data, error } = await supabase
    .from('sidebarcomments')
    .select(`
      *,
      profiles(display_name, avatar_url),
      comment_votes(vote)
    `)
    .eq('term_id', termId)
    .eq('language_id', languageId)

  if (error) {
    throw new Error(`Error fetching comments: ${error.message}`)
  }

  const commentsWithVotes = data.map(comment => {
    const upvotes = comment.comment_votes.filter(vote => vote.vote === 1).length
    const downvotes = comment.comment_votes.filter(vote => vote.vote === -1).length
    return {
      ...comment,
      upvotes,
      downvotes,
      totalVotes: upvotes - downvotes
    }
  })

  commentsWithVotes.sort((a, b) => {
    if (b.totalVotes !== a.totalVotes) {
      return b.totalVotes - a.totalVotes
    }
    return new Date(a.created_at) - new Date(b.created_at)
  })

  console.log('Comments with votes:', commentsWithVotes)
  return commentsWithVotes
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
