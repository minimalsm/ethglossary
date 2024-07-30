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
  translationText,
  userId,
) {
  // Check if the translation already exists
  let { data: existingTranslation, error: fetchError } = await supabase
    .from('translations')
    .select('id')
    .eq('term_id', termId)
    .eq('language_id', languageId)
    .eq('translation', translationText)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') {
    throw new Error(`Error checking translation: ${fetchError.message}`)
  }

  let translationId

  if (existingTranslation) {
    translationId = existingTranslation.id
  } else {
    // Insert new translation
    const { data: newTranslation, error: insertError } = await supabase
      .from('translations')
      .insert([
        {
          term_id: termId,
          language_id: languageId,
          translation: translationText,
        },
      ])
      .select()
      .single()

    if (insertError) {
      throw new Error(`Error adding translation: ${insertError.message}`)
    }

    translationId = newTranslation.id
  }

  // Add submission
  const { data, error: submissionError } = await supabase
    .from('translation_submissions')
    .insert([{ user_id: userId, translation_id: translationId }])
    .select()

  if (submissionError) {
    throw new Error(`Error adding submission: ${submissionError.message}`)
  }

  // Automatically upvote the translation
  await voteOnTranslation(userId, translationId, 1)

  return { translationId, upvoteCount: await fetchVoteCounts(translationId) }
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
