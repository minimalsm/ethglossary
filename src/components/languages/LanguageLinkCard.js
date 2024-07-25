import Link from 'next/link'

const LanguageLinkCard = ({ language }) => {
  const capitalisedEnglishName =
    language.name.charAt(0).toUpperCase() + language.name.slice(1)
  const localLanguageName = language.localName
  const countriesList = language?.countries?.join(', ') || null

  return (
    <Link
      href={`/${language.code}/hello`}
      className="flex gap-4 justify-between border border-[#D1D1D1] hover:bg-[#F4F4F4] hover:border-[#000] p-4"
    >
      <div id="content" className="flex flex-col space-y-0.5">
        <div id="langs" className="flex items-center">
          <div className="text-xl font-semibold mr-2">{localLanguageName}</div>
          <div className="text-sm">{capitalisedEnglishName}</div>
        </div>
        <div id="countries" className="flex text-xs">
          {countriesList}
        </div>
      </div>
      <div id="stats" className="flex flex-col space-y-2">
        <div className="text-sm flex items-center gap-1">
          <TranslateIcon />
          {language.translationsCount}
        </div>
        <div className="text-sm flex items-center gap-1">
          <CommentsIcon /> {language.commentsCount}
        </div>
      </div>
    </Link>
  )
}

const TranslateIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.58033 10.0493L6.88699 8.37594L6.90699 8.35594C8.06699 7.0626 8.89366 5.57594 9.38033 4.0026H11.3337V2.66927H6.66699V1.33594H5.33366V2.66927H0.666992V4.0026H8.11366C7.66699 5.2826 6.96033 6.5026 6.00033 7.56927C5.38033 6.8826 4.86699 6.12927 4.46033 5.33594H3.12699C3.61366 6.4226 4.28033 7.44927 5.11366 8.37594L1.72033 11.7226L2.66699 12.6693L6.00033 9.33594L8.07366 11.4093L8.58033 10.0493ZM12.3337 6.66927H11.0003L8.00033 14.6693H9.33366L10.0803 12.6693H13.247L14.0003 14.6693H15.3337L12.3337 6.66927ZM10.587 11.3359L11.667 8.44927L12.747 11.3359H10.587Z"
        fill="black"
      />
    </svg>
  )
}

const CommentsIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.00065 14.6688C5.82384 14.6688 5.65427 14.5985 5.52925 14.4735C5.40422 14.3485 5.33398 14.1789 5.33398 14.0021V12.0021H2.66732C2.3137 12.0021 1.97456 11.8616 1.72451 11.6116C1.47446 11.3615 1.33398 11.0224 1.33398 10.6688V2.66878C1.33398 1.92878 1.93398 1.33545 2.66732 1.33545H13.334C13.6876 1.33545 14.0267 1.47592 14.2768 1.72597C14.5268 1.97602 14.6673 2.31516 14.6673 2.66878V10.6688C14.6673 11.0224 14.5268 11.3615 14.2768 11.6116C14.0267 11.8616 13.6876 12.0021 13.334 12.0021H9.26732L6.80065 14.4754C6.66732 14.6021 6.50065 14.6688 6.33398 14.6688H6.00065ZM6.66732 10.6688V12.7221L8.72065 10.6688H13.334V2.66878H2.66732V10.6688H6.66732ZM11.334 7.33545H10.0007V6.00212H11.334V7.33545ZM8.66732 7.33545H7.33398V6.00212H8.66732V7.33545ZM6.00065 7.33545H4.66732V6.00212H6.00065V7.33545Z"
        fill="black"
      />
    </svg>
  )
}

export default LanguageLinkCard
