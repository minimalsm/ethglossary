'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { addTranslation } from '../lib/translations'

export default function AddTranslation({
  termId,
  languageId,
  onTranslationAdded,
}) {
  const [translation, setTranslation] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddTranslation = async e => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const newTranslation = await addTranslation(
        termId,
        languageId,
        translation,
      )
      setTranslation('')
      if (onTranslationAdded) {
        onTranslationAdded(newTranslation) // Update the parent component with the actual server response
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleAddTranslation} className="space-y-4">
      <Textarea
        type="text"
        value={translation}
        onChange={e => setTranslation(e.target.value)}
        placeholder="Translation"
        disabled={isSubmitting}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Translation'}
      </Button>
    </form>
  )
}
