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

export async function fetchLanguagesWithStats() {
  try {
    console.log('Starting to fetch languages...')
    const languages = await fetchLanguages()
    console.log('Fetched languages:', languages)

    const languagesWithStats = await Promise.all(
      languages.map(async language => {
        console.log(
          `Fetching stats for language: ${language.name} (ID: ${language.id})`,
        )
        const { count: translationsCount, error: translationsError } =
          await supabase
            .from('translations')
            .select('id', { count: 'exact', head: true })
            .eq('language_id', language.id)

        if (translationsError) {
          console.error(
            `Error fetching translations for language ID ${language.id}:`,
            translationsError.message,
          )
          throw new Error(translationsError.message)
        }

        const { count: commentsCount, error: commentsError } = await supabase
          .from('sidebarcomments')
          .select('id', { count: 'exact', head: true })
          .eq('language_id', language.id)

        if (commentsError) {
          console.error(
            `Error fetching comments for language ID ${language.id}:`,
            commentsError.message,
          )
          throw new Error(commentsError.message)
        }

        console.log(`Fetched stats for language: ${language.name}`, {
          translationsCount,
          commentsCount,
        })

        return {
          ...language,
          translationsCount,
          commentsCount,
        }
      }),
    )

    console.log(
      'Completed fetching all languages with stats:',
      languagesWithStats,
    )
    return languagesWithStats
  } catch (error) {
    console.error('Error in fetchLanguagesWithStats:', error)
    throw error // Rethrow the error to be caught in the calling function
  }
}
