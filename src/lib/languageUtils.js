import languages from '@/data/languages.json'

export function getLanguageData(langCode) {
  return languages[langCode] || null
}
