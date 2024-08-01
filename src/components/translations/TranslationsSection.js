'use client'
import { useState } from 'react'
import AddTranslationForm from '@/components/translations/AddTranslationForm'
import VoteButtons from '@/components/common/VoteButtons'
import CheckDecagramGreen from '@/components/icons/CheckDecagramGreen'
import CheckDecagramOutline from '@/components/icons/CheckDecagramOutline'
import ArrowRight from '@/components/icons/ArrowRight'
import { Button } from '../ui/button'

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
  localeLanguageData,
}) {
  const [translations, setTranslations] = useState(initialTranslations)
  const [submitted, setSubmitted] = useState(hasSubmittedTranslation)

  const handleNewTranslation = (newTranslation, tempId) => {
    setTranslations(prevTranslations => {
      const existingTranslation = prevTranslations.find(
        t =>
          t.translation.toLowerCase() ===
          newTranslation.translation.toLowerCase(),
      )
      if (existingTranslation) {
        const updatedTranslation = {
          ...existingTranslation,
          votes: newTranslation.votes,
          translation_submissions: [
            ...existingTranslation.translation_submissions,
            {
              user_id: user.id,
              profiles: {
                display_name: user.display_name,
                avatar_url: user.avatar_url,
              },
            },
          ],
        }
        return prevTranslations.map(translation =>
          translation.id === existingTranslation.id
            ? updatedTranslation
            : translation,
        )
      }
      if (tempId) {
        return prevTranslations.map(translation =>
          translation.id === tempId ? newTranslation : translation,
        )
      }
      return [...prevTranslations, newTranslation]
    })
    setSubmitted(true)
  }

  // console.log(
  //   'translations in section',
  //   translations[0].translation_submissions,
  // )
  // logs:
  // translations in section [
  //   {
  //     user_id: '922651f5-bba7-49c7-a104-dca5b1c7320d',
  //     profiles: {
  //       avatar_url: 'https://cdn.discordapp.com/avatars/643099918998831144/6be3d8b32a6ca22fe61be6ada89775d3.png',
  //       display_name: 'joshuaisbuilding'
  //     }
  //   }
  // ]

  return (
    <div className="grow-1 shrink-1 basis-auto">
      <div className="bg-background p-4 pt-6">
        <TranslationStatus submitted={submitted} />
        <p className="font-serif text-[40px] mb-8">{term}</p>
        <span className="text "></span>
        <p className="text-sm font-semibold mb-2">Examples</p>

        <div className="mb-2 p-2 rounded bg-accent">
          <p>
            An ethereum transaction requires{' '}
            <span className="bg-[#651A1A] p-1 rounded">gas</span>
          </p>
        </div>
        <div className="p-2 rounded bg-accent">
          <span className="bg-[#651A1A] p-1 rounded">Gas</span> is the fee
          required to successfully conduct a transaction or execute a contract
          on the Ethereum blockchain platform
        </div>
        <hr className="mt-5 h-px my-8 bg-gray-200 border-0" />
        <AddTranslationForm
          termId={termId}
          languageId={languageId}
          onTranslationAdded={handleNewTranslation}
          hasSubmittedTranslation={submitted}
          translations={translations}
          userId={user?.id}
          localeLanguageData={localeLanguageData}
          user={user}
        >
          <UpNextComponent
            nextTerm={nextTerm}
            language={language}
            nextTermIndex={nextTermIndex}
            termsLength={termsLength}
            hasTranslatedNextTerm={hasTranslatedNextTerm}
          />
        </AddTranslationForm>
      </div>
      <div className="my-4 p-8 flex flex-col gap-4 bg-background">
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
            {translations.map(translation => {
              // Get all user display_names
              const translators = translation.translation_submissions.map(
                submission => submission.profiles?.display_name || 'Anonymous',
              )

              console.log('translators when mapping', translators)

              const isUserTranslator = translators.includes(user?.display_name)

              // Construct the suggested by message
              let suggestedByMessage = ''
              if (isUserTranslator) {
                const otherTranslators = translators.filter(
                  name => name !== user.display_name,
                )
                if (otherTranslators.length === 0) {
                  suggestedByMessage = 'Suggested by you'
                } else {
                  suggestedByMessage = `Suggested by you and ${otherTranslators.length} others`
                }
              } else if (translators.length === 1) {
                suggestedByMessage = `Suggested by ${translators[0]}`
              } else {
                suggestedByMessage = `Suggested by ${translators[0]} and ${translators.length - 1} others`
              }
              return (
                <div key={translation.id}>
                  <div className="flex justify-between items-center mb-0 py-3 px-4 border border-black bg-white">
                    <p className="text-black">{translation.translation}</p>
                    <VoteButtons
                      translationId={translation.id}
                      initialVotes={translation.votes}
                      userId={user?.id}
                    />
                  </div>
                  <div className="text-sm text-gray-500 bg-[#E3E3E3] px-2 py-1">
                    {suggestedByMessage}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p>Please submit a translation to view existing translations.</p>
        )}
      </div>
    </div>
  )
}

const TranslationStatus = ({ submitted }) => {
  if (submitted) {
    return (
      <div className="inline-flex gap-1 items-center bg-secondary rounded-full px-2 py-1 mb-4">
        <CheckDecagramGreen />
        <p className=" font-bold text-sm">Translated</p>
      </div>
    )
  }

  return <p className="text-sm px-2 py-1 mb-4">Translate</p>
}

const UpNextComponent = ({
  nextTerm,
  language,
  hasTranslatedNextTerm = false,
}) => {
  return (
    <>
      <a href={`/${language}/${nextTerm}`}>Next Term</a>
      <div className="md:hidden flex items-center space-x-2 self-center">
        <span className="text-xl">{nextTerm}</span>
        {hasTranslatedNextTerm ? (
          <CheckDecagramGreen />
        ) : (
          <CheckDecagramOutline />
        )}
      </div>
    </>
  )
}
