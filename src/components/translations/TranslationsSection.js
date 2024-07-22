'use client'
import { useState } from 'react'
import AddTranslationForm from '@/components/translations/AddTranslationForm'
import VoteButtons from '@/components/common/VoteButtons'

export default function TranslationsSection({
  initialTranslations,
  termId,
  languageId,
  user,
  hasSubmittedTranslation,
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
    <div>
      <AddTranslationForm
        termId={termId}
        languageId={languageId}
        onTranslationAdded={handleNewTranslation}
        userId={user?.id}
      />
      {submitted ? (
        translations.map(translation => (
          <div key={translation.id} className="my-4 pb-4">
            <div className="mb-0 p-4 pb-0 border border-black">
              <p>{translation.translation}</p>
              <VoteButtons
                translationId={translation.id}
                initialVotes={translation.votes}
                userId={user?.id}
              />
            </div>

            <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1">
              Suggested by {translation.display_name || 'Anonymous'}
            </div>
          </div>
        ))
      ) : (
        <p>Please submit a translation to view existing translations.</p>
      )}
    </div>
  )
}
