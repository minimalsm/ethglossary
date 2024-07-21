'use client'
import { useState } from 'react'
import AddTranslationForm from '@/components/translations/AddTranslationForm'
import VoteButtons from '@/components/common/VoteButtons'

export default function TranslationsSection({
  initialTranslations,
  termId,
  languageId,
  user,
}) {
  const [translations, setTranslations] = useState(initialTranslations)

  const handleNewTranslation = (newTranslation, tempId) => {
    setTranslations(prevTranslations => {
      if (tempId) {
        // replace the temporary translation with the one from the server
        return prevTranslations.map(translation =>
          translation.id === tempId ? newTranslation : translation,
        )
      }
      return [...prevTranslations, newTranslation]
    })
  }

  return (
    <div>
      <AddTranslationForm
        termId={termId}
        languageId={languageId}
        onTranslationAdded={handleNewTranslation}
      />
      {translations.map(translation => (
        <div key={translation.id} className="mb-4 p-4 border rounded-md">
          <p>{translation.translation}</p>
          <VoteButtons
            translationId={translation.id}
            initialVotes={translation.votes}
            userId={user?.id}
          />
        </div>
      ))}
    </div>
  )
}
