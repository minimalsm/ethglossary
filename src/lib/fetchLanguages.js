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
  const languages = await fetchLanguages()

  const languagesWithStats = await Promise.all(
    languages.map(async language => {
      const { count: translationsCount, error: translationsError } =
        await supabase
          .from('translations')
          .select('id', { count: 'exact', head: true })
          .eq('language_id', language.id)

      const { count: commentsCount, error: commentsError } = await supabase
        .from('sidebarcomments')
        .select('id', { count: 'exact', head: true })
        .eq('language_id', language.id)

      if (translationsError || commentsError) {
        console.log(translationsError?.message || commentsError?.message)
        throw new Error(translationsError?.message || commentsError?.message)
      }

      return {
        ...language,
        translationsCount,
        commentsCount,
      }
    }),
  )

  return languagesWithStats
}
