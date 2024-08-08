import languages from '@/data/languages.json'

export function getLanguageData(langCode) {
  console.log('Fetching language data for code:', langCode)
  const languageData = languages[langCode] || null
  console.log('Fetched language data:', languageData)
  return languageData
}
