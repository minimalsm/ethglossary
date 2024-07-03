// components/AddTranslation.js
'use client'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AddTranslation({ termId, onTranslationAdded }) {
  const [translation, setTranslation] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClientComponentClient()

  const handleAddTranslation = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const { data, error } = await supabase
      .from('translations')
      .insert([{ term_id: termId, translation }])
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
      <input
        type="text"
        value={translation}
        onChange={(e) => setTranslation(e.target.value)}
        placeholder="Translation"
        className="w-full px-4 py-2 border rounded-md text-black bg-white"
        disabled={isSubmitting}
      />
      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Translation'}
      </button>
    </form>
  )
}
