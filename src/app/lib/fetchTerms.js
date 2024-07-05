import { supabase } from './supabaseClient'

export async function fetchTerms() {
  const { data, error } = await supabase
    .from('strings')
    .select('term')

  if (error) {
    throw new Error(`Error fetching terms: ${error.message}`)
  }

  return data
}
