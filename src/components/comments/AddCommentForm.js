'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function AddCommentForm({ onAddComment }) {
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCommentSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onAddComment(newComment)
      setNewComment('')
    } catch (error) {
      alert(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleCommentSubmit}
      className="relative mt-4 flex items-center"
    >
      <Textarea
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        placeholder="Join the discussion..."
        className="w-full p-2 border rounded-md min-h-[48px] flex items-center justify-center"
        disabled={isSubmitting}
      />
      <div className="absolute right-3 flex items-center justify-center h-full ml-2">
        <button
          type="submit"
          className="w-[20px] h-[20px] flex bg-white text-black items-center justify-center rounded-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? '...' : '↑'}
        </button>
      </div>
    </form>
  )
}
