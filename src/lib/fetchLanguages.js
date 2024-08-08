import { supabase } from './supabaseClient'

export async function fetchLanguages() {
  const { data, error } = await supabase
    .from('languages')
    .select('id, code, name')
    .order('name', { ascending: true })

  if (error) {
    throw new Error(`Error fetching languages: ${error.message}`)
  }

  return data
}

async function fetchWithRetry(queryFunction, retries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await queryFunction()
    } catch (error) {
      if (error.status === 503 && attempt < retries) {
        console.warn(
          `Service unavailable. Retrying in ${delay}ms... (Attempt ${attempt} of ${retries})`,
        )
        await new Promise(resolve => setTimeout(resolve, delay))
      } else {
        throw error
      }
    }
  }
}

// export async function fetchLanguagesWithStats() {
//   try {
//     console.log('Starting to fetch languages...')
//     const languages = await fetchLanguages()
//     console.log('Fetched languages:', languages)

//     const languagesWithStats = await Promise.all(
//       languages.map(async language => {
//         console.log(
//           `Fetching stats for language: ${language.name} (ID: ${language.id})`,
//         )

//         const fetchTranslations = () =>
//           supabase
//             .from('translations')
//             .select('id', { count: 'exact', head: true })
//             .eq('language_id', language.id)

//         const fetchComments = () =>
//           supabase
//             .from('sidebarcomments')
//             .select('id', { count: 'exact', head: true })
//             .eq('language_id', language.id)

//         const { count: translationsCount, error: translationsError } =
//           await fetchWithRetry(fetchTranslations)

//         if (translationsError) {
//           console.error(
//             `Error fetching translations for language ID ${language.id}:`,
//             translationsError.message,
//           )
//           throw new Error(translationsError.message)
//         }

//         const { count: commentsCount, error: commentsError } =
//           await fetchWithRetry(fetchComments)

//         if (commentsError) {
//           console.error(
//             `Error fetching comments for language ID ${language.id}:`,
//             commentsError.message,
//           )
//           throw new Error(commentsError.message)
//         }

//         console.log(`Fetched stats for language: ${language.name}`, {
//           translationsCount,
//           commentsCount,
//         })

//         return {
//           ...language,
//           translationsCount,
//           commentsCount,
//         }
//       }),
//     )

//     console.log(
//       'Completed fetching all languages with stats:',
//       languagesWithStats,
//     )
//     return languagesWithStats
//   } catch (error) {
//     console.error('Error in fetchLanguagesWithStats:', error)
//     throw error // Rethrow the error to be caught in the calling function
//   }
// }

export async function fetchLanguagesWithStats() {
  try {
    console.log('Starting to fetch languages with stats from view...')

    const { data, error } = await supabase
      .from('languages_with_stats_2') // Query the view
      .select('*') // Select all fields from the view
      .order('name', { ascending: true })

    if (error) {
      throw new Error(`Error fetching languages with stats: ${error.message}`)
    }

    console.log('Completed fetching all languages with stats:', data)
    return data
  } catch (error) {
    console.error('Error in fetchLanguagesWithStats:', error)
    throw error
  }
}
