import LanguageLinkCard from '@/components/languages/LanguageLinkCard'

export default function LanguagesList({ languages, className, max }) {
  const containerClass = className ? className : 'flex flex-col gap-3'

  // Determine the number of languages to display
  const displayedLanguages = max ? languages.slice(0, max) : languages

  return (
    <div className={containerClass}>
      {displayedLanguages.map(language => (
        <LanguageLinkCard
          key={language.code}
          language={language}
          isDefault={language.isDefault}
        />
      ))}
    </div>
  )
}
