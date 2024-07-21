import { supabase } from './supabaseClient'

export async function fetchTerms() {
  const { data, error } = await supabase.from('strings').select('id, term')

  if (error) {
    throw new Error(`Error fetching terms: ${error.message}`)
  }

  return data
}
