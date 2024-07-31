import Link from 'next/link'
import TranslateIcon from '@/components/icons/TranslateIcon'
import CommentsIcon from '@/components/icons/CommentsIcon'

const LanguageLinkCard = ({ language }) => {
  const capitalisedEnglishName =
    language.name.charAt(0).toUpperCase() + language.name.slice(1)
  const localLanguageName = language.localName
  const countriesList = language?.countries?.join(', ') || null

  return (
    <Link
      href={`/${language.code}/hello`}
      className="flex gap-4 items-center justify-between rounded-lg border hover:bg-card-gradient hover:border-[#E8D3D3] p-4"
    >
      <div id="content" className="flex flex-col space-y-0.5">
        <div id="langs" className="flex items-baseline">
          <div className="text-xl font-semibold mr-2 font-serif">
            {localLanguageName}
          </div>
          <div className="text-sm">{capitalisedEnglishName}</div>
        </div>
        <div id="countries" className="flex text-xs">
          {countriesList}
        </div>
      </div>
      {language.translationsCount &&
        language.commentsCount(
          <div id="stats" className="flex flex-col space-y-2">
            <div className="text-sm flex items-center gap-1">
              <TranslateIcon />
              {language.translationsCount}
            </div>
            <div className="text-sm flex items-center gap-1">
              <CommentsIcon /> {language.commentsCount}
            </div>
          </div>,
        )}
    </Link>
  )
}

export default LanguageLinkCard
