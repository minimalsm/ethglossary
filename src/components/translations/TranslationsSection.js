'use client'
import { useState } from 'react'
import AddTranslationForm from '@/components/translations/AddTranslationForm'
import VoteButtons from '@/components/common/VoteButtons'
import { BadgeCheck, ChevronRight } from 'lucide-react'

export default function TranslationsSection({
  initialTranslations,
  term,
  termId,
  languageId,
  user,
  hasSubmittedTranslation,
  nextTerm,
  language,
  nextTermIndex,
  termsLength,
  hasTranslatedNextTerm,
}) {
  const [translations, setTranslations] = useState(initialTranslations)
  const [submitted, setSubmitted] = useState(hasSubmittedTranslation)

  const handleNewTranslation = (newTranslation, tempId) => {
    setTranslations(prevTranslations => {
      if (tempId) {
        return prevTranslations.map(translation =>
          translation.id === tempId ? newTranslation : translation,
        )
      }
      return [...prevTranslations, newTranslation]
    })
    setSubmitted(true)
  }

  return (
    <div className="">
      <div className="bg-[#F7F7F7] p-4">
        <h1 className="text-sm mb-4">Translate</h1>
        <p className="text-[40px] mb-8">gas</p>
        <span className="text "></span>
        <p className="font-semibold">Examples</p>

        <div className="mb-3 p-2 border bg-[#EEEEEE]">
          An ethereum transaction requires gas
        </div>
        <div className="p-2 border bg-[#EEEEEE]">
          Gas is the fee required to successfully conduct a transaction or
          execute a contract on the Ethereum blockchain platform
        </div>
        <hr className="mt-5 h-px my-8 bg-gray-200 border-0" />
        <AddTranslationForm
          termId={termId}
          languageId={languageId}
          onTranslationAdded={handleNewTranslation}
          userId={user?.id}
        >
          <UpNextComponent
            nextTerm={nextTerm}
            language={languageId}
            nextTermIndex={nextTermIndex}
            termsLength={termsLength}
            hasTranslatedNextTerm={hasTranslatedNextTerm}
          />
        </AddTranslationForm>
      </div>
      <div className="my-4 p-8 flex flex-col gap-4 bg-[#F7F7F7]">
        {submitted ? (
          <div className="">
            <h2 className="text-xl font-semibold mb-4">
              Suggested translations
            </h2>
            <div className="flex flex-col gap-3 mb-6">
              <p>
                <strong>Cast your vote on the terms below</strong> to help the
                community select the best translation.
              </p>
              <p>
                Think one translation is better than another? Join the
                discussion in the comments section!
              </p>
            </div>
            {translations.map(translation => (
              <div key={translation.id}>
                <p></p>
                <div className="flex justify-between items-center mb-0 py-3 px-4 border border-black bg-white">
                  <p>{translation.translation}</p>
                  <VoteButtons
                    translationId={translation.id}
                    initialVotes={translation.votes}
                    userId={user?.id}
                  />
                </div>
                <div className="text-sm text-gray-500 bg-[#E3E3E3] px-2 py-1">
                  Suggested by {translation.display_name || 'Anonymous'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Please submit a translation to view existing translations.</p>
        )}
      </div>
    </div>
  )
}

const UpNextComponent = ({
  nextTerm,
  language,
  nextTermIndex,
  termsLength,
  hasTranslatedNextTerm = false,
}) => {
  return (
    <a href={`/${language}/${nextTerm}`} className="flex gap-4 items-center ">
      <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-xs uppercase tracking-widest">
          Up Next
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-xl">{nextTerm}</span>
          {hasTranslatedNextTerm ? (
            <CheckDecagramGreen />
          ) : (
            <CheckDecagramOutline />
          )}
        </div>
      </div>
      <div className="flex items-end space-x-2">
        <ArrowRight />
      </div>
    </a>
  )
}

// const UpNextComponentMobile = ({
//   nextTerm,
//   language,
//   nextTermIndex,
//   termsLength,
//   hasTranslatedNextTerm = false,
// }) => {
//   return (
//     <a
//       href={`/${language}/${nextTerm}`}
//       className="relative flex items-center justify-between border border-black p-4 w-full shadow-md mx-auto"
//     >
//       <div className="absolute top-0 right-0 bg-black px-4">
//         <span className="text-white text-sm">
//           {nextTermIndex}/{termsLength}0
//         </span>
//       </div>
//       <div>
//         <span className="text-gray-500 text-xs uppercase tracking-widest">
//           Up Next
//         </span>
//         <div className="flex items-center space-x-2">
//           <span className="text-xl">{nextTerm}</span>
//           {hasTranslatedNextTerm ? (
//             <BadgeCheck height={30} width={30} fill="green" stroke="white" />
//           ) : (
//             <BadgeCheck height={28} width={28} />
//           )}
//         </div>
//       </div>
//       <div className="flex items-end justify-end space-x-2">
//         <ChevronRight />
//       </div>
//     </a>
//   )
// }

const CheckDecagramOutline = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#B7B7B7"
      d="m23 12l-2.4-2.8l.3-3.7l-3.6-.8l-1.9-3.2L12 3L8.6 1.5L6.7 4.7l-3.6.8l.3 3.7L1 12l2.4 2.8l-.3 3.7l3.6.8l1.9 3.2L12 21l3.4 1.5l1.9-3.2l3.6-.8l-.3-3.7zm-4.3 4.9l-2.7.6l-1.4 2.4l-2.6-1.1l-2.6 1.1L8 17.5l-2.7-.6l.2-2.8L3.7 12l1.8-2.1l-.2-2.8L8 6.5l1.4-2.4L12 5.2l2.6-1.1L16 6.5l2.7.6l-.2 2.8l1.8 2.1l-1.8 2.1zm-2.1-9.3L18 9l-8 8l-4-4l1.4-1.4l2.6 2.6z"
    />
  </svg>
)

const CheckDecagramGreen = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#08532F"
      d="m23 12l-2.44-2.78l.34-3.68l-3.61-.82l-1.89-3.18L12 3L8.6 1.54L6.71 4.72l-3.61.81l.34 3.68L1 12l2.44 2.78l-.34 3.69l3.61.82l1.89 3.18L12 21l3.4 1.46l1.89-3.18l3.61-.82l-.34-3.68zm-13 5l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9z"
    />
  </svg>
)

const ArrowRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.66699 7.33306V8.66639H10.667L7.00033 12.3331L7.94699 13.2797L13.227 7.99973L7.94699 2.71973L7.00033 3.66639L10.667 7.33306H2.66699Z"
      fill="black"
    />
  </svg>
)
