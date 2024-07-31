import LanguageLinkCard from '@/components/languages/LanguageLinkCard'

export default function LanguagesList({ languages, className }) {
  const containerClass = className ? className : 'flex flex-col gap-3'

  return (
    <div className={containerClass}>
      {languages.map(language => (
        <LanguageLinkCard key={language.code} language={language} />
      ))}
    </div>
  )
}
