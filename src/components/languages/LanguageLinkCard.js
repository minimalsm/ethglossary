import Link from 'next/link'
import TranslateIcon from '@/components/icons/TranslateIcon'
import CommentsIcon from '@/components/icons/CommentsIcon'

const LanguageLinkCard = ({ language }) => {
  console.log('lang thats failing', language)
  const capitalisedEnglishName =
    language.name.charAt(0).toUpperCase() + language.name.slice(1)
  const localLanguageName = language.localName
  const countriesList = language?.countries?.join(', ') || null

  console.log(language)

  return (
    <Link
      href={`/${language.code}/hello`}
      className="flex items-center justify-between gap-4 rounded-lg border bg-background p-4 hover:border-[#E8D3D3] hover:bg-[#3A3E50]"
    >
      <div id="content" className="flex flex-col space-y-0.5">
        <div id="langs" className="flex items-baseline">
          <div className="mr-2 font-serif text-xl font-semibold">
            {localLanguageName}
          </div>
          <div className="mr-5 text-sm">{capitalisedEnglishName}</div>
          {language.isDefault && <IsDefaultLanguageLabel />}
        </div>
        <div id="countries" className="flex text-xs">
          {countriesList}
        </div>
      </div>
      {language.translationsCount !== undefined &&
      language.commentsCount !== undefined ? (
        <div id="stats" className="flex flex-col space-y-2">
          <div className="flex items-center gap-1 text-sm">
            <TranslateIcon />
            {language.translationsCount}
          </div>
          <div className="flex items-center gap-1 text-sm">
            <CommentsIcon /> {language.commentsCount}
          </div>
        </div>
      ) : (
        ''
      )}
    </Link>
  )
}

const IsDefaultLanguageLabel = () => {
  return (
    <span className="rounded-full border border-red-100 px-4 py-2 text-xs leading-none">
      Translating
    </span>
  )
}

export default LanguageLinkCard
