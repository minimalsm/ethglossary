//todo: refactor to use this ?
// import { supabase } from './supabaseClient'

// export async function voteOnTranslation(userId, translationId, vote) {
//   const { data, error } = await supabase
//     .from('votes')
//     // .upsert({ user_id: userId, translation_id: translationId, vote }, { onConflict: ['user_id', 'translation_id'] })
//     .upsert({ user_id: userId, translation_id: translationId, vote })
//     .select()

//   if (error) {
//     throw new Error(`Error voting on translation: ${error.message}`)
//   }

//   return data[0]
// }

// export async function fetchTranslationVotes(translationId) {
//   const { data, error } = await supabase
//     .from('votes')
//     .select('vote')
//     .eq('translation_id', translationId)

//   if (error) {
//     throw new Error(`Error fetching translation votes: ${error.message}`)
//   }

//   const upvotes = data.filter(({ vote }) => vote === 1).length
//   const downvotes = data.filter(({ vote }) => vote === -1).length

//   return { upvotes, downvotes }
// }

// export async function hasUserVotedOnTranslation(userId, translationId) {
//   const { data, error } = await supabase
//     .from('votes')
//     .select('*')
//     .eq('user_id', userId)
//     .eq('translation_id', translationId)
//     .maybeSingle()

//   if (error && error.code !== 'PGRST116') {
//     throw new Error(`Error checking vote: ${error.message}`)
//   }

//   return data
// }