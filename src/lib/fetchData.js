import { supabase } from './supabaseClient'

export async function getData(term, userId) {
  const { data: allTermsData, error: allTermsError } = await supabase
    .from('strings')
    .select('*')

  if (allTermsError) {
    throw new Error(`Error fetching all terms: ${allTermsError.message}`)
  }

  if (!allTermsData || allTermsData.length === 0) {
    throw new Error('No terms found in the database')
  }

  const { data: termData, error: termError } = await supabase
    .from('strings')
    .select('id')
    .eq('term', term)
    .single()

  if (termError || !termData) {
    throw new Error(
      `Error fetching term: ${termError ? termError.message : 'Term not found'}`,
    )
  }

  const termId = termData.id

  const { data: translationsData, error: translationsError } = await supabase
    .from('translations')
    .select('*, votes(*)')
    .eq('term_id', termId)

  if (translationsError) {
    throw new Error(translationsError.message)
  }

  const translationsWithVotes = await Promise.all(
    translationsData.map(async translation => {
      const voteData = translation.votes
      let userVote = null

      if (userId) {
        const { data: userVoteData, error: userVoteError } = await supabase
          .from('votes')
          .select('vote')
          .eq('user_id', userId)
          .eq('translation_id', translation.id)
          .maybeSingle() // Use maybeSingle to handle the case when no rows are returned

        if (!userVoteError && userVoteData) {
          userVote = userVoteData.vote
        }
      }

      return {
        ...translation,
        votes: voteData.length
          ? voteData.reduce((acc, { vote }) => acc + vote, 0)
          : 0,
        userVote,
      }
    }),
  )

  return {
    initialTranslations: translationsWithVotes,
    termId,
  }
}
