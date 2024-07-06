import { supabase } from './supabaseClient'

export async function fetchLanguages() {
  const { data, error } = await supabase
    .from('languages')
    .select('id, code, name')

  if (error) {
    throw new Error(`Error fetching languages: ${error.message}`)
  }

  console.log('Fetched languages:', data) // Debugging log
  return data
}
