// components/AddComment.js
'use client'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AddComment({ translationId }) {
  const [comment, setComment] = useState('')
  const supabase = createClientComponentClient()

  const handleAddComment = async (e) => {
    e.preventDefault()
    const { error } = await supabase
      .from('comments')
      .insert([{ translation_id: translationId, comment }])
    if (error) {
      alert(error.message)
    } else {
        console.log('Added comment')
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
      />
      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md">
        Submit Comment
      </button>
    </form>
  )
}
