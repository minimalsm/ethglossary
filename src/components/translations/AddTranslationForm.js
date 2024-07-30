'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { submitTranslation as addTranslation } from '@/lib/translations'
import { Label } from '@/components/ui/label'
import { getLanguageData } from '@/lib/languageUtils'

export default function AddTranslationForm({
  termId,
  languageId,
  onTranslationAdded,
  userId,
  children,
  localeLanguageData,
}) {
  const [translation, setTranslation] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const languageData = getLanguageData('fr')
  console.log('languageData', languageData)

  const handleAddTranslation = async e => {
    e.preventDefault()
    setIsSubmitting(true)

    // Optimistically update the UI
    const optimisticTranslation = {
      id: Date.now(), // Temporary ID
      term_id: termId,
      language_id: languageId,
      translation,
      upvotes: 1,
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
