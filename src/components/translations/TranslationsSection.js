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
        <p className="mb-8 font-serif text-[40px]">{term}</p>
        <span className="text"></span>
        <p className="mb-2 text-sm font-semibold">Examples</p>

        <div className="mb-2 rounded bg-accent p-2">
          <p>
            An ethereum transaction requires{' '}
            <span className="rounded bg-[#651A1A] p-1">gas</span>
          </p>
        </div>
        <div className="rounded bg-accent p-2">
          <span className="rounded bg-[#651A1A] p-1">Gas</span> is the fee
          required to successfully conduct a transaction or execute a contract
          on the Ethereum blockchain platform
        </div>
        <hr className="my-8 mt-5 h-px border-0 bg-gray-200" />
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
      <div className="my-4 flex flex-col gap-4 bg-background p-8">
        {submitted ? (
          <div className="">
            <h2 className="mb-4 text-xl font-semibold">
              Suggested translations
            </h2>
            <div className="mb-6 flex flex-col gap-3">
              <p>
                <strong>Cast your vote on the terms below</strong> to help the
                community select the best translation.
              </p>
              <p>
                Think one translation is better than another? Join the
                discussion in the comments section!
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {translations.map(translation => {
                // Get all user display_names
                const translators = translation.translation_submissions.map(
                  submission =>
                    submission.profiles?.display_name || 'Anonymous',
                )

                console.log('translators when mapping', translators)

                const isUserTranslator = translators.includes(
                  user?.display_name,
                )

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
                    <div className="mb-0 flex items-center justify-between rounded-md rounded-b-none border px-4 py-3">
                      <p className="">{translation.translation}</p>
                      <VoteButtons
                        translationId={translation.id}
                        initialVotes={translation.votes}
                        userId={user?.id}
                      />
                    </div>
                    <div className="rounded-md rounded-t-none bg-[#3F375D] px-2 py-1 text-sm">
                      {suggestedByMessage}
                    </div>
                  </div>
                )
              })}
            </div>
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
      <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1">
        <CheckDecagramGreen />
        <p className="text-sm font-bold">Translated</p>
      </div>
    )
  }

  return <p className="mb-4 px-2 py-1 text-sm">Translate</p>
}

const UpNextComponent = ({
  nextTerm,
  language,
  hasTranslatedNextTerm = false,
}) => {
  return (
    <>
      <a href={`/${language}/${nextTerm}`}>Next Term</a>
      <div className="flex items-center space-x-2 self-center md:hidden">
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
