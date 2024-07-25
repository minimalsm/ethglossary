import LanguageLinkCard from '@/components/languages/LanguageLinkCard'

export default function LanguagesList({ languages }) {
  return (
    <div className="flex flex-col gap-3">
      {languages.map(language => (
        <LanguageLinkCard key={language.code} language={language} />
      ))}
    </div>
  )
}
