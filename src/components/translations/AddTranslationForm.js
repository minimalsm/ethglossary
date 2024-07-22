'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { addTranslation } from '@/lib/translations'
import { Label } from '@/components/ui/label'

export default function AddTranslationForm({
  termId,
  languageId,
  onTranslationAdded,
  userId,
}) {
  const [translation, setTranslation] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddTranslation = async e => {
    e.preventDefault()
    setIsSubmitting(true)

    // Optimistically update the UI
    const optimisticTranslation = {
      id: Date.now(), // Temporary ID
      term_id: termId,
      language_id: languageId,
      translation,
      upvotes: 0,
      downvotes: 0,
      user_id: userId,
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
      onTranslationAdded(newTranslation, optimisticTranslation.id)
    } catch (error) {
      alert(error.message)
      // Revert optimistic update if there is an error
      onTranslationAdded(null, optimisticTranslation.id)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleAddTranslation} className="space-y-4">
      <Label htmlFor="translation">
        into <strong>Français</strong>
      </Label>
      <Input
        id="translation"
        type="text"
        value={translation}
        onChange={e => setTranslation(e.target.value)}
        placeholder="Translation"
        disabled={isSubmitting}
        className="rounded-none border-0 border-b border-b-grey-300 text-3xl py-8"
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Translation'}
      </Button>
    </form>
  )
}
