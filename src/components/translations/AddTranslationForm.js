'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
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
  localeLanguageData,
}) {
  const [translation, setTranslation] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  console.log('Rendering AddTranslationForm') // debug statement

  const handleAddTranslation = async e => {
    console.log('handleAddTranslation') // debug statement
    e.preventDefault()
    setIsSubmitting(true)

    const existingTranslation = translations.find(
      t => t.translation.toLowerCase() === translation.toLowerCase(),
    )

    console.log('existingTranslation: ', existingTranslation) // debug statement

    if (existingTranslation) {
      // Optimistically update the UI for existing translation
      const optimisticTranslation = {
        ...existingTranslation,
        votes: {
          ...existingTranslation.votes,
          upvotes: existingTranslation.votes.upvotes + 1,
        },
      }

      console.log('optimisticTranslation: ', optimisticTranslation) // debug statement

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
          { ...existingTranslation, ...updatedTranslation },
          existingTranslation.id,
        )
      } catch (error) {
        console.log('Error updating translation: ', error) // debug statement
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
      }

      console.log('optimisticTranslation: ', optimisticTranslation) // debug statement

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
        console.log('Error adding translation: ', error) // debug statement
        alert(error.message)
        // Revert optimistic update if there's an error
        onTranslationAdded(null, optimisticTranslation.id)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  console.log('rendering form') // debug statement

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
      <div className="flex items-center justify-between">
        <Button type="submit" disabled={isSubmitting} className="rounded-none">
          {isSubmitting ? 'Submitting...' : 'Suggest translation'}
        </Button>
        {children}
      </div>
    </form>
  )
}
