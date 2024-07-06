'use client'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function AddTranslation({ termId, languageId, onTranslationAdded }) {
  const [translation, setTranslation] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClientComponentClient()

  const handleAddTranslation = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const { data, error } = await supabase
      .from('translations')
      .insert([{ term_id: termId, language_id: languageId, translation }])
      .select()

    setIsSubmitting(false)
    if (error) {
      alert(error.message)
    } else {
      setTranslation('') // Clear the input field after successful submission
      if (onTranslationAdded) {
        onTranslationAdded(data[0]) // Update the parent component with the actual server response
      }
    }
  }

  return (
    <form onSubmit={handleAddTranslation} className="space-y-4">
      <Textarea
        type="text"
        value={translation}
        onChange={(e) => setTranslation(e.target.value)}
        placeholder="Translation"
        // className="w-full px-4 py-2 border rounded-md text-black bg-white"
        disabled={isSubmitting}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Translation'}
      </Button>
    </form>
  )
}
