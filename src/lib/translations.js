import { supabase } from './supabaseClient'

export async function fetchTranslations(termId, languageId, userId) {
  // Fetch translations
  const { data: allTranslations, error: translationsError } = await supabase
    .from('translations')
    .select('*, translation_submissions(user_id), translation_votes(vote)')
    .eq('term_id', termId)
    .eq('language_id', languageId)

  if (translationsError) {
    throw new Error(`Error fetching translations: ${translationsError.message}`)
  }

  let hasSubmittedTranslation = false

  if (userId) {
    // Check if the user has submitted a translation
    const { data: userSubmissions, error: submissionsError } = await supabase
      .from('translation_submissions')
      .select('*')
      .in(
        'translation_id',
        allTranslations.map(t => t.id),
      )
      .eq('user_id', userId)

    if (submissionsError) {
      throw new Error(
        `Error checking user submissions: ${submissionsError.message}`,
      )
    }

    hasSubmittedTranslation = userSubmissions.length > 0
  }

  const translationsWithVotes = allTranslations.map(translation => {
    const upvotes = translation.translation_votes.filter(
      vote => vote.vote === 1,
    ).length
    const downvotes = translation.translation_votes.filter(
      vote => vote.vote === -1,
    ).length

    return {
      ...translation,
      votes: {
        upvotes,
        downvotes,
      },
    }
  })

  return { translationsWithVotes, hasSubmittedTranslation }
}

export async function submitTranslation(
  termId,
  languageId,
  translation,
  userId,
) {
  const { data: existingTranslation, error: fetchError } = await supabase
    .from('translations')
    .select('*')
    .eq('term_id', termId)
    .eq('language_id', languageId)
    .eq('translation', translation)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') {
    throw new Error(`Error fetching translation: ${fetchError.message}`)
  }

  if (existingTranslation) {
    // Upvote the existing translation
    const { data: voteData, error: voteError } = await supabase
      .from('translation_votes')
      .upsert(
        { user_id: userId, translation_id: existingTranslation.id, vote: 1 },
        { onConflict: ['user_id', 'translation_id'] },
      )

    if (voteError) {
      throw new Error(`Error voting on translation: ${voteError.message}`)
    }

    return existingTranslation
  } else {
    // Insert a new translation
    const { data, error } = await supabase
      .from('translations')
      .insert([{ term_id: termId, language_id: languageId, translation }])
      .select()

    if (error) {
      throw new Error(`Error adding translation: ${error.message}`)
    }

    // Upvote the new translation
    const newTranslationId = data[0].id

    const { data: voteData, error: voteError } = await supabase
      .from('translation_votes')
      .insert({ user_id: userId, translation_id: newTranslationId, vote: 1 })

    if (voteError) {
      throw new Error(`Error voting on translation: ${voteError.message}`)
    }

    return data[0]
  }
}

export async function voteOnTranslation(userId, translationId, vote) {
  const { data: existingVote, error: fetchError } = await supabase
    .from('translation_votes')
    .select('id, vote')
    .eq('user_id', userId)
    .eq('translation_id', translationId)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') {
    throw new Error(`Error checking existing vote: ${fetchError.message}`)
  }

  if (existingVote) {
    if (existingVote.vote === vote) {
      return // No change if the vote is the same
    }

    const { error: updateError } = await supabase
      .from('translation_votes')
      .update({ vote })
      .eq('id', existingVote.id)

    if (updateError) {
      throw new Error(`Error updating vote: ${updateError.message}`)
    }
  } else {
    const { error: insertError } = await supabase
      .from('translation_votes')
      .insert([{ user_id: userId, translation_id: translationId, vote }])

    if (insertError) {
      throw new Error(`Error adding vote: ${insertError.message}`)
    }
  }
}

export async function fetchVoteCounts(translationId) {
  const { data, error } = await supabase
    .from('translation_votes')
    .select('vote')
    .eq('translation_id', translationId)

  if (error) {
    throw new Error(`Error fetching vote counts: ${error.message}`)
  }

  const upvotes = data.filter(({ vote }) => vote === 1).length
  const downvotes = data.filter(({ vote }) => vote === -1).length

  return { upvotes, downvotes }
}

export async function hasUserTranslatedTerm(termId, languageId, userId) {
  if (!userId) {
    return false
  }

  const { data: userTranslations, error: userError } = await supabase
    .from('translations')
    .select('*')
    .eq('term_id', termId)
    .eq('language_id', languageId)
    .eq('user_id', userId)

  if (userError) {
    throw new Error(`Error checking user translations: ${userError.message}`)
  }

  return userTranslations.length > 0
}
