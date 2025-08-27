import { fetchTerms } from '@/lib/fetchTerms'

export async function getTotalTerms() {
  const terms = await fetchTerms()
  return terms.length
}
