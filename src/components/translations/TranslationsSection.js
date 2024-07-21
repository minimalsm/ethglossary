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
          <div key={translation.id} className="mb-4 p-4 border rounded-md">
            <p>{translation.translation}</p>
            <VoteButtons
              translationId={translation.id}
              initialVotes={translation.votes}
              userId={user?.id}
            />
          </div>
        ))
      ) : (
        <p>Please submit a translation to view existing translations.</p>
      )}
    </div>
  )
}
