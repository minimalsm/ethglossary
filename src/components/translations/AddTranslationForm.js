'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { submitTranslation as addTranslation } from '@/lib/translations'
import { Label } from '@/components/ui/label'

export default function AddTranslationForm({
  termId,
  languageId,
  onTranslationAdded,
  translations,
  userId,
  children,
  hasSubmittedTranslation,
  localeLanguageData,
  user,
}) {
  const [translation, setTranslation] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddTranslation = async e => {
    e.preventDefault()
    setIsSubmitting(true)

    const existingTranslation = translations.find(
      t => t.translation.toLowerCase() === translation.toLowerCase(),
    )

    if (existingTranslation) {
      // Optimistically update the UI for existing translation
      const optimisticTranslation = {
        ...existingTranslation,
        votes: {
          ...existingTranslation.votes,
          upvotes: existingTranslation.votes.upvotes + 1,
        },
        translation_submissions: [
          ...(existingTranslation.translation_submissions || []),
          {
            profiles: {
              display_name: user.display_name,
              avatar_url: user.avatar_url,
            },
          },
        ],
      }

      onTranslationAdded(optimisticTranslation, existingTranslation.id)

      try {
        const updatedTranslation = await addTranslation(
          termId,
          languageId,
          translation,
          userId,
        )
        setTranslation('')

        // Ensure the existing translation is replaced by the actual server response
        onTranslationAdded(
          { ...optimisticTranslation, ...updatedTranslation },
          existingTranslation.id,
        )
      } catch (error) {
        alert(error.message)
        // Revert optimistic update if there's an error
        onTranslationAdded(existingTranslation, existingTranslation.id)
      } finally {
        setIsSubmitting(false)
      }
    } else {
      // Optimistically add a new translation
      const optimisticTranslation = {
        id: Date.now(), // Temporary ID
        term_id: termId,
        language_id: languageId,
        translation,
        votes: {
          upvotes: 1,
          downvotes: 0,
        },
        user_id: userId,
        translation_submissions: [
          {
            profiles: {
              display_name: user.display_name,
              avatar_url: user.avatar_url,
            },
          },
        ],
      }

      onTranslationAdded(optimisticTranslation)

      try {
        const newTranslation = await addTranslation(
          termId,
          languageId,
          translation,
          userId,
        )
        setTranslation('')

        // Replace temporary ID with actual ID from the server
        onTranslationAdded(
          { ...optimisticTranslation, ...newTranslation },
          optimisticTranslation.id,
        )
      } catch (error) {
        alert(error.message)
        // Revert optimistic update if there's an error
        onTranslationAdded(null, optimisticTranslation.id)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <form onSubmit={handleAddTranslation} className="space-y-4">
      <Label htmlFor="translation">
        into <strong>{localeLanguageData.localName}</strong>
      </Label>
      <Input
        id="translation"
        type="text"
        value={translation}
        onChange={e => setTranslation(e.target.value)}
        placeholder="Translation"
        disabled={isSubmitting}
        className="m-0 py-8 rounded-none border-0 border-b border-b-grey-300 bg-inherit text-[32px]"
      />
      <div className="flex flex-col md:items-center md:justify-between md:flex-row">
        <SubmissionState
          hasSubmittedTranslation={hasSubmittedTranslation}
          isSubmitting={isSubmitting}
        >
          {children}
        </SubmissionState>
      </div>
    </form>
  )
}

const SubmissionState = ({
  isSubmitting,
  children,
  hasSubmittedTranslation,
}) => {
  if (hasSubmittedTranslation === true) {
    return (
      <>
        <Button type="submit" disabled={isSubmitting} className="rounded-none">
          {isSubmitting ? 'Submitting...' : 'Suggest another'}
        </Button>
        {children}
      </>
    )
  } else {
    return (
      <Button type="submit" disabled={isSubmitting} className="rounded-none">
        {isSubmitting ? 'Submitting...' : 'Suggest translation'}
      </Button>
    )
  }
}
