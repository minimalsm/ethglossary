// components/AddComment.js
'use client'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AddComment({ translationId, onCommentAdded }) {
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClientComponentClient()

  const handleAddComment = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const { data, error } = await supabase
      .from('comments')
      .insert([{ translation_id: translationId, comment }])
      .select()

    setIsSubmitting(false)
    if (error) {
      alert(error.message)
    } else {
      setComment('') // Clear the input field after successful submission
      if (onCommentAdded) {
        onCommentAdded(data[0]) // Update the parent component with the actual server response
      }
    }
  }

  return (
    <form onSubmit={handleAddComment} className="space-y-4">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comment"
        className="w-full px-4 py-2 border rounded-md text-black bg-white"
        disabled={isSubmitting}
      />
      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Comment'}
      </button>
    </form>
  )
}
