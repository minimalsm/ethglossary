import { supabase } from './supabaseClient'

export async function fetchLeaderboardData() {
  const { data, error } = await supabase.from('profiles').select(`
      id,
      display_name,
      avatar_url,
      translations:translation_submissions ( id ),
      comments:sidebarcomments ( id ),
      votes:translation_votes ( id )
    `)

  if (error) {
    throw new Error(`Error fetching leaderboard data: ${error.message}`)
  }

  // Transform data to get counts and total score
  const leaderboardData = data.map(profile => ({
    id: profile.id,
    display_name: profile.display_name,
    avatar_url: profile.avatar_url,
    translation_count: profile.translations.length,
    comment_count: profile.comments.length,
    vote_count: profile.votes.length,
    total_score:
      profile.translations.length +
      profile.comments.length +
      profile.votes.length,
  }))

  return leaderboardData
}

export async function fetchOrderedLeaderboardData() {
  const leaderboardData = await fetchLeaderboardData()

  const orderedByTotal = [...leaderboardData]
    .sort((a, b) => b.total_score - a.total_score)
    .map(user => ({
      id: user.id,
      avatar_url: user.avatar_url,
      display_name: user.display_name,
      translation_count: user.translation_count,
      comment_count: user.comment_count,
      vote_count: user.vote_count,
    }))

  const orderedByTranslations = [...leaderboardData]
    .sort((a, b) => b.translation_count - a.translation_count)
    .map(user => ({
      id: user.id,
      avatar_url: user.avatar_url,
      display_name: user.display_name,
      translation_count: user.translation_count,
    }))

  const orderedByComments = [...leaderboardData]
    .sort((a, b) => b.comment_count - a.comment_count)
    .map(user => ({
      id: user.id,
      avatar_url: user.avatar_url,
      display_name: user.display_name,
      comment_count: user.comment_count,
    }))

  const orderedByVotes = [...leaderboardData]
    .sort((a, b) => b.vote_count - a.vote_count)
    .map(user => ({
      id: user.id,
      avatar_url: user.avatar_url,
      display_name: user.display_name,
      vote_count: user.vote_count,
    }))

  return {
    orderedByTotal,
    orderedByTranslations,
    orderedByComments,
    orderedByVotes,
  }
}
