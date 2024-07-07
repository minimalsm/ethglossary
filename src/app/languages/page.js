import Link from 'next/link'
import { fetchLanguages } from '../../lib/fetchLanguages'

export default async function LanguagesPage() {
  const languages = await fetchLanguages()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Languages</h1>
      <div className="grid grid-cols-4 gap-4">
        {languages.map(language => (
          <Link
            href={`/${language.code}/hello`}
            className="flex flex-col items-center justify-center bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md py-3 px-4 transition-colors"
            prefetch={false}
            key={language.code}
          >
            🇫🇷
            <span className="text-sm font-medium">{language.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
